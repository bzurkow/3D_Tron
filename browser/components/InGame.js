'use strict';
import React from 'react';

export const DeadNoWinner = () => (
  <div>
    <div className="end-game">
      <div id="title">You Crashed!</div>
    </div>
    <div id="general">
      Click and drag with your mouse to watch the rest of the game!
    </div>
  </div>
);

export const Winner = () => (
  <div>
    <div className="end-game">
      <div id="title">You Win!</div>
    </div>
    <div id="general">
      Game will reload home page soon
    </div>
  </div>
);

export const DeadWithWinner = ({ players }) => (
  <div>
    <div className="end-game">
      <div id="title">{players.find(player => player.winner).playerName} Wins!</div>
    </div>
    <div id="general">
      Game will reload home page soon
    </div>
  </div>
);
