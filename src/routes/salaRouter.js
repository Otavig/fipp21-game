import express from "express";
import AuthMiddleware from "../middlewares/authMiddleware.js";
import SalaController from "../controllers/salaController.js";

const salaRouter = express.Router();
const auth = new AuthMiddleware();
const control = new SalaController();


salaRouter.post("/", auth.validar, (req,res) => {
    // #swagger.tags = ['Sala']
    // #swagger.summary = "Cadastro de nova sala de jogo"

    control.criarSala(req, res);
});

export default salaRouter;