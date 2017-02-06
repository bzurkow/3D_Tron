const User = require('./models/user');
const Score = require('./models/score');
const Player = require('./models/player');
const db = require('./_db');
//
// //ASSOCIATIONS
//
//
module.exports = { db, User, Player };
