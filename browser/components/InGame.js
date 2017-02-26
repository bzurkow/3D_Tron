import React from 'react';
import { connect } from 'react-redux';

export const DeadNoWinner = () => (
  <div>
    <div className="input-field">
      <div id="title">You Crashed!</div>
    </div>
    <div id="general">
      Click and drag with your mouse to watch the rest of the game!
    </div>
  </div>
);

export const Winner = () => (
  <div>
    <div className="input-field">
      <div id="title">You Win!</div>
    </div>
    <div id="general">
      Game will reload home page soon
    </div>
  </div>
);

const DeadWithWinner = ({ players }) => (
  <div>
    <div className="input-field">
      <div id="title">{players.find(player => player.winner).playerName} Wins!</div>
    </div>
    <div id="general">
      Game will reload home page soon
    </div>
  </div>
);

export default connect(({ players }) => ({ players }))(DeadWithWinner);
