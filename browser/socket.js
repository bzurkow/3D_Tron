import listeners from './game/listeners';
const socket = io('/');

import store from './store';
import { setPlayerId, updatePlayer } from './reducers/players';
import { startGame } from './reducers/gameState';
import { setMainPlayer } from './reducers/mainPlayer';
import { left, right, up, down } from './game/turnFunctions';
import world, { speed } from './game/world';
import { cameraSet, collisionHandler } from './game/gamePlayFunctions'

export const initializeSocket = () => {
  const allBikes = store.getState().players;

  console.log("INITIAL STATE (IN INITIALIZE SOCKET)", store.getState().players);

  socket.on('connect', () => {
    console.log('You\'ve made a persistent two-way connection to the server!');
    localStorage.setItem('mySocketId', socket.id);
  });



  socket.on('addUser', (allUsers) => {
    console.log("ALL USERS", allUsers);
      store.dispatch(setPlayerId(allUsers));
      // if (store.getState().players.filter(player => player.id).length >= 1) {
      //   store.dispatch(startGame());
      // }
      const myUser = allUsers.find(user => user.id === localStorage.getItem('mySocketId'));
      const myBike = allBikes.find(bike => bike.id === myUser.id);
      store.dispatch(setMainPlayer(myBike));
  });

  socket.on('startGame', () => {
    console.log("SHOULD START GAME HERE");
    store.dispatch(startGame());
  });

  socket.on('sendTurn', playerData => {
    console.log('Player data going to front end', playerData);
    const targetPlayer = store.getState().players.find(player => player.id === playerData.id);
    console.log("TARGET PLAYER", targetPlayer);
    console.log("Turn Type", playerData.turn)
    // targetPlayer.walls.push(targetPlayer.wall[0])
    // targetPlayer.wall=[]

    if(playerData.turn === 'left'){
      left(targetPlayer)
    }
    if(playerData.turn === 'right'){
      right(targetPlayer)
    }
    if(playerData.turn === 'up'){
      up(targetPlayer)
    }
    if(playerData.turn === 'down'){
      down(targetPlayer)
    }
    if(targetPlayer.id===store.getState().mainPlayer.id){
      cameraSet(targetPlayer)
    }
    
    socket.on('ball-collision-to-handle', playerData => {
      const playerToRemove = store.getState().players.find(player => player.signature===playerData.signature)
      collisionHandler(playerToRemove)
    })

  });
};

export default socket;
