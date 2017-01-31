const { Map } = require('immutable');

const { createUser } = require('../utils.js');

/* --------------- INITIAL STATE --------------- */

const initialState = Map({});

/* --------------- ACTIONS --------------- */

const ADD_USER = 'ADD_USER';
const UPDATE_USER_DATA = 'UPDATE_USER_DATA';
const REMOVE_USER = 'REMOVE_USER';

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

/* --------------- THUNK ACTION CREATORS --------------- */

const createAndEmitUser = socket => {
  return dispatch => {
    const userId = socket.id;
    const user = Map(createUser(userId));
    dispatch(addUser(user));
    socket.on('sceneLoad', () => {
      socket.emit('createUser', user);
    });
  };
};

const removeUserAndEmit = socket => {
  return dispatch => {
    const userId = socket.id;
    dispatch(removeUser(userId));
    socket.broadcast.emit('removeUser', userId);
  };
};

/* --------------- REDUCER --------------- */

function userReducer (state = initialState, action) {
  switch (action.type) {

    case ADD_USER:
      return state.set(action.user.get('id'), action.user);

    case UPDATE_USER_DATA:
      return state.mergeIn([action.userData.get('id')], action.userData);

    case REMOVE_USER:
      return state.delete(action.userId);

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
  userReducer
};

// /*----------  INITIAL STATE  ----------*/
// const initialState = {};


// /*----------  ACTION TYPES  ----------*/

// const ADD_USER = 'ADD_USER';
// const ASSIGN_WORLD = 'ASSIGN_WORLD';
// const UNASSIGN_WORLD = 'UNASSIGN_WORLD';
// const REMOVE_USER = 'REMOVE_USER';

// /*--------
// --  ACTION CREATORS  ----------*/
// module.exports.addUser = id => ({
//   type: ADD_USER,
//   id
// });

// module.exports.assignWorld = (id, world) => ({
//   type: ASSIGN_WORLD,
//   id,
//   world
// });

// module.exports.unassignWorld = id => ({
//   type: UNASSIGN_WORLD,
//   id
// });

// module.exports.removeUser = id => ({
//   type: REMOVE_USER,
//   id
// });


// /*----------  THUNK CREATORS  ----------*/


// ----------  REDUCER  ----------
// module.exports.reducer = (state = initialState, action) => {
//   let user;
//   let newState = Object.assign({}, state);
//   switch (action.type) {
//     case ADD_USER:
//       newState[action.id] = {world: null};
//       return newState;
//     case ASSIGN_WORLD:
//       user = Object.assign({}, newState[action.id], {world: action.world});
//       newState[action.id] = user;
//       return newState;
//     case UNASSIGN_WORLD:
//       user = Object.assign({}, newState[action.id], {world: null});
//       newState[action.id] = user;
//       return newState;
//     case REMOVE_USER:
//       delete newState[action.id];
//       return newState;
//     default: return state;
//   }
// };


