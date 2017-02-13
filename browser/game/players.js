import PlayerConstructor from './playerConstructor'
import world, { speed } from './world'

const loader = new THREE.ObjectLoader();
export const scalarInitialPosition = 400

//creating our 6 players. Any player playing will be one of these 6

const player1 = new PlayerConstructor(0xFFF000)
player1.ball.position.set(-scalarInitialPosition, 0, 0)
player1.ball.native.up.set(0,1,0)
player1.ball.native.rotation.set(0,Math.PI/2,0)
// player1.ball.addTo(world)
// player1.ball.setLinearVelocity({x: speed, y: 0, z: 0 })
player1.signature = 1

const player2 = new PlayerConstructor(0xC0C0C0)
player2.ball.native.position.set(scalarInitialPosition, 0, 0)
player2.ball.native.up.set(0,1,0)
player2.ball.native.rotation.set(0,-Math.PI/2,0)
player2.ball.addTo(world)
player2.ball.setLinearVelocity({x: -speed, y: 0, z: 0 })
player2.signature = 2

const player3 = new PlayerConstructor(0x00ff00)
player3.ball.position.set(0, -scalarInitialPosition, 0)
player3.ball.native.up.set(1,0,0)
player3.ball.native.rotation.set(-Math.PI/2,0,-Math.PI/2)
player3.ball.addTo(world)
player3.ball.setLinearVelocity({x: 0, y: speed, z: 0 })
player3.signature = 3

const player4 = new PlayerConstructor(0x00FFFF)
player4.ball.position.set(0, scalarInitialPosition, 0)
player4.ball.native.up.set(1,0,0)
player4.ball.native.rotation.set(Math.PI/2,0,-Math.PI/2)
player4.ball.addTo(world)
player4.ball.setLinearVelocity({x: 0, y: -speed, z: 0 })
player4.signature = 4

const player5 = new PlayerConstructor(0xFF1493)
player5.ball.position.set(0, 0, -scalarInitialPosition)
player5.ball.native.up.set(0,1,0)
player5.ball.addTo(world)
player5.ball.setLinearVelocity({x: 0, y: 0, z: speed })
player5.signature = 5

const player6 = new PlayerConstructor(0xFF0000)
player6.ball.position.set(0, 0, scalarInitialPosition)
player6.ball.native.up.set(0,1,0)
player6.ball.native.rotation.set(0,Math.PI,0)
player6.ball.addTo(world)
player6.ball.setLinearVelocity({x: 0, y: 0, z: -speed })
player6.signature = 6

loader.load('bikes/gold-tron.json', bike => {
	player1.bike = new WHS.Element(bike, [WHS.MeshComponent])
	player1.bike.position.set(
		player1.ball.native.up.x*(-3),
		player1.ball.native.up.y*(-3),
		player1.ball.native.up.z*(-3)
	)
	player1.bike.scale.set(6,6,6)
	player1.bike.native.up.set(0,0,1)
	player1.bike.native.rotation.set(
		player1.ball.native.rotation.x,
		player1.ball.native.rotation.y,
		player1.ball.native.rotation.z
	)
	player1.bike.addTo(world)
	player1.ball.add(player1.bike)
})

loader.load('bikes/black-tron.json', bike => {
	player2.bike = new WHS.Element(bike, [WHS.MeshComponent])
	player2.bike.position.set(
		player2.ball.native.up.x*(-3),
		player2.ball.native.up.y*(-3),
		player2.ball.native.up.z*(-3)
	)
	player2.bike.scale.set(6,6,6)
	player2.bike.native.up.set(0,0,1)
	player2.bike.native.rotation.set(
		player2.ball.native.rotation.x,
		player2.ball.native.rotation.y,
		player2.ball.native.rotation.z
	)
	player2.bike.addTo(world)
	player2.ball.add(player2.bike)
})

loader.load('bikes/green-tron.json', bike => {
	player3.bike = new WHS.Element(bike, [WHS.MeshComponent])
	player3.bike.position.set(
		player3.ball.native.up.x*(-3),
		player3.ball.native.up.y*(-3),
		player3.ball.native.up.z*(-3)
	)
	player3.bike.scale.set(6,6,6)
	player3.bike.native.up.set(0,0,1)
	player3.bike.native.rotation.set(
		player3.ball.native.rotation.x,
		player3.ball.native.rotation.y,
		player3.ball.native.rotation.z
	)
	player3.bike.addTo(world)
	player3.ball.add(player3.bike)
})

loader.load('bikes/blue-tron.json', bike => {
	player4.bike = new WHS.Element(bike, [WHS.MeshComponent])
	player4.bike.position.set(
		player4.ball.native.up.x*(-3),
		player4.ball.native.up.y*(-3),
		player4.ball.native.up.z*(-3)
	)
	player4.bike.scale.set(6,6,6)
	player4.bike.native.up.set(0,0,1)
	player4.bike.native.rotation.set(
		player4.ball.native.rotation.x,
		player4.ball.native.rotation.y,
		player4.ball.native.rotation.z
	)
	player4.bike.addTo(world)
	player4.ball.add(player4.bike)
})

loader.load('bikes/pink-tron.json', bike => {
	player5.bike = new WHS.Element(bike, [WHS.MeshComponent])
	player5.bike.position.set(
		player5.ball.native.up.x*(-3),
		player5.ball.native.up.y*(-3),
		player5.ball.native.up.z*(-3)
	)
	player5.bike.scale.set(6,6,6)
	player5.bike.native.up.set(0,0,1)
	player5.bike.native.rotation.set(
		player5.ball.native.rotation.x,
		player5.ball.native.rotation.y,
		player5.ball.native.rotation.z
	)
	player5.bike.addTo(world)
	player5.ball.add(player5.bike)
})

loader.load('bikes/red-tron.json', bike => {
	player6.bike = new WHS.Element(bike, [WHS.MeshComponent])
	player6.bike.position.set(
		player6.ball.native.up.x*(-3),
		player6.ball.native.up.y*(-3),
		player6.ball.native.up.z*(-3)
	)
	player6.bike.scale.set(6,6,6)
	player6.bike.native.up.set(0,0,1)
	player6.bike.native.rotation.set(
		player6.ball.native.rotation.x,
		player6.ball.native.rotation.y,
		player6.ball.native.rotation.z
	)
	player6.bike.addTo(world)
	player6.ball.add(player6.bike)
})


export default [player1, player2, player3, player4, player5, player6];
