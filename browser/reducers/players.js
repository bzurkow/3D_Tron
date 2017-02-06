import allPlayers from '../game/players';
import world from '../game/world';
import { turnLeft, turnRight, turnUp, turnDown } from '../game/gamePlayFunctions';
// import socket from '../socket';

/*----------  INITIAL STATE  ----------*/
const initialState = allPlayers;

/*----------  ACTION TYPES  ----------*/
const RECEIVE_PLAYERS = 'RECEIVE_PLAYERS';
const REMOVE_ALL_PLAYERS = 'REMOVE_ALL_PLAYERS';
const SET_PLAYER_ID = 'SET_PLAYER_ID';

const UPDATE_PLAYER = 'UPDATE_PLAYER';
const TURN_PLAYER_LEFT = 'TURN_PLAYER_LEFT';
const TURN_PLAYER_RIGHT = 'TURN_PLAYER_RIGHT';
const TURN_PLAYER_UP = 'TURN_PLAYER_UP';
const TURN_PLAYER_DOWN = 'TURN_PLAYER_DOWN';

/*----------  ACTION CREATORS  ----------*/
export const receivePlayers = (players) => ({
  type: RECEIVE_PLAYERS,
  players
});

export const setPlayerId = (playerId, index) => ({
  type: SET_PLAYER_ID,
  playerId,
  index
});

export const removeAllPlayers = () => ({
  type: REMOVE_ALL_PLAYERS
});


export const turnPlayer = (direction, player) => {
  let turn;
  if (direction === "Left") turn = TURN_PLAYER_LEFT;
  if (direction === "Right") turn = TURN_PLAYER_RIGHT;
  if (direction === "Up") turn = TURN_PLAYER_UP;
  if (direction === "Down") turn = TURN_PLAYER_DOWN;
  return { turn, player };
};

export const updatePlayer = (linearVelocity, player) => ({
  type: UPDATE_PLAYER,
  linearVelocity,
  player
});

/*----------  THUNK CREATORS  ----------*/

/*----------  REDUCER  ----------*/
export default (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_PLAYERS:
      return action.players;
    case REMOVE_ALL_PLAYERS:
      return initialState;
    case SET_PLAYER_ID:
      return state.map((bike, index) => {
        if (index === action.index) {
          bike.id = action.playerId;
        }
        return bike;
      });

      case TURN_PLAYER_LEFT:
        return;
      case TURN_PLAYER_RIGHT:
        return;
      case TURN_PLAYER_UP:
        return;
      case TURN_PLAYER_DOWN:
        return;

    case UPDATE_PLAYER:
      console.log("ACTION", action);
      return state.map((player, index) => {
        if (player.id === action.player.id) {
          player.ball.setLinearVelocity(action.linearVelocity);
        }
        return player;
      });
    default: return state;
  }
};
