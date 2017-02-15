import store from './store';
import { setPlayerId, updatePlayer, addPlayerName, removePlayer } from './reducers/players';
import { startGame, stopGame} from './reducers/gameState';
import { setMainPlayer } from './reducers/mainPlayer';
import { receiveMessage } from './reducers/messages';
import { left, right, up, down } from './game/turnFunctions';
import world from './game/world';
import { cameraSet, collisionHandler } from './game/gamePlayFunctions';
import { declareWinner, onDeath } from './reducers/players';

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
    console.log('ALL USERS ****', allUsers);

    const myUser = allUsers.find(user => user.id === localStorage.getItem('mySocketId'));
    const myBike = allBikes.find(bike => bike.id === myUser.id);
    store.dispatch(setMainPlayer(myBike));
  });

  socket.on('addPlayerName', (socketId, playerName) => {
    console.log("ADD OTHER PLAYERS NAME", socketId, playerName);
    store.dispatch(addPlayerName(socketId, playerName));
  });

  socket.on('addNewMessage', (text, senderName) => {
    console.log("RECEIVE MESSAGE & SENDERNAME FRONTEND ***", text, senderName);
    store.dispatch(receiveMessage({text: text, name: senderName}));

  });

  socket.on('startGame', () => {
    allBikes.forEach(player => {
      console.log(player);
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
    console.log("ARE WE REMOVING PLAYER ON THE FRONT END?");
    store.dispatch(removePlayer(userId));
  });

  socket.on('endGame', () => {
    let lastStanding = store.getState().players.filter(player => player.status === 'alive')[0];
    console.log("lastStanding", lastStanding);
    store.dispatch(declareWinner(lastStanding));
    setTimeout(() => window.location.reload(true), 10000);
  });
};

export default socket;
