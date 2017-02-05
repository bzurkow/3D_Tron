// const plane1 = new WHS.Box({
//   geometry: {width: 1000, height: 1000, depth: 0},
//   mass: 0,
//   material: {kind: 'phong', color: 0xFFF000, wireframe: true, wireframeLinewidth: 10},
//   position: [-500,0,0],
//   rotation: [0,Math.PI/2,0],})
// const plane2 = new WHS.Box({
//   geometry: {width: 1000, height: 1000, depth: 0},
//   mass: 0,
//   material: {kind: 'phong', color: 0xC0C0C0, wireframe: true, wireframeLinewidth: 10},
//   position: [500,0,0],
//   rotation: [0,Math.PI/2,0],})
// const plane3 = new WHS.Box({
//   geometry: {width: 1000, height: 1000, depth: 0},
//   mass: 0,
//   material: {kind: 'phong', color: 0x00ff00, wireframe: true, wireframeLinewidth: 10},
//   position: [0,-500,0],
//   rotation: [Math.PI/2,0,0],})
// const plane4 = new WHS.Box({
//   geometry: {width: 1000, height: 1000, depth: 0},
//   mass: 0,
//   material: {kind: 'phong', color: 0x00FFFF, wireframe: true, wireframeLinewidth: 10},
//   position: [0,500,0],
//   rotation: [Math.PI/2,0,0],})
// const plane5 = new WHS.Box({
//   geometry: {width: 1000, height: 1000, depth: 0},
//   mass: 0,
//   material: {kind: 'phong', color: 0xFF1493, wireframe: true, wireframeLinewidth: 10},
//   position: [0,0,-500],
//   rotation: [0,0,0],})
// const plane6 = new WHS.Box({
//   geometry: {width: 1000, height: 1000, depth: 0},
//   mass: 0,
//   material: {kind: 'phong', color: 0xFF0000, wireframe: true, wireframeLinewidth: 10},
//   position: [0,0,500],
//   rotation: [0,0,0],})
const plane1 = new WHS.Box({
  geometry: {width: 1000, height: 1000, depth: 0},
  mass: 0,
  material: {kind: 'phong', color: 0x00ff00, wireframe: true},
  position: [0,-500,0],
  rotation: [Math.PI/2,0,0],})
const plane2 = new WHS.Box({
  geometry: {width: 1000, height: 1000, depth: 0},
  mass: 0,
  material: {kind: 'phong', color: 0x00FFFF, wireframe: true},
  position: [0,500,0],
  rotation: [Math.PI/2,0,0],})
const plane3 = new WHS.Box({
  geometry: {width: 1000, height: 1000, depth: 0},
  mass: 0,
  material: {kind: 'phong', color: 0xFF1493, wireframe: true},
  position: [0,0,-500],
  rotation: [0,0,0],})
const plane4 = new WHS.Box({
  geometry: {width: 1000, height: 1000, depth: 0},
  mass: 0,
  material: {kind: 'phong', color: 0xFF0000, wireframe: true},
  position: [0,0,500],
  rotation: [0,0,0],})
const plane5 = new WHS.Box({
  geometry: {width: 1000, height: 1000, depth: 0},
  mass: 0,
  material: {kind: 'phong', color: 0xFFF000, wireframe: true},
  position: [-500,0,0],
  rotation: [0,Math.PI/2,0],})
const plane6 = new WHS.Box({
  geometry: {width: 1000, height: 1000, depth: 0},
  mass: 0,
  material: {kind: 'phong', color: 0xC0C0C0, wireframe: true},
  position: [500,0,0],
  rotation: [0,Math.PI/2,0],})

export const field = [plane1, plane2, plane3, plane4, plane5, plane6]
