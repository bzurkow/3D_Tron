/*-------- ACTION TYPES  ---------*/

//const IS_DISPLAYED = 'IS_DISPLAYED';
const START_GAME = 'START_GAME';
const STOP_GAME = 'STOP_GAME';
const ENTER_LOBBY = 'ENTER_LOBBY';

/*=------ACTION CREATORS-------*/

const initialState = {
  isPlaying: false,
  isEnter: true
};

export const startGame = () => ({
  type: START_GAME,
});

export const stopGame = () => ({
  type: STOP_GAME
});

export const enterLobby = () => ({
  type: ENTER_LOBBY
});

/*-------REDUCER------------*/

export default (state = initialState, action) => {
  switch (action.type) {
    case START_GAME:
      return Object.assign({}, state, { isPlaying: true });

//Not using Stop game right now but we will probably use something similiar for game reset
    case STOP_GAME:
      return Object.assign({}, state, { isPlaying: false });

    case ENTER_LOBBY:
      return Object.assign({}, state, { isEnter: false });

    default:
      return state;
  }
};
