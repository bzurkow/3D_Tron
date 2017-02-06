import React, { Component } from 'react';
import math from 'mathjs';
import world, { speed } from '../game/world';
import { rotate } from '../game/gamePlayFunctions';
// import { player } from '../game/player';

/* eslint semi: 0 */
/* eslint space-infix-ops: 0 */
/* eslint comma-spacing: 0 */
import store from '../store';
import socket from '../socket';

console.log("SOCKET ID LOCAL STORAGE (IN THE FRONT END)", localStorage.getItem('mySocketId'));
console.log("PLAYERS FRONT END", store.getState().players);

// import { updatePlayer } from '../reducers/players';
import { turnPlayer } from '../reducers/mainPlayer';

class Game extends Component {
	constructor(props) {
		super(props);
		this.state = {timer: 0};
	}

	render(){

		setInterval(() => this.state.timer++, 1);
		const myPlayer = this.props.players.filter(player => {
			return player.id === localStorage.getItem('mySocketId');
		});
		console.log("MY PLAYER", myPlayer);
		let player = myPlayer[0];
		if (player){
			player.ball.add(world.camera);
			document.addEventListener('keydown', (event) => {
				//cross product takes us left, neg cross right
				let v, up, vArr, upArr, camx, camy, camz, cross, vx, vy, vz, newUpx, newUpy, newUpz, newVel, rx, ry, rz, Vcross, Rcross, R, orthogPI, wallToAdd, u, velocity
				wallToAdd = player.wall[0]
				player.wall = []
				player.walls.push(wallToAdd)

				//left
				if (event.keyCode===37){
					v = player.ball.native._physijs.linearVelocity
					up = player.ball.native.up
					Vcross = math.cross([up.x,up.y,up.z],[v.x,v.y,v.z])
					newVel = {x: Vcross[0], y: Vcross[1], z: Vcross[2]}
					// player.ball.setLinearVelocity(newVel)
					// player.ball.native._physijs.linearVelocity.set(newVel.x, newVel.y, newVel.z)
					//
					//
					R = player.ball.native.rotation
					if (Math.abs(Vcross[0])===speed) camx = -newVel.x
					if (Math.abs(Vcross[1])===speed) camy = -newVel.y
					if (Math.abs(Vcross[2])===speed) camz = -newVel.z
					if (Math.abs(up.x) === 1) camx=5*up.x
					if (Math.abs(up.y) === 1) camy=5*up.y
					if (Math.abs(up.z) === 1) camz=5*up.z
					world.camera.native.position.set(camx||0,camy||0,camz||0)
					rotate(player)
					socket.emit('directionChange', {id: player.id, velocity: newVel});
					store.dispatch(updatePlayer(newVel, player));
				}
				//right
				if (event.keyCode===39){
					v = player.ball.native._physijs.linearVelocity
					up = player.ball.native.up
					Vcross = math.cross([up.x,up.y,up.z],[v.x,v.y,v.z])
					newVel = {x: -Vcross[0], y: -Vcross[1], z: -Vcross[2]}
					// player.ball.setLinearVelocity(newVel)
					// player.ball.native._physijs.linearVelocity.set(newVel.x, newVel.y, newVel.z)
					//
					//
					player.bike.native.rotation.set(
						player.ball.native.rotation.x,
						player.ball.native.rotation.y,
						player.ball.native.rotation.z
					)
					// console.log(player.bike.native.rotation)
					if (Math.abs(Vcross[0])===speed) camx = -newVel.x
					if (Math.abs(Vcross[1])===speed) camy = -newVel.y
					if (Math.abs(Vcross[2])===speed) camz = -newVel.z
					if (Math.abs(up.x) === 1) camx=5*up.x
					if (Math.abs(up.y) === 1) camy=5*up.y
					if (Math.abs(up.z) === 1) camz=5*up.z
					world.camera.native.position.set(camx||0,camy||0,camz||0)
					rotate(player)
					socket.emit('directionChange', {id: player.id, velocity: newVel});
					store.dispatch(updatePlayer(newVel, player));
				}

				//up
				if (event.keyCode===38){
					v = player.ball.native._physijs.linearVelocity
					up = player.ball.native.up
					vx = speed*up.x
					vy = speed*up.y
					vz = speed*up.z
					newUpx = -v.x/speed
					newUpy = -v.y/speed
					newUpz = -v.z/speed
					// player.ball.setLinearVelocity({x: vx, y: vy, z: vz})
					// player.ball.native._physijs.linearVelocity.set(vx, vy, vz)
					//
					//
					if (Math.abs(vx)===speed) camx = -vx
					if (Math.abs(vy)===speed) camy = -vy
					if (Math.abs(vz)===speed) camz = -vz
					if (Math.abs(newUpx) === 1) camx = 5*newUpx
					if (Math.abs(newUpy) === 1) camy = 5*newUpy
					if (Math.abs(newUpz) === 1) camz = 5*newUpz
					world.camera.native.position.set(camx||0,camy||0,camz||0)
					player.ball.native.up.set(newUpx,newUpy,newUpz)
					rotate(player)
					socket.emit('directionChange', {id: player.id, velocity: {x: vx, y: vy, z: vz}});
					// store.dispatch(updatePlayer({x: vx, y: vy, z: vz}, player));
					store.dispatch(turnPlayer(event.keyCode))
				}

				//down
				if (event.keyCode===40){
					v = player.ball.native._physijs.linearVelocity
					up = player.ball.native.up
					vx = -(speed)*up.x
					vy = -(speed)*up.y
					vz = -(speed)*up.z
					newUpx = v.x/speed
					newUpy = v.y/speed
					newUpz = v.z/speed
					if (Math.abs(vx)===speed) camx = -vx
					if (Math.abs(vy)===speed) camy = -vy
					if (Math.abs(vz)===speed) camz = -vz
					if (Math.abs(newUpx) === 1) camx = 5*newUpx
					if (Math.abs(newUpy) === 1) camy = 5*newUpy
					if (Math.abs(newUpz) === 1) camz = 5*newUpz
					// player.ball.setLinearVelocity({x: vx, y: vy, z: vz})
					// player.ball.native._physijs.linearVelocity.set(vx, vy, vz)
					//
					//
					player.ball.native.up.set(newUpx,newUpy,newUpz)
					world.camera.native.position.set(camx||0,camy||0,camz||0)
					rotate(player)
					socket.emit('directionChange', {id: player.id, velocity: {x: vx, y: vy, z: vz}});
					store.dispatch(updatePlayer({x: vx, y: vy, z: vz}, player));
				}

				// socket.emit('directionChange', {id: player.id, velocity: newVel});
				// store.dispatch(updatePlayer(newVel, player));
			})

			//Below we are setting the camera for each player based on starting position. Need to set both the position of the camera (which is relative to the player and pointing towards the player) and the 'up' vector which determines where the "sky" is and enables are controls to work.

			world.camera.native.position.set(
				(player.ball.position.x/495)*speed + player.ball.native.up.x*5,
				(player.ball.position.y/495)*speed + player.ball.native.up.y*5,
				(player.ball.position.z/495)*speed + player.ball.native.up.z*5
			)

			world.camera.native.up.set(
				player.ball.native.up.x,
				player.ball.native.up.y,
				player.ball.native.up.z
			)

			//setting the camera to the ball
			player.ball.add(world.camera)

			//starting the world

			world.start()
			world.setControls(new WHS.OrbitControls())

		}
		return null;
	}
}

	////////////////// CONNECTOR ////////////////////

	import { connect } from 'react-redux';

	const mapStateToProps = ({players}) => ({ players });

	// const mapDispatchToProps = (dispatch) => {
	// 	return {
	// 		updatePlayer: (linearVelocity, player) => dispatch(updatePlayer(linearVelocity, player))
	// 	}
	// }

	export default connect( mapStateToProps )(Game);
