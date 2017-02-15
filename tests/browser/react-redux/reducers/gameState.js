import {expect} from 'chai';
import {createStore} from 'redux';

import gameStateReducer from '../../../../browser/reducers/gameState';

describe("|----- FRONTEND Game State Reducer -----|", () => {
  let testStore;

  beforeEach('Create test store', () => {
    testStore = createStore(gameStateReducer);
  });

  it('has proper initial state', () => {
    expect(testStore.getState()).to.be.deep.equal({
      isPlaying: false,
      isEnter: true
    });
  });

  it('Starts Game', () => {
    expect(testStore.getState().isPlaying).to.be.false;
    testStore.dispatch({ type: 'START_GAME' });
    expect(testStore.getState().isPlaying).to.be.true;
  });

  it('Stops Game', () => {
    expect(testStore.getState().isPlaying).to.be.false;
    testStore.dispatch({ type: 'START_GAME' });
    expect(testStore.getState().isPlaying).to.be.true;
    testStore.dispatch({ type: 'STOP_GAME' });
    expect(testStore.getState().isPlaying).to.be.false;
  });
});
