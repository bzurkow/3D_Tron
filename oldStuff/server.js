'use strict';
var path = require('path');
var http = require('http');
var server = http.createServer();

const express = require('express');
//const session = require('express-session');
const bodyParser = require('body-parser');
//const db = require('./db.json');
const app = express();


var socketio = require('socket.io');

server.on('request', app);
var io = socketio(server);

io.on('connection', function(socket) {
    /* This function receives the newly connected socket.
       This function will be called for EACH browser that connects to our server. */
    console.log('A new client has connected!', socket.id);
    // history.forEach(function(payload) {
    //     socket.emit('drawing', payload);
    // });


    socket.on('disconnect', function(socketId) {
        console.log('Client disconnected #', socketId);
    });
});

server.listen(3000, function() {
    console.log('The server is listening on port 3000!');
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../oldPublic')));

// app.get('/', function(req, res) {
//     res.sendFile(path.join(__dirname, 'public'));
// });

module.exports = server;



// console.log(__dirname)


// module.exports = app
//   .use(bodyParser.urlencoded({ extended: true }), bodyParser.json(), require('volleyball'))
//   // .use(session({
//   //   // this mandatory configuration ensures that session IDs are not predictable
//   //   secret: 'tongiscool', // or whatever you like
//   //   // these options are recommended and reduce session concurrency issues
//   //   resave: false,
//   //   saveUnitialized: false
//   // }))
//   // .use(function (req, res, next) {
//   //   console.log('session', req.session);
//   //   next();
//   // })
//   // .use('/api', require('./api'))
//   // // Send index.html for anything else.
//   // .get('/*', (_, res) => res.sendFile(resolve(__dirname, 'public', 'index.html')))
//   // .use(require('./error.middleware'));
//   .use(express.static(resolve(__dirname, 'public')))
//   .get('/*', (_, res) => res.sendFile(resolve(__dirname, 'public', 'index.html')))
//   // .get('/', (req, res, next) => {
//   //   res.sendFile(resolve(__dirname, 'build/index.html'))
//   // })

// const server = app.listen(process.env.PORT || 3000, () => {
//   console.log(`Listening on ${JSON.stringify(server.address())}`);
// });
