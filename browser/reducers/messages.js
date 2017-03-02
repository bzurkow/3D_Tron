'use strict';
/*----------  INITIAL STATE  ----------*/
const initialState = [];

/*----------  ACTION TYPES  ----------*/
const RECEIVE_MESSAGES = 'RECEIVE_MESSAGES';
const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';
const REMOVE_MESSAGE = 'REMOVE_MESSAGE';
const REMOVE_ALL_MESSAGES = 'REMOVE_ALL_MESSAGES';


/*----------  ACTION CREATORS  ----------*/

export const receiveMessage = (nameAndText) => ({
  type: RECEIVE_MESSAGE,
  nameAndText
});


export const removeAllMessages = () => ({
  type: REMOVE_ALL_MESSAGES
});


/*----------  THUNK CREATORS  ----------*/


/*----------  REDUCER  ----------*/
export default (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_MESSAGE:
      return [...state, action.nameAndText];
    case REMOVE_ALL_MESSAGES:
      return initialState;
    default:
      return state;
  }
};
