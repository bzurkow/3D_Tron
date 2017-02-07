import React, { Component } from 'react';
import { connect } from 'react-redux';
import socket from '../socket';

import { addPlayerName } from '../reducers/players';
//not needed yet
// import ControlPanel from './ControlPanel';
// import BugReportForm from './BugReportForm';


class Landing extends Component {
  constructor(props) {
    super(props);
  }


  render() {

    function readyPlayerEmitter(){
      const socketId = localStorage.getItem('mySocketId')
      socket.emit('readyPlayer', socketId)
    }

    //let { isPlaying } = this.props.gameState;
    // let { bugReportOpen } = this.props.controlPanel;
    return (
      <div className="input-field">
        <div id="title">3D TRON</div>
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
  }
}
// players={ this.props.players }
//things we probably need...
const mapStateToProps = ({ gameState, players}) => ({ gameState, players });
const mapDispatchToProps = dispatch => ({
    addPlayerName: e => dispatch(addPlayerName(localStorage.getItem('mySocketId'), e.target.value))
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
