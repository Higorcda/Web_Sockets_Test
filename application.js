
const express   =   require('express');
const ejs       =       require('ejs');
const http      =      require('http');
const socket_io = require('socket.io');
const path      =      require('path');

const application = express();

const server = http.createServer(application);
const io     =              socket_io(server);

global.router = express.Router();

application.engine('html', ejs.renderFile);
application.set(    'view engine', 'html');

application.set('views', path.join(__dirname, 'views'));

application.use(express.static(path.join(__dirname, 'assets')));

/* --- */

require('./routes/index.js');

application.use('/', global.router);

/* ------ */

let messages = [];

io.on('connection', (socket) => 
{

    socket.emit('previous_messages', messages);

    socket.on('send', (data) => 
    {

        messages.push(data);

        broadcast(socket, data);

    });

    function broadcast(socket, data) { socket.broadcast.emit('received_message', data); }

});

/* ------ */ 

/* --- */

server.listen(8000);