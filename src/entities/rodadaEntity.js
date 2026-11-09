
import BaseEntity from "./baseEntity";

export default class RodadaEntity extends BaseEntity {
    #rodId;
    #rodCodigobaralho;
    #rodDtinicio;
    #rodDtfim;
    #salId;

    get rodId() { return this.#rodId }
    set rodId(id) { this.#rodId = id }

    get rodCodigobaralho() { return this.#rodCodigobaralho }
    set rodCodigobaralho(codigobaralho) { this.#rodCodigobaralho = codigobaralho }

    get rodDtinicio() { return this.#rodDtinicio }
    set rodDtinicio(dtinicio) { this.#rodDtinicio = dtinicio }

    get rodDtfim() { return this.#rodDtfim }
    set rodDtfim(dtfim) { this.#rodDtfim = dtfim }

    get salId() { return this.#salId }
    set salId(salId) { this.#salId = salId }

    constructor(rodId, rodCodigobaralho, rodDtinicio, rodDtfim, salId) {
        super();
        this.#rodId = rodId;
        this.#rodCodigobaralho = rodCodigobaralho;
        this.#rodDtinicio = rodDtinicio;
        this.#rodDtfim = rodDtfim;
        this.#salId = salId;
    }

    static toMap(row) {
        return new RodadaEntity(
            row["rod_id"],
            row["rod_codigobaralho"],
            row["rod_dtinicio"],
            row["rod_dtfim"],
            row["sal_id"]
        )
    }
}
