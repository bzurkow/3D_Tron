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

    let exisitingPlayers = this.props.players.filter(player => {
      console.log("PLAYER UAUA", player);
      console.log("playerID", player.id)
      return player.playerName;
    })

    console.log('exisitingPlayer', exisitingPlayers)
    //let { isPlaying } = this.props.gameState;
    // let { bugReportOpen } = this.props.controlPanel;
    return (
      <div id="lobbyRoom">
      <div id="lobby-title">STAGING AREA</div>
        <sidebar>
          <ul>
            { exisitingPlayers.map((player,index) => {
              console.log("PLAYER IN MAP", player);
              return (
                <li className='listName' key={index}>
                {player.playerName}
                </li>
              )
            })
            }
          </ul>
        </sidebar>

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
