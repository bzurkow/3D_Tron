'use strict';
const express = require('express');
//const session = require('express-session');
const bodyParser = require('body-parser');
const { resolve } = require('path');
//const db = require('./db.json');
const app = express();

console.log(__dirname)
module.exports = app
  .use(bodyParser.urlencoded({ extended: true }), bodyParser.json(), require('volleyball'))
  // .use(session({
  //   // this mandatory configuration ensures that session IDs are not predictable
  //   secret: 'tongiscool', // or whatever you like
  //   // these options are recommended and reduce session concurrency issues
  //   resave: false,
  //   saveUnitialized: false
  // }))
  // .use(function (req, res, next) {
  //   console.log('session', req.session);
  //   next();
  // })
  // .use('/api', require('./api'))
  // // Send index.html for anything else.
  // .get('/*', (_, res) => res.sendFile(resolve(__dirname, 'public', 'index.html')))
  // .use(require('./error.middleware'));
  .use(express.static(resolve(__dirname, 'public')))
  .get('/*', (_, res) => res.sendFile(resolve(__dirname, 'public', 'index.html')))
  // .get('/', (req, res, next) => {	
  // 	res.sendFile(resolve(__dirname, 'build/index.html'))
  // })

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on ${JSON.stringify(server.address())}`);
});