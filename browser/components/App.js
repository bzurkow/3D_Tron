import React, { Component } from 'react';
import { connect } from 'react-redux';


import Game from './Game';

//not needed yet
// import ControlPanel from './ControlPanel';
// import BugReportForm from './BugReportForm';

//unnecessary
// import Splash from './Splash';


export default class App extends Component {
  render() {
    //let { isPlaying } = this.props.gameState;
    // let { bugReportOpen } = this.props.controlPanel;
    return (
      <div>
      	<Game />
          {/* !isPlaying && <Splash /> */}
          { /* isPlaying && <Game /> */}
          {/* isPlaying && <ControlPanel /> */}
          {/* bugReportOpen && <BugReportForm />  */}
      </div>
      );
  }
}

//things we probably need...
// const mapStateToProps = ({ gameState, controlPanel }) => ({ gameState, controlPanel });
// const mapDispatchToProps = dispatch => ({});

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(App);