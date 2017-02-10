import allPlayers from '../game/players';
import world from '../game/world';

import { rotate } from '../game/gamePlayFunctions';
// import socket from '../socket';

/*----------  INITIAL STATE  ----------*/
const initialState = allPlayers;

/*----------  ACTION TYPES  ----------*/
const SET_PLAYER_ID = 'SET_PLAYER_ID';
const ADD_PLAYER_NAME = 'ADD_PLAYER_NAME';
const REMOVE_PLAYER = 'REMOVE_PLAYER';

/*----------  ACTION CREATORS  ----------*/
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

/*----------  THUNK CREATORS  ----------*/

/*----------  REDUCER  ----------*/
export default (players = initialState, action) => {

  const newPlayers = [...players];

  switch (action.type) {

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
