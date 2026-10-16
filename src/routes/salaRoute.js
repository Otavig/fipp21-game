import express from 'express';
import SalaController from '../controllers/salaController.js';
import auth from '../middlewares/authMiddleware.js';

const router = express.Router();
const salaController = new SalaController();
const authMiddleware = new AuthMiddleware();

router.post("/lista", auth.validar, (req, res) => {
    // #swagger.tags = ['Usuário']
    // #swagger.summary = "Cadastra um novo usuário"

    controller.listar(req, res);
});

export default router;