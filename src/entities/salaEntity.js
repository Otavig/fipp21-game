import BaseEntity from "./baseEntity.js";

export default class salaEntity extends BaseEntity{
    #salId
    #salNome
    #usuId

    get salId(){return this.#salId} set salId(i){this.#salId = i}
    get salNome(){return this.#salNome} set salNome(n){this.#salNome = n}
    get usuId(){return this.#usuId} set usuId(u){this.#usuId = u}

    constructor(i,n,u){
        super()
        this.#salId = i
        this.#salNome = n
        this.#usuId = u
    }

    validar(){
        if(this.#salNome && this.#usuId)
            return true
        else return false
    }

    static toMap(r){
        return new salaEntity(
            r['sal_id'],
            r['sal_nome'],
            r['usu_id']
        )
    }
}