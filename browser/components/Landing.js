import React, { Component } from 'react';
import { connect } from 'react-redux';
import socket from '../socket';

import { addPlayerName } from '../reducers/players';
<<<<<<< HEAD
=======
import world from '../game/world';
>>>>>>> b17e175c1402fe11e9dd2ea09aebb8ab288efac0
//not needed yet
// import ControlPanel from './ControlPanel';
// import BugReportForm from './BugReportForm';


class Landing extends Component {
  constructor(props) {
    super(props);
<<<<<<< HEAD
  }


  render() {

    function readyPlayerEmitter(){
      const socketId = localStorage.getItem('mySocketId')
      socket.emit('readyPlayer', socketId)
    }

=======
    this.readyPlayerEmitter = this.readyPlayerEmitter.bind(this);
  }

  readyPlayerEmitter() {
    const socketId = localStorage.getItem('mySocketId');
    socket.emit('readyPlayer', socketId);
  }

  render() {

>>>>>>> b17e175c1402fe11e9dd2ea09aebb8ab288efac0
    //let { isPlaying } = this.props.gameState;
    // let { bugReportOpen } = this.props.controlPanel;
    return (
      <div className="input-field">
        <div id="title">3D TRON</div>
<<<<<<< HEAD
          <div className="input-field">
            <input
                   onChange = { this.props.addPlayerName }
                   maxLength={15}
                   type="text"
                   id="name-box"
                   placeholder="nickname"
                   autoFocus/>
            <button className="btn waves-effect"
                    type="submit"
                    onClick = {readyPlayerEmitter}
                    id="play-box">Join</button>
          </div>
        </div>
      );
=======
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
      </div>
    );
>>>>>>> b17e175c1402fe11e9dd2ea09aebb8ab288efac0
  }
}
// players={ this.props.players }
//things we probably need...
<<<<<<< HEAD
const mapStateToProps = ({ gameState, players}) => ({ gameState, players });
const mapDispatchToProps = dispatch => ({
    addPlayerName: e => dispatch(addPlayerName(localStorage.getItem('mySocketId'), e.target.value))
=======
const mapStateToProps = ({ gameState, players }) => ({ gameState, players });
const mapDispatchToProps = dispatch => ({
  setPlayerName: e => dispatch(addPlayerName(localStorage.getItem('mySocketId'), e.target.value))
>>>>>>> b17e175c1402fe11e9dd2ea09aebb8ab288efac0
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
