import React, { Component } from 'react';
import { connect } from 'react-redux';

<<<<<<< HEAD
import Landing from './Landing'
=======
>>>>>>> b17e175c1402fe11e9dd2ea09aebb8ab288efac0
import Game from './Game';
import Landing from './Landing';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log("THIS>PROPS", this.props.players);
    return (
      <div>
<<<<<<< HEAD
 { !this.props.gameState.isPlaying && <Landing /> }
 { this.props.gameState.isPlaying && <Game players={ this.props.players } /> }
          {/* !isPlaying && <Splash /> */}
          { /* isPlaying && <Game /> */}
          {/* isPlaying && <ControlPanel /> */}
          {/* bugReportOpen && <BugReportForm />  */}
=======
        { this.props.gameState.isPlaying ? <Game /> : <Landing /> }
>>>>>>> b17e175c1402fe11e9dd2ea09aebb8ab288efac0
      </div>
      );
  }
}

const mapStateToProps = ({ gameState, players }) => ({ gameState, players });
const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
