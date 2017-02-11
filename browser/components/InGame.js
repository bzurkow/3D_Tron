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
 		  Game will reset shortly
 		</div>
 	</div>
 )
}

export const DeadWithWinner = () => {
 return(
 	<div>
 	
 	</div>
 )
}
