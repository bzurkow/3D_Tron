import { combineReducers } from 'redux';
import players from './players';
import mainPlayer from './mainPlayer';
import gameState from './gameState';
import messags from './messages';

export default combineReducers({
  mainPlayer,
  players,
  gameState,
  messages
});
