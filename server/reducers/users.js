/* --------------- ACTIONS --------------- */

const ADD_USER = 'ADD_USER';
const REMOVE_USER = 'REMOVE_USER';
const READY_PLAYER = 'READY_PLAYER';
const PLAYER_COLLISION = 'PLAYER_COLLISION';
const ADD_USER_NAME = 'ADD_USER_NAME';

/* --------------- ACTION CREATORS --------------- */

const addUser = (userId) => ({
  type: ADD_USER,
  userId
});

const removeUser = (userId) => ({
  type: REMOVE_USER,
  userId
});

const startReady = (playerId) => ({
  type: READY_PLAYER,
  playerId
});

const playerCollision = (playerId) => ({
  type: PLAYER_COLLISION,
  playerId
});

const addUserName = (userId, playerName) => ({
  type: ADD_USER_NAME,
  userId,
  playerName
});


/* --------------- THUNK ACTION CREATORS --------------- */
const createAndEmitUser = socket => {
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

// const startReady = playerId => {
//   return dispatch => {
//     dispatch(readyPlayer(playerId));
//   };
// };
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
          user.active = true;
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

    case ADD_USER_NAME:
      return state.map((user) => {
      if (user.id === action.userId) {
        console.log("%%%% setting playerName backend", action.playerName);
        user.playerName = action.playerName;
      }
      return user;
    });

    case PLAYER_COLLISION:
      return state.map((user) => {
      if (user.id === action.playerId) {
        user.readyToPlay = false;
        user.active = false;
      }
      return user;
    });

    default: return state;
  }
}

module.exports = {
  ADD_USER,
  addUser,
  REMOVE_USER,
  removeUser,
  createAndEmitUser,
  removeUserAndEmit,
  userReducer,
  startReady,
  playerCollision,
  addUserName
};
