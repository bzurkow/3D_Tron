import React, { Component } from 'react';
import { connect } from 'react-redux';
import math from 'mathjs';
import world, { speed } from '../game/world';
import { turnPlayer } from '../game/directionsFunctions';
import store from '../store';
import socket from '../socket';
import { cameraSetOnStart } from '../game/gamePlayFunctions'
import { DeadNoWinner, Winner, DeadWithWinner} from './InGame'

console.log("SOCKET ID LOCAL STORAGE (IN THE FRONT END)", localStorage.getItem('mySocketId'));

class Game extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log("CDM PROPS", this.props)
    const players = this.props.players;
    const me = this.props.mainPlayer;
    world.start();
    // players.forEach(player => {
    //   player.ball.native.addEventListener('collision', (collidedWith) => {
    //     console.log("player", player)
    //     console.log("collidedWith", collidedWith)
    //     socket.emit('ball-collision', {signature: player.signature, id: player.id});
    //   }, true);
    //   player.si = setInterval(player.tail, 10);
    // });
    // cameraSetOnStart(this.props.mainPlayer)
    players.forEach(player => {
      player.si = setInterval(player.tail, 10);
    });
    me.ball.native.addEventListener('collision', (collidedWith) => {
      console.log("ME", me);
      console.log("collidedWith", collidedWith);
      socket.emit('ball-collision', {signature: me.signature, id: me.id});
    });
    cameraSetOnStart(me);
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
          turnPlayer(event.keyCode, this.props.mainPlayer);
          TURN_AUDIO.play();
        }
      });

       document.addEventListener('keyup', (event) => {
        const validKeys = [37, 39, 38, 40, 87, 65, 83, 68];
        if (validKeys.includes(event.keyCode)) {
          TURN_AUDIO.stop();
        }
      });
    return (
      <div>
      {
        this.props.mainPlayer.status === 'dead' && this.props.players.filter(player => player.winner === true).length === 0 ? <DeadNoWinner /> : null
      }
      {
        this.props.mainPlayer.status === 'dead' && !this.props.mainPlayer.winner && this.props.players.filter(player => player.winner === true).length === 1 ? <DeadWithWinner /> : null
      }
      {
        this.props.mainPlayer.winner === true ? <Winner /> : null
      }
      </div>

    );
  } else {
    return null
  }

  }
}

////////////////// CONNECTOR ////////////////////
const mapStateToProps = ({ mainPlayer, players }) => ({ mainPlayer, players });
export default connect(mapStateToProps)(Game);
