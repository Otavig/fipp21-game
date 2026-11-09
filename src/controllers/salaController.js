import SalaRepository from "../repositories/salaRepository.js"

export default class SalaController {
    #repository

    constructor() {
        this.#repository = new SalaRepository();
    }

    async criarSala(req, res) {
        const { nome } = req.params;
        try {
            if(!nome || nome.trim() === "") {
                res.send(400).json({msg: "Nome da sala inválido ou ausente"});
            }

            // Descriptografar dados do usuario para alcançar o id
            const { id } = req.login; //id do usuario

            let codigoSala = await this.#repository.criar(nome, id);

            res.status(201).json({msg: "Sala criada com sucesso!", codigoSala});
        } catch (error) {
            console.error(error);
            res.status(500).json({msg: "Erro interno no servidor!"});
        }
    }
}