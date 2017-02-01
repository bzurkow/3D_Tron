//import React, { Component } from 'react';
//import world from './world'

// export default class Player extends Component {


// }

import world, { speed } from './world'

const sphereBase = new WHS.Sphere({
    geometry: [ 3, 32, 32],
    mass: 10, // Mass of physics object.
    material: {
      color: 0xF2F2F2,
      kind: 'lambert'
    }
  })

export default function PlayerConstructor(){
  let that = this
  let t=0
  that.ball = sphereBase.clone();
  that.tail = function() {
    let vel, pos, V, P
    vel = that.ball._native._physijs.linearVelocity
    pos = that.ball._native.position
    V = [vel.x, vel.y, vel.z]
    P = [pos.x, pos.y, pos.z]
    let box
    if(t>10){
      box = new WHS.Box({
        geometry: [1.5, 1.5, 1.5],
        mass: 0,
        material: { color: 0xFFDADA, kind: 'phong'},
        position: [pos.x-4*(vel.x/speed), pos.y-4*(vel.y/speed), pos.z-4*(vel.z/speed)]
      })
      box.addTo(world)
      that.boxes.push(box)
    }

    t++
  };
  that.boxes = []
  that.walls = []
  that.ball.native.addEventListener('collision', (event) => {
    world.scene.remove(that.ball.native)
    that.ball.remove(world.camera)
    that.boxes.forEach(box => world.scene.remove(box._native))

  }, true)
}
