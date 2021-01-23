import { expect } from 'chai';

import { StateHistory } from '../../src/heijunka/StateHistory';
import { StateTransition } from '../../src/heijunka/StateTransition';
import { State } from '../../src/heijunka/State';

describe('StateHistory', () => {
  it('add adds new transition', () => {
    const emptyStateHistory = StateHistory.emptyHistory();
    const aState = new State('aState', 'aName');
    const stateTransition = StateTransition.inProgressInState(aState, new Date());
    const stateHistory = emptyStateHistory.add(stateTransition);

    expect(stateHistory.transitions.length).to.equal(1);
  });

  it('add doesn\'t add same transition', () => {
    const emptyStateHistory = StateHistory.emptyHistory();
    const aState = new State('aState', 'aName');
    const stateTransition = StateTransition.inProgressInState(aState, new Date());
    const aStateHistory = emptyStateHistory.add(stateTransition)
      .add(stateTransition);

    expect(aStateHistory.transitions.length).to.equal(1);
  });
});
