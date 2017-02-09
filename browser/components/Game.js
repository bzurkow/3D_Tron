import React, { Component } from 'react';
import { connect } from 'react-redux';
import math from 'mathjs';
import world, { speed } from '../game/world';
import { turnPlayer } from '../reducers/mainPlayer';
import store from '../store';
import socket from '../socket';

console.log("SOCKET ID LOCAL STORAGE (IN THE FRONT END)", localStorage.getItem('mySocketId'));

class Game extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		const { players } = this.props;
		world.start();
		world.setControls(new WHS.OrbitControls());
		players.forEach(player => {
			player.ball.native.addEventListener('collision', (collidedWith) => {
				socket.emit('ball-collision', {signature: player.signature, id: player.id});
			}, true);
			player.si = setInterval(player.tail, 10);
		});
	}

	render(){
		if (this.props.mainPlayer) {
			const player = this.props.mainPlayer;
			player.ball.add(world.camera);

			document.addEventListener('keydown', (event) => {
				const validKeys = [37, 39, 38, 40];
				if (validKeys.includes(event.keyCode)) {
					store.dispatch(turnPlayer(event.keyCode));
				}
			});

			//Below we are setting the camera for each player based on starting position. Need to set both the position of the camera (which is relative to the player and pointing towards the player) and the 'up' vector which determines where the "sky" is and enables are controls to work.

			world.camera.native.position.set(
				(player.ball.position.x / 495) * speed + player.ball.native.up.x * 5,
				(player.ball.position.y / 495) * speed + player.ball.native.up.y * 5,
				(player.ball.position.z / 495) * speed + player.ball.native.up.z * 5
			);

			world.camera.native.up.set(
				player.ball.native.up.x,
				player.ball.native.up.y,
				player.ball.native.up.z
			);
		}
		return null;
	}
}

////////////////// CONNECTOR ////////////////////
const mapStateToProps = ({ mainPlayer, players }) => ({ mainPlayer, players });
export default connect(mapStateToProps)(Game);
