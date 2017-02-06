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

		setInterval(() => this.state.timer++, 1);
		// const myPlayer = this.props.players.filter(player => {
		// 	return player.id === localStorage.getItem('mySocketId');
		// });
		console.log("MY PLAYER", this.props.mainPlayer);
		let player = this.props.mainPlayer;
		if (player) {
			player.ball.add(world.camera);

			const validKeys = [37, 39, 38, 40];
			document.addEventListener('keydown', (event) => {

				if (validKeys.includes(event.keyCode)) {
					store.dispatch(turnPlayer(event.keyCode));
				}
				world.camera.native.up.set(
					player.ball.native.up.x,
					player.ball.native.up.y,
					player.ball.native.up.z
				)

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

	const mapStateToProps = ({ mainPlayer }) => ({ mainPlayer });

	// const mapDispatchToProps = (dispatch) => {
	// 	return {
	// 		updatePlayer: (linearVelocity, player) => dispatch(updatePlayer(linearVelocity, player))
	// 	}
	// }

	export default connect( mapStateToProps )(Game);
