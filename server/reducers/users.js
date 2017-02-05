const { Map } = require('immutable');

const { createUser } = require('../utils.js');
// const store = require('../store');
// console.log(store.getState());

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
  console.log("Create and emit user");
  return dispatch => {
    const userId = socket.id;
    dispatch(addUser({id: userId}));

    // this needs to be called after we add the socket id to users on the backend.
    // socket.emit('sendNewUserToFront');

    // const user = Map(createUser(userId));


    //we need to dispatch adding new player as soon as we join the server instance...

    // socket.on('playerWithId', (player) => {
    //   console.log("playerWithId", player);
    //   dispatch(addUser(Map(player)));

      // callback(player);
    // });

    // function callback(player) {
    //   socket.on('worldLoad', () => {
    //     socket.emit('addToWorld', player);
    //   });
    // }
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
      }
      return user;
    });
    //
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
