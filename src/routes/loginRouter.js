import express from 'express';
import LoginController from '../controllers/loginController.js';

const loginRouter = express.Router();
let controller = new LoginController();

loginRouter.post("/", (req, res) => {
    // #swagger.tags = ['Login']
    // #swagger.summary = "Gera a autenticação via JWT na cookie do navegador"

    controller.validar(req, res);
})

export default loginRouter;
