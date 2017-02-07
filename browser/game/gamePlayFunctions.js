import world, { speed } from './world';

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
		// world.camera.native.up.set(
		// 	user.ball.native.up.x,
		// 	user.ball.native.up.y,
		// 	user.ball.native.up.z
		// )
		return user
	};
