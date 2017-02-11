import React, { Component } from 'react';
import { connect } from 'react-redux';
import math from 'mathjs';
import world, { speed } from '../game/world';
import { turnPlayer } from '../reducers/mainPlayer';
import store from '../store';
import socket from '../socket';
import { cameraSetOnStart } from '../game/gamePlayFunctions'

console.log("SOCKET ID LOCAL STORAGE (IN THE FRONT END)", localStorage.getItem('mySocketId'));

class Game extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log("CDM PROPS", this.props)
    const players = this.props.players;
    world.start();
    players.forEach(player => {
      player.ball.native.addEventListener('collision', (collidedWith) => {
        socket.emit('ball-collision', {signature: player.signature, id: player.id});
      }, true);
      player.si = setInterval(player.tail, 10);
    });
    cameraSetOnStart(this.props.mainPlayer)
  }

  render(){
    const TURN_AUDIO = document.createElement('audio');
    TURN_AUDIO.src = 'mp3/shortBikeTurn.m4a';
    TURN_AUDIO.load();

    if (this.props.mainPlayer) {
      const player = this.props.mainPlayer;
      player.ball.add(world.camera);

      document.addEventListener('keydown', (event) => {
        const validKeys = [37, 39, 38, 40, 87, 65, 83, 68];
        if (validKeys.includes(event.keyCode)) {
          store.dispatch(turnPlayer(event.keyCode));
          TURN_AUDIO.play();
        }
      });

       document.addEventListener('keyup', (event) => {
        const validKeys = [37, 39, 38, 40, 87, 65, 83, 68];
        if (validKeys.includes(event.keyCode)) {
          TURN_AUDIO.stop();
        }
      });
  }

    return null;
  }
}

////////////////// CONNECTOR ////////////////////
const mapStateToProps = ({ mainPlayer, players }) => ({ mainPlayer, players });
export default connect(mapStateToProps)(Game);
