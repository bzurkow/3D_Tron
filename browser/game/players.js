import PlayerConstructor from './playerConstructor'
import world, { q } from './world'

const player1 = new PlayerConstructor()
player1.ball.position.set(-495, 0, 0)
player1.ball.addTo(world)
player1.ball.setLinearVelocity({x: q, y: 0, z: 0 })
setInterval(player1.tail,1)

const player2 = new PlayerConstructor()
player2.ball.position.set(495, 0, 0)
player2.ball.addTo(world)
player2.ball.setLinearVelocity({x: -q, y: 0, z: 0 })
setInterval(player2.tail,1)

const player3 = new PlayerConstructor()
player3.ball.position.set(0, 495, 0)
player3.ball.addTo(world)
player3.ball.setLinearVelocity({x: 0, y: -q, z: 0 })
setInterval(player3.tail,1)

const player4 = new PlayerConstructor()
player4.ball.position.set(0, -495, 0)
player4.ball.addTo(world)
player4.ball.setLinearVelocity({x: 0, y: q, z: 0 })
setInterval(player4.tail,1)

const player5 = new PlayerConstructor()
player5.ball.position.set(0, 0, 495)
player5.ball.addTo(world)
player5.ball.setLinearVelocity({x: 0, y: 0, z: -q })
setInterval(player5.tail,1)

const player6 = new PlayerConstructor()
player6.ball.position.set(0, 0, -495)
player6.ball.addTo(world)
player6.ball.setLinearVelocity({x: 0, y: 0, z: q })
setInterval(player6.tail,1)

export default [player1, player2, player3, player4, player5, player6];
