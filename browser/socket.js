import store from './store';
import { setPlayerId, addPlayerName, removePlayer, declareWinner } from './reducers/players';
import { startGame } from './reducers/gameState';
import { setMainPlayer } from './reducers/mainPlayer';
import { receiveMessage } from './reducers/messages';
import { left, right, up, down } from './game/turnFunctions';
import world from './game/world';
import { cameraSet, collisionHandler } from './game/gamePlayFunctions';

const socket = io('/');

export const initializeSocket = () => {
  const allBikes = store.getState().players;

  console.log("INITIAL STATE (IN INITIALIZE SOCKET)", store.getState().players);

  socket.on('connect', () => {
    console.log('You\'ve made a persistent two-way connection to the server!');
    localStorage.setItem('mySocketId', socket.id);
  });

  socket.on('addUser', (allUsers) => {
    store.dispatch(setPlayerId(allUsers));
    const myUser = allUsers.find(user => user.id === localStorage.getItem('mySocketId'));
    const myBike = allBikes.find(bike => bike.id === myUser.id);
    store.dispatch(setMainPlayer(myBike));
  });

  socket.on('addPlayerName', (socketId, playerName) => {
    store.dispatch(addPlayerName(socketId, playerName));
  });

  socket.on('addNewMessage', (text, senderName) => {
    store.dispatch(receiveMessage({text: text, name: senderName}));
  });

  socket.on('startGame', () => {
    allBikes.forEach(player => {
      if (!player.id) {
        world.scene.remove(player.ball.native);
        world.scene.remove(player.bike.native);
      }
    });
    store.dispatch(startGame());
  });

  socket.on('sendTurn', playerData => {
    const targetPlayer = store.getState().players.find(player => player.id === playerData.id);

    switch (playerData.turn) {
      case 'left':
        left(targetPlayer);
        break;
      case 'right':
        right(targetPlayer);
        break;
      case 'up':
        up(targetPlayer);
        break;
      case 'down':
        down(targetPlayer);
        break;
      default: return null;
    }

    if (targetPlayer.id === store.getState().mainPlayer.id) {
      cameraSet(targetPlayer);
    }
  });

  socket.on('ball-collision-to-handle', playerData => {
    const playerToRemove = store.getState().players.find(player => player.id === playerData.id);
    collisionHandler(playerToRemove);
  });

  socket.on('removePlayer', userId => {
    store.dispatch(removePlayer(userId));
  });

  socket.on('endGame', (lastStanding) => {
    // console.log("lastStanding", lastStanding);
    store.dispatch(declareWinner(lastStanding));
    // console.log("END GAME", store.getState().players);
    setTimeout(() => window.location.reload(true), 10000);
  });
};

export default socket;
