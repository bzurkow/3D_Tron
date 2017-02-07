import { turnLeft, turnRight, turnUp, turnDown } from '../game/directionsFunctions';
/*----------  ACTION TYPES  ----------*/
const SET_MAIN_PLAYER = 'SET_MAIN_PLAYER';
const TURN_PLAYER_LEFT = 'TURN_PLAYER_LEFT';
const TURN_PLAYER_RIGHT = 'TURN_PLAYER_RIGHT';
const TURN_PLAYER_UP = 'TURN_PLAYER_UP';
const TURN_PLAYER_DOWN = 'TURN_PLAYER_DOWN';

/*----------  ACTION CREATORS  ----------*/
export const setMainPlayer = (player) => ({
  type: SET_MAIN_PLAYER,
  player
});

export const turnPlayer = (direction) => {
  let type;
  if (direction === 37) type = TURN_PLAYER_LEFT;
  if (direction === 39) type = TURN_PLAYER_RIGHT;
  if (direction === 38) type = TURN_PLAYER_UP;
  if (direction === 40) type = TURN_PLAYER_DOWN;
  return { type };
};

/*----------  THUNK CREATORS  ----------*/

/*----------  REDUCER  ----------*/
export default (mainPlayer = {}, action) => {

  const newPlayer = Object.assign({}, mainPlayer);

  switch (action.type) {
    case SET_MAIN_PLAYER:
      return action.player;
    case TURN_PLAYER_LEFT:
      return turnLeft(mainPlayer);
    case TURN_PLAYER_RIGHT:
      return turnRight(mainPlayer);
    case TURN_PLAYER_UP:
      return turnUp(mainPlayer);
    case TURN_PLAYER_DOWN:
      return turnDown(mainPlayer);

    default: return mainPlayer;
  }
};
