import { expect } from 'chai';

import { StateModel } from '../../src/heijunka/StateModel';
import { State } from '../../src/heijunka/State';

describe('StateModel', () => {
  const testStates: State[] = [new State('Backlog', 'Backlog'), new State('Done', 'Done')];
  const initialState = testStates[0];
  
  it('constructor expects that name is defined', () => {
    expect(()=> new StateModel(undefined,testStates,initialState)).throws();
  });

  it('constructor expects that state is defined', () => {
    expect(()=> new StateModel('name',undefined,initialState)).throws();
  });

  it('constructor expects that initial state is defined', () => {
    expect(()=> new StateModel('name',testStates,undefined)).throws();
  });

  it('constructor expects that initial state is part of the defined set of states', () => {
    const otherState = new State('otherState','otherState');
    expect(()=> new StateModel('name',testStates,otherState)).throws();
  });
});
