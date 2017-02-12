import world, { speed } from './world';
import { rotate } from './gamePlayFunctions'
import math from 'mathjs';
import { wallToSolid } from './wallToSolid';

let v, vArr, upArr, camx, camy, camz, cross, vx, vy, vz, newUpx, newUpy, newUpz, newVel, rx, ry, rz, Vcross, Rcross, R, orthogPI, wallToAdd, u, velocity, up2


export const left = (player) => {
  wallToSolid(player)
  v = player.ball.native._physijs.linearVelocity
  up2 = player.ball.native.up
  Vcross = math.cross([up2.x,up2.y,up2.z],[v.x,v.y,v.z])
  newVel = {x: Vcross[0], y: Vcross[1], z: Vcross[2]}
  player.ball.setLinearVelocity(newVel);
  player.ball.native._physijs.linearVelocity.set(newVel.x, newVel.y, newVel.z);
  player.ball.native.up.set(up2.x, up2.y, up2.z);
  rotate(player)
};

export const right = (player) => {
  wallToSolid(player)
  v = player.ball.native._physijs.linearVelocity
  up2 = player.ball.native.up
  Vcross = math.cross([up2.x,up2.y,up2.z],[v.x,v.y,v.z])
  newVel = {x: -Vcross[0], y: -Vcross[1], z: -Vcross[2]}
  player.ball.setLinearVelocity(newVel);
  player.ball.native._physijs.linearVelocity.set(newVel.x, newVel.y, newVel.z);
  player.ball.native.up.set(up2.x, up2.y, up2.z);
  rotate(player)
};

export const up = (player) => {
  wallToSolid(player)
  v = player.ball.native._physijs.linearVelocity
  up2 = player.ball.native.up
  vx = speed*up2.x
  vy = speed*up2.y
  vz = speed*up2.z
  newUpx = -v.x/speed
  newUpy = -v.y/speed
  newUpz = -v.z/speed
  player.ball.native.up.set(newUpx,newUpy,newUpz);
  player.ball.setLinearVelocity({x: vx, y: vy, z: vz});
  player.ball.native._physijs.linearVelocity.set(vx, vy, vz);
  player.ball.native.up.set(up2.x, up2.y, up2.z);
  rotate(player);
};

export const down = (player) => {
  wallToSolid(player)
  v = player.ball.native._physijs.linearVelocity
  up2 = player.ball.native.up
  vx = -speed*up2.x
  vy = -speed*up2.y
  vz = -speed*up2.z
  newUpx = v.x/speed
  newUpy = v.y/speed
  newUpz = v.z/speed
  player.ball.native.up.set(newUpx,newUpy,newUpz);
  player.ball.setLinearVelocity({x: vx, y: vy, z: vz});
  player.ball.native._physijs.linearVelocity.set(vx, vy, vz);
  player.ball.native.up.set(up2.x, up2.y, up2.z);
  rotate(player);
};
