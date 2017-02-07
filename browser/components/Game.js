import React, { Component } from 'react';
import math from 'mathjs';
import world, { speed } from '../game/world';
import { rotate } from '../game/gamePlayFunctions';
// import { player } from '../game/player';
/* eslint semi: 0 */
/* eslint space-infix-ops: 0 */
/* eslint comma-spacing: 0 */
import { updatePlayer } from '../reducers/players';
import { turnPlayer } from '../reducers/mainPlayer';
import store from '../store';
import socket from '../socket';

console.log("SOCKET ID LOCAL STORAGE (IN THE FRONT END)", localStorage.getItem('mySocketId'));

class Game extends Component {
	constructor(props) {
		super(props);
		this.state = {timer: 0};
	}

	render(){
		console.log("FRONT END GAME", this.props.players);
		setInterval(() => this.state.timer++, 1);
		// const myPlayer = this.props.players.filter(player => {
		// 	return player.id === localStorage.getItem('mySocketId');
		// });
		// console.log("MY PLAYER", this.props.mainPlayer);
		// let player = myPlayer[0];
		if (this.props.mainPlayer) {
			const player = this.props.mainPlayer;
			console.log("PLAYER DSJHKLSF KLSDHF", player);
			player.ball.add(world.camera);

			document.addEventListener('keydown', (event) => {
				// let camx, camy, camz
				const validKeys = [37, 39, 38, 40];
				if (validKeys.includes(event.keyCode)) {
					store.dispatch(turnPlayer(event.keyCode))

						// world.camera.native.up.set(
						// 	player.ball.native.up.x,
						// 	player.ball.native.up.y,
						// 	player.ball.native.up.z
						// )

					// .then(() => {
					// 	if(Math.abs(world.camera.native.up.x)===1) {
					// 		camx = world.camera.native.up.x*5
					// 	}
					// 	if(Math.abs(world.camera.native.up.y)===1) {
					// 		camy = world.camera.native.up.y*5
					// 	}
					// 	if(Math.abs(world.camera.native.up.z)===1) {
					// 		camz = world.camera.native.up.z*5
					// 	}
					// 	if(Math.abs(player.ball.native._physijs.linearVelocity
					// 	.x)===speed){
					// 		camx = -player.ball.native._physijs.linearVelocity.x
					// 	}
					// 	if(Math.abs(player.ball.native._physijs.linearVelocity
					// 	.y)===speed){
					// 		camy = -player.ball.native._physijs.linearVelocity.y
					// 	}
					// 	if(Math.abs(player.ball.native._physijs.linearVelocity
					// 	.z)===speed){
					// 		camz = -player.ball.native._physijs.linearVelocity.z
					// 	}
					// 	console.log("cam vs", camx, camy, camz)
					// 	world.camera.native.position.set(camx||0,camy||0,camz||0)
					// 	console.log("final camera pos", world.camera.native.position)
					// })
				}

				// world.camera.native.up.set(
				// 	player.ball.native.up.x,
				// 	player.ball.native.up.y,
				// 	player.ball.native.up.z
				// )

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
			// player.ball.add(world.camera)

			//starting the world

			world.start()
			world.setControls(new WHS.OrbitControls())

		}
		return null;
	}
}

	////////////////// CONNECTOR ////////////////////

	import { connect } from 'react-redux';

	const mapStateToProps = ({ mainPlayer, players }) => ({ mainPlayer, players });

	// const mapDispatchToProps = (dispatch) => {
	// 	return {
	// 		updatePlayer: (linearVelocity, player) => dispatch(updatePlayer(linearVelocity, player))
	// 	}
	// }

	export default connect( mapStateToProps )(Game);
