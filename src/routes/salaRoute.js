import express from 'express';
import SalaController from '../controllers/salaController.js';
import AuthMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();
const salaController = new SalaController();
const auth = new AuthMiddleware();

router.get("/lista", auth.validar, (req, res) => {
    // #swagger.tags = ['Sala']
    // #swagger.summary = "Lista todas as salas"

    salaController.listar(req, res);
});

router.get('/lista-usu', auth.validar, (req,res) => {
    // #swagger.tags = ['Sala']
    // #swagger.summary = 'Lista as salas do usuário logado'
    salaController.listarPorUsu(req,res)
})

export default router;