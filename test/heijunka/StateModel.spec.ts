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

  it('linearizedStates: the initial state is returned as first state', () => {
    const someStates = generateSomeStates();
    const initialState = someStates[11];
    const finalStates = [someStates[2],someStates[4],someStates[9]];
    const inputStateModel =  new StateModel('id','name',someStates,initialState,finalStates);
    expect(inputStateModel.linearizedStates()[0]).to.equal(initialState);
  });

  it('linearizedStates: each state is returned exactly once', () => {
    const someStates = generateSomeStates();
    const initialState = someStates[11];
    const finalStates = [someStates[2],someStates[4],someStates[9]];
    const inputStateModel =  new StateModel('id','name',someStates,initialState,finalStates);
    expect(inputStateModel.linearizedStates()).to.have.lengthOf(someStates.length);
    someStates.forEach(aState=> {
      expect(inputStateModel.linearizedStates().indexOf(aState)).to.be.greaterThan(-1);
    });
  });

  it('linearizedStates: a linear succession of states is returned like that', () => {
    const someStates = generateSomeStates().splice(3,3);
    const initialState = someStates[0];
    const finalStates = [someStates[2]];
    someStates.reverse();
    const inputStateModel =  new StateModel('id','name',someStates,initialState,finalStates);
    someStates.reverse();
    inputStateModel.setSuccessorOf(someStates[0],someStates[1]);
    inputStateModel.setSuccessorOf(someStates[1],someStates[2]);
    expect(inputStateModel.linearizedStates()).to.have.lengthOf(someStates.length);
    for (let i =0;i<someStates.length;i = i+1) {
      expect(inputStateModel.linearizedStates()[i]).to.equal(someStates[i]);
    }
  });

  function generateSomeStates() : State[] {
    const result: State[] = [];
    const idString = 'abcdefghijklmnopqrstuvw';
    let nextStateIndex = 0;
    while (nextStateIndex<idString.length) {
      result.push(new State(idString[nextStateIndex],idString[nextStateIndex]));
      nextStateIndex = 1+ nextStateIndex;
    }
    return result;
  }
});
