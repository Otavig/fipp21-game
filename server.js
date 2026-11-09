import express from 'express';
import loginRouter from './src/routes/loginRouter.js'
import usuarioRouter from './src/routes/usuarioRouter.js'
import salaRouter from './src/routes/salaRouter.js';

import path from 'path';
import { fileURLToPath } from 'url';
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import http from 'http'
const server = http.createServer(app);
import { Server } from 'socket.io'

import socketInit from './src/sockets/jogoSocket.js';

const io = new Server(server);


socketInit(io);

app.use(express.json());

app.use(express.static(__dirname + '/public'));

app.use("/login",loginRouter);
app.use("/usuario", usuarioRouter);
app.use("/sala", salaRouter);

server.listen('5000', function() {
    console.log('backend em execução');
})
