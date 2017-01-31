let math = require('mathjs')
var socket = io(window.location.origin);

socket.on('connect', function(){
  console.log("i have made connection to the server");
});

const world = new WHS.World({
  stats: "fps", // fps, ms, mb or false if not need.
  autoresize: { delay: 1 },
  camera: { position: [0, 5, -10] },
  rendering: {
    background: { color: 0x162129 },
    renderer: { antialias: true }
  },
  container: document.body
});

const sphere = new WHS.Sphere({ // Create sphere comonent.
  geometry: {
    radius: 3,
    widthSegments: 32,
    heightSegments: 32
  },
  mass: 10, // Mass of physics object.
  material: {
    color: 0xF2F2F2,
    kind: 'lambert'
  },
  position: { x: 0, y: 0, z: 0 }
});

const plane1 = new WHS.Box({
  geometry: {width: 1000, height: 1000, depth: 0},
  mass: 0,
  material: {kind: 'phong', color: 0x00ff00, wireframe: false},
  position: [0,-500,0],
  rotation: [Math.PI/2,0,0],
})
const plane2 = new WHS.Box({
  geometry: {width: 1000, height: 1000, depth: 0},
  mass: 0,
  material: {kind: 'phong', color: 0x00FFFF, wireframe: false},
  position: [0,500,0],
  rotation: [Math.PI/2,0,0],
})
const plane3 = new WHS.Box({
  geometry: {width: 1000, height: 1000, depth: 0},
  mass: 0,
  material: {kind: 'phong', color: 0xFF1493, wireframe: false},
  position: [0,0,-500],
  rotation: [0,0,0],
})
const plane4 = new WHS.Box({
  geometry: {width: 1000, height: 1000, depth: 0},
  mass: 0,
  material: {kind: 'phong', color: 0xFF0000, wireframe: false},
  position: [0,0,500],
  rotation: [0,0,0],
})
const plane5 = new WHS.Box({
  geometry: {width: 1000, height: 1000, depth: 0},
  mass: 0,
  material: {kind: 'phong', color: 0xFFF000, wireframe: false},
  position: [-500,0,0],
  rotation: [0,Math.PI/2,0],
})
const plane6 = new WHS.Box({
  geometry: {width: 1000, height: 1000, depth: 0},
  mass: 0,
  material: {kind: 'phong', color: 0xC0C0C0, wireframe: false},
  position: [500,0,0],
  rotation: [0,Math.PI/2,0],
})

sphere.add(world.camera)

new WHS.AmbientLight({
  light: {
    intensity: .9
  }
}).addTo(world);

plane1.addTo(world);
plane2.addTo(world);
plane3.addTo(world);
plane4.addTo(world);
plane5.addTo(world);
plane6.addTo(world);

sphere.addTo(world)
sphere.setLinearVelocity({x: 0, y: 0, z: 10 })

sphere.native.addEventListener('collision', (event) => {
  world.scene.remove(sphere.native)
})

let box, previousPosition;

function timerCall() {

  if (!previousPosition) {
    box = new WHS.Box({
      geometry: {
        height: 6,
        width: 1,
        depth: 1
      },

      mass: 0,

      material: {
        color: 0xFFDADA,
        kind: 'phong'
      },

      position: {
        x: 0,
        y: 5,
        z: -4
      }
    })
    box.addTo(world);

  } else {
    if(sphere._native._physijs.linearVelocity.z > 0){
      box = new WHS.Box({
        geometry: {
          height: 6,
          width: 1,
          depth: 1
        },

        mass: 0,

        material: {
          color: 0xFFDADA,
          kind: 'phong'
        },

        position: {
          x: sphere._native.position._x,
          y: sphere._native.position._y,
          z: sphere._native.position._z - 4
        }
      })
      box.addTo(world);
    }
    if(sphere._native._physijs.linearVelocity.z < 0){
      box = new WHS.Box({
        geometry: {
          height: 6,
          width: 1,
          depth: 1
        },

        mass: 0,

        material: {
          color: 0xFFDADA,
          kind: 'phong'
        },

        position: {
          x: sphere._native.position._x,
          y: sphere._native.position._y,
          z: sphere._native.position._z + 4
        }
      })
      box.addTo(world);
    }
    if(sphere._native._physijs.linearVelocity.x > 0) {
      box = new WHS.Box({
        geometry: {
          height: 6,
          width: 1,
          depth: 1
        },

        mass: 0,

        material: {
          color: 0xFFDADA,
          kind: 'phong'
        },

        position: {
          x: sphere._native.position._x - 4,
          y: sphere._native.position._y,
          z: sphere._native.position._z
        }
      })
      box.addTo(world);
    }
    if(sphere._native._physijs.linearVelocity.x < 0) {
      box = new WHS.Box({
        geometry: {
          height: 6,
          width: 1,
          depth: 1
        },

        mass: 0,

        material: {
          color: 0xFFDADA,
          kind: 'phong'
        },

        position: {
          x: sphere._native.position._x + 4,
          y: sphere._native.position._y,
          z: sphere._native.position._z
        }
      })
      box.addTo(world);
    }
    if(sphere._native._physijs.linearVelocity.y > 0) {
      box = new WHS.Box({
        geometry: {
          height: 1,
          width: 1,
          depth: 6
        },

        mass: 0,

        material: {
          color: 0xFFDADA,
          kind: 'phong'
        },

        position: {
          x: sphere._native.position._x,
          y: sphere._native.position._y - 4,
          z: sphere._native.position._z
        }
      })
      box.addTo(world);
    }
    if(sphere._native._physijs.linearVelocity.y < 0) {
      box = new WHS.Box({
        geometry: {
          height: 1,
          width: 1,
          depth: 6
        },

        mass: 0,

        material: {
          color: 0xFFDADA,
          kind: 'phong'
        },

        position: {
          x: sphere._native.position._x,
          y: sphere._native.position._y + 4,
          z: sphere._native.position._z
        }
      })
      box.addTo(world);
    }
  }
    previousPosition = [sphere._native.position._x, sphere._native.position._y, sphere._native.position._z];
}
setInterval(timerCall, 50)


document.addEventListener('keydown', (event) => {
  //cross product takes us left, neg cross right
    let v, up, vArr, upArr, camx, camy, camz, cross, vx, vy, vz, newUpx, newUpy, newUpz
   //left
  if(event.keyCode===37){
    v = sphere.native._physijs.linearVelocity
    up = world.camera.native.up
    vArr = [v.x,v.y,v.z]
    upArr = [up.x,up.y,up.z]
    cross = math.cross(upArr,vArr)
    sphere.setLinearVelocity({x: cross[0], y: cross[1], z: cross[2]})
    if(cross[0]*cross[0]===100) camx = -cross[0]
    if(cross[1]*cross[1]===100) camy = -cross[1]
    if(cross[2]*cross[2]===100) camz = -cross[2]
    if(up.x*up.x === 1) camx=5*up.x
    if(up.y*up.y === 1) camy=5*up.y
    if(up.z*up.z === 1) camz=5*up.z
    world.camera.native.position.set(camx||0,camy||0,camz||0)
  }
  //right
  if(event.keyCode===39){
    v = sphere.native._physijs.linearVelocity
    up = world.camera.native.up
    vArr = [v.x,v.y,v.z]
    upArr = [up.x,up.y,up.z]
    cross = math.cross(upArr,vArr)
    sphere.setLinearVelocity({x: -cross[0], y: -cross[1], z: -cross[2]})
    if(cross[0]*cross[0]===100) camx = cross[0]
    if(cross[1]*cross[1]===100) camy = cross[1]
    if(cross[2]*cross[2]===100) camz = cross[2]
    if(up.x*up.x === 1) camx=5*up.x
    if(up.y*up.y === 1) camy=5*up.y
    if(up.z*up.z === 1) camz=5*up.z
    world.camera.native.position.set(camx||0,camy||0,camz||0)
  }
  //up just once
  if(event.keyCode===38){
    v = sphere.native._physijs.linearVelocity
    up = world.camera.native.up
    vx = 10*up.x
    vy = 10*up.y
    vz = 10*up.z
    newUpx = -v.x/10
    newUpy = -v.y/10
    newUpz = -v.z/10
    sphere.setLinearVelocity({x: vx, y: vy, z: vz})
    if(vx*vx===100) camx = -vx
    if(vy*vy===100) camy = -vy
    if(vz*vz===100) camz = -vz
    if(newUpx*newUpx === 1) camx = 5*newUpx
    if(newUpy*newUpy === 1) camy = 5*newUpy
    if(newUpz*newUpz === 1) camz = 5*newUpz
    world.camera.native.position.set(camx||0,camy||0,camz||0)
    world.camera.native.up.set(newUpx,newUpy,newUpz)
  }


  //down
  if(event.keyCode===40){
    v = sphere.native._physijs.linearVelocity
    up = world.camera.native.up
    vx = -10*up.x
    vy = -10*up.y
    vz = -10*up.z
    newUpx = v.x/10
    newUpy = v.y/10
    newUpz = v.z/10
    sphere.setLinearVelocity({x: vx, y: vy, z: vz})
    if(vx*vx===100) camx = -vx
    if(vy*vy===100) camy = -vy
    if(vz*vz===100) camz = -vz
    if(newUpx*newUpx === 1) camx = 5*newUpx
    if(newUpy*newUpy === 1) camy = 5*newUpy
    if(newUpz*newUpz === 1) camz = 5*newUpz
    world.camera.native.position.set(camx||0,camy||0,camz||0)
    world.camera.native.up.set(newUpx,newUpy,newUpz)
  }
})


world.start(); // Start animations and physics simulation.
world.setControls(new WHS.OrbitControls());
