import { Context } from '../../src/heijunka/Context';
import { ContextCollection } from '../../src/heijunka/ContextCollection';

describe('ContextCollection', () => {
  it('isImplicitlyActive: if no context is explicitly active, all contexts are active', () => {
    const aContext = generateContext('id');
    expect(ContextCollection.createEmptyCollection().isImplicitlyActive(aContext)).toBeTruthy();
  });

  it('isImplicitlyActive: if any context is explicitly active, no context is implicitly active', () => {
    const aContext = generateContext('id');
    const anotherContext = generateContext('id2');
    const aContextActivated = ContextCollection.createEmptyCollection().activate(aContext);
    expect(aContextActivated.isImplicitlyActive(aContext)).toBeFalsy();
    expect(aContextActivated.isImplicitlyActive(anotherContext)).toBeFalsy();
  });

  it('even if activated multiple times, one deactivation suffices', () => {
    const aContext = generateContext('anId');
    const aContextActivatedTwiceDeactivatedOnce = ContextCollection.createEmptyCollection().activate(aContext).activate(aContext).deactivate(aContext);
    expect(aContextActivatedTwiceDeactivatedOnce.isExplicitlyActive(aContext)).toBeFalsy();
  });

  it('any id is active if no context has been defined so far', () => {
    expect(ContextCollection.createEmptyCollection().isIdActive('id')).toBeTruthy();
  })

  it('any id is active if all contexts are implicitly active', () => {
    expect(ContextCollection.createEmptyCollection().add(generateContext('contextId')).isIdActive('id')).toBeTruthy();
  })

  const generateContext = (id: string) => new Context(id, id);
});