/*----------  ACTION TYPES  ----------*/
const SET_MAIN_PLAYER = 'SET_MAIN_PLAYER';
const MAIN_PLAYER_DEATH = 'MAIN_PLAYER_DEATH';

/*----------  ACTION CREATORS  ----------*/
export const setMainPlayer = (player) => ({
  type: SET_MAIN_PLAYER,
  player
});

export const onDeathMainPlayer = (me) => ({
  type: MAIN_PLAYER_DEATH,
  me
});

/*----------  THUNK CREATORS  ----------*/

/*----------  REDUCER  ----------*/
export default (mainPlayer = {}, action) => {

  const newPlayer = Object.assign({}, mainPlayer);

  switch (action.type) {
    case SET_MAIN_PLAYER:
      return action.player;
    case MAIN_PLAYER_DEATH:
      // newPlayer.si = 0;
      newPlayer.status = 'dead';
      return newPlayer;

    default: return mainPlayer;
  }
};
