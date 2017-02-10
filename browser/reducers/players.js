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
const ADD_PLAYER_NAME = 'ADD_PLAYER_NAME';
const REMOVE_PLAYER = 'REMOVE_PLAYER';

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


export const removePlayer = (userId) => ({
  type: REMOVE_PLAYER,
  userId
});

export const removeAllPlayers = () => ({
  type: REMOVE_ALL_PLAYERS
});

/*----------  THUNK CREATORS  ----------*/

/*----------  REDUCER  ----------*/
export default (players = initialState, action) => {

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

    case ADD_PLAYER_NAME:
      return players.map((bike) => {
        if (bike.id === action.playerId) {
          bike.playerName = action.playerName;
        }
        return bike;
      });

    case REMOVE_PLAYER:
      return players.map((bike) => {
        if (bike.id === action.userId) {
          bike.id = "";
        }
        return bike;
      });

    default: return players;
  }
};
