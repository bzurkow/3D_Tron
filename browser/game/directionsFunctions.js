import world, { speed } from './world';
import store from '../store';
import socket from '../socket';

// const me = store.getState().mainPlayer;

const turnLeft = (player) => {
  socket.emit('directionChange', {
    id: player.id,
    turn: 'left'
  });
};

const turnRight = (player) => {
  socket.emit('directionChange', {
    id: player.id,
    turn: 'right'
  });
};

const turnUp = (player) => {
  socket.emit('directionChange', {
    id: player.id,
    turn: 'up'
  });
};

const turnDown = (player) => {
  socket.emit('directionChange', {
    id: player.id,
    turn: 'down'
  });
};

export const turnPlayer = (direction, me) => {
  if (direction === 37 || direction === 65) turnLeft(me);
  if (direction === 39 || direction === 68) turnRight(me);
  if (direction === 38 || direction === 87) turnUp(me);
  if (direction === 40 || direction === 83) turnDown(me);
};
