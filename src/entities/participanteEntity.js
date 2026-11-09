
import BaseEntity from "./baseEntity";

export default class ParticipanteEntity extends BaseEntity {
    #parId;
    #parDtentrada;
    #parDtsaida;
    #parOrdem;
    #parSaldo;
    #salId;
    #usuId;

    get parId() { return this.#parId }
    set parId(id) { this.#parId = id }

    get parDtentrada() { return this.#parDtentrada }
    set parDtentrada(dtentrada) { this.#parDtentrada = dtentrada }

    get parDtsaida() { return this.#parDtsaida }
    set parDtsaida(dtsaida) { this.#parDtsaida = dtsaida }

    get parOrdem() { return this.#parOrdem }
    set parOrdem(ordem) { this.#parOrdem = ordem }

    get parSaldo() { return this.#parSaldo }
    set parSaldo(saldo) { this.#parSaldo = saldo }

    get salId() { return this.#salId }
    set salId(salId) { this.#salId = salId }

    get usuId() { return this.#usuId }
    set usuId(usuId) { this.#usuId = usuId }

    constructor(parId, parDtentrada, parDtsaida, parOrdem, parSaldo, salId, usuId) {
        super();
        this.#parId = parId;
        this.#parDtentrada = parDtentrada;
        this.#parDtsaida = parDtsaida;
        this.#parOrdem = parOrdem;
        this.#parSaldo = parSaldo;
        this.#salId = salId;
        this.#usuId = usuId;
    }

    static toMap(row) {
        return new ParticipanteEntity(
            row["par_id"],
            row["par_dtentrada"],
            row["par_dtsaida"],
            row["par_ordem"],
            row["par_saldo"],
            row["sal_id"],
            row["usu_id"]
        )
    }
}
