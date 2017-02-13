const chalk = require('chalk');
const store = require('../store');
const {
    createAndEmitUser,
    removeUserAndEmit,
    startReady,
    playerCollision,
    addUserName
} = require('../reducers/users');


module.exports = io => {
  io.on('connection', socket => {
    console.log(chalk.yellow(`${socket.id} has connected`));

    // New user enters; create new user and new user appears for everyone else
    store.dispatch(createAndEmitUser(socket));
    const allUsers = store.getState().users;
    console.log("ALL USERS", allUsers);
    io.sockets.emit('addUser', allUsers);

    //Player ready in landing page
    //We need to update this so that game starting works smoothly

    socket.on('playerName', (socketId, playerName) => {
      store.dispatch(addUserName(socketId, playerName));
      socket.broadcast.emit('addPlayerName', socketId, playerName);
    });

    socket.on('newMessage', (message, socketId) => {
      let getSender = store.getState().users.find(user => user.id === socketId);

      io.sockets.emit('addNewMessage', message, getSender.playerName);
    });

    socket.on('readyPlayer', (playerId) => {
      store.dispatch(startReady(playerId));
      let checkReadyUsers = store.getState().users.filter(user => user.id);

// gamePlay
//       if (checkReadyUsers.length > 1 &&


// test for debug
      if (checkReadyUsers.length >= 1 &&
          checkReadyUsers.length  === checkReadyUsers.filter(user => user.readyToPlay === true).length) {
        // if (users.filter(user => user.readyToPlay).length === 3) {
        io.sockets.emit('startGame');
      }
      // } else {
      //   setTimeout(() => io.sockets.emit('startGame'), 3000);
      // }
    });

    //Here the back end recognizes that a ball collided and sends out a syncronized message to all users to handle the collision.
    socket.on('ball-collision', (playerData) => {
      console.log("COLLISON");
      io.sockets.emit('ball-collision-to-handle', playerData);
      if (playerData.id) {
        console.log(chalk.red(playerData.id));
        store.dispatch(playerCollision(playerData.id));
        console.log(chalk.red(store.getState().users.filter(user => user.active === true).length));
      }

      if (store.getState().users.filter(user => user.active === true).length === 1){
        io.sockets.emit('endGame');
      }
    });

    //Here the back end recognizes a request to change direction emits to the front end that a given player is turning.
    socket.on('directionChange', (playerData) => {
      io.sockets.emit('sendTurn', playerData);
    });

    socket.on('disconnect', () => {
      store.dispatch(removeUserAndEmit(socket));
      io.sockets.emit('removePlayer', socket.id);
      console.log(chalk.magenta(`${socket.id} has disconnected`));
    });
  });
};
