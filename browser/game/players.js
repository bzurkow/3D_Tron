import PlayerConstructor from './playerConstructor'
import world, { q } from './world'

//creating our 6 players. Any player playing will be one of these 6

const player1 = new PlayerConstructor(1)
player1.ball.position.set(-495, 0, 0)
player1.ball.native.up.set(0,1,0)
player1.ball.addTo(world)
player1.ball.setLinearVelocity({x: q, y: 0, z: 0 })
setInterval(player1.tail,100)

const player2 = new PlayerConstructor(2)
player2.ball.position.set(495, 0, 0)
player2.ball.native.up.set(0,1,0)
player2.ball.addTo(world)
player2.ball.setLinearVelocity({x: -q, y: 0, z: 0 })
setInterval(player2.tail,100)

const player3 = new PlayerConstructor()
player3.ball.position.set(0, 495, 0)
player3.ball.native.up.set(0,0,1)
player3.ball.addTo(world)
player3.ball.setLinearVelocity({x: 0, y: -q, z: 0 })
setInterval(player3.tail,100)

const player4 = new PlayerConstructor()
player4.ball.position.set(0, -495, 0)
player4.ball.native.up.set(0,0,1)
player4.ball.addTo(world)
player4.ball.setLinearVelocity({x: 0, y: q, z: 0 })
setInterval(player4.tail,100)

const player5 = new PlayerConstructor()
player5.ball.position.set(0, 0, 495)
player5.ball.native.up.set(0,1,0)
player5.ball.addTo(world)
player5.ball.setLinearVelocity({x: 0, y: 0, z: -q })
setInterval(player5.tail,100)

const player6 = new PlayerConstructor()
player6.ball.position.set(0, 0, -495)
player6.ball.native.up.set(0,1,0)
player6.ball.addTo(world)
player6.ball.setLinearVelocity({x: 0, y: 0, z: q })
setInterval(player6.tail,100)

export { player1, player2, player3, player4, player5, player6 }