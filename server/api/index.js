'use strict';

const api = module.exports = require('express').Router();

api
  .use('/users', require('./users'))
  // .use('/worlds', require('./worlds'))
  .use('/scores', require('./scores'))
  // .use('/bugs', require('./bugs'))
  .use('/state', require('./states'))
  .get('/whoami', (req, res) => res.send(req.cookie.user));
