import React, { Component } from 'react';
import { connect } from 'react-redux';

import Game from './Game';
import Landing from './Landing';
import LobbyRoom from './LobbyRoom';

const App = ({ gameState }) => {
  return (
    <div>
      {gameState.isEnter && !gameState.isPlaying && <Landing /> }
      {!gameState.isEnter && !gameState.isPlaying && <LobbyRoom /> }
      {gameState.isPlaying  && <Game />}
    </div>
  );
};
// if(this.props.gameState === 'landing') render Landing
// if asdfasd = playing || dead render game

const mapStateToProps = ({ gameState }) => ({ gameState });
const mapDispatchToProps = null;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
