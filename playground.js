const world = new WHS.World({
  stats: "fps", // fps, ms, mb or false if not need.
  autoresize: {
    delay: 1
  },

  gravity: { // Physic gravity.
      x: 0,
      y: -100,
      z: 0
  },

  camera: {
    position: {
      y: 10,
      z: 30
    }
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
    radius: 3,
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
    y: 100,
    z: 0
  }
});


const plane = new WHS.Box({
  geometry: {
    width: 200,
    height: 200
  },

  mass: 0,

  material: {
    color: 0x447F8B,
    kind: 'phong'
  },

  rotation: {
    x: - Math.PI / 2
  },

  position:[0,0,0]
});

const movingPlane = new WHS.Plane({
  geometry: {
    width: 200,
    height: 200
  },

  mass: 0,

  material: {
    color: 0x447F8B,
    kind: 'phong'
  },

  rotation: {
    x: - Math.PI / 2
  }
});


const plane2 = new WHS.Box({
  geometry: {
    width: 200,
    height: 200
  },

  mass: 0,

  material: {
    color: 0x447F8B,
    kind: 'phong'
  },

  rotation: {
    y: - Math.PI / 2
  },

  position: [100,100,0]
});

const plane3 = new WHS.Box({
  geometry: {
    width: 200,
    height: 200
  },

  mass: 0,

  material: {
    color: 0x447F8B,
    kind: 'phong'
  },

  rotation: {
    z: -Math.PI / 2
  },

  position: [0,100,100]
});

const plane4 = new WHS.Box({
  geometry: {
    width: 200,
    height: 200
  },

  mass: 0,

  material: {
    color: 0x447F8B,
    kind: 'phong'
  },

  rotation: {
    x: -Math.PI / 2
  },

  position: [0, 200, 0]
});

const plane5 = new WHS.Box({
  geometry: {
    width: 200,
    height: 200
  },

  mass: 0,

  material: {
    color: 0x447F8B,
    kind: 'phong'
  },

  rotation: {
    y: - Math.PI / 2
  },

  position: [-100,100,0]
});

new WHS.PointLight({
  light: {
    intensity: 0.5
  },

  shadowmap: {
    fov: 90
  },

  position: {
    z: 10,
    y: 10
  }
}).addTo(world);

new WHS.AmbientLight({
  light: {
    intensity: 0.5
  }
}).addTo(world);

sphere.addTo(world);
plane.addTo(world);
movingPlane.addTo(world);
plane2.addTo(world);
plane3.addTo(world);
plane4.addTo(world);
plane5.addTo(world);


world.start(); // Start animations and physics simulation.
world.setControls(new WHS.FirstPersonControls(sphere, {
  block: document.getElementById('blocker'),
  speed: 20,
  ypos: -10
}));
