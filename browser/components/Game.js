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
    this.state = {
      countdown: 3
    };
    this.tick = this.tick.bind(this);
  }

  tick() {
    this.setState({countdown: this.state.countdown - 1});
    if (this.state.countdown <= 0) {
      clearInterval(this.state.interval);
    }
  }

  componentWillMount() {
    this.interval = setInterval(this.tick, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
  }

  componentDidMount() {
    console.log("CDM PROPS", this.props)
    const players = this.props.players;
    const myPlayer = this.props.mainPlayer;
    myPlayer.ball.addTo(world);
    world.start();
    setTimeout(() => {
      myPlayer.ball.setLinearVelocity({x: 100, y: 0, z: 0 });
      players.forEach(player => {
        player.si = setInterval(player.tail, 10);
      });
    }, 3000);
    myPlayer.ball.native.addEventListener('collision', (collidedWith) => {
      console.log("ME", myPlayer);
      console.log("collidedWith", collidedWith);
      socket.emit('ball-collision', {signature: myPlayer.signature, id: myPlayer.id});
    });
    cameraSetOnStart(myPlayer);
  }

  render() {
    const TURN_AUDIO = document.createElement('audio');
    TURN_AUDIO.src = 'mp3/shortBikeTurn.m4a';
    TURN_AUDIO.load();

    const player = this.props.mainPlayer;
    player.ball.add(world.camera);
    const validKeys = [37, 39, 38, 40, 87, 65, 83, 68];

    document.addEventListener('keydown', (event) => {
      if (validKeys.includes(event.keyCode)) {
        turnPlayer(event.keyCode, player);
        TURN_AUDIO.play();
      }
    });

    document.addEventListener('keyup', (event) => {
      if (validKeys.includes(event.keyCode)) {
        TURN_AUDIO.pause();
      }
    });

  return (
      <div>
        <div id="countdown">
          {
            this.state.countdown > 0 ? this.state.countdown : "GO!"
          }
        </div>
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
  }
}

////////////////// CONNECTOR ////////////////////
const mapStateToProps = ({ mainPlayer, players }) => ({ mainPlayer, players });
export default connect(mapStateToProps)(Game);
