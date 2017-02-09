import world, { speed } from './world';
import store from '../store';

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
	clearInterval(player.si)
	world.scene.remove(player.ball.native)
	world.scene.remove(player.bike.native)
	if(player.walls.length !== 0) {
		player.walls.forEach(wall => world.scene.remove(wall.native))
	}
	if(!!player.wall[0]) {
		world.scene.remove(player.wall[0].native)
	}
	if(player.signature===store.getState().mainPlayer.signature){
		player.ball.remove(world.camera)
	}
}

export const cameraSet = (player) => {
	let velocityVector = player.ball.native._physijs.linearVelocity
	let upVector = player.ball.native.up
	let camx, camy, camz
	if(Math.abs(upVector.x)===1) {camx = upVector.x*5}
	if(Math.abs(upVector.y)===1) {camy = upVector.y*5}
	if(Math.abs(upVector.z)===1) {camz = upVector.z*5}
	if(Math.abs(velocityVector.x)===speed){camx = -velocityVector.x}
	if(Math.abs(velocityVector.y)===speed){camy = -velocityVector.y}
	if(Math.abs(velocityVector.z)===speed){camz = -velocityVector.z}
	world.camera.native.position.set(camx||0,camy||0,camz||0)
	world.camera.native.up.set(
		upVector.x,
		upVector.y,
		upVector.z
	)
}
