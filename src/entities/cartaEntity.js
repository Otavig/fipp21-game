
import BaseEntity from "./baseEntity";

export default class CartaEntity extends BaseEntity {
    #carId;
    #carCodigo;
    #carImagem;
    #carOrdem;
    #carVisivel;
    #carValor;
    #carNaipe;
    #parId;
    #rodId;

    get carId() { return this.#carId }
    set carId(id) { this.#carId = id }

    get carCodigo() { return this.#carCodigo }
    set carCodigo(codigo) { this.#carCodigo = codigo }

    get carImagem() { return this.#carImagem }
    set carImagem(imagem) { this.#carImagem = imagem }

    get carOrdem() { return this.#carOrdem }
    set carOrdem(ordem) { this.#carOrdem = ordem }

    get carVisivel() { return this.#carVisivel }
    set carVisivel(visivel) { this.#carVisivel = visivel }

    get carValor() { return this.#carValor }
    set carValor(valor) { this.#carValor = valor }

    get carNaipe() { return this.#carNaipe }
    set carNaipe(naipe) { this.#carNaipe = naipe }

    get parId() { return this.#parId }
    set parId(parId) { this.#parId = parId }

    get rodId() { return this.#rodId }
    set rodId(rodId) { this.#rodId = rodId }

    constructor(carId, carCodigo, carImagem, carOrdem, carVisivel, carValor, carNaipe, parId, rodId) {
        super();
        this.#carId = carId;
        this.#carCodigo = carCodigo;
        this.#carImagem = carImagem;
        this.#carOrdem = carOrdem;
        this.#carVisivel = carVisivel;
        this.#carValor = carValor;
        this.#carNaipe = carNaipe;
        this.#parId = parId;
        this.#rodId = rodId;
    }

    static toMap(row) {
        return new CartaEntity(
            row["car_id"],
            row["car_codigo"],
            row["car_imagem"],
            row["car_ordem"],
            row["car_visivel"],
            row["car_valor"],
            row["car_naipe"],
            row["par_id"],
            row["rod_id"]
        )
    }
}
