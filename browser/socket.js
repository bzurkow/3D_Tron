import listeners from './game/listeners';
const socket = io('/');

import store from './store';
import { setPlayerId, updatePlayer } from './reducers/players';
import { startGame } from './reducers/gameState';
import { setMainPlayer } from './reducers/mainPlayer';


export const initializeSocket = () => {
  const allBikes = store.getState().players;

  console.log("INITIAL STATE (IN INITIALIZE SOCKET)", store.getState().players);

  socket.on('connect', () => {
    console.log('You\'ve made a persistent two-way connection to the server!');
    localStorage.setItem('mySocketId', socket.id);
  });

  socket.on('addUser', (newUser, newUserIndex) => {
    console.log("NEW USER", newUser);
      store.dispatch(setPlayerId(newUser.id, newUserIndex));
      if (store.getState().players.filter(player => player.id).length === 2) {
        store.dispatch(startGame());
      }
      if (newUser.id === localStorage.getItem('mySocketId')){
        store.dispatch(setMainPlayer(allBikes[newUserIndex]));
      }
  });

  socket.emit('getOthers');
  socket.on('getOthersCallback', users => {
    console.log('Checking to see if anyone is here', users);
    for (let i = 0; i < users.length; i++) {
      store.dispatch(setPlayerId(users[i].id, i));
    }
    if (store.getState().players.filter(player => player.id).length === 2) {
      store.dispatch(startGame());
    }
  });

  socket.on('sendTurn', playerData => {
    console.log('Player data going to front end', playerData);
    const targetPlayer = store.getState().players.find(player => player.id === playerData.id);
    console.log("TARGET PLAYER", store.getState().players);
    // NEED TO ADD UP HERE
    store.dispatch(updatePlayer(playerData.velocity, targetPlayer));
  });
};

export default socket;
