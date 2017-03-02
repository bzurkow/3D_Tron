'use strict';
const plane1 = new WHS.Box({
  geometry: {width: 1000, height: 1000, depth: 0},
  mass: 0,
  material: {kind: 'basic', map: WHS.texture('grid.png'), transparent: true, opacity: 0.7},
  position: [-500,0,0],
  rotation: [0,Math.PI/2,0]
});

const plane2 = new WHS.Box({
  geometry: {width: 1000, height: 1000, depth: 0},
  mass: 0,
  material: {kind: 'basic', map: WHS.texture('grid.png'), transparent: true, opacity: 0.7},
  position: [500,0,0],
  rotation: [0,Math.PI/2,0]
});
const plane3 = new WHS.Box({
  geometry: {width: 1000, height: 1000, depth: 0},
  mass: 0,
  material: {kind: 'basic', map: WHS.texture('grid.png'), transparent: true, opacity: 0.7},
  position: [0,-500,0],
  rotation: [Math.PI/2,0,0]
});
const plane4 = new WHS.Box({
  geometry: {width: 1000, height: 1000, depth: 0},
  mass: 0,
  material: {kind: 'basic', map: WHS.texture('grid.png'), transparent: true, opacity: 0.7},
  position: [0,500,0],
  rotation: [Math.PI/2,0,0]
});
const plane5 = new WHS.Box({
  geometry: {width: 1000, height: 1000, depth: 0},
  mass: 0,
  material: {kind: 'basic', map: WHS.texture('grid.png'), transparent: true, opacity: 0.7},
  position: [0,0,-500],
  rotation: [0,0,0]
});
const plane6 = new WHS.Box({
  geometry: {width: 1000, height: 1000, depth: 0},
  mass: 0,
  material: {kind: 'basic', map: WHS.texture('grid.png'), transparent: true, opacity: 0.7},
  position: [0,0,500],
  rotation: [0,0,0]
});

export const field = [plane1, plane2, plane3, plane4, plane5, plane6];
