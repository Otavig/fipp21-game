export default class UsuarioEntity {
    #id;
    #nome;
    #email;
    #senha;

    get id()    { return this.#id };    set id(id) { this.#id = id };
    get nome()  { return this.#nome };  set nome(nome) { this.#nome = nome };
    get email() { return this.#email }; set email(email) { this.#email = email };
    get senha() { return this.#senha }; set senha(senha) { this.#senha = senha };

    constructor(id, nome, email, senha) {
        this.#id = id;
        this.#nome = nome;
        this.#email = email;
        this.#senha = senha;
    }
    
    static toMap(row) {
        return new UsuarioEntity(
            row["usu_id"],
            row["usu_nome"],
            row["usu_email"],
            row["usu_senha"]
        )
    }
}