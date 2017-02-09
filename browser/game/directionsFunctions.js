import world, { speed } from './world';
import socket from '../socket';

const turnLeft = (player) => {
  socket.emit('directionChange', {
    id: player.id,
    turn: 'left'
  });
  return player;
};

const turnRight = (player) => {
  socket.emit('directionChange', {
    id: player.id,
    turn: 'right'
  });
  return player;
};

const turnUp = (player) => {
  socket.emit('directionChange', {
    id: player.id,
    turn: 'up'
  });
  return player;
};

const turnDown = (player) => {
  socket.emit('directionChange', {
    id: player.id,
    turn: 'down'
  });
  return player;
};

export { turnLeft, turnRight, turnUp, turnDown }
