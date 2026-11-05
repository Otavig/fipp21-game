import Database from "../db/database.js";

export default class SalaRepository {
  #banco;

  constructor() {
    this.#banco = new Database();
  }

  async listar() {
    const sql = `
      SELECT sal_id, sal_nome, usu_id
      FROM tb_sala
      ORDER BY sal_id
    `;

    return await this.#banco.ExecutaComando(sql);
  }

  async obterPorId(id) {
    const sql = `
      SELECT sal_id, sal_nome, usu_id
      FROM tb_sala
      WHERE sal_id = ?
    `;

    const rows = await this.#banco.ExecutaComando(sql, [id]);
    return rows[0] ?? null;
  }

  async obterPorNome(nome) {
    const sql = `
      SELECT sal_id, sal_nome, usu_id
      FROM tb_sala
      WHERE sal_nome = ?
    `;

    const rows = await this.#banco.ExecutaComando(sql, [nome]);
    return rows[0] ?? null;
  }

  async entrar(codigo, usuId, limite = 4) {
    if (!Number.isInteger(usuId) || usuId <= 0) {
      const error = new Error("Usuário não autenticado.");
      error.status = 401;
      throw error;
    }

    const sala = await this.obterPorNome(codigo);

    if (!sala) {
      const error = new Error("Sala não encontrada.");
      error.status = 404;
      throw error;
    }

    const participanteAtivo = await this.#banco.ExecutaComando(
      `SELECT par_id
       FROM tb_participante
       WHERE sal_id = ? AND usu_id = ? AND par_dtsaida IS NULL
       LIMIT 1`,
      [sala.sal_id, usuId],
    );

    if (participanteAtivo.length > 0) {
      const error = new Error("Usuário já está participando desta sala.");
      error.status = 409;
      throw error;
    }

    const contagem = await this.#banco.ExecutaComando(
      `SELECT COUNT(*) AS total
       FROM tb_participante
       WHERE sal_id = ? AND par_dtsaida IS NULL`,
      [sala.sal_id],
    );

    if (Number(contagem[0]?.total ?? 0) >= Number(limite)) {
      const error = new Error("Sala lotada.");
      error.status = 409;
      throw error;
    }

    const ordemRows = await this.#banco.ExecutaComando(
      `SELECT COALESCE(MAX(par_ordem), 0) + 1 AS proxima_ordem
       FROM tb_participante
       WHERE sal_id = ?`,
      [sala.sal_id],
    );

    const ordem = Number(ordemRows[0]?.proxima_ordem ?? 1);

    await this.#banco.ExecutaComando(
      `INSERT INTO tb_participante
         (par_dtentrada, par_ordem, par_saldo, sal_id, usu_id)
       VALUES (CURRENT_TIMESTAMP, ?, 0, ?, ?)`,
      [ordem, sala.sal_id, usuId],
    );

    return { sala };
  }
}
