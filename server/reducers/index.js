const { combineReducers } = require('redux');
const worlds = require('./worlds').reducer;
// const players = require('./players').reducer;
const users = require('./users').reducer;
// const food = require('./food').reducer;
// const environment = require('./environment').reducer;

module.exports = combineReducers({
  worlds,
  users
});
