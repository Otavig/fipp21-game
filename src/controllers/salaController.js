import salaRepository from '../repositories/salaRepository.js'

export default class salaController {
    #repoSala

    constructor (){
        this.#repoSala = new salaRepository()
    }

    async listar(req, res) {
        try {
            let lista = await this.#repoSala.listar();
            if(lista.length == 0) {
                return res.status(204).json({ msg: "Nenhuma sala encontrada!" });
            }

            return res.status(200).json(lista);
        } catch (error) {
            console.log(error)
            return res.status(500).json({ msg: "Erro interno do servidor!" });
        }
    }

     async entrar(req, res) {
    const codigo = String(req.params.codigo ?? '')
      .trim()
      .toUpperCase();

    if (!/^[A-Z0-9]{5}$/.test(codigo)) {
      return res.status(400).json({
        msg: 'Código da sala inválido.',
      });
    }

    const usuId = Number(req.login?.id);

    if (!Number.isInteger(usuId) || usuId <= 0) {
      return res.status(401).json({
        msg: 'Usuário não autenticado.',
      });
    }

    try {
      await this.#repoSala.entrar(codigo, usuId);

      return res.status(200).json({
        msg: 'Entrou com sucesso!',
      });
    } catch (error) {
      if (error instanceof SalaError) {
        return res.status(error.status).json({
          msg: error.message,
        });
      }

      console.error('Erro ao entrar na sala:', error);

      return res.status(500).json({
        msg: 'Erro interno ao entrar na sala.',
      });
    }
  }
}