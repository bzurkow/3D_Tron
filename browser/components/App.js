import React, { Component } from 'react';
import { connect } from 'react-redux';


import Game from './Game';

//not needed yet
// import ControlPanel from './ControlPanel';
// import BugReportForm from './BugReportForm';

//unnecessary
// import Splash from './Splash';


class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log("THIS>PROPS", this.props.players);
    //let { isPlaying } = this.props.gameState;
    // let { bugReportOpen } = this.props.controlPanel;
    return (
      <div>
{ this.props.gameState.isPlaying ? <Game players={ this.props.players } /> : null }
          {/* !isPlaying && <Splash /> */}
          { /* isPlaying && <Game /> */}
          {/* isPlaying && <ControlPanel /> */}
          {/* bugReportOpen && <BugReportForm />  */}
      </div>
      );
  }
}
// players={ this.props.players }
//things we probably need...
const mapStateToProps = ({ gameState, players }) => ({ gameState, players });
const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
