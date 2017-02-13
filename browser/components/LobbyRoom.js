import React, { Component } from 'react';
import { connect } from 'react-redux';
import socket from '../socket';
import Chat from './Chat';


//not needed yet
// import ControlPanel from './ControlPanel';
// import BugReportForm from './BugReportForm';
import { makeReady } from '../reducers/players';
import store from '../store';


class LobbyRoom extends Component {
  constructor(props) {
    super(props);

    this.readyPlayerEmitter = this.readyPlayerEmitter.bind(this);
  }

 readyPlayerEmitter(){
      console.log("CLICK????****")
      const socketId = localStorage.getItem('mySocketId')
      store.dispatch(makeReady(socketId));
      socket.emit('readyPlayer', socketId)
  }

  render() {



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
          <h4 id='players-online'>
          PLAYERS ONLINE ----- READY
          </h4>
          <ul id="listName">
            { exisitingPlayers.map((player,index) => {
              return (
                <li className='listName-item' key={index}>
                {player.playerName}
                {player.ready ? <span className="glyphicon glyphicon-ok"></span> : null}
                </li>
              )
            })
            }
          </ul>
        </sidebar>
        <Chat />

        <button className="btn waves-effect"
                type="submit"
                onClick = {this.readyPlayerEmitter}
                id="join-box">Join</button>

        </div>
      );
  }
}
// players={ this.props.players }
//things we probably need...
const mapStateToProps = ({ gameState, players}) => ({ gameState, players });
const mapDispatchToProps = dispatch => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LobbyRoom);
