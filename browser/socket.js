import listeners from './game/listeners';
const socket = io('/');

import store from './store';
import { setPlayerId, updatePlayer } from './reducers/players';
import { startGame } from './reducers/gameState';
import { setMainPlayer } from './reducers/mainPlayer';
import { left, right, up, down } from './game/turnFunctions';
import world, { speed } from './game/world';

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
      let camx, camy, camz
      if(Math.abs(world.camera.native.up.x)===1) {
        camx = world.camera.native.up.x*5
      }
      if(Math.abs(world.camera.native.up.y)===1) {
        camy = world.camera.native.up.y*5
      }
      if(Math.abs(world.camera.native.up.z)===1) {
        camz = world.camera.native.up.z*5
      }
      if(Math.abs(targetPlayer.ball.native._physijs.linearVelocity
      .x)===speed){
        camx = -targetPlayer.ball.native._physijs.linearVelocity.x
      }
      if(Math.abs(targetPlayer.ball.native._physijs.linearVelocity
      .y)===speed){
        camy = -targetPlayer.ball.native._physijs.linearVelocity.y
      }
      if(Math.abs(targetPlayer.ball.native._physijs.linearVelocity
      .z)===speed){
        camz = -targetPlayer.ball.native._physijs.linearVelocity.z
      }
      world.camera.native.position.set(camx||0,camy||0,camz||0)
      world.camera.native.up.set(
      	targetPlayer.ball.native.up.x,
      	targetPlayer.ball.native.up.y,
      	targetPlayer.ball.native.up.z
      )

    }
    // // NEED TO ADD UP HERE
    // store.dispatch(updatePlayer(playerData.velocity, playerData.up, targetPlayer));
  });
};

export default socket;
