import express from 'express';
import SalaController from '../controllers/salaController.js';
import AuthMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();
const salaController = new SalaController();
const auth = new AuthMiddleware();

router.get("/lista", auth.validar, (req, res) => {
    // #swagger.tags = ['Sala']
    // #swagger.summary = "Lista todas as salas"

    controller.listar(req, res);
});

export default router;