
const world = new WHS.World({
  stats: "fps", // fps, ms, mb or false if not need.
  autoresize: {
    delay: 1
  },

  gravity: { // Physic gravity.
      x: 0,
      y: 0,
      z: 0
  },

  camera: {
    position: [50, 50, 50]
  },

  rendering: {
    background: {
      color: 0x162129
    },

    renderer: {
      antialias: true
    }
  },

  container: document.body
});

const sphere = new WHS.Sphere({ // Create sphere comonent.
  geometry: {
    radius: 25,
    widthSegments: 32,
    heightSegments: 32
  },

  mass: 10, // Mass of physics object.

  material: {
    color: 0xF2F2F2,
    kind: 'lambert'
  },
  position: {
    x: 0,
    y: 0,
    z: 0
  }
});

const plane1 = new WHS.Box({
  geometry: {width: 1000, height: 1000, depth: 0},
  mass: 0,
  material: {kind: 'basic', color: 0x00ff00, wireframe: false},
  position: [0,-500,0],
  rotation: [Math.PI/2,0,0],
})
const plane2 = new WHS.Box({
  geometry: {width: 1000, height: 1000, depth: 0},
  mass: 0,
  material: {kind: 'basic', color: 0x00FFFF, wireframe: false},
  position: [0,500,0],
  rotation: [Math.PI/2,0,0],
})
const plane3 = new WHS.Box({
  geometry: {width: 1000, height: 1000, depth: 0},
  mass: 0,
  material: {kind: 'basic', color: 0xFF1493, wireframe: false},
  position: [0,0,-500],
  rotation: [0,0,0],
})
const plane4 = new WHS.Box({
  geometry: {width: 1000, height: 1000, depth: 0},
  mass: 0,
  material: {kind: 'basic', color: 0xFF0000, wireframe: false},
  position: [0,0,500],
  rotation: [0,0,0],
})
const plane5 = new WHS.Box({
  geometry: {width: 1000, height: 1000, depth: 0},
  mass: 0,
  material: {kind: 'basic', color: 0xFFF000, wireframe: false},
  position: [-500,0,0],
  rotation: [0,Math.PI/2,0],
})
const plane6 = new WHS.Box({
  geometry: {width: 1000, height: 1000, depth: 0},
  mass: 0,
  material: {kind: 'basic', color: 0xC0C0C0, wireframe: false},
  position: [500,0,0],
  rotation: [0,Math.PI/2,0],
})

sphere.add(world.camera)

new WHS.AmbientLight({
  light: {
    intensity: 3
  }
}).addTo(world);




plane1.addTo(world);
plane2.addTo(world);
plane3.addTo(world);
plane4.addTo(world);
plane5.addTo(world);
plane6.addTo(world);

sphere.addTo(world);
sphere.setLinearVelocity({x: 0, y: -100, z: 0 })

sphere.native.addEventListener('collision', (event) => {
  world.scene.remove(sphere.native)
})

world.start(); // Start animations and physics simulation.
world.setControls(new WHS.OrbitControls());
