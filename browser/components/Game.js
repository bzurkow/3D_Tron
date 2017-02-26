import React, { Component } from 'react';
import { connect } from 'react-redux';
import world from '../game/world';
import { turnPlayer } from '../game/directionsFunctions';
import store from '../store';
import socket from '../socket';
import { cameraSetOnStart } from '../game/gamePlayFunctions';
import { DeadNoWinner, Winner, DeadWithWinner} from './InGame';

console.log("SOCKET ID LOCAL STORAGE (IN THE FRONT END)", localStorage.getItem('mySocketId'));

class Game extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const players = this.props.players;
    const myPlayer = this.props.mainPlayer;
    world.start();
    players.forEach(player => {
      player.si = setInterval(player.tail, 10);
    });
  }

  render() {
    const TURN_AUDIO = document.createElement('audio');
    TURN_AUDIO.src = 'mp3/shortBikeTurn.m4a';
    TURN_AUDIO.load();

    const player = this.props.mainPlayer;
    const validKeys = [37, 39, 38, 40, 87, 65, 83, 68];
    player.ball.add(world.camera);

    document.addEventListener('keydown', (event) => {
      if (validKeys.includes(event.keyCode)) {
        turnPlayer(event.keyCode, this.props.mainPlayer);
        TURN_AUDIO.play();
      }
    });

    // {
    //   this.props.mainPlayer.status === 'dead' && this.props.players.filter(player => player.winner === true).length === 0 ? <DeadNoWinner /> : null
    // }
    // {
    //   this.props.mainPlayer.status === 'dead' && !this.props.mainPlayer.winner && this.props.players.filter(player => player.winner === true).length === 1 ? <DeadWithWinner /> : null
    // }
  // return (
  //
  //
  //       this.props.mainPlayer.winner ? <div><Winner /></div> : null
  //
  //
  //   );
  return null;
  }
}

////////////////// CONNECTOR ////////////////////
const mapStateToProps = ({ mainPlayer, players }) => ({ mainPlayer, players });
export default connect(mapStateToProps)(Game);
