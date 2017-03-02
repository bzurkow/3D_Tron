'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import world from '../game/world';
import socket from '../socket';

import { turnPlayer } from '../game/directionsFunctions';
import { cameraSetOnStart } from '../game/gamePlayFunctions';
import { DeadNoWinner, Winner, DeadWithWinner } from './InGame';

class Game extends Component {

  componentDidMount() {
    const players = this.props.players;
    const myPlayer = this.props.mainPlayer;
    world.start();
    myPlayer.ball.add(world.camera);
    cameraSetOnStart(myPlayer);
    players.forEach(player => {
      player.si = setInterval(player.tail, 10);
    });

    myPlayer.ball.native.addEventListener('collision', (collidedWith) => {
      // console.log("collidedWith", collidedWith);
      socket.emit('ball-collision', {signature: myPlayer.signature, id: myPlayer.id});
    });

    document.addEventListener('keydown', (event) => {
      const TURN_AUDIO = document.createElement('audio');
      TURN_AUDIO.src = 'mp3/shortBikeTurn.m4a';
      TURN_AUDIO.load();
      const validKeys = [37, 39, 38, 40, 87, 65, 83, 68];
      if (validKeys.includes(event.keyCode)) {
        turnPlayer(event.keyCode, myPlayer);
        TURN_AUDIO.play();
      }
    });
  }

  render() {
    return (
      <div>
      {
        this.props.mainPlayer.status === 'dead' && this.props.players.filter(player => player.winner === true).length === 0 ? <DeadNoWinner /> : null
      }
      {
        this.props.mainPlayer.status === 'dead' && !this.props.mainPlayer.winner && this.props.players.filter(player => player.winner).length === 1 ? <DeadWithWinner players={this.props.players} /> : null
      }

      {
        this.props.mainPlayer.winner ? <Winner /> : null
      }
      </div>
  );
  }
}

////////////////// CONNECTOR ////////////////////
const mapStateToProps = ({ mainPlayer, players }) => ({ mainPlayer, players });
export default connect(mapStateToProps)(Game);
