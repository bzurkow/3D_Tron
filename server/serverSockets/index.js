'use strict';
const socketio = require('socket.io');

let IO = null;

module.exports = (server) => {
  if (server == undefined) return IO;
  if (IO) return IO;

  IO = socketio(server);
  require('./socket.js')(IO);
};
