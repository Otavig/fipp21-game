import Database from "../db/database.js";
import UsuarioEntity from "../entities/usuarioEntity.js";

export default class UsuarioRepository {
    #banco;

    constructor() {
        this.#banco = new Database();
    }

    async obterPorId(id) {
        let sql = "select * from tb_usuario where usu_id = ?";
        let rows = await this.#banco.ExecutaComando(sql, [id]);
        if(rows.length > 0) {
            return UsuarioEntity.toMap(rows[0]);
        }
        return null;
    }

    async obterPorEmailSenha(email, senha) {
        let sql = "select * from tb_usuario where usu_email = ? and usu_senha = ?";
        let valores = [email, senha];
        let rows = await this.#banco.ExecutaComando(sql, valores);
        if(rows.length > 0) {
            return UsuarioEntity.toMap(rows[0]);
        }
        return null;
    }

    async gravar(entidade) {
        let sql = `insert into usuario (usu_nome, usu_email, usu_senha) values (?, ?, ?)`;
        let valores = [
            entidade.nome,
            entidade.email,
            entidade.senha,
        ];

        let idGerado = await this.#banco.ExecutaComandoLastInserted(sql, valores);
        if(idGerado) {
            entidade.id = idGerado;
            return true;
        }

        return false;
    }
}