import { expect } from 'chai';

import { Context } from '../../src/heijunka/Context';

describe('Context', () => {
  it('contains does know an id after it has been added', () => {
    const aId = 'aId';
    const context = new Context('id', 'name').add(aId);
    expect(context.contains(aId)).to.be.true;
  });

  it('even after adding a context twice, it\'s only required to remove it once', () => {
    const aId = 'aId';
    const context = new Context('id', 'name').add(aId).add(aId).remove(aId);
    expect(context.contains(aId)).to.be.false;
  });
});
