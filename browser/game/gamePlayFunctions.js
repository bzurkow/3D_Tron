import world, { speed } from './world';
import store from '../store';
import { scalarInitialPosition } from './players';
import { onDeath } from '../reducers/players';
import { setMainPlayer, onDeathMainPlayer } from '../reducers/mainPlayer';
//rotate function
export const rotate = (user) => {
	let ups, vs
	ups = user.ball.native.up
	vs = user.ball.native._physijs.linearVelocity
	// console.log([ups.x, ups.y, ups.z])
	// console.log([vs.x, vs.y, vs.z])
	if(ups.x === 1){
		if(vs.y === speed){
			user.ball.native.rotation.set(-Math.PI/2,0,-Math.PI/2)
		}
		if(vs.y === -speed){
			user.ball.native.rotation.set(Math.PI/2,0,-Math.PI/2)
		}
		if(vs.z === speed){
			user.ball.native.rotation.set(0,0,-Math.PI/2)
		}
		if(vs.z === -speed){
			user.ball.native.rotation.set(Math.PI,0,-Math.PI/2)
		}
	}
	if(ups.x === -1){
		if(vs.y === speed){
			user.ball.native.rotation.set(-Math.PI/2,0,Math.PI/2)
		}
		if(vs.y === -speed){
			user.ball.native.rotation.set(Math.PI/2,0,Math.PI/2)
		}
		if(vs.z === speed){
			user.ball.native.rotation.set(0,0,Math.PI/2)
		}
		if(vs.z === -speed){
			user.ball.native.rotation.set(Math.PI,0,Math.PI/2)
		}
	}
	if(ups.y === 1){
		if(vs.x === speed){
			user.ball.native.rotation.set(0,Math.PI/2,0)
		}
		if(vs.x === -speed){
			user.ball.native.rotation.set(0,-Math.PI/2,0)
		}
		if(vs.z === speed){
			user.ball.native.rotation.set(0, 0, 0)
		}
		if(vs.z === -speed){
			user.ball.native.rotation.set(0, Math.PI, 0)
		}
	}
	if(ups.y === -1){
		if(vs.x === speed){
			user.ball.native.rotation.set(-Math.PI/2, Math.PI/2, -Math.PI/2)
		}
		if(vs.x === -speed){
			user.ball.native.rotation.set(Math.PI/2, -Math.PI/2, -Math.PI/2)
		}
		if(vs.z === speed){
			user.ball.native.rotation.set(Math.PI,Math.PI,0)
		}
		if(vs.z === -speed){
			user.ball.native.rotation.set(Math.PI,0,0)
		}
	}
	if(ups.z === 1){
		if(vs.x === speed){
			user.ball.native.rotation.set(Math.PI,Math.PI/2,-Math.PI/2)
		}
		if(vs.x === -speed){
			user.ball.native.rotation.set(Math.PI/2,-Math.PI/2,0)
		}
		if(vs.y === speed){
			user.ball.native.rotation.set(Math.PI/2,Math.PI,0)
		}
		if(vs.y === -speed){
			user.ball.native.rotation.set(Math.PI/2,0,0)
		}
	}
	if(ups.z === -1){
		if(vs.x === speed){
			user.ball.native.rotation.set(-Math.PI/2,Math.PI/2,0)
		}
		if(vs.x === -speed){
			user.ball.native.rotation.set(-Math.PI/2,-Math.PI/2,0)
		}
		if(vs.y === speed){
			user.ball.native.rotation.set(-Math.PI/2,0,0)
		}
		if(vs.y === -speed){
			user.ball.native.rotation.set(-Math.PI/2,Math.PI,0)
		}
	}
	user.bike.native.rotation.set(
		user.ball.native.rotation.x,
		user.ball.native.rotation.y,
		user.ball.native.rotation.z
	)
	user.bike.position.set(
		user.ball.native.up.x*(-3),
		user.ball.native.up.y*(-3),
		user.ball.native.up.z*(-3)
	)
	return user
};

export const collisionHandler = player => {
  const me = store.getState().mainPlayer;
  world.scene.remove(player.ball.native);
  world.scene.remove(player.bike.native);
  if (player.id === me.id) {
		player.ball.remove(world.camera);
		world.setControls(new WHS.OrbitControls());
    store.dispatch(onDeathMainPlayer(me));
  }

	// WHEN THIS IS USED WE GET OUR PROBLEM
  // store.dispatch(onDeath(player));
	if (player.walls.length !== 0) {
		player.walls.forEach(wall => world.scene.remove(wall.native));
	}
	if (player.wall[0]) {
		world.scene.remove(player.wall[0].native);
	}
	if (player.signature === store.getState().mainPlayer.signature){
		player.ball.remove(world.camera);
		// store.dispatch(setMainPlayer(player));
		world.setControls(new WHS.OrbitControls());
	}
};
// export const collisionHandler = player => {
// 	clearInterval(player.si)
// 	world.scene.remove(player.ball.native)
// 	world.scene.remove(player.bike.native)
// 	console.log("HEHREHREHRHERHERHERHERHE");
// 	if(player.id !== store.getState().mainPlayer.id) store.dispatch(onDeath(player))
// }

export const cameraSet = (player) => {
	let velocityVector = player.ball.native._physijs.linearVelocity
	let upVector = player.ball.native.up
	let camx, camy, camz
	if(Math.abs(upVector.x)===1) {camx = upVector.x*8}
	if(Math.abs(upVector.y)===1) {camy = upVector.y*8}
	if(Math.abs(upVector.z)===1) {camz = upVector.z*8}
	if(Math.abs(velocityVector.x)===speed){camx = -velocityVector.x/Math.abs(velocityVector.x)*20}
	if(Math.abs(velocityVector.y)===speed){camy = -velocityVector.y/Math.abs(velocityVector.y)*20}
	if(Math.abs(velocityVector.z)===speed){camz = -velocityVector.z/Math.abs(velocityVector.z)*20}
	world.camera.native.position.set(camx||0,camy||0,camz||0)
	world.camera.native.up.set(
		upVector.x,
		upVector.y,
		upVector.z
	)
	 world.camera.lookAt(new THREE.Vector3(
	 	upVector.x*6+velocityVector.x*3,
	 	upVector.y*6+velocityVector.y*3,
	 	upVector.z*6+velocityVector.z*3))
}

export const cameraSetOnStart = (player) => {
	let velocityVector = player.ball.native._physijs.linearVelocity
	let upVector = player.ball.native.up
	let camx, camy, camz
	world.camera.native.position.set(
	  (player.ball.position.x / scalarInitialPosition) * (20) + upVector.x * 8,
	  (player.ball.position.y / scalarInitialPosition) * (20) + upVector.y * 8,
	  (player.ball.position.z / scalarInitialPosition) * (20) + upVector.z * 8
	);
	 world.camera.lookAt(new THREE.Vector3(
	 	upVector.x*6-(player.ball.position.x/scalarInitialPosition)*speed*3,
	 	upVector.y*6-(player.ball.position.y/scalarInitialPosition)*speed*3,
	 	upVector.z*6-(player.ball.position.z/scalarInitialPosition)*speed*3))
}
