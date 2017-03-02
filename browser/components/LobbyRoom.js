'use strict';
import React from 'react';
import { connect } from 'react-redux';
import socket from '../socket';
import Chat from './Chat';

const LobbyRoom = ({ exisitingPlayers, readyPlayerEmitter }) => (
  <div id="lobbyRoom">
    <div id="lobby-title">STAGING AREA</div>
    <sidebar>
      <h4 id="players-online">PLAYERS ONLINE</h4>
      <ul id="listName">
        {
          exisitingPlayers.map(player =>
            <li className="listName-item" key={player.id}>
              {player.playerName}
            </li>
          )
        }
      </ul>
    </sidebar>
    <Chat />

    <button
      className="btn waves-effect"
      type="submit"
      onClick = {readyPlayerEmitter}
      id="join-box">
      Join
    </button>
  </div>
);

const mapStateToProps = ({ gameState, players }) => ({ gameState, exisitingPlayers: players.filter(player => player.id) });
const mapDispatchToProps = () => ({
  readyPlayerEmitter: () => socket.emit('readyPlayer', localStorage.getItem('mySocketId'))
});

export default connect(mapStateToProps, mapDispatchToProps)(LobbyRoom);
