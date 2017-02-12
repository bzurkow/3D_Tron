/*----------  ACTION TYPES  ----------*/
const SET_MAIN_PLAYER = 'SET_MAIN_PLAYER';

/*----------  ACTION CREATORS  ----------*/
export const setMainPlayer = (player) => ({
  type: SET_MAIN_PLAYER,
  player
});

/*----------  THUNK CREATORS  ----------*/

/*----------  REDUCER  ----------*/
export default (mainPlayer = {}, action) => {

  const newPlayer = Object.assign({}, mainPlayer);

  switch (action.type) {
    case SET_MAIN_PLAYER:
      return action.player;

    default: return mainPlayer;
  }
};
