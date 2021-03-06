import React, { Component } from 'react';
import { connect } from 'react-redux';
import socket from '../socket';
import Chat from './Chat';


//not needed yet
// import ControlPanel from './ControlPanel';
// import BugReportForm from './BugReportForm';


class LobbyRoom extends Component {
  constructor(props) {
    super(props);
  }


  render() {

    function readyPlayerEmitter(){
      console.log("CLICK????****")
      const socketId = localStorage.getItem('mySocketId')
      socket.emit('readyPlayer', socketId)
  }

    let exisitingPlayers = this.props.players.filter(player => {
      return player.playerName;
    })

    console.log('exisitingPlayer', exisitingPlayers)
    //let { isPlaying } = this.props.gameState;
    // let { bugReportOpen } = this.props.controlPanel;
    return (
      <div id="lobbyRoom">
      <div id="lobby-title">STAGING AREA</div>
        <sidebar>
          <h4 id='players-online'>PLAYERS ONLINE</h4>
          <ul id="listName">
            { exisitingPlayers.map((player,index) => {
              return (
                <li className='listName-item' key={index}>
                {player.playerName}
                </li>
              )
            })
            }
          </ul>
        </sidebar>
        <Chat />

        <button className="btn waves-effect"
                type="submit"
                onClick = {readyPlayerEmitter}
                id="join-box">Join</button>

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
