

/* --------------- ACTIONS --------------- */

const ADD_USER = 'ADD_USER';
const REMOVE_USER = 'REMOVE_USER';
const READY_PLAYER = 'READY_PLAYER';

/* --------------- ACTION CREATORS --------------- */

const addUser = userId => {
  return {
    type: ADD_USER,
    userId
  };
};


const removeUser = userId => {
  return {
    type: REMOVE_USER,
    userId
  };
};

const readyPlayer = (playerId) => ({
  type: READY_PLAYER,
  playerId
});


/* --------------- THUNK ACTION CREATORS --------------- */
const createAndEmitUser = socket => {
  console.log("Create and emit user");
  return dispatch => {
    const userId = socket.id;
    dispatch(addUser(userId));
  };
};

const removeUserAndEmit = socket => {
  return dispatch => {
    const userId = socket.id;
    dispatch(removeUser(userId));
    socket.emit('removeUser', userId);
  };
};

const startReady = (playerId) => {
    return dispatch => {
      dispatch(readyPlayer(playerId))
      }
}
/* --------------- REDUCER --------------- */
const initialState = [
  {id: ''},
  {id: ''},
  {id: ''},
  {id: ''},
  {id: ''},
  {id: ''}
];

function userReducer (state = initialState, action) {

  const newUser = [...state];

  switch (action.type) {

    case ADD_USER:
      for (let i = 0; i < state.length; i++) {
        const user = state[i];
        if (!user.id) {
          newUser[i].id = action.userId;
          break;
        }
      }
      return newUser;

    case READY_PLAYER:
    return state.map((user) => {
      if (user.id === action.playerId) {
        user.readyToPlay = true;
      }
      return user;
    });

    case REMOVE_USER:
      return newUser.map(user => {
        if (user.id === action.userId) {
          user.id = '';
          user.readyToPlay = false;
        }
        return user;
      });

    default:
      return state;
  }
}

module.exports = {
  ADD_USER,
  REMOVE_USER,
  createAndEmitUser,
  removeUserAndEmit,
  userReducer,
  startReady
}

