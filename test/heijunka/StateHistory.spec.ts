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

  it('add sorts history transitions in descending order', () => {
    const emptyStateHistory = StateHistory.emptyHistory();
    const aState = new State('aState', 'aName');
    const atTheStart = StateTransition.inProgressInState(aState, new Date(2020, 1, 1));
    const inTheMiddle = StateTransition.inProgressInState(aState, new Date(2020, 1, 2));
    const atTheEnd = StateTransition.inProgressInState(aState, new Date(2020, 1, 3));
    const aStateHistory = emptyStateHistory.add(inTheMiddle)
      .add(atTheStart)
      .add(atTheEnd);

    expect(aStateHistory.transitions.length).to.equal(3);
    expect(aStateHistory.transitions[0].occurredAt).to.equal(atTheStart.occurredAt);
    expect(aStateHistory.transitions[1].occurredAt).to.equal(inTheMiddle.occurredAt);
    expect(aStateHistory.transitions[2].occurredAt).to.equal(atTheEnd.occurredAt);
  });
});
