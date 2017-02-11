import React, { Component } from 'react';
import { connect } from 'react-redux';
import socket from '../socket';

import { addPlayerName } from '../reducers/players';
import { enterLobby } from '../reducers/gameState';
import { toggleSong } from '../reducers/musicPlayer';
import world from '../game/world';
import store from '../store';

//not needed yet
// import ControlPanel from './ControlPanel';
// import BugReportForm from './BugReportForm';

class Landing extends Component {
  constructor(props) {
    super(props);
    // this.readyPlayerEmitter = this.readyPlayerEmitter.bind(this);
  }


  render() {

  function playerNameEmitter(event) {
    event.preventDefault();
    console.log("GETTING HERE?");
    const socketId = localStorage.getItem('mySocketId');
    const playerName = event.target.nickName.value;
    socket.emit('playerName', socketId, playerName);
    store.dispatch(addPlayerName(socketId, event.target.nickName.value));
    store.dispatch(enterLobby());
  }

    //let { isPlaying } = this.props.gameState;
    // let { bugReportOpen } = this.props.controlPanel;
    return (
      <div className="input-field">
        <div id="title">3D TRON</div>
        <div className="input-field">
        <form onSubmit = {playerNameEmitter} >
          <input
            name="nickName"
            maxLength={15}
            type="text"
            id="name-box"
            placeholder="nickname"
            autoFocus />

          <button
            className="btn waves-effect"
            type="submit"
            // onClick = { this.props.enterLobby }
            id="play-box">Enter
          </button>
        </form>
         <button
          className="btn waves-effect"
          onClick={() => this.props.toggleSong()}
          id="music-box"
          >
          <span className={this.props.musicPlayer.songPlaying ? 'glyphicon glyphicon-volume-off' : 'glyphicon glyphicon-volume-up'}></span>
          </button>
        </div>
        <div id="general"> Use "w a s d" or arrow keys to turn </div>
      </div>
    );
  }
}

const mapStateToProps = ({ gameState, players, musicPlayer }) => ({ gameState, players, musicPlayer });
const mapDispatchToProps = dispatch => ({
  enterLobby: () => dispatch(enterLobby()),
  setPlayerName: e => dispatch(addPlayerName(localStorage.getItem('mySocketId'), e.target.nickName.value)),
  toggleSong: event => dispatch(toggleSong())
});

export default connect(mapStateToProps, mapDispatchToProps)(Landing);

// onClick = { this.props.enterLobby }

// <div className="input-field">
//   <input value={nickname}
//     onChange={updateNickname}
//     onKeyPress={enterChatRoom}
//     maxLength={15}
//     type="text"
//     id="name-box"
//     placeholder="nickname"
//     autoFocus/>
//   <button className="Buttons"
//     type="submit"
//     style={nickname.trim() ? { color: 'white' } : { color: 'grey' }}
//     onClick={enterChatRoom}
//     id="play-box">Join a game</button>
// </div>
