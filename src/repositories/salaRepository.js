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
  
    async listarPorUsu(usu){
      let sql = 'select * from tb_sala where usu_id = ?'
      let rows = await this.#banco.ExecutaComando(sql,[usu])

      let lista = []
      for(let r of rows){
        lista.push(salaEntity.toMap(r))
      }
    }
  
}