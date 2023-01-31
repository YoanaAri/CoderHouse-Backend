import express from 'express';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import viewsRouter from './routes/views.router.js';
import {Server} from 'socket.io';
import apiRoutes from './routes/views.router.js';

const app = express();
const PORT = process.env.PORT || 8080;
const httpServer = app.listen(PORT, ()=> {
    console.log(`Server is up and running on port ${PORT}`);
});

const socketServer = new Server(httpServer);

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname+'/views');
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));
app.use('/', viewsRouter);

app.use('/api', apiRoutes);

app.use('*', (req, res) =>{
    res.status(404).send(`error: ruta ${req.url} metodo ${req.method} no autorizado`);
});
const connectedServer = app.listen(PORT, ()=> {
    console.log(`Server is up and running on port ${PORT}`);
});
  
connectedServer.on('error', (error) => {
    console.error('Error: ', error);
});

socketServer.on('connection', socket =>{
    console.log('nuevo cliente conectado');
    
    socket.on('msg', data=>{
        console.log(data);
    });

    socket.emit('msg_individual', 'esto lo recbe solo el socket');

    socket.broadcast.emit('msg_todos_menos_el_socket', 'esto lo reciben todos menos el que envio el mensaje');

    socketServer.emit('msg_todos', 'este mensaje lo reciben todos');
});

// app.get('/', (req, res) => {
//     let test = {
//         name: 'Ari',
//         title: 'Bienvenida'
//     }
//     res.render('index', test);
// });
