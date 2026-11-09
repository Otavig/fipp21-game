import BaseEntity from "./baseEntity";

export default class SalaEntity extends BaseEntity{
    #salId;
    #salNome;
    #usuId;

    get salId() { this.#salId }
    set salId(id) { this.#salId = id }

    get salNome() { this.#salNome }
    set salNome(nome) { this.#salNome = nome }
 
    get usuId() { this.#usuId }
    set usuId(usuId) { this.#usuId = usuId }

    constructor(salId, salNome, usuId) {
        super();
        this.#salId = salId;
        this.#salNome = salNome;
        this.#usuId = usuId;
    }

    static toMap(row) {
        return new SalaEntity(
            row["sal_id"],
            row["sal_nome"],
            row["usu_id"]
        )
    }

 
}