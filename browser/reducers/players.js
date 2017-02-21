import allPlayers from '../game/players';
import world from '../game/world';
import store from '../store';

/*----------  INITIAL STATE  ----------*/
const initialState = allPlayers;

/*----------  ACTION TYPES  ----------*/
const SET_PLAYER_ID = 'SET_PLAYER_ID';
const ADD_PLAYER_NAME = 'ADD_PLAYER_NAME';
const REMOVE_PLAYER = 'REMOVE_PLAYER';
const ON_DEATH = 'ON_DEATH';
const DECLARE_WINNER = 'DECLARE_WINNER';

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

export const onDeath = (player) => ({
  type: ON_DEATH,
  player
});

export const declareWinner = (player) => ({
  type: DECLARE_WINNER,
  player
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
      return players.map((player) => {
        if (player.id === action.playerId) {
          player.playerName = action.playerName;
        }
        return player;
      });

    case REMOVE_PLAYER:
      return players.map((bike) => {
        if (bike.id === action.userId) {
          bike.id = "";
        }
        return bike;
      });

    case ON_DEATH:
      return players.map((player) => {
        if (player.signature === action.player.signature){
          clearInterval(player.si);
          player.status = 'dead';
        }
        return player;
      });

    case DECLARE_WINNER:
      return players.map((player) => {
        if (player.signature === action.player.signature){
          player.winner = true;
        }
        return player;
      });

    default: return players;
  }
};
