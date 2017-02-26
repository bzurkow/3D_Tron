import React, { Component } from 'react';
import { connect } from 'react-redux';
import world from '../game/world';
import { turnPlayer } from '../game/directionsFunctions';
import store from '../store';
import socket from '../socket';
import { cameraSetOnStart } from '../game/gamePlayFunctions';
import { DeadNoWinner, Winner, DeadWithWinner} from './InGame';

console.log("SOCKET ID LOCAL STORAGE (IN THE FRONT END)", localStorage.getItem('mySocketId'));

document.addEventListener('keydown', (event) => {
  const TURN_AUDIO = document.createElement('audio');
  TURN_AUDIO.src = 'mp3/shortBikeTurn.m4a';
  TURN_AUDIO.load();
  const validKeys = [37, 39, 38, 40, 87, 65, 83, 68];
  const player = store.getState().mainPlayer;
  if (validKeys.includes(event.keyCode)) {
    turnPlayer(event.keyCode, player);
    TURN_AUDIO.play();
  }
});

class Game extends Component {

  componentDidMount() {
    const players = this.props.players;
    const myPlayer = this.props.mainPlayer;
    world.start();
    cameraSetOnStart(myPlayer);
    players.forEach(player => {
      player.si = setInterval(player.tail, 10);
    });
    myPlayer.ball.add(world.camera);
  }

  render() {
  return (
    <div>
    {
      this.props.mainPlayer.status === 'dead' && this.props.players.filter(player => player.winner === true).length === 0 ? <DeadNoWinner /> : null
    }
    {
      this.props.mainPlayer.status === 'dead' && !this.props.mainPlayer.winner && this.props.players.filter(player => player.winner === true).length === 1 ? <DeadWithWinner /> : null
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
