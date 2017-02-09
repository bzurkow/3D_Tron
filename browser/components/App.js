import React, { Component } from 'react';
import { connect } from 'react-redux';

import Game from './Game';
import Landing from './Landing';

const App = ({ gameState }) => {
  return gameState.isPlaying ? <Game /> : <Landing />;
};
// if(this.props.gameState === 'landing') render Landing
// if asdfasd = playing || dead render game

const mapStateToProps = ({ gameState }) => ({ gameState });
const mapDispatchToProps = null;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
