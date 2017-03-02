'use strict';
const path = require('path');
const http = require('http');
const server = http.createServer();
const express = require('express');
const volleyball = require('volleyball');
const bodyParser = require('body-parser');
const app = express();

const ioInit = require('./serverSockets');

server.on('request', app);
ioInit(server);

app.use(volleyball);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

// THIS IS FOR FUTURE DATABASE
// require(path.join(__dirname, 'db')).db.sync()
//   .then(() => {
    server.listen(process.env.PORT || 3000, function() {
      console.log('The server is listening on port 3000!');
    });
  // });

module.exports = server;
