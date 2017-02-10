import {expect} from 'chai';
import {createStore} from 'redux';

import { userReducer } from '../../../../server/reducers/users';

describe("|----- BACKEND User Reducer -----|", () => {
  const testUserId = '12345';
  const anotherTestId = '34567';
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
      userId: anotherTestId
    });
    expect(newState[0].id).to.be.equal(testUserId);
    expect(newState[1].id).to.be.equal(anotherTestId);
  });

  it('Removes user', () => {
    testStore.dispatch({
      type: 'ADD_USER',
      userId: testUserId
    });
    testStore.dispatch({
      type: 'ADD_USER',
      userId: anotherTestId
    });
    testStore.dispatch({
      type: 'REMOVE_USER',
      userId: anotherTestId
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
