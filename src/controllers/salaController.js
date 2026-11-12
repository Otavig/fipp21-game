import SalaRepository from "../repositories/salaRepository.js"

export default class SalaController {
    #repository

    constructor() {
        this.#repository = new SalaRepository();
    }

    async listarPorUsu(req,res){
        try{
            let {id} =  req.login
            let lista = await this.#repository.listarPorUsu(id)
            if(lista.length == 0) return res.status(204).json({msg:'Nenhuma sala encontrada para esse usuário'})
            else return res.status(200).json(lista)
        }catch(er){
            console.log(er)
            return res.status(500).json({msg:'Erro interno!'})
        }
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
