import Database from "../db/database.js";
import SalaEntity from "../entities/salaEntity.js";

export default class SalaRepository {
  #banco;

  constructor() {
    this.#banco = new Database();
  }

  async obterPorId(id) {
    let sql = "select * from tb_sala where sal_id = ?";
    let rows = await this.#banco.ExecutaComando(sql, [id]);
    if (rows.length > 0) {
      return SalaEntity.toMap(rows[0]);
    }
    return null;
  }

      async listar() {
        let sql = "select * from tb_sala";
        let rows = await this.#banco.ExecutaComando(sql);

        let lista = [];
        for(let row of rows) {
            lista.push(SalaEntity.toMap(row));
        }

        return lista;
    }

    async entrar (codigo, usuId){
        const connection = await this.#banco.obterConexao();
    let transacaoIniciada = false;

    try {
      await connection.beginTransaction();
      transacaoIniciada = true;

      const [salas] = await connection.execute(
        `SELECT sal_id, sal_status, sal_max_jogadores, sal_saldo_inicial
         FROM tb_sala
         WHERE sal_codigo = ?
         FOR UPDATE`,
        [codigo],
      );

      const sala = salas[0];

      if (!sala) {
        throw new SalaError(404, 'Sala não encontrada.');
      }

      if (!['Aguardando', 'Em andamento'].includes(sala.sal_status)) {
        throw new SalaError(409, 'Esta sala não aceita novos participantes.');
      }

      const limite = Number(sala.sal_max_jogadores);
      const saldoInicial = Number(sala.sal_saldo_inicial);

      if (!Number.isInteger(limite) || limite <= 0) {
        throw new Error(`A sala ${codigo} não tem um limite válido.`);
      }

      if (!Number.isFinite(saldoInicial) || saldoInicial < 0) {
        throw new Error(`A sala ${codigo} não tem um saldo inicial válido.`);
      }

      const [participantesAtivos] = await connection.execute(
        `SELECT par_id
         FROM tb_participante
         WHERE sal_id = ? AND usu_id = ? AND par_dtsaida IS NULL
         LIMIT 1`,
        [sala.sal_id, usuId],
      );

      if (participantesAtivos.length > 0) {
        throw new SalaError(409, 'Você já está nesta sala.');
      }

      const [contagem] = await connection.execute(
        `SELECT COUNT(*) AS total
         FROM tb_participante
         WHERE sal_id = ? AND par_dtsaida IS NULL`,
        [sala.sal_id],
      );

      if (Number(contagem[0].total) >= limite) {
        throw new SalaError(409, 'Sala lotada.');
      }

      const [ordens] = await connection.execute(
        `SELECT COALESCE(MAX(par_ordem), 0) + 1 AS proxima_ordem
         FROM tb_participante
         WHERE sal_id = ?`,
        [sala.sal_id],
      );

      const ordem = Number(ordens[0].proxima_ordem);

      await connection.execute(
        `INSERT INTO tb_participante
           (par_dtentrada, par_ordem, par_saldo, sal_id, usu_id)
         VALUES (CURRENT_TIMESTAMP, ?, ?, ?, ?)`,
        [ordem, saldoInicial, sala.sal_id, usuId],
      );

      await connection.commit();
      transacaoIniciada = false;
    } catch (error) {
      if (transacaoIniciada) {
        try {
          await connection.rollback();
        } catch (erroRollback) {
          console.error('Falha ao desfazer a entrada na sala:', erroRollback);
        }
      }

      throw error;
    } finally {
      connection.release();
    }
  }
}
