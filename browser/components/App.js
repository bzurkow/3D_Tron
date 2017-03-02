'use strict';
import React from 'react';
import { connect } from 'react-redux';

import Game from './Game';
import Landing from './Landing';
import LobbyRoom from './LobbyRoom';

const App = ({ gameState }) => (
  <div>
    { gameState.isEnter && !gameState.isPlaying && <Landing /> }
    { !gameState.isEnter && !gameState.isPlaying && <LobbyRoom /> }
    { gameState.isPlaying && <Game /> }
  </div>
);

const mapStateToProps = ({ gameState }) => ({ gameState });
const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(App);
