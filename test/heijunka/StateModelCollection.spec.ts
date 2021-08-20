import { StateModelCollection } from '../../src/heijunka/StateModelCollection';
import { State } from '../../src/heijunka/State';
import { StateModel } from '../../src/heijunka/StateModel';

describe('StateModelCollection', () => {
  it('has: .toThrow exception if called with undefined as date', () => {
    expect(function () { StateModelCollection.createEmptyCollection().has(undefined) }).toThrow();
  });

  it('has: returns true if called with id of a model previously added', () => {
    const oneState = new State('stateId', 'stateName');
    const aStateModel = new StateModel('id', 'name', [oneState], oneState, [], oneState);
    const testObject = StateModelCollection.createEmptyCollection().add(aStateModel);
    expect(testObject.has(aStateModel.id)).toBeTruthy();
  });

  it('has: returns false if called with id of no model previously added', () => {
    const oneState = new State('stateId', 'stateName');
    const aStateModel = new StateModel('id', 'name', [oneState], oneState, [], oneState);
    const testObject = StateModelCollection.createEmptyCollection().add(aStateModel);
    expect(testObject.has('anotherStateId')).toBeFalsy();
  });

  it('add: .toThrow exception if called with undefined as date', () => {
    expect(function () { StateModelCollection.createEmptyCollection().add(undefined) }).toThrow();
  });

  it('add: .toThrow exception if called with state model with same name', () => {
    const oneState = new State('stateId', 'stateName');
    const aStateModel = new StateModel('id', 'name', [oneState], oneState, [], oneState);
    const anotherStateModel = new StateModel('anotherId', 'name', [oneState], oneState, [], oneState);
    const testObject = StateModelCollection.createEmptyCollection().add(aStateModel);
    expect(function () { testObject.add(anotherStateModel) }).toThrow();
  });
});
