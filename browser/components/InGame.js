import React, { Component } from 'react';

export const DeadNoWinner = () => {
 return(
 	<div>
 		<div className="input-field">
 		  <div id="title">You Crashed!</div>
 		</div>
 		<div id="general">
 		  Click and drag with your mouse to watch the rest of the game!
 		</div>
 	</div>
 )
}

export const Winner = () => {
 return(
 	<div>
 		<div className="input-field">
 		  <div id="title">You Win!</div>
 		</div>
 		<div id="general">
 		  Game will reload home page soon
 		</div>
 	</div>
 )
}

class dWW extends Component {
	constructor(props){
		super(props)
	}
	render(){
		let winner = this.props.players.filter(player => player.winner === true)[0].playerName
		console.log("winner in dWW", winner)
		return(
		 	<div>
		 		<div className="input-field">
		 		  <div id="title">{winner} Wins!</div>
		 		</div>
		 		<div id="general">
		 		  Game will reload home page soon
		 		</div>		
		 	</div>
 		)

	}
}

import { connect } from 'react-redux'

export const DeadWithWinner = connect(({ players }) => ({ players }))(dWW)