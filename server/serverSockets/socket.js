const chalk = require('chalk');
// const { Map } = require('immutable');

const store = require('../store');
const { createAndEmitUser, updateUserData, removeUserAndEmit } = require('../reducers/users');
// const { getOtherUsers } = require('../utils');

module.exports = io => {
  io.on('connection', socket => {
    console.log(chalk.yellow(`${socket.id} has connected`));

    // New user enters; create new user and new user appears for everyone else
    store.dispatch(createAndEmitUser(socket));
    const getUsersStore = store.getState().users;
    const newUser = getUsersStore.find(user => user.id === socket.id);
    const newUserIndex = getUsersStore.indexOf(newUser);
    socket.broadcast.emit('addUser', newUser, newUserIndex);

    // This will send all of the current users to the user that just connected
    socket.on('getOthers', () => {
      const allUsers = store.getState().users;
      socket.emit('getOthersCallback', allUsers);
      // getOtherUsers(allUsers, socket.id));
    });

    socket.on('directionChange', (playerData) => {
      console.log('the data we send to the back', playerData);
      store.dispatch(updateUserData(playerData));
      console.log('get the state', store.getState().users);
      socket.broadcast.emit('sendTurn', playerData);
    });

    // This is a check to ensure that all of the existing users exist on the DOM
    // before pushing updates to the backend
    // socket.on('haveGottenOthers', () => {
    //   socket.emit('startTick');
    // });

    // readyToReceiveUpdates is a check to make sure existing users have loaded
    // for the new user
    // Once they have, then the backend starts pushing updates to the frontend
    // socket.on('readyToReceiveUpdates', () => {
    //   store.subscribe(() => {
    //     const allUsers = store.getState().users;
    //     socket.emit('usersUpdated', getOtherUsers(allUsers, socket.id));
    //   });
    // });

    // This will update a user's position when they move, and send it to everyone
    // except the specific scene's user
    // socket.on('tick', userData => {
    //   userData = Map(userData);
    //   store.dispatch(updateUserData(userData));
    // });

    socket.on('disconnect', () => {
      store.dispatch(removeUserAndEmit(socket));
      console.log(chalk.magenta(`${socket.id} has disconnected`));
    });
  });
};
