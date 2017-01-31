import { field } from './field'


let q = 100



const world = new WHS.World({
  stats: "fps", // fps, ms, mb or false if not need.
  autoresize: { delay: 1 },
  camera: { position: [-q, 5, 0] },
  rendering: { 
    background: { color: 0x162129 },
    renderer: { antialias: true }
  },
  container: document.body
});

field.forEach(plane => plane.addTo(world))

new WHS.AmbientLight({
  light: {
    intensity: .9
  }
}).addTo(world);

export default world
export { q }