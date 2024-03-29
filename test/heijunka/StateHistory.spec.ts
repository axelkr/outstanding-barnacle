import { StateHistory } from '../../src/heijunka/StateHistory';
import { StateTransition } from '../../src/heijunka/StateTransition';

describe('StateHistory', () => {
  it('add adds new transition', () => {
    const emptyStateHistory = StateHistory.emptyHistory();
    const aState = 'aState';
    const stateTransition = StateTransition.inProgressInState(aState, new Date());
    const stateHistory = emptyStateHistory.add(stateTransition);

    expect(stateHistory.transitions.length).toEqual(1);
  });

  it('add doesn\'t add same transition', () => {
    const emptyStateHistory = StateHistory.emptyHistory();
    const aState = 'aState';
    const stateTransition = StateTransition.inProgressInState(aState, new Date());
    const aStateHistory = emptyStateHistory.add(stateTransition)
      .add(stateTransition);

    expect(aStateHistory.transitions.length).toEqual(1);
  });

  it('add sorts history transitions in ascending order', () => {
    const emptyStateHistory = StateHistory.emptyHistory();
    const aState = 'aState';
    const atTheStart = StateTransition.inProgressInState(aState, new Date(2020, 1, 1));
    const inTheMiddle = StateTransition.inProgressInState(aState, new Date(2020, 1, 2));
    const atTheEnd = StateTransition.inProgressInState(aState, new Date(2020, 1, 3));
    const aStateHistory = emptyStateHistory.add(inTheMiddle)
      .add(atTheStart)
      .add(atTheEnd);

    expect(aStateHistory.transitions.length).toEqual(3);
    expect(aStateHistory.transitions[0].occurredAt).toEqual(atTheStart.occurredAt);
    expect(aStateHistory.transitions[1].occurredAt).toEqual(inTheMiddle.occurredAt);
    expect(aStateHistory.transitions[2].occurredAt).toEqual(atTheEnd.occurredAt);
  });

  it('currentTransition returns latest', () => {
    const emptyStateHistory = StateHistory.emptyHistory();
    const aState = 'aState';
    const atTheStart = StateTransition.inProgressInState(aState, new Date(2020, 1, 1));
    const atTheEnd = StateTransition.inProgressInState(aState, new Date(2020, 1, 3));
    const aStateHistory = emptyStateHistory
      .add(atTheStart)
      .add(atTheEnd);
    expect(aStateHistory.currentStateTransition().occurredAt).toEqual(atTheEnd.occurredAt);
  });

  it('currentTransition returns undefined if no state has been added so far', () => {
    const emptyStateHistory = StateHistory.emptyHistory();
    expect(emptyStateHistory.currentStateTransition()).toBeUndefined();
  });

  it('atDate raises an error if called without a date.', () => {
    const emptyStateHistory = StateHistory.emptyHistory();
    const aState = 'aState';
    const atTheStart = StateTransition.inProgressInState(aState, new Date(2020, 1, 1));
    const aStateHistory = emptyStateHistory.add(atTheStart);
    expect(function () { aStateHistory.atDate(undefined) }).toThrow();
  });

  it('atDate returns undefined if before earliest state.', () => {
    const emptyStateHistory = StateHistory.emptyHistory();
    const aState = 'aState';
    const atTheStart = StateTransition.inProgressInState(aState, new Date(2020, 1, 1));
    const aStateHistory = emptyStateHistory
      .add(atTheStart);
    expect(aStateHistory.atDate(new Date(2019, 10, 10))).toBeUndefined();
  });

  it('atDate returns last state if after last state.', () => {
    const emptyStateHistory = StateHistory.emptyHistory();
    const aState = 'aState';
    const atTheStart = StateTransition.inProgressInState(aState, new Date(2020, 1, 1));
    const aStateHistory = emptyStateHistory
      .add(atTheStart);
    expect(aStateHistory.atDate(new Date(2021, 10, 10)).state).toEqual(aState);
  });

  it('atDate returns first state if between first and second state.', () => {
    const emptyStateHistory = StateHistory.emptyHistory();
    const aState = 'aState';
    const anotherState = 'anotherState';
    const atTheStart = StateTransition.inProgressInState(aState, new Date(2020, 1, 1));
    const atTheEnd = StateTransition.inProgressInState(anotherState, new Date(2020, 1, 3));
    const aStateHistory = emptyStateHistory
      .add(atTheStart)
      .add(atTheEnd);
    expect(aStateHistory.atDate(new Date(2020, 1, 2)).state).toEqual(aState);
  });
});
