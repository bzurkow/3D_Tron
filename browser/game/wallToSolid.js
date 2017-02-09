import world from './world'

export const wallToSolid = player => {
	let upForWall = player.ball.native.up
  if(player.wall[0]){
    let newPos = {
        x: ((player.wallStart.x+player.wallEnd.x)/2),
        y: ((player.wallStart.y+player.wallEnd.y)/2),
        z: ((player.wallStart.z+player.wallEnd.z)/2)
      }
    let newGeo = {
      height: (Math.abs(player.wallStart.x - player.wallEnd.x)),
      width: (Math.abs(player.wallStart.y - player.wallEnd.y)),
      depth: (Math.abs(player.wallStart.z - player.wallEnd.z))
    }
    for(let hwd in newGeo){
      if(newGeo[hwd]<=4 && newGeo[hwd]>1) newGeo[hwd]=1
    }
  	let boxToAdd = new WHS.Box({
            geometry: [ newGeo.height || 1, newGeo.width || 1, newGeo.depth || 1],
            mass: 0,
            material: { color: player.wall[0].material.color , kind: 'phong'},
            position: newPos
         })

  	boxToAdd.addTo(world);

  	player.walls.push(boxToAdd)

  	world.scene.remove(player.wall[0].native)
  	player.wall = []

  	player.wallStart = Object.create(player.wallEnd)
  }
}