import jwt from 'jsonwebtoken';
import UsuarioRepository from '../repositories/usuarioRepository.js';
var SEGREDO = "BLACKJACK";

export default class AuthMiddleware {

    gerarToken(id, nome, email) {
        return jwt.sign({
            id: id,
            nome: nome,
            email: email,
        }, SEGREDO, { expiresIn: 1 } );
    }

    async validar(req, res, next) {
        let token = req.cookies['token'];
        if(token){
            try {
                let objLogin = jwt.verify(token, SEGREDO);
                let loginEncontrado = await new UsuarioRepository().obterPorId(objLogin.id);
                if(loginEncontrado) {
                    req.login = loginEncontrado;
                    next();
                } else {
                    return res.status(404).json({msg: "Usuário não encontrado!"});
                }
            }
            catch(ex) {
                res.status(401).json({msg: "Não autorizado!"});
            }
        }
        else{
            res.status(401).json({msg: "Não autorizado!"});
        }
    }

}
