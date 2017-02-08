import world from './world'

export const wallToSolid = player => {
	console.log("wallToSolid player", player)
	//we need to be able to get a position, so wallstart and wallend
	//we need to be able to get a geometry, so wallstart and wallend
	console.log('player params', player.wall[0])
	console.log('player params', player.wall[0].params.position)
	console.log('wallstar', player.wallStart)
	console.log('wallend', player.wallEnd)
	console.log('color', player.wall[0].material.color)

	let upForWall = player.ball.native.up

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

	console.log('are we getting to this line')
	console.log('player wall', player.wall)
	console.log('player walls', player.walls)

	player.wallStart = Object.create(player.wallEnd)

	console.log(player.t)

}