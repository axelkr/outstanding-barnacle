import { expect } from 'chai';

import { Context } from '../../src/heijunka/Context';
import { ContextCollection } from '../../src/heijunka/ContextCollection';


describe('ContextCollection', () => {
  it('isImplicitlyActive: if no context is explicitly active, all contexts are active', () => {
    const aContext = generateContext('id');
    expect(ContextCollection.createEmptyCollection().isImplicitlyActive(aContext)).to.be.true;
  });

  it('isImplicitlyActive: if any context is explicitly active, no context is implicitly active', () => {
    const aContext = generateContext('id');
    const anotherContext = generateContext('id2');
    const aContextActivated = ContextCollection.createEmptyCollection().activate(aContext);
    expect(aContextActivated.isImplicitlyActive(aContext)).to.be.false;
    expect(aContextActivated.isImplicitlyActive(anotherContext)).to.be.false;
  });

  it('even if activated multiple times, one deactivation suffices', () => {
    const aContext = generateContext('anId');
    const aContextActivatedTwiceDeactivatedOnce = ContextCollection.createEmptyCollection().activate(aContext).activate(aContext).deactivate(aContext);
    expect(aContextActivatedTwiceDeactivatedOnce.isExplicitlyActive(aContext)).to.be.false;
  });

  it('any id is active if no context has been defined so far', () => {
    expect(ContextCollection.createEmptyCollection().isIdActive('id')).to.be.true;
  })

  it('any id is active if all contexts are implicitly active', () => {
    expect(ContextCollection.createEmptyCollection().add(generateContext('contextId')).isIdActive('id')).to.be.true;
  })

  const generateContext = (id: string) => new Context(id, id);
});