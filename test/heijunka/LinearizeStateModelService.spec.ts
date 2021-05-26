import { expect } from 'chai';

import { StateModel } from '../../src/heijunka/StateModel';
import { LinearizeStateModelService } from '../../src/heijunka/LinearizeStateModelService';
import { State } from '../../src/heijunka/State';

describe('LinearizeStateModelService', () => {
  it('linearizedStates: the initial state is returned as first state', () => {
    const someStates = generateSomeStates();
    const initialState = someStates[11];
    const trashState = someStates[14];
    const finalStates = [someStates[2], someStates[4], someStates[9]];
    const inputStateModel = new StateModel('id', 'name', someStates, initialState, finalStates, trashState);
    const testService = new LinearizeStateModelService();
    expect(testService.linearize(inputStateModel)[0]).to.equal(initialState);
  });

  it('linearizedStates: each state is returned exactly once', () => {
    const someStates = generateSomeStates();
    const trashState = someStates[14];

    const initialState = someStates[11];
    const finalStates = [someStates[2], someStates[4], someStates[9]];
    const inputStateModel = new StateModel('id', 'name', someStates, initialState, finalStates, trashState);
    for (let i = 0; i < someStates.length - 3; i = i + 1) {
      inputStateModel.setSuccessorOf(someStates[i], someStates[i + 1]);
      inputStateModel.setSuccessorOf(someStates[i], someStates[i + 3]);
      inputStateModel.setSuccessorOf(someStates[i + 2], someStates[i]);
    }

    const testService = new LinearizeStateModelService();
    expect(testService.linearize(inputStateModel)).to.have.lengthOf(someStates.length);
    someStates.forEach(aState => {
      expect(testService.linearize(inputStateModel).indexOf(aState)).to.be.greaterThan(-1);
    });
  });

  it('linearizedStates: a linear succession of states is returned like that', () => {
    const someStates = generateSomeStates().splice(3, 3);
    const initialState = someStates[0];
    const trashState = someStates[2];
    const finalStates = [someStates[2]];
    someStates.reverse();
    const inputStateModel = new StateModel('id', 'name', someStates, initialState, finalStates, trashState);
    someStates.reverse();
    inputStateModel.setSuccessorOf(someStates[0], someStates[1]);
    inputStateModel.setSuccessorOf(someStates[1], someStates[2]);
    const testService = new LinearizeStateModelService();
    expect(testService.linearize(inputStateModel)).to.have.lengthOf(someStates.length);
    for (let i = 0; i < someStates.length; i = i + 1) {
      expect(testService.linearize(inputStateModel)[i]).to.equal(someStates[i]);
    }
  });

  it('linearizedStates: done states are returned at the end', () => {
    const someStates = generateSomeStates().slice(0, 5);
    const trashState = someStates[4];
    const initialState = someStates[2];
    const finalStates = [someStates[4], someStates[3]];
    const inputStateModel = new StateModel('id', 'name', someStates, initialState, finalStates, trashState);
    for (let i = 0; i < someStates.length - 1; i = i + 1) {
      inputStateModel.setSuccessorOf(someStates[i], someStates[i + 1]);
    }
    inputStateModel.setSuccessorOf(initialState, finalStates[0]);
    inputStateModel.setSuccessorOf(initialState, finalStates[1]);
    inputStateModel.setSuccessorOf(initialState, someStates[0]);

    const testService = new LinearizeStateModelService();
    const firstIndexOfFinalStates = someStates.length - finalStates.length - 1;
    finalStates.forEach(aState => {
      expect(testService.linearize(inputStateModel).indexOf(aState)).to.be.greaterThanOrEqual(firstIndexOfFinalStates);
    });
  });


  function generateSomeStates(): State[] {
    const result: State[] = [];
    const idString = 'abcdefghijklmnopqrstuvw';
    let nextStateIndex = 0;
    while (nextStateIndex < idString.length) {
      result.push(new State(idString[nextStateIndex], idString[nextStateIndex]));
      nextStateIndex = 1 + nextStateIndex;
    }
    return result;
  }
});
