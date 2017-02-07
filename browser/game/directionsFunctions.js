import math from 'mathjs';
import world, { speed } from './world';
import { rotate } from './gamePlayFunctions';
console.log("HERERHREHREH");
import socket from '../socket';
/* eslint semi: 0 */
/* eslint space-infix-ops: 0 */
/* eslint comma-spacing: 0 */

let v, up, vArr, upArr, camx, camy, camz, cross, vx, vy, vz, newUpx, newUpy, newUpz, newVel, rx, ry, rz, Vcross, Rcross, R, orthogPI, wallToAdd, u, velocity;

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

// const turnRight = (player) => {
//   v = player.ball.native._physijs.linearVelocity
//   up = player.ball.native.up
//   Vcross = math.cross([up.x,up.y,up.z],[v.x,v.y,v.z])
//   newVel = {x: -Vcross[0], y: -Vcross[1], z: -Vcross[2]}
//   // if (Math.abs(Vcross[0])===speed) camx = -newVel.x;
//   // if (Math.abs(Vcross[1])===speed) camy = -newVel.y;
//   // if (Math.abs(Vcross[2])===speed) camz = -newVel.z;
//   // if (Math.abs(up.x) === 1) camx=5*up.x;
//   // if (Math.abs(up.y) === 1) camy=5*up.y;
//   // if (Math.abs(up.z) === 1) camz=5*up.z;
//   // world.camera.native.position.set(camx||0,camy||0,camz||0)
//   player.ball.setLinearVelocity(newVel);
//   player.ball.native._physijs.linearVelocity.set(newVel.x, newVel.y, newVel.z);
//   player.ball.native.up.set(up.x, up.y, up.z);
//   rotate(player)
//   socket.emit('directionChange', {
//     id: player.id,
//     velocity: newVel,
//     up: up
//   });
//   return player;
// };
//
// const turnUp = (player) => {
//   v = player.ball.native._physijs.linearVelocity
//   up = player.ball.native.up
//   vx = speed*up.x
//   vy = speed*up.y
//   vz = speed*up.z
//   newUpx = -v.x/speed
//   newUpy = -v.y/speed
//   newUpz = -v.z/speed
//   if (Math.abs(vx)===speed) camx = -vx
//   if (Math.abs(vy)===speed) camy = -vy
//   if (Math.abs(vz)===speed) camz = -vz
//   if (Math.abs(newUpx) === 1) camx = 5*newUpx
//   if (Math.abs(newUpy) === 1) camy = 5*newUpy
//   if (Math.abs(newUpz) === 1) camz = 5*newUpz
//   world.camera.native.position.set(camx||0,camy||0,camz||0)
//   player.ball.native.up.set(newUpx,newUpy,newUpz)
//   player.ball.setLinearVelocity({x: vx, y: vy, z: vz});
//   player.ball.native._physijs.linearVelocity.set(vx, vy, vz);
//   player.ball.native.up.set(up.x, up.y, up.z);
//   rotate(player)
//   socket.emit('directionChange', {
//     id: player.id,
//     velocity: {x: vx, y: vy, z: vz},
//     up: up
//   });
//   return player;
// };
//
// const turnDown = (player) => {
//   v = player.ball.native._physijs.linearVelocity
//   up = player.ball.native.up
//   vx = -(speed)*up.x
//   vy = -(speed)*up.y
//   vz = -(speed)*up.z
//   newUpx = v.x/speed
//   newUpy = v.y/speed
//   newUpz = v.z/speed
//   // if (Math.abs(vx)===speed) camx = -vx
//   // if (Math.abs(vy)===speed) camy = -vy
//   // if (Math.abs(vz)===speed) camz = -vz
//   // if (Math.abs(newUpx) === 1) camx = 5*newUpx
//   // if (Math.abs(newUpy) === 1) camy = 5*newUpy
//   // if (Math.abs(newUpz) === 1) camz = 5*newUpz
//   player.ball.native.up.set(newUpx,newUpy,newUpz)
//   world.camera.native.position.set(camx||0,camy||0,camz||0)
//   player.ball.setLinearVelocity({x: vx, y: vy, z: vz});
//   player.ball.native._physijs.linearVelocity.set(vx, vy, vz);
//   player.ball.native.up.set(up.x, up.y, up.z);
//   rotate(player)
//   socket.emit('directionChange', {
//     id: player.id,
//     velocity: {x: vx, y: vy, z: vz},
//     up: up
//   });
//   return player;
// };
//
export { turnLeft, turnRight, turnUp, turnDown }
