import React, { Component } from 'react';
import { connect } from 'react-redux';
import socket from '../socket';

import { addPlayerName } from '../reducers/players';
import world from '../game/world';
//not needed yet
// import ControlPanel from './ControlPanel';
// import BugReportForm from './BugReportForm';


class Landing extends Component {
  constructor(props) {
    super(props);
    this.readyPlayerEmitter = this.readyPlayerEmitter.bind(this);
  }

  readyPlayerEmitter() {
    const socketId = localStorage.getItem('mySocketId');
    socket.emit('readyPlayer', socketId);
  }

  render() {

    //let { isPlaying } = this.props.gameState;
    // let { bugReportOpen } = this.props.controlPanel;
    return (
      <div className="input-field">
        <div id="title">3D TRON</div>
        <div className="input-field">
          <input
            onChange = { this.props.setPlayerName }
            maxLength={15}
            type="text"
            id="name-box"
            placeholder="nickname"
            autoFocus />
          <button
            className="btn waves-effect"
            type="submit"
            onClick = { this.readyPlayerEmitter }
            id="play-box">Join
          </button>
        </div>
        <div id="general"> Use "wasd" or arrow keys to turn </div>
      </div>
    );
  }
}
// players={ this.props.players }
//things we probably need...
const mapStateToProps = ({ gameState, players }) => ({ gameState, players });
const mapDispatchToProps = dispatch => ({
  setPlayerName: e => dispatch(addPlayerName(localStorage.getItem('mySocketId'), e.target.value))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Landing);


// <div className="input-field">
//             <input value={nickname}
//                    onChange={updateNickname}
//                    onKeyPress={enterChatRoom}
//                    maxLength={15}
//                    type="text"
//                    id="name-box"
//                    placeholder="nickname"
//                    autoFocus/>
//             <button className="Buttons"
//                     type="submit"
//                     style={nickname.trim() ? { color: 'white' } : { color: 'grey' }}
//                     onClick={enterChatRoom}
//                     id="play-box">Join a game</button>
//           </div>
