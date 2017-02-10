import store from './store';
import { setPlayerId, updatePlayer, addPlayerName, removePlayer } from './reducers/players';
import { startGame, stopGame} from './reducers/gameState';
import { setMainPlayer } from './reducers/mainPlayer';
import { left, right, up, down } from './game/turnFunctions';
import world, { speed } from './game/world';
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

  socket.on('addPlayerName', (socketId, playerName) =>{
    console.log("ADD OTHER PLAYERS NAME", socketId, playerName);
    store.dispatch(addPlayerName(socketId, playerName));
  })

  socket.on('startGame', () => {
    allBikes.forEach(player => {
      if (!player.id){
        collisionHandler(player);
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
    const playerToRemove = store.getState().players.find(player => player.signature === playerData.signature);
    collisionHandler(playerToRemove);
  });

  socket.on('removePlayer', userId => {
    console.log("ARE WE REMOVING PLAYER ON THE FRONT END?")
    store.dispatch(removePlayer(userId));
  });

  socket.on('endGame', () => {
    // store.dispatch(stopGame());
    window.location.reload(true);
  });
};

export default socket;
