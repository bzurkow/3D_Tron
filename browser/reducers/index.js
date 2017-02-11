import { combineReducers } from 'redux';
import players from './players';
import mainPlayer from './mainPlayer';
import gameState from './gameState';
import musicPlayer from './musicPlayer';

export default combineReducers({
  mainPlayer,
  players,
  gameState,
  musicPlayer
});
