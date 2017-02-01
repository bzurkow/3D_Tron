import React, { Component } from 'react';
import math from 'mathjs';
import world, { speed } from '../game/world'
import { player } from '../game/player'

export default class Game extends Component {

	render(){
		player

// adding controls for left, right, up and down. Using the cross product (math.cross) to determine orthoganal directions for the players motion to change in
		
		document.addEventListener('keydown', (event) => {
		  //cross product takes us left, neg cross right
		  var v, up, vArr, upArr, camx, camy, camz, cross, vx, vy, vz, newUpx, newUpy, newUpz, firstBoxPos, lastBoxPos, lastBoxIndex, newWallPos, newWallGeo, nWGx, nWGy, nWGz, newWall
		   //left
		 
		  // lastBoxIndex=player.boxes.length-1
		  // firstBoxPos=player.boxes[0].params.position
		  // lastBoxPos=player.boxes[lastBoxIndex].params.position
		  // newWallPos=[(firstBoxPos.x+lastBoxPos.x)/2,(firstBoxPos.y+lastBoxPos.y)/2,(firstBoxPos.z+lastBoxPos.z)/2]
		  // nWGx=nWGy=nWGz=1.5
		  // if(firstBoxPos.x - lastBoxPos.x !== 0) nWGx = Math.abs(firstBoxPos.x-lastBoxPos.x)
		  // if(firstBoxPos.y - lastBoxPos.y !== 0) nWGy = Math.abs(firstBoxPos.y-lastBoxPos.y)
		  // if(firstBoxPos.z - lastBoxPos.z !== 0) nWGz = Math.abs(firstBoxPos.z-lastBoxPos.z)
		  // newWallGeo=[nWGx,nWGy,nWGz]
		  // newWall = new WHS.Box({
		  // 	geometry: newWallGeo,
		  // 	position: newWallPos,
		  // 	mass: 0, 
		  // 	material:  { color: 0xFFDADA, kind: 'phong'}
		  // })
		  // player.boxes.forEach(box => world.scene.remove(box._native))
		  // newWall.addTo(world)
		  // player.walls.push(newWall)

		  if(event.keyCode===37){
		    v = player.ball.native._physijs.linearVelocity
		    up = world.camera.native.up
		    vArr = [v.x,v.y,v.z]
		    upArr = [up.x,up.y,up.z] 
		    cross = math.cross(upArr,vArr)
		    player.ball.setLinearVelocity({x: cross[0], y: cross[1], z: cross[2]})
		    if(cross[0]*cross[0]===speed*speed) camx = -cross[0]
		    if(cross[1]*cross[1]===speed*speed) camy = -cross[1]
		    if(cross[2]*cross[2]===speed*speed) camz = -cross[2]
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
		    player.ball.setLinearVelocity({x: -cross[0], y: -cross[1], z: -cross[2]})
		    if(cross[0]*cross[0]===speed*speed) camx = cross[0]
		    if(cross[1]*cross[1]===speed*speed) camy = cross[1]
		    if(cross[2]*cross[2]===speed*speed) camz = cross[2]
		    if(up.x*up.x === 1) camx=5*up.x
		    if(up.y*up.y === 1) camy=5*up.y
		    if(up.z*up.z === 1) camz=5*up.z
		    world.camera.native.position.set(camx||0,camy||0,camz||0)
		  }
		  //up just once
		  if(event.keyCode===38){
		    v = player.ball.native._physijs.linearVelocity
		    up = world.camera.native.up
		    vx = speed*up.x
		    vy = speed*up.y
		    vz = speed*up.z
		    newUpx = -v.x/speed
		    newUpy = -v.y/speed
		    newUpz = -v.z/speed
		    player.ball.setLinearVelocity({x: vx, y: vy, z: vz})
		    if(vx*vx===speed*speed) camx = -vx
		    if(vy*vy===speed*speed) camy = -vy
		    if(vz*vz===speed*speed) camz = -vz
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
		    vx = -speed*up.x
		    vy = -speed*up.y
		    vz = -speed*up.z
		    newUpx = v.x/speed
		    newUpy = v.y/speed
		    newUpz = v.z/speed
		    player.ball.setLinearVelocity({x: vx, y: vy, z: vz})
		    if(vx*vx===speed*speed) camx = -vx
		    if(vy*vy===speed*speed) camy = -vy
		    if(vz*vz===speed*speed) camz = -vz
		    if(newUpx*newUpx === 1) camx = 5*newUpx
		    if(newUpy*newUpy === 1) camy = 5*newUpy
		    if(newUpz*newUpz === 1) camz = 5*newUpz
		    world.camera.native.position.set(camx||0,camy||0,camz||0)
		    world.camera.native.up.set(newUpx,newUpy,newUpz)
		  }
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



		return(
			<div>



			</div>
			)

	}



}