import allPlayers from '../game/players';

/*----------  INITIAL STATE  ----------*/
const initialState = allPlayers;

/*----------  ACTION TYPES  ----------*/
const RECEIVE_PLAYERS = 'RECEIVE_PLAYERS';
const REMOVE_ALL_PLAYERS = 'REMOVE_ALL_PLAYERS';
const SET_PLAYER_ID = 'SET_PLAYER_ID';


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
// state[action.index] = action.player

export const removeAllPlayers = () => ({
  type: REMOVE_ALL_PLAYERS
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
    default: return state;
  }
};
