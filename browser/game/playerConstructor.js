import world, { speed } from './world';

const sphereBase = new WHS.Sphere({
  geometry: [ 0.5, 1, 1],
  mass: 10, // Mass of physics object.
  material: {
    color: 0xF2F2F2,
    transparent: true,
    opacity: 0,
    kind: 'lambert'
  }
});



export default function PlayerConstructor(color){
  let that = this
  that.ball = sphereBase.clone();
  that.cameraTarget;
  that.status = "alive"
  that.winner = false
  that.t=0
  that.bike;
  that.signature;
  that.si;
  that.wall = []
  that.wallStart
  that.wallEnd
  that.tail = function() {
    let vel, pos, V, P, newPos, newGeo, scale, h, w, d
    vel = that.ball._native._physijs.linearVelocity
    pos = that.ball._native.position
    V = [vel.x, vel.y, vel.z]
    let box
    if(that.t>100){
      if(!that.wall.length){
        let upForWall = that.ball.native.up
        P = {x: pos.x-2*(vel.x/speed), y: pos.y-2*(vel.y/speed), z: pos.z-2*(vel.z/speed)}
        box = new WHS.Box({
          geometry: [1,1,1],
          mass: 0,
          material: { color: color || 0xFFDADA, kind: 'phong'},
          position: [pos.x-2*(vel.x/speed), pos.y-2*(vel.y/speed), pos.z-2*(vel.z/speed)]
        })
        if(!that.wallStart) {
          that.wallStart = Object.create(P)
        }
        that.wall.push(box)
        that.wall[0].addTo(world)
      }
      that.wallEnd = {x: pos.x-2*(vel.x/speed), y: pos.y-2*(vel.y/speed), z: pos.z-2*(vel.z/speed)}
      newPos = {
        x: ((that.wallStart.x+that.wallEnd.x)/2),
        y: ((that.wallStart.y+that.wallEnd.y)/2),
        z: ((that.wallStart.z+that.wallEnd.z)/2)
      }
      newGeo = {
        height: (Math.abs(that.wallStart.x-that.wallEnd.x)),
        width: (Math.abs(that.wallStart.y-that.wallEnd.y)),
        depth: (Math.abs(that.wallStart.z-that.wallEnd.z))
      }
      h = newGeo.height
      w = newGeo.width
      d = newGeo.depth

      that.wall[0].position.set(
        (that.wallStart.x+that.wallEnd.x)/2,
        (that.wallStart.y+that.wallEnd.y)/2,
        (that.wallStart.z+that.wallEnd.z)/2
      )
      that.wall[0].scale.set(newGeo.height||1, newGeo.width||1, newGeo.depth||1)
    }
    that.t++
  };
  that.walls = []
}
