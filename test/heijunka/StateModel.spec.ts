import { expect } from 'chai';

import { StateModel } from '../../src/heijunka/StateModel';
import { State } from '../../src/heijunka/State';

describe('StateModel', () => {
  const testStates: State[] = [new State('Backlog', 'Backlog'), new State('Done', 'Done')];
  const initialState = testStates[0];
  const finalStates = [testStates[1]];
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

  it('setSuccessorOf: returned as successor afterwards', () => {
    const aStateModel = new StateModel(uuid, 'name', testStates, initialState, finalStates);
    const successorState = testStates[1];
    aStateModel.setSuccessorOf(initialState,successorState);
    expect(aStateModel.successors(initialState).length).to.equal(1);
    expect(aStateModel.successors(initialState)[0]).to.deep.equal(successorState);
  });

  it('serialize and deserialize are a round-trip: values stay the same', () => {
    const inputStateModel = new StateModel(uuid, 'name', testStates, initialState, finalStates);
    inputStateModel.setSuccessorOf(initialState,testStates[1]);
    const afterRoundTrip = StateModel.deserialize(StateModel.serialize(inputStateModel));

    expect(afterRoundTrip.id).to.equal(inputStateModel.id);
    expect(afterRoundTrip.name).to.equal(inputStateModel.name);
    expect(afterRoundTrip.initialState()).to.deep.equal(inputStateModel.initialState());
    expect(afterRoundTrip.finalStates()[0]).to.deep.equal(inputStateModel.finalStates()[0]);
    expect(afterRoundTrip.successors(afterRoundTrip.initialState())[0]).to.deep.equal(inputStateModel.successors(inputStateModel.initialState())[0]);
  })

  it('serialize and deserialize are a round-trip: values stay the same', () => {
    const inputStateModel = PersonalKanban();
    const afterRoundTrip = StateModel.deserialize(StateModel.serialize(inputStateModel));

    expect(afterRoundTrip.id).to.equal(inputStateModel.id);
    expect(afterRoundTrip.name).to.equal(inputStateModel.name);
    expect(afterRoundTrip.initialState()).to.deep.equal(inputStateModel.initialState());
    expect(afterRoundTrip.finalStates()[0]).to.deep.equal(inputStateModel.finalStates()[0]);
    expect(afterRoundTrip.successors(afterRoundTrip.initialState())[0]).to.deep.equal(inputStateModel.successors(inputStateModel.initialState())[0]);
  })

  function PersonalKanban(): StateModel {
    const states: State[] = [];
    states.push(new State('Backlog', 'Backlog'));
    states.push(new State('Doing', 'Doing'));
    states.push(new State('Done', 'Done'));
    const result = new StateModel('id', 'PersonalKanban', states, states[0], [states[2]]);
    result.setSuccessorOf(states[0], states[1]);
    result.setSuccessorOf(states[1], states[2]);
    return result;
  }
});
