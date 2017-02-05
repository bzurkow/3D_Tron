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
// 			document.addEventListener('keydown', (event) => {
// 				//cross product takes us left, neg cross right
// 				let v, up, vArr, upArr, camx, camy, camz, cross, vx, vy, vz, newUpx, newUpy, newUpz, newVel, rx, ry, rz, Vcross, Rcross, R, orthogPI, wallToAdd, u, velocity
// 				wallToAdd = player.wall[0]
// 				player.wall = []
// 				player.walls.push(wallToAdd)
//
// 				//left
// 				if(event.keyCode===37){
// 					v = player.ball.native._physijs.linearVelocity
// 					up = player.ball.native.up
// 					Vcross = math.cross([up.x,up.y,up.z],[v.x,v.y,v.z])
// 					newVel = {x: Vcross[0], y: Vcross[1], z: Vcross[2]}
// 					player.ball.setLinearVelocity(newVel)
// 					player.ball.native._physijs.linearVelocity.set(newVel.x, newVel.y, newVel.z)
// 					R = player.ball.native.rotation
// 					if(Math.abs(Vcross[0])===speed) camx = -newVel.x
// 					if(Math.abs(Vcross[1])===speed) camy = -newVel.y
// 					if(Math.abs(Vcross[2])===speed) camz = -newVel.z
// 					if(Math.abs(up.x) === 1) camx=5*up.x
// 					if(Math.abs(up.y) === 1) camy=5*up.y
// 					if(Math.abs(up.z) === 1) camz=5*up.z
// 					world.camera.native.position.set(camx||0,camy||0,camz||0)
// 					rotate(player)
// 				}
// 				//right
// 				if(event.keyCode===39){
// 					v = player.ball.native._physijs.linearVelocity
// 					up = player.ball.native.up
// 					Vcross = math.cross([up.x,up.y,up.z],[v.x,v.y,v.z])
// 					newVel = {x: -Vcross[0], y: -Vcross[1], z: -Vcross[2]}
// 					player.ball.setLinearVelocity(newVel)
// 					player.ball.native._physijs.linearVelocity.set(newVel.x, newVel.y, newVel.z)
// 					player.bike.native.rotation.set(
// 						player.ball.native.rotation.x,
// 						player.ball.native.rotation.y,
// 						player.ball.native.rotation.z
// 					)
// 					// console.log(player.bike.native.rotation)
// 					if(Math.abs(Vcross[0])===speed) camx = -newVel.x
// 					if(Math.abs(Vcross[1])===speed) camy = -newVel.y
// 					if(Math.abs(Vcross[2])===speed) camz = -newVel.z
// 					if(Math.abs(up.x) === 1) camx=5*up.x
// 					if(Math.abs(up.y) === 1) camy=5*up.y
// 					if(Math.abs(up.z) === 1) camz=5*up.z
// 					world.camera.native.position.set(camx||0,camy||0,camz||0)
// 					rotate(player)
// 				}
//
// 				//up
// 				if(event.keyCode===38){
// 					v = player.ball.native._physijs.linearVelocity
// 					up = player.ball.native.up
// 					vx = speed*up.x
// 					vy = speed*up.y
// 					vz = speed*up.z
// 					newUpx = -v.x/speed
// 					newUpy = -v.y/speed
// 					newUpz = -v.z/speed
// 					player.ball.setLinearVelocity({x: vx, y: vy, z: vz})
// 					player.ball.native._physijs.linearVelocity.set(vx, vy, vz)
// 					if(Math.abs(vx)===speed) camx = -vx
// 					if(Math.abs(vy)===speed) camy = -vy
// 					if(Math.abs(vz)===speed) camz = -vz
// 					if(Math.abs(newUpx) === 1) camx = 5*newUpx
// 					if(Math.abs(newUpy) === 1) camy = 5*newUpy
// 					if(Math.abs(newUpz) === 1) camz = 5*newUpz
// 					world.camera.native.position.set(camx||0,camy||0,camz||0)
// 					player.ball.native.up.set(newUpx,newUpy,newUpz)
// 					rotate(player)
// 				}
//
// 				//down
// 				if(event.keyCode===40){
// 					v = player.ball.native._physijs.linearVelocity
// 					up = player.ball.native.up
// 					vx = -(speed)*up.x
// 					vy = -(speed)*up.y
// 					vz = -(speed)*up.z
// 					newUpx = v.x/speed
// 					newUpy = v.y/speed
// 					newUpz = v.z/speed
// 					if(Math.abs(vx)===speed) camx = -vx
// 					if(Math.abs(vy)===speed) camy = -vy
// 					if(Math.abs(vz)===speed) camz = -vz
// 					if(Math.abs(newUpx) === 1) camx = 5*newUpx
// 					if(Math.abs(newUpy) === 1) camy = 5*newUpy
// 					if(Math.abs(newUpz) === 1) camz = 5*newUpz
// 					player.ball.setLinearVelocity({x: vx, y: vy, z: vz})
// 					player.ball.native._physijs.linearVelocity.set(vx, vy, vz)
// 					player.ball.native.up.set(newUpx,newUpy,newUpz)
// 					world.camera.native.position.set(camx||0,camy||0,camz||0)
// 					rotate(player)
// 				}
// 			})
//
// 			//Below we are setting the camera for each player based on starting position. Need to set both the position of the camera (which is relative to the player and pointing towards the player) and the 'up' vector which determines where the "sky" is and enables are controls to work.
//
// 			world.camera.native.position.set(
// 				(player.ball.position.x/495)*speed + player.ball.native.up.x*5,
// 				(player.ball.position.y/495)*speed + player.ball.native.up.y*5,
// 				(player.ball.position.z/495)*speed + player.ball.native.up.z*5
// 			)
//
// 			world.camera.native.up.set(
// 				player.ball.native.up.x,
// 				player.ball.native.up.y,
// 				player.ball.native.up.z
// 			)
//
// 			//rotate function
// 			let ups, vs
// 			const rotate = (user) => {
// 				ups = user.ball.native.up
// 				vs = user.ball.native._physijs.linearVelocity
// 				console.log([ups.x, ups.y, ups.z])
// 				console.log([vs.x, vs.y, vs.z])
// 				if(ups.x === 1){
// 					if(vs.y === 100){
// 						user.ball.native.rotation.set(-Math.PI/2,0,-Math.PI/2)
// 					}
// 					if(vs.y === -100){
// 						user.ball.native.rotation.set(Math.PI/2,0,-Math.PI/2)
// 					}
// 					if(vs.z === 100){
// 						user.ball.native.rotation.set(0,0,-Math.PI/2)
// 					}
// 					if(vs.z === -100){
// 						user.ball.native.rotation.set(Math.PI,0,-Math.PI/2)
// 					}
// 				}
// 				if(ups.x === -1){
// 					if(vs.y === 100){
// 						user.ball.native.rotation.set(-Math.PI/2,0,Math.PI/2)
// 					}
// 					if(vs.y === -100){
// 						user.ball.native.rotation.set(Math.PI/2,0,Math.PI/2)
// 					}
// 					if(vs.z === 100){
// 						console.log("Rotation Not Set")
// 					}
// 					if(vs.z === -100){
// 						console.log("Rotation Not Set")
// 					}
// 				}
// 				if(ups.y === 1){
// 					if(vs.x === 100){
// 						user.ball.native.rotation.set(0,Math.PI/2,0)
// 					}
// 					if(vs.x === -100){
// 						user.ball.native.rotation.set(0,-Math.PI/2,0)
// 					}
// 					if(vs.z === 100){
// 						user.ball.native.rotation.set(0, 0, 0)
// 					}
// 					if(vs.z === -100){
// 						user.ball.native.rotation.set(0, Math.PI, 0)
// 					}
// 				}
// 				if(ups.y === -1){
// 					if(vs.x === 100){
// 						user.ball.native.rotation.set(-Math.PI/2, Math.PI/2, -Math.PI/2)
// 					}
// 					if(vs.x === -100){
// 						user.ball.native.rotation.set(Math.PI/2, -Math.PI/2, -Math.PI/2)
// 					}
// 					if(vs.z === 100){
// 						console.log("Rotation Not Set")
// 					}
// 					if(vs.z === -100){
// 						console.log("Rotation Not Set")
// 					}
// 				}
// 				if(ups.z === 1){
// 					if(vs.x === 100){
// 						console.log("Rotation Not Set")
// 					}
// 					if(vs.x === -100){
// 						console.log("Rotation Not Set")
// 					}
// 					if(vs.y === 100){
// 						user.ball.native.rotation.set(Math.PI/2,Math.PI,0)
// 					}
// 					if(vs.y === -100){
// 						user.ball.native.rotation.set(Math.PI/2,0,0)
// 					}
// 				}
// 				if(ups.z === -1){
// 					if(vs.x === 100){
// 						console.log("Rotation Not Set")
// 					}
// 					if(vs.x === -100){
// 						console.log("Rotation Not Set")
// 					}
// 					if(vs.y === 100){
// 						user.ball.native.rotation.set(-Math.PI/2,0,0)
// 					}
// 					if(vs.y === -100){
// 						user.ball.native.rotation.set(-Math.PI/2,Math.PI,0)
// 					}
// 				}
// 				user.bike.native.rotation.set(
// 					user.ball.native.rotation.x,
// 					user.ball.native.rotation.y,
// 					user.ball.native.rotation.z
// 				)
// 				world.camera.native.up.set(
// 					player.ball.native.up.x,
// 					player.ball.native.up.y,
// 					player.ball.native.up.z
// 				)
// 			}
// 			//setting the camera to the ball
//
// 			player.ball.add(world.camera)
//
// 			//starting the world
//
// 			world.start()
// 			world.setControls(new WHS.OrbitControls())
//
// 			return(
// 				<div>
//
// 				</div>
// 			)
// 		}
// 	}
// }
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
