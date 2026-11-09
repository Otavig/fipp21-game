
import BaseEntity from "./baseEntity";

export default class TurnoEntity extends BaseEntity {
    #turId;
    #turSomacartas;
    #turStatus;
    #parId;
    #rodId;

    get turId() { return this.#turId }
    set turId(id) { this.#turId = id }

    get turSomacartas() { return this.#turSomacartas }
    set turSomacartas(somacartas) { this.#turSomacartas = somacartas }

    get turStatus() { return this.#turStatus }
    set turStatus(status) { this.#turStatus = status }

    get parId() { return this.#parId }
    set parId(parId) { this.#parId = parId }

    get rodId() { return this.#rodId }
    set rodId(rodId) { this.#rodId = rodId }

    constructor(turId, turSomacartas, turStatus, parId, rodId) {
        super();
        this.#turId = turId;
        this.#turSomacartas = turSomacartas;
        this.#turStatus = turStatus;
        this.#parId = parId;
        this.#rodId = rodId;
    }

    static toMap(row) {
        return new TurnoEntity(
            row["tur_id"],
            row["tur_somacartas"],
            row["tur_status"],
            row["par_id"],
            row["rod_id"]
        )
    }
}
