import {expect} from 'chai';
import {createStore} from 'redux';

import { userReducer } from '../../../../server/reducers/users';

describe("User Reducer", () => {
  const testUserId = '12345';
  let testStore;

  beforeEach('Create test store', () => {
    testStore = createStore(userReducer);
  });

  it('has proper initial state', () => {
    expect(testStore.getState()).to.be.deep.equal([
      {id: ''}, {id: ''}, {id: ''}, {id: ''}, {id: ''}, {id: ''}
    ]);
  });

  it('Creates user', () => {
    testStore.dispatch({
      type: 'ADD_USER',
      userId: testUserId
    });
    const newState = testStore.getState();
    expect(newState[0].id).to.be.equal(testUserId);
    expect(newState[1].id).to.be.equal('');

    testStore.dispatch({
      type: 'ADD_USER',
      userId: '34567'
    });
    expect(newState[0].id).to.be.equal(testUserId);
    expect(newState[1].id).to.be.equal('34567');
  });

  it('Removes user', () => {
    testStore.dispatch({
      type: 'ADD_USER',
      userId: testUserId
    });
    testStore.dispatch({
      type: 'ADD_USER',
      userId: '34567'
    });
    testStore.dispatch({
      type: 'REMOVE_USER',
      userId: '34567'
    });
    const newState = testStore.getState();
    expect(newState[0].id).to.be.equal(testUserId);
    expect(newState[1].id).to.be.equal('');
  });

  it('Sets player to ready', () => {
    testStore.dispatch({
      type: 'READY_PLAYER',
      playerId: testUserId
    });
    const newState = testStore.getState();
    expect(newState[0].readyToPlay).to.be.true;
    expect(newState[0].active).to.be.true;
    expect(newState[1].readyToPlay).to.be.false;
  });

  it('Sets player to not ready', () => {
    testStore.dispatch({
      type: 'PLAYER_COLLISION',
      playerId: testUserId
    });
    const newState = testStore.getState();
    expect(newState[0].readyToPlay).to.be.false;
    expect(newState[0].active).to.be.false;
  });
});
