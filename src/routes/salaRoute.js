import express from 'express';
import SalaController from '../controllers/salaController.js';
import AuthMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();
const controller = new SalaController();
const auth = new AuthMiddleware();

router.get('/', auth.validar, (req, res) => {
    // #swagger.tags = ['Salas']
    // #swagger.summary = "Listas as salas existentes"
    controller.listar(req, res);
});

router.post('/lista', auth.validar, (req, res) => {
    controller.listar(req, res);
});

router.post('/entrar/:codigo', auth.validar, (req, res) => {
    // #swagger.tags = ['Salas']
    // #swagger.summary = "Entra em uma sala"
    controller.entrar(req, res);
});

export default router;
