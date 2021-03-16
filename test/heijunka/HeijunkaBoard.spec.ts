import { expect } from 'chai';

import { KanbanCard } from '../../src/heijunka/KanbanCard';
import { HeijunkaBoard } from '../../src/heijunka/HeijunkaBoard';
import { TransitionType } from '../../src/heijunka/StateTransition';
import { State } from '../../src/heijunka/State';


describe('HeijunkaBoard', () => {
  let board: HeijunkaBoard;
  const testStates: State[] = [new State('Backlog', 'Backlog'), new State('Done', 'Done')];
  const validStateId = testStates[0].id;

  beforeEach(() => {
    board = HeijunkaBoard.createEmptyHeijunkaBoard();
  });

  it('addKanbanCard: throws exception if called with undefined as KanbanCard', () => {
    expect(function () { board.addKanbanCard(undefined) }).throws();
  });

  it('addKanbanCard: adds KanbanCard.create', () => {
    const aId = 'aRandomId';
    const aKanbanCard = KanbanCard.create(aId, 'aProject');
    board = board.addKanbanCard(aKanbanCard);
    expect(board.kanbanCards.length).to.equal(1);
  });

  it('addKanbanCard: doesn\'t add KanbanCard with same id twice', () => {
    const aId = 'aRandomId';
    const aKanbanCard = KanbanCard.create(aId, 'aProject');
    const sameKanbanCardId = KanbanCard.create(aId, 'aProject');
    board = board.addKanbanCard(aKanbanCard);
    board = board.addKanbanCard(sameKanbanCardId);
    expect(board.kanbanCards.length).to.equal(1);
  });

  it('hasKanbanCard: throws exception if called with undefined as id', () => {
    expect(function () { board.hasKanbanCard(undefined) }).throws();
  });

  it('hasKanbanCard: true if KanbanCard with id available', () => {
    const aId = 'aRandomId';
    const aKanbanCard = KanbanCard.create(aId, 'aProject');
    board = board.addKanbanCard(aKanbanCard);
    expect(board.hasKanbanCard(aId)).to.be.true;
  });

  it('hasKanbanCard: false if KanbanCard with id is not available', () => {
    const aId = 'aRandomId';
    const anotherId = 'anotherRandomId';
    const aKanbanCard = KanbanCard.create(aId, 'aProject');
    board = board.addKanbanCard(aKanbanCard);
    expect(board.hasKanbanCard(anotherId)).to.be.false;
  });

  it('updatePropertyKanbanCard: throws exception if called with undefined as id', () => {
    expect(function () { board.updatePropertyKanbanCard(undefined, 'propertyName', new Date(), "renameTo") }).throws();
  });

  it('updatePropertyKanbanCard: throws exception if called with undefined as date', () => {
    expect(function () { board.updatePropertyKanbanCard('aId', 'propertyName', undefined, 'renameTo') }).throws();
  });

  it('updatePropertyKanbanCard: throws exception if called with undefined as new name', () => {
    expect(function () { board.updatePropertyKanbanCard('aId', 'propertyName', new Date(), undefined) }).throws();
  });

  it('updatePropertyKanbanCard: throws exception if called with unknown id', () => {
    const aId = 'aRandomId';
    const anotherId = 'anotherRandomId';
    const aKanbanCard = KanbanCard.create(aId, 'aProjectId');
    board = board.addKanbanCard(aKanbanCard);

    expect(function () { board.updatePropertyKanbanCard(anotherId, 'propertyName', new Date(), undefined) }).throws();
  });

  it('updatePropertyKanbanCard: a more recent name leads to a change', () => {
    const aId = 'aRandomId';
    const propertyName = 'propertyName';
    const initialName = 'initialName';
    const newName = 'newName';
    const initialDate = new Date(2000, 1, 1);
    const newDate = new Date(2001, 2, 2);
    let aKanbanCard = KanbanCard.create(aId, 'aProjectId');
    aKanbanCard = aKanbanCard.initializeProperty(propertyName, initialName, initialDate);
    board = board.addKanbanCard(aKanbanCard);
    board = board.updatePropertyKanbanCard(aId, propertyName, newDate, newName);
    expect(board.kanbanCards[0].valueOfProperty(propertyName)).to.equal(newName);
  });

  it('completedState: throws exception if called with undefined as kanban card id', () => {
    expect(function () { board.completedState(undefined, validStateId, new Date()) }).throws();
  });

  it('completedState: throws exception if called with undefined as state id', () => {
    expect(function () { board.completedState('aId', undefined, new Date()) }).throws();
  });

  it('completedState: throws exception if called with undefined as date', () => {
    expect(function () { board.completedState('aId', validStateId, undefined) }).throws();
  });

  it('inProgressInState: throws exception if called with undefined as kanban card id', () => {
    expect(function () { board.inProgressInState(undefined, validStateId, new Date()) }).throws();
  });

  it('inProgressInState: throws exception if called with undefined as state id', () => {
    expect(function () { board.inProgressInState('aId', undefined, new Date()) }).throws();
  });

  it('inProgressInState: throws exception if called with undefined as date', () => {
    expect(function () { board.inProgressInState('aId', validStateId, undefined) }).throws();
  });

  it('completedState: throws exception if called with unknown kanban card id', () => {
    const aId = 'aRandomId';
    const anotherId = 'anotherRandomId';
    const aKanbanCard = KanbanCard.create(aId, 'aProjectId');
    board = board.addKanbanCard(aKanbanCard);

    expect(function () { board.completedState(anotherId, validStateId, new Date()) }).throws();
  });

  it('inProgressInState: throws exception if called with unknown kanban card id', () => {
    const aId = 'aRandomId';
    const anotherId = 'anotherRandomId';
    const aKanbanCard = KanbanCard.create(aId, 'aProjectId');
    board = board.addKanbanCard(aKanbanCard);

    expect(function () { board.inProgressInState(anotherId, validStateId, new Date()) }).throws();
  });

  it('findKanbanCards: Kanban cards with undefined state are reported.', () => {
    const aId = 'aRandomId';
    const aKanbanCard = KanbanCard.create(aId, 'aProjectId');
    board = board.addKanbanCard(aKanbanCard);
    expect(board.findKanbanCards().length).to.equal(1);
  });

  it('findKanbanCards: filtering explicitly for states ignores cards with undefined states.', () => {
    const aId = 'aRandomId';
    const aKanbanCard = KanbanCard.create(aId, 'aProjectId');
    board = board.addKanbanCard(aKanbanCard);
    const withStateOptions = { states: testStates };
    expect(board.findKanbanCards(withStateOptions).length).to.equal(0);
  });

  it('findKanbanCards: filtering explicitly for transition types ignores cards with undefined states.', () => {
    const aId = 'aRandomId';
    const aKanbanCard = KanbanCard.create(aId, 'aProjectId');
    board = board.addKanbanCard(aKanbanCard);
    const withTransitionOption = { transitionType: TransitionType.inProgress };
    expect(board.findKanbanCards(withTransitionOption).length).to.equal(0);
  });
});
