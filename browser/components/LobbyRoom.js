import React, { Component } from 'react';
import { connect } from 'react-redux';
import socket from '../socket';
import { Table } from 'react-bootstrap';


//not needed yet
// import ControlPanel from './ControlPanel';
// import BugReportForm from './BugReportForm';


class LobbyRoom extends Component {
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
      <div id="lobbyRoom">
        <sidebar>
          <ul>
            <li></li>
          </ul>
        </sidebar>
        <div>
        <div id="lobby-title">STAGING AREA</div>
          <div className="input-field">
            <div id="stage-box">
              <ul>
                <li>YO</li>
                <li>YO</li>
              </ul>

            </div>

            <button className="btn waves-effect"
                    type="submit"
                    onClick = {readyPlayerEmitter}
                    id="play-box">Join</button>
          </div>
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
)(LobbyRoom);
