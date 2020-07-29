const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require ('path');

const socketio = require('socket.io');
const http = require('http');

const routes = require('./routes');


const app = express();
const server = http.Server(app);
const io = socketio(server);

mongoose.connect('mongodb+srv://arthurdb1999:a10213017@omnistack-vdqcn.mongodb.net/Aircnc?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});



const connectedUsers ={};

io.on('connection', socket => {

    const { user_id } = socket.handshake.query;

    connectedUsers[user_id] = socket.id;
});

app.use((req, res, next) => {
    req.io = io;
    req.connectedUsers = connectedUsers;

    return next();
});
//microframework - express é pra nao reinventar a roda (cria as rotas e etc)

//API REST 
//GET(retrieve), POST(insert), PUT(update), DELETE

//req.query = acessar query params (para filtros)
//req.params = acessar route params (para edição, delete)
//req.body = acessar corpo da requisição (para criação, edição)

app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);


server.listen(3333);