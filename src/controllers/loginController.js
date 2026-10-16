import AuthMiddleware from "../middlewares/authMiddleware.js";
import UsuarioRepository from '../repositories/usuarioRepository.js';

export default class LoginController {
    #repoUsuario;

    constructor() {
        this.#repoUsuario = new UsuarioRepository();
    }

    async validar(req, res) {
        try {
            let {
                email,
                senha
            } = req.body;

            if(email && senha) {
                let login = await this.#repoUsuario.obterPorEmailSenha(email, senha);
                if(login) {
                    let middleware = new AuthMiddleware();
                    let token = middleware.gerarToken(login.usu_id, login.usu_nome, login.usu_email);
                    res.cookie("token", token, { httpOnly: true });
                    return res.status(200).json({token: token});
                } else {
                    return res.status(404).json({msg: "Usuário não encontrado!"});
                }
            } else {
                return res.status(400).json({msg: "Parâmetros incorretos!"});
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({msg: "Erro interno do servidor!"});
        }
    }
}
