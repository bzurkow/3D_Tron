import React from 'react';
import { connect } from 'react-redux';
import socket from '../socket';

import { enterLobby } from '../reducers/gameState';
import { toggleSong } from '../reducers/musicPlayer';

const Landing = ({ musicPlayer, playerNameEmitter, toggleSong }) => (
  <div className="input-field">
    <div id="title">3D TRON</div>
    <div className="input-field">
    <form onSubmit={playerNameEmitter} >
      <input
        name="nickName"
        maxLength={15}
        type="text"
        id="name-box"
        placeholder="nickname"
        autoFocus
      />
      <button
        className="btn waves-effect"
        type="submit"
        id="play-box">Enter
      </button>
    </form>
     <button
      className="btn waves-effect"
      onClick={() => toggleSong()}
      id="music-box"
      >
      <span className={musicPlayer.songPlaying ? 'glyphicon glyphicon-volume-off' : 'glyphicon glyphicon-volume-up'} />
      </button>
    </div>
    <div id="general"> Use "w a s d" or arrow keys to turn </div>
  </div>
);

const mapStateToProps = ({ musicPlayer }) => ({ musicPlayer });
const mapDispatchToProps = dispatch => ({
  playerNameEmitter: (event) => {
    event.preventDefault();
    const socketId = localStorage.getItem('mySocketId');
    const playerName = event.target.nickName.value;
    socket.emit('playerName', socketId, playerName);
    dispatch(enterLobby());
  },
  toggleSong: () => dispatch(toggleSong())
});

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
