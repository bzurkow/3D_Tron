const chalk = require('chalk');
const store = require('../store');
const { createAndEmitUser, updateUserData, removeUserAndEmit, startReady } = require('../reducers/users');
const { getOtherUsers } = require('../utils');

module.exports = io => {
  io.on('connection', socket => {
    console.log(chalk.yellow(`${socket.id} has connected`));

    // New user enters; create new user and new user appears for everyone else
    store.dispatch(createAndEmitUser(socket));
    const getUsersStore = store.getState().users;
    const newUser = getUsersStore.find(user => user.id === socket.id);
    const newUserIndex = getUsersStore.indexOf(newUser);
    io.sockets.emit('addUser', newUser, newUserIndex);

    // This will send all of the current users to the user that just connected
    socket.on('getOthers', () => {
      const allUsers = store.getState().users;
      socket.emit('getOthersCallback', allUsers);
    });

    //Player ready in landing page
    socket.on('readyPlayer', (playerId) => {
      store.dispatch(startReady(playerId));
      const allUsers = store.getState().users;
      console.log("CHECK IF PLAYER READY IS SENT TO BACKEND", allUsers);
      if (allUsers.length > 1 && allUsers.length === allUsers.filter(user => user.readyToPlay===true).length) {
         io.sockets.emit('startGame');
    }

    socket.on('directionChange', (playerData) => {
      console.log('the data we send to the back', playerData);
      store.dispatch(updateUserData(playerData));
      console.log('get the state', store.getState().users);
      socket.broadcast.emit('sendTurn', playerData);
    });

    socket.on('disconnect', () => {
      store.dispatch(removeUserAndEmit(socket));
      console.log(chalk.magenta(`${socket.id} has disconnected`));
    });
  });
});
}
