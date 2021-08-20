import { StateModel } from '../../src/heijunka/StateModel';
import { State } from '../../src/heijunka/State';

describe('StateModel', () => {
  const testStates: State[] = [new State('Backlog', 'Backlog'), new State('Done', 'Done'), new State('Trash', 'Trash')];
  const initialState = testStates[0];
  const finalStates = [testStates[1]];
  const trashState = testStates[2];
  const uuid = 'uuid';

  it('constructor expects that id is defined', () => {
    expect(() => new StateModel(undefined, 'name', testStates, initialState, finalStates, trashState)).toThrow();
  });

  it('constructor expects that name is defined', () => {
    expect(() => new StateModel(uuid, undefined, testStates, initialState, finalStates, trashState)).toThrow();
  });

  it('constructor expects that state is defined', () => {
    expect(() => new StateModel(uuid, 'name', undefined, initialState, finalStates, trashState)).toThrow();
  });

  it('constructor expects that initial state is defined', () => {
    expect(() => new StateModel(uuid, 'name', testStates, undefined, finalStates, trashState)).toThrow();
  });

  it('constructor expects that final states are defined', () => {
    expect(() => new StateModel(uuid, 'name', testStates, initialState, undefined, trashState)).toThrow();
  });

  it('constructor expects that trash state is defined', () => {
    expect(() => new StateModel(uuid, 'name', testStates, initialState, finalStates, undefined)).toThrow();
  });

  it('constructor expects that trash state is part of the defined set of states', () => {
    const otherState = new State('otherState', 'otherState');
    expect(() => new StateModel(uuid, 'name', testStates, initialState, finalStates, otherState)).toThrow();
  });

  it('constructor expects that initial state is part of the defined set of states', () => {
    const otherState = new State('otherState', 'otherState');
    expect(() => new StateModel(uuid, 'name', testStates, otherState, finalStates, trashState)).toThrow();
  });

  it('constructor expects that each declared final state is part of the defined set of states', () => {
    const otherState = new State('otherState', 'otherState');
    expect(() => new StateModel(uuid, 'name', testStates, initialState, [finalStates[0], otherState], trashState)).toThrow();
  });

  it('setSuccessorOf: returned as successor afterwards', () => {
    const aStateModel = new StateModel(uuid, 'name', testStates, initialState, finalStates, trashState);
    const successorState = testStates[1];
    aStateModel.setSuccessorOf(initialState, successorState);
    expect(aStateModel.successors(initialState).length).toEqual(1);
    expect(aStateModel.successors(initialState)[0]).toEqual(successorState);
  });

  it('serialize and deserialize are a round-trip: values stay the same', () => {
    const inputStateModel = new StateModel(uuid, 'name', testStates, initialState, finalStates, trashState);
    inputStateModel.setSuccessorOf(initialState, testStates[1]);
    const afterRoundTrip = StateModel.deserialize(StateModel.serialize(inputStateModel));

    expect(afterRoundTrip.id).toEqual(inputStateModel.id);
    expect(afterRoundTrip.name).toEqual(inputStateModel.name);
    expect(afterRoundTrip.initialState()).toEqual(inputStateModel.initialState());
    expect(afterRoundTrip.finalStates()[0]).toEqual(inputStateModel.finalStates()[0]);
    expect(afterRoundTrip.successors(afterRoundTrip.initialState())[0]).toEqual(inputStateModel.successors(inputStateModel.initialState())[0]);
  })

  it('serialize and deserialize are a round-trip: values stay the same', () => {
    const inputStateModel = PersonalKanban();
    const afterRoundTrip = StateModel.deserialize(StateModel.serialize(inputStateModel));

    expect(afterRoundTrip.id).toEqual(inputStateModel.id);
    expect(afterRoundTrip.name).toEqual(inputStateModel.name);
    expect(afterRoundTrip.initialState()).toEqual(inputStateModel.initialState());
    expect(afterRoundTrip.trashState()).toEqual(inputStateModel.trashState());
    expect(afterRoundTrip.finalStates()[0]).toEqual(inputStateModel.finalStates()[0]);
    expect(afterRoundTrip.successors(afterRoundTrip.initialState())[0]).toEqual(inputStateModel.successors(inputStateModel.initialState())[0]);
  })

  function PersonalKanban(): StateModel {
    const states: State[] = [];
    states.push(new State('Backlog', 'Backlog'));
    states.push(new State('Doing', 'Doing'));
    states.push(new State('Done', 'Done'));
    states.push(new State('Trash', 'Trash'));
    const result = new StateModel('id', 'PersonalKanban', states, states[0], [states[2]], states[3]);
    result.setSuccessorOf(states[0], states[1]);
    result.setSuccessorOf(states[1], states[2]);
    return result;
  }
});
