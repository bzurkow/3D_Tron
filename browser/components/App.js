import React, { Component } from 'react';
import { connect } from 'react-redux';

import Game from './Game';
import Landing from './Landing';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log("THIS>PROPS", this.props.players);
    return (
      <div>
        { this.props.gameState.isPlaying ? <Game /> : <Landing /> }
      </div>
      );
  }
}
// if(this.props.gameState === 'landing') render Landing
// if asdfasd = playing || dead render game

const mapStateToProps = ({ gameState, players }) => ({ gameState, players });
const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);