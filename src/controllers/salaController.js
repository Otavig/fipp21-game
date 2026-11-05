
import SalaRepository from '../repositories/salaRepository.js';

export default class SalaController {
    #repoSala;

    constructor() {
        this.#repoSala = new SalaRepository();
    }

    async listar(req, res) {
        try {
            const lista = await this.#repoSala.listar();
            if (lista.length === 0) {
                return res.status(204).json({ msg: "Nenhuma sala encontrada!" });
            }

            return res.status(200).json(lista);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ msg: "Erro interno do servidor!" });
        }
    }

    async entrar(req, res) {
        const codigo = String(req.params.codigo ?? req.body?.codigo ?? '')
            .trim();

        if (!codigo) {
            return res.status(400).json({ msg: 'Nome da sala inválido.' });
        }

        const usuId = Number(req.login?.id ?? req.body?.usu_id ?? req.body?.usuId);

        if (!Number.isInteger(usuId) || usuId <= 0) {
            return res.status(401).json({ msg: 'Usuário não autenticado.' });
        }

        try {
            await this.#repoSala.entrar(codigo, usuId);

            return res.status(200).json({
                msg: 'Entrou com sucesso!',
            });
        } catch (error) {
            console.error('Erro ao entrar na sala:', error);
            const status = Number(error?.status ?? 500);

            return res.status(status).json({
                msg: error?.message ?? 'Erro interno ao entrar na sala.',
            });
        }
    }
}