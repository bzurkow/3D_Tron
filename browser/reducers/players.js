import allPlayers from '../game/players';
import world from '../game/world';

import { rotate } from '../game/gamePlayFunctions';
// import socket from '../socket';

/*----------  INITIAL STATE  ----------*/
const initialState = allPlayers;

/*----------  ACTION TYPES  ----------*/
const RECEIVE_PLAYERS = 'RECEIVE_PLAYERS';
const REMOVE_ALL_PLAYERS = 'REMOVE_ALL_PLAYERS';
const SET_PLAYER_ID = 'SET_PLAYER_ID';
const UPDATE_PLAYER = 'UPDATE_PLAYER';
const ADD_PLAYER_NAME = 'ADD_PLAYER_NAME';
/*----------  ACTION CREATORS  ----------*/
export const receivePlayers = (players) => ({
  type: RECEIVE_PLAYERS,
  players
});

export const setPlayerId = (users) => ({
  type: SET_PLAYER_ID,
  users
});

export const addPlayerName = (playerId, playerName) => ({
  type: ADD_PLAYER_NAME,
  playerId,
  playerName
});

export const updatePlayer = (linearVelocity, up, player) => ({
  type: UPDATE_PLAYER,
  linearVelocity,
  up,
  player
});

export const removeAllPlayers = () => ({
  type: REMOVE_ALL_PLAYERS
});

/*----------  THUNK CREATORS  ----------*/

/*----------  REDUCER  ----------*/
export default (players = initialState, action) => {

  // const newPlayers = Object.assign({}, players);
  const newPlayers = [...players];

  switch (action.type) {
    case RECEIVE_PLAYERS:
      return action.players;
    case REMOVE_ALL_PLAYERS:
      return initialState;
    case SET_PLAYER_ID:
      action.users.map((user, index) => {
        if (user.id) {
          newPlayers[index].id = user.id;
        }
        return user;
      });
      return newPlayers;
      // return players.map((player, index) => {
      //   if (index === action.index) {
      //     player.id = action.playerId;
      //   }
      //   return player;
      // });
    case UPDATE_PLAYER:
      return players.map((player, index) => {
        if (player.id === action.player.id) {
          console.log("ACTION LINEAR", action.up);
          player.ball.setLinearVelocity(action.linearVelocity);
          player.ball.native._physijs.linearVelocity.set(action.linearVelocity.x, action.linearVelocity.y, action.linearVelocity.z);
          player.ball.native.up.set(action.up.x, action.up.y, action.up.z);
          let wallToAdd = player.wall[0];
          player.wall = [];
          player.walls.push(wallToAdd);
          rotate(player);
        }
        return player;
      });

    default: return players;
  }
};
