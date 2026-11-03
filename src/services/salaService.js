import SalaError from '../errors/salaError.js'
import SalaRepository from '../repositories/salaRepository.js'

export default class SalaService {
  #repoSala

  constructor() {
    this.#repoSala = new SalaRepository()
  }

  async entrar(codigo, usuId) {
    const sala = await this.#repoSala.obterPorCodigo(codigo)

    if (!sala) {
      throw new SalaError(404, 'Sala não encontrada.')
    }

    if (!['Aguardando', 'Em andamento'].includes(sala.sal_status)) {
      throw new SalaError(409, 'Esta sala não aceita novos participantes.')
    }

    const limite = Number(sala.sal_max_jogadores)
    const saldoInicial = Number(sala.sal_saldo_inicial)

    if (!Number.isInteger(limite) || limite <= 0) {
      throw new Error(`A sala ${codigo} não tem um limite válido.`)
    }

    if (!Number.isFinite(saldoInicial) || saldoInicial < 0) {
      throw new Error(`A sala ${codigo} não tem um saldo inicial válido.`)
    }

    await this.#repoSala.entrar(codigo, usuId, { limite, saldoInicial })
  }
}
