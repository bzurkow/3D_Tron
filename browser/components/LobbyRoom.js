import React, { Component } from 'react';
import { connect } from 'react-redux';
import socket from '../socket';
import Chat from './Chat';

class LobbyRoom extends Component {
  constructor(props) {
    super(props);

    this.readyPlayerEmitter = this.readyPlayerEmitter.bind(this);
  }

  readyPlayerEmitter() {
    const socketId = localStorage.getItem('mySocketId');
    socket.emit('readyPlayer', socketId);
  }

  render() {
    let exisitingPlayers = this.props.players.filter(player => player.id);

    console.log('exisitingPlayer', exisitingPlayers)

    return (
      <div id="lobbyRoom">
      <div id="lobby-title">STAGING AREA</div>
        <sidebar>
          <h4 id="players-online">PLAYERS ONLINE</h4>
          <ul id="listName">
            { exisitingPlayers.map((player, index) => {
              return (
                <li className="listName-item" key={index}>
                {player.playerName}
                </li>
              );
            })
            }
          </ul>
        </sidebar>
        <Chat />

        <button
          className="btn waves-effect"
          type="submit"
          onClick = {this.readyPlayerEmitter}
          id="join-box">
        Join</button>

        </div>
      );
  }
}

const mapStateToProps = ({ gameState, players}) => ({ gameState, players });
const mapDispatchToProps = dispatch => ({
    addPlayerName: e => dispatch(addPlayerName(localStorage.getItem('mySocketId'), e.target.value))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LobbyRoom);
