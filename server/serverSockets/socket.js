const chalk = require('chalk');
const store = require('../store');
const { createAndEmitUser, updateUserData, removeUserAndEmit, startReady } = require('../reducers/users');
const { getOtherUsers } = require('../utils');

module.exports = io => {
  io.on('connection', socket => {
    console.log(chalk.yellow(`${socket.id} has connected`));

    // New user enters; create new user and new user appears for everyone else
    store.dispatch(createAndEmitUser(socket));
    const allUsers = store.getState().users;
    io.sockets.emit('addUser', allUsers);
    // const newUser = getUsersStore.find(user => user.id === socket.id);
    // const newUserIndex = getUsersStore.indexOf(newUser);

    //Player ready in landing page
    socket.on('readyPlayer', (playerId) => {
      store.dispatch(startReady(playerId));
      const checkUsersReady = store.getState().users;
      console.log("CHECK IF PLAYER READY IS SENT TO BACKEND", checkUsersReady);
      // if (checkUsersReady.filter(user => user.id).length > 1 && checkUsersReady.filter(user => user.id).length === checkUsersReady.filter(user => user.readyToPlay).length) {
         io.sockets.emit('startGame');
      // }
    });

    //Player ready in landing page
    socket.on('readyPlayer', (playerId) => {
      store.dispatch(startReady(playerId));
      const allUsers = store.getState().users;
      console.log("CHECK IF PLAYER READY IS SENT TO BACKEND", allUsers);
      if (allUsers.length > 1 && allUsers.length === allUsers.filter(user => user.readyToPlay===true).length) {
         io.sockets.emit('startGame');
    }

    socket.on('ball-collision', (playerData) => {
        io.sockets.emit('ball-collision-to-handle', playerData)
    });

    socket.on('directionChange', (playerData) => {
      console.log('the data we send to the back', playerData);
      // store.dispatch(updateUserData(playerData));
      // console.log('get the state', store.getState().users);
      io.sockets.emit('sendTurn', playerData);
    });

    socket.on('disconnect', () => {
      store.dispatch(removeUserAndEmit(socket));
      console.log(chalk.magenta(`${socket.id} has disconnected`));
    });
  });
});
}
