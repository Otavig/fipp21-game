import express from 'express';
import UsuarioController from '../controllers/usuarioController.js';
import AuthMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();
let controller = new UsuarioController();
let auth = new AuthMiddleware();

router.post("/", auth.validar, (req, res) => {
    // #swagger.tags = ['Usuário']
    // #swagger.summary = "Cadastra um novo usuário"

    controller.cadastrar(req, res);
});

router.get("/", auth.validar, (req, res) => {
    // #swagger.tags = ['Usuário']
    // #swagger.summary = "Lista todos os usuários cadastrados"

    controller.listar(req, res);
})

export default router;