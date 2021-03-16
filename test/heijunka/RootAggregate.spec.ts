import { expect } from 'chai';

import { RootAggregate } from '../../src/heijunka/RootAggregate';
import { State } from '../../src/heijunka/State';
import { StateModel } from '../../src/heijunka/StateModel';

describe('RootAggregate', () => {
  let rootAggregate: RootAggregate;

  beforeEach(() => {
    rootAggregate = RootAggregate.createEmptyRootAggregate();
  });

  it('hasStateModel: throws exception if called with undefined as date', () => {
    expect(function () { rootAggregate.hasStateModel(undefined) }).throws();
  });

  it('hasStateModel: returns true if called with id of a model previously added', () => {
    const oneState = new State('stateId', 'stateName');
    const aStateModel = new StateModel('id', 'name', [oneState], oneState, [], oneState);
    rootAggregate = rootAggregate.addStateModel(aStateModel);
    expect(rootAggregate.hasStateModel(aStateModel.id)).to.be.true;
  });

  it('hasStateModel: returns false if called with id of no model previously added', () => {
    const oneState = new State('stateId', 'stateName');
    const aStateModel = new StateModel('id', 'name', [oneState], oneState, [], oneState);
    rootAggregate = rootAggregate.addStateModel(aStateModel);
    expect(rootAggregate.hasStateModel('anotherStateId')).to.be.false;
  });

  it('addStateModel: throws exception if called with undefined as date', () => {
    expect(function () { rootAggregate.addStateModel(undefined) }).throws();
  });

  it('addStateModel: throws exception if called with state model with same name', () => {
    const oneState = new State('stateId', 'stateName');
    const aStateModel = new StateModel('id', 'name', [oneState], oneState, [], oneState);
    const anotherStateModel = new StateModel('anotherId', 'name', [oneState], oneState, [], oneState);
    rootAggregate = rootAggregate.addStateModel(aStateModel);
    expect(function () { rootAggregate.addStateModel(anotherStateModel) }).throws();
  });
});
