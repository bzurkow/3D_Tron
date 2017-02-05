import React, { Component } from 'react';
import math from 'mathjs';
import world, { q } from '../game/world';
// import { player } from '../game/player';

import store from '../store';
import socket from '../socket';

console.log("SOCKET ID LOCAL STORAGE (IN THE FRONT END)", localStorage.getItem('mySocketId'));
console.log("PLAYERS FRONT END", store.getState().players);

import { updatePlayer } from '../reducers/players';

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
		  if(this.state.timer>1){
		  	console.log(this.state.timer)
		  // event.preventDefault()
		  // event.stopPropagation()
		  //cross product takes us left, neg cross right
		    let v, up, vArr, upArr, camx, camy, camz, cross, vx, vy, vz, newUpx, newUpy, newUpz
		   //left
		  if(event.keyCode===37){

		    v = player.ball.native._physijs.linearVelocity
		    up = world.camera.native.up
		    vArr = [v.x,v.y,v.z]
		    upArr = [up.x,up.y,up.z]
		    cross = math.cross(upArr,vArr)
				socket.emit('directionChange', {id: player.id, velocity: {x: cross[0], y: cross[1], z: cross[2]}});
		    store.dispatch(updatePlayer({x: cross[0], y: cross[1], z: cross[2]}, player));
		    if(cross[0]*cross[0]===q*q) camx = -cross[0]
		    if(cross[1]*cross[1]===q*q) camy = -cross[1]
		    if(cross[2]*cross[2]===q*q) camz = -cross[2]
		    if(up.x*up.x === 1) camx=5*up.x
		    if(up.y*up.y === 1) camy=5*up.y
		    if(up.z*up.z === 1) camz=5*up.z
		    world.camera.native.position.set(camx||0,camy||0,camz||0)
		  }
		  //right
		  if(event.keyCode===39){
		    v = player.ball.native._physijs.linearVelocity
		    up = world.camera.native.up
		    vArr = [v.x,v.y,v.z]
		    upArr = [up.x,up.y,up.z]
		    cross = math.cross(upArr,vArr)
		    // player.ball.setLinearVelocity({x: -cross[0], y: -cross[1], z: -cross[2]})
				socket.emit('directionChange', {id: player.id, velocity: {x: -cross[0], y: -cross[1], z: -cross[2]}});
				store.dispatch(updatePlayer({x: -cross[0], y: -cross[1], z: -cross[2]}, player));
		    if(cross[0]*cross[0]===q*q) camx = cross[0]
		    if(cross[1]*cross[1]===q*q) camy = cross[1]
		    if(cross[2]*cross[2]===q*q) camz = cross[2]
		    if(up.x*up.x === 1) camx=5*up.x
		    if(up.y*up.y === 1) camy=5*up.y
		    if(up.z*up.z === 1) camz=5*up.z
		    world.camera.native.position.set(camx||0,camy||0,camz||0)
		  }
		  //up just once
			console.log(event)
		  if(event.keyCode===38){
		    v = player.ball.native._physijs.linearVelocity
		    up = world.camera.native.up
				vx = q*up.x
		    vy = q*up.y
		    vz = q*up.z
		    newUpx = -v.x/q
		    newUpy = -v.y/q
		    newUpz = -v.z/q
		    // player.ball.setLinearVelocity({x: vx, y: vy, z: vz})
				socket.emit('directionChange', {id: player.id, velocity: {x: vx, y: vy, z: vz}});
				store.dispatch(updatePlayer({x: vx, y: vy, z: vz}, player));
		    if(vx*vx===q*q) camx = -vx
		    if(vy*vy===q*q) camy = -vy
		    if(vz*vz===q*q) camz = -vz
		    if(newUpx*newUpx === 1) camx = 5*newUpx
		    if(newUpy*newUpy === 1) camy = 5*newUpy
		    if(newUpz*newUpz === 1) camz = 5*newUpz
		    world.camera.native.position.set(camx||0,camy||0,camz||0)
		    world.camera.native.up.set(newUpx,newUpy,newUpz)
		  }
		  //down
		  if(event.keyCode===40){
		    v = player.ball.native._physijs.linearVelocity
		    up = world.camera.native.up
		    vx = -q*up.x
		    vy = -q*up.y
		    vz = -q*up.z
		    newUpx = v.x/q
		    newUpy = v.y/q
		    newUpz = v.z/q
				// player.ball.setLinearVelocity({x: vx, y: vy, z: vz})
				socket.emit('directionChange', {id: player.id, velocity: {x: vx, y: vy, z: vz}});
				store.dispatch(updatePlayer({x: vx, y: vy, z: vz}, player));
		    if(vx*vx===q*q) camx = -vx
		    if(vy*vy===q*q) camy = -vy
		    if(vz*vz===q*q) camz = -vz
		    if(newUpx*newUpx === 1) camx = 5*newUpx
		    if(newUpy*newUpy === 1) camy = 5*newUpy
		    if(newUpz*newUpz === 1) camz = 5*newUpz
		    world.camera.native.position.set(camx||0,camy||0,camz||0)
		    world.camera.native.up.set(newUpx,newUpy,newUpz)
		  }
		  this.setState({timer: 0});
		}
	});

		//player ? player.ball.add(world.camera) : null
		// socket.emit('worldLoad');
		world.start();
		world.setControls(new WHS.OrbitControls());
}
		return (
			<div onKeyDown = {(event) => console.log("Peaches are good")}>
			</div>
		)
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

// import React, { Component } from 'react';
// import math from 'mathjs';
// import world, { q } from '../game/world';
// // import { player } from '../game/player';
//
// import store from '../store';
// import socket from '../socket';
//
// console.log("SOCKET ID LOCAL STORAGE (IN THE FRONT END)", localStorage.getItem('mySocketId'));
// console.log("PLAYERS FRONT END", store.getState().players);
//
//
// // const Game = ({ gameState }) => {
// //
// // }
//
//
// export default class Game extends Component {
// 	constructor(props) {
// 		super(props);
// 	}
//
//
// 	render(){
// 		const myPlayer = this.props.players.filter(player => {
// 			return player.id === localStorage.getItem('mySocketId');
// 		});
// 		console.log("MY PLAYER", myPlayer);
// 		let player = myPlayer[0];
// 		if (player) player.ball.add(world.camera);
//     // if (player) player.ball.addTo(world);
// 		console.log("IN THE GAME", this.props.players[0].id);
//
// 		document.addEventListener('keydown', (event) => {
// 		  //cross product takes us left, neg cross right
// 		    let v, up, vArr, upArr, camx, camy, camz, cross, vx, vy, vz, newUpx, newUpy, newUpz
// 		   //left
// 		  if(event.keyCode===37){
// 		    v = player.ball.native._physijs.linearVelocity
// 		    up = world.camera.native.up
// 		    vArr = [v.x,v.y,v.z]
// 		    upArr = [up.x,up.y,up.z]
// 		    cross = math.cross(upArr,vArr)
// 		    player.ball.setLinearVelocity({x: cross[0], y: cross[1], z: cross[2]})
// 		    if(cross[0]*cross[0]===q*q) camx = -cross[0]
// 		    if(cross[1]*cross[1]===q*q) camy = -cross[1]
// 		    if(cross[2]*cross[2]===q*q) camz = -cross[2]
// 		    if(up.x*up.x === 1) camx=5*up.x
// 		    if(up.y*up.y === 1) camy=5*up.y
// 		    if(up.z*up.z === 1) camz=5*up.z
// 		    world.camera.native.position.set(camx||0,camy||0,camz||0)
// 		  }
// 		  //right
// 		  if(event.keyCode===39){
// 		    v = player.ball.native._physijs.linearVelocity
// 		    up = world.camera.native.up
// 		    vArr = [v.x,v.y,v.z]
// 		    upArr = [up.x,up.y,up.z]
// 		    cross = math.cross(upArr,vArr)
// 		    player.ball.setLinearVelocity({x: -cross[0], y: -cross[1], z: -cross[2]})
// 		    if(cross[0]*cross[0]===q*q) camx = cross[0]
// 		    if(cross[1]*cross[1]===q*q) camy = cross[1]
// 		    if(cross[2]*cross[2]===q*q) camz = cross[2]
// 		    if(up.x*up.x === 1) camx=5*up.x
// 		    if(up.y*up.y === 1) camy=5*up.y
// 		    if(up.z*up.z === 1) camz=5*up.z
// 		    world.camera.native.position.set(camx||0,camy||0,camz||0)
// 		  }
// 		  //up just once
// 			console.log(event)
// 		  if(event.keyCode===38){
// 		    v = player.ball.native._physijs.linearVelocity
// 		    up = world.camera.native.up
// 				vx = q*up.x
// 		    vy = q*up.y
// 		    vz = q*up.z
// 				console.log('hit', Date())
// 		    newUpx = -v.x/q
// 		    newUpy = -v.y/q
// 		    newUpz = -v.z/q
// 		    player.ball.setLinearVelocity({x: vx, y: vy, z: vz})
// 		    if(vx*vx===q*q) camx = -vx
// 		    if(vy*vy===q*q) camy = -vy
// 		    if(vz*vz===q*q) camz = -vz
// 		    if(newUpx*newUpx === 1) camx = 5*newUpx
// 		    if(newUpy*newUpy === 1) camy = 5*newUpy
// 		    if(newUpz*newUpz === 1) camz = 5*newUpz
// 		    world.camera.native.position.set(camx||0,camy||0,camz||0)
// 		    world.camera.native.up.set(newUpx,newUpy,newUpz)
// 		  }
// 		  //down
// 		  if(event.keyCode===40){
// 		    v = player.ball.native._physijs.linearVelocity
// 		    up = world.camera.native.up
// 		    vx = -q*up.x
// 		    vy = -q*up.y
// 		    vz = -q*up.z
// 		    newUpx = v.x/q
// 		    newUpy = v.y/q
// 		    newUpz = v.z/q
// 		    player.ball.setLinearVelocity({x: vx, y: vy, z: vz})
// 		    if(vx*vx===q*q) camx = -vx
// 		    if(vy*vy===q*q) camy = -vy
// 		    if(vz*vz===q*q) camz = -vz
// 		    if(newUpx*newUpx === 1) camx = 5*newUpx
// 		    if(newUpy*newUpy === 1) camy = 5*newUpy
// 		    if(newUpz*newUpz === 1) camz = 5*newUpz
// 		    world.camera.native.position.set(camx||0,camy||0,camz||0)
// 		    world.camera.native.up.set(newUpx,newUpy,newUpz)
// 		  }
// 		})
//
// 		player ? player.ball.add(world.camera) : null
// 		// socket.emit('worldLoad');
// 		world.start();
// 		world.setControls(new WHS.OrbitControls());
//
// 		return (
// 			<div onClick={(event) => console.log('eh')}>
//
// 			</div>
// 		)
// 	}
// }
