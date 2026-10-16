import UsuarioEntity from "../entities/usuarioEntity.js";
import UsuarioRepository from "../repositories/usuarioRepository.js";

export default class FuncionarioController {
    #repoUsuario;

    constructor() {
        this.#repoUsuario = new UsuarioRepository();
    }

    async cadastrar(req, res) {
        try {
            let {
                nome,
                email,
                senha,
            } = req.body;

            let entidade = new UsuarioEntity(
                0,
                nome,
                email,
                senha,
            );

            if(entidade.validar()) {
                let result = await this.#repoUsuario.gravar(entidade);
                
                if(result) {
                    return res.status(201).json(entidade);
                }

                throw new Error("Erro ao inserir imóvel no banco de dados");
            } else {
                console.log(req.body);
                return res.status(400).json({ msg: "Parâmetros incorretos!" });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ msg: "Erro interno no servidor!" });
        }
    }
}