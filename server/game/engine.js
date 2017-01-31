const { pickBy, size, forOwn } = require('lodash');
const { destroyWorld } = require('../reducers/worlds');
const { Score } = require('../db');
const store = require('../store');
const chalk = require('chalk');

// FROM AGAMARI
const broadcastState = (io) => {
  let start = Date.now();
  setInterval(() => {
    // On set interval, emit all player positions to all players in each world
    let { players, worlds } = store.getState();
    if (size(players) && (Date.now() - start > 1000 * 10)) {
      Score.updateAllScores(players);
      start = Date.now();
    }
    for (let currentWorld of worlds) {
      let worldPlayers = pickBy(players, ({ world }) => world === currentWorld.id);
      io.sockets.in(currentWorld.id).emit('player_data', worldPlayers);
      if (size(worldPlayers)) {
        // spawnFood(io, currentWorld.id);
      } else {
        console.log(chalk.magenta(`Destroying ${currentWorld.name}`));
        // let worldFood = pickBy(food, ({ world }) => world === currentWorld.id);
        // store.dispatch(removeMultipleFood(worldFood));
        store.dispatch(destroyWorld(currentWorld.id));
      }
    }
  }, (1000 / 30));
};

function playerIsLeading(id) {
  // this fn returns position in leaderboard of player id
  let { players } = store.getState();
  let player = players[id];

  if (player) {
    let peopleAhead = 0;
    forOwn(players, currentPlayer => {
      if (currentPlayer.world === player.world && currentPlayer.volume > player.volume) {
        peopleAhead++;
      }
    });
    return peopleAhead + 1;
  }
}

/////////////////////////////////// Spawn Asteroids????
module.exports = { broadcastState, /*spawnFood,*/ playerIsLeading };
