
import world, { speed } from './world';
/* eslint semi: 0 */
/* eslint space-infix-ops: 0 */
const sphereBase = new WHS.Sphere({
    geometry: [ 2, 1, 1],
    mass: 10, // Mass of physics object.
    material: {
      color: 0xF2F2F2,
      transparent: true,
      opacity: 0,
      kind: 'lambert'
    }
  })

export default function PlayerConstructor(color){
  let that = this
  let t=0
  that.bike;
  that.si;
  that.wall = []
  that.ball = sphereBase.clone();
  that.wallStart
  that.wallEnd
//   that.tail = function() {
//     let vel, pos, V, P, newPos, newGeo, scale, h, w, d
//     vel = that.ball._native._physijs.linearVelocity
//     pos = that.ball._native.position
//     V = [vel.x, vel.y, vel.z]
//     let box
//     if(t>100){
//        if(!that.wall.length){
//         P = {x: pos.x-4*(vel.x/speed), y: pos.y-4*(vel.y/speed), z: pos.z-4*(vel.z/speed)}
//         box = new WHS.Box({
//           geometry: [1, 1, 1],
//           mass: 0,
//           material: { color: color || 0xFFDADA, kind: 'phong'},
//           position: [pos.x-4*(vel.x/speed), pos.y-4*(vel.y/speed), pos.z-4*(vel.z/speed)]
//        })
//         that.wallStart = Object.create(P)
//         that.wall.push(box)
//         that.wall[0].addTo(world)
//       }
//       that.wallEnd = {x: pos.x-4*(vel.x/speed), y: pos.y-4*(vel.y/speed), z: pos.z-4*(vel.z/speed)}
//     newPos = {
//       x: ((that.wallStart.x+that.wallEnd.x)/2),
//       y: ((that.wallStart.y+that.wallEnd.y)/2),
//       z: ((that.wallStart.z+that.wallEnd.z)/2)
//     }
//     newGeo = {
//       height: (Math.abs(that.wallStart.x-that.wallEnd.x)),
//       width: (Math.abs(that.wallStart.y-that.wallEnd.y)),
//       depth: (Math.abs(that.wallStart.z-that.wallEnd.z))
//     }
//     h = newGeo.height
//     w = newGeo.width
//     d = newGeo.depth
//     // if(t){
//     //   if(w!==0) (that.wall[0].g_height=w)
//     //   if(h!==0)(that.wall[0].g_width=h)
//     //   if(d!==0)(that.wall[0].g_depth=d)
//     // }
//       that.wall[0].position.set(
//         (that.wallStart.x+that.wallEnd.x)/2,
//         (that.wallStart.y+that.wallEnd.y)/2,
//         (that.wallStart.z+that.wallEnd.z)/2
//       )
//     that.wall[0].scale.set(newGeo.height||1, newGeo.width||1, newGeo.depth||1)
//     }
//     t++
// //    if(t<=101) t++
//   };
  that.walls = []
  // that.ball.native.addEventListener('collision', (event) => {
  //   world.scene.remove(that.ball.native)
  //   that.ball.remove(world.camera)
  //   that.walls.forEach(wall => world.scene.remove(wall._native))
  //   that.walls = []
  //   world.scene.remove(that.wall[0]._native)
  //   clearInterval(that.si)
  // }, true)
}

// import world, { q } from './world'
//
// const sphereBase = new WHS.Sphere({
//     geometry: [ 1, 32, 32],
//     mass: 10, // Mass of physics object.
//     material: {
//       color: 0xF2F2F2,
//       kind: 'lambert'
//     }
//   })
//
// export default function PlayerConstructor(color){
//   let that = this
//   let t=0
//   that.ball = sphereBase.clone();
//   that.tail = function() {
//     let vel, pos, V, P
//     vel = that.ball._native._physijs.linearVelocity
//     pos = that.ball._native.position
//     V = [vel.x, vel.y, vel.z]
//     P = [pos.x, pos.y, pos.z]
//     if(t>100&&t%15===0){
//       new WHS.Box({
//         // mask: n,
//         geometry: [1.5, 1.5, 1.5],
//         mass: 0,
//         material: { color: color || 0xFFDADA, kind: 'phong'},
//         position: [pos.x-4*(vel.x/speed), pos.y-4*(vel.y/speed), pos.z-4*(vel.z/speed)]
//       }).addTo(world)
//     }
//     t++
//   };
  // that.ball.native.addEventListener('collision', (event) => {
  //   //console.log(world.scene)
  //   world.scene.remove(that.ball.native)
  //   that.ball.remove(world.camera)
  // }, true)
// }
