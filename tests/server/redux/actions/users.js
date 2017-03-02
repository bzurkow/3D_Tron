import {expect} from 'chai';

import {addUser, removeUser, startReady, playerCollision} from '../../../../server/reducers/users';

describe("|----- BACKEND User Actions -----|", () => {
  const testUserId = '12345';

  it('Adds user', () => {
    expect(addUser(testUserId)).to.be.deep.equal({
      type: 'ADD_USER',
      userId: testUserId
    });
  });

  it('Removes user', () => {
    expect(removeUser(testUserId)).to.be.deep.equal({
      type: 'REMOVE_USER',
      userId: testUserId
    });
  });

  it('Sets user to ready', () => {
    expect(startReady(testUserId)).to.be.deep.equal({
      type: 'READY_PLAYER',
      playerId: testUserId
    });
  });

  it('Sets data of user that collided', () => {
    expect(playerCollision(testUserId)).to.be.deep.equal({
      type: 'PLAYER_COLLISION',
      playerId: testUserId
    });
  });

});
