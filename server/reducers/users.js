//const { Map } = require('immutable');

const { createUser } = require('../utils.js');

/* --------------- ACTIONS --------------- */

const ADD_USER = 'ADD_USER';
const UPDATE_USER_DATA = 'UPDATE_USER_DATA';
const REMOVE_USER = 'REMOVE_USER';
const READY_PLAYER = 'READY_PLAYER';

/* --------------- ACTION CREATORS --------------- */

const addUser = user => {
  return {
    type: ADD_USER,
    user
  };
};

const updateUserData = userData => {
  return {
    type: UPDATE_USER_DATA,
    userData
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
    dispatch(addUser({
      id: userId,
      velocity: {},
      up: {}
    }));
  };
};

const removeUserAndEmit = socket => {
  return dispatch => {
    const userId = socket.id;
    dispatch(removeUser(userId));
    socket.broadcast.emit('removeUser', userId);
  };
};


const startReady = (playerId) => {
    return dispatch => {
      dispatch(readyPlayer(playerId))
      }
};

/* --------------- REDUCER --------------- */

function userReducer (state = [], action) {
  switch (action.type) {

    case ADD_USER:
     return [...state, action.user];
      // return state.set(action.user.get('id'), action.user);

    case UPDATE_USER_DATA:
    return state.map((user, index) => {
      console.log("IN UPDATE_USER_DATA");
      if (user.id === action.userData.id) {
        user.velocity = action.userData.velocity;
        // user.up = action.userData.up;
      }
      return user;
    });

    case READY_PLAYER:
    return state.map((user) => {
      if (user.id === action.playerId) {
        user.readyToPlay = true;
      }
      return user;
    });

    case REMOVE_USER:
      return state.filter(user => user.id !== action.userId);
      // return state.delete(action.userId);
    default:
      return state;
  }
}

module.exports = {
  ADD_USER,
  UPDATE_USER_DATA,
  REMOVE_USER,
  createAndEmitUser,
  updateUserData,
  removeUserAndEmit,
  userReducer,
  startReady
};
