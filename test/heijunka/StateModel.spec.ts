import { expect } from 'chai';

import { StateModel } from '../../src/heijunka/StateModel';
import { State } from '../../src/heijunka/State';

describe('StateModel', () => {
  const testStates: State[] = [new State('Backlog', 'Backlog'), new State('Done', 'Done')];
  const initialState = testStates[0];
  const finalStates = [testStates[2]];
  const uuid = 'uuid';

  it('constructor expects that id is defined', () => {
    expect(() => new StateModel(undefined, 'name', testStates, initialState, finalStates)).throws();
  });

  it('constructor expects that name is defined', () => {
    expect(() => new StateModel(uuid, undefined, testStates, initialState, finalStates)).throws();
  });

  it('constructor expects that state is defined', () => {
    expect(() => new StateModel(uuid, 'name', undefined, initialState, finalStates)).throws();
  });

  it('constructor expects that initial state is defined', () => {
    expect(() => new StateModel(uuid, 'name', testStates, undefined, finalStates)).throws();
  });

  it('constructor expects that final states are defined', () => {
    expect(() => new StateModel(uuid, 'name', testStates, initialState, undefined)).throws();
  });

  it('constructor expects that initial state is part of the defined set of states', () => {
    const otherState = new State('otherState', 'otherState');
    expect(() => new StateModel(uuid, 'name', testStates, otherState, finalStates)).throws();
  });

  it('constructor expects that each declared final state is part of the defined set of states', () => {
    const otherState = new State('otherState', 'otherState');
    expect(() => new StateModel(uuid, 'name', testStates, initialState, [finalStates[0], otherState])).throws();
  });

});
