// 'use strict';
// const PORT = process.env.PORT || 3000;

// const express = require('express');
// const path = require('path');
// const chalk = require('chalk');
// const http = require('http');
// // const store = require('./store');
// // const setUpListeners = require('./game/listeners');
// // const { broadcastState } = require('./game/engine');

// // Create server and app
// const server = http.createServer();
// const app = express();
// server.on('request', app);

// // Sockets
// const io = require('socket.io')(server);
// // setUpSockets(io);
// io.on('connection', socket => { setUpListeners(io, socket); });
// // // broadcastState(io);

// // Middleware and routers
// require('./middleware').applyMiddleware(app);

// // Index path
// const indexHtmlPath = path.join(__dirname, '..', 'public', 'index.html');
// app.get('/', (req, res, next) => res.sendFile(indexHtmlPath));

// // DB Sync and initialize server
// // require(path.join(__dirname, 'db')).db.sync()
// //     .then(() => {
// //       server.listen(PORT, () =>
// //         console.log(chalk.italic.magenta(`Server listening on ${PORT}...`)));
// //     })
// //     .catch(console.error);

// // USING THIS SERVER FOR RIGHT NOW. LATER WILL USE ABOVE ONE
// app.listen(3000, () => {
//     console.log(`Listening on ${JSON.stringify(server.address())}`);
//   });

// module.exports = app;


'use strict';
var path = require('path');
var http = require('http');
var server = http.createServer();

const express = require('express');
const volleyball = require('volleyball');
//const session = require('express-session');
const bodyParser = require('body-parser');
//const db = require('./db.json');
const app = express();
var socketio = require('socket.io');

const ioInit = require('./serverSockets');

server.on('request', app);
ioInit(server);
// var io = socketio(server);
// io.on('connect', function(socket) {
//     /* This function receives the newly connected socket.
//        This function will be called for EACH browser that connects to our server. */
//     console.log('A new client has connected!', socket.id);
//     // once a client has connected, we expect to get a ping from them saying what room they want to join
//
//     // socket.on('hello', function(id, msg){
//     //   console.log("ID", id, "MSG", msg);
//     //   socket.to(id).emit('my message', msg);
//     // });
//     // socket.emit('message', 'what is going on, party people?');
//     socket.on('room', function(room) {
//       console.log("ROOM", room);
//       socket.join(room);
//     });
//
//     io.sockets.in("ROOM").emit('message', 'what is going on, party people?');
//
//     console.log(io.engine.clientsCount);
//     // console.log("HELLO", io.sockets.adapter.rooms);
//     socket.on('disconnect', function(socketId) {
//         console.log('Client disconnected #', socketId);
//     });
// });

app.use(volleyball);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

// require(path.join(__dirname, 'db')).db.sync()
//   .then(() => {
    server.listen(3000, function() {
      console.log('The server is listening on port 3000!');
    });
  // });


// app.get('/', function(req, res) {
//     res.sendFile(path.join(__dirname, 'public'));
// });

module.exports = server;
