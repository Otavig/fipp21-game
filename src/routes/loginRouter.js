import express, { Router } from 'express';
import LoginController from '../controllers/loginController.js';

const router = express.Router();
let controller = new LoginController();

router.post("/", (req, res) => {
    // #swagger.tags = ['Usuário']
    // #swagger.summary = "Gera a autenticação via JWT na cookie do navegador"

    controller.validar(req, res);
})

export default router;