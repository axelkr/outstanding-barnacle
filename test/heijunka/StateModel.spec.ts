import { expect } from 'chai';

import { StateModel } from '../../src/heijunka/StateModel';
import { State } from '../../src/heijunka/State';

describe('StateModel', () => {
  const testStates: State[] = [new State('Backlog', 'Backlog'), new State('Done', 'Done')];
  
  it('constructor expects that name is defined', () => {
    expect(()=> new StateModel(undefined,testStates)).throws();
  });

  it('constructor expects that state is defined', () => {
    expect(()=> new StateModel('name',undefined)).throws();
  });
});
