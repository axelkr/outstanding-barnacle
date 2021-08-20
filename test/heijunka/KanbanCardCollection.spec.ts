import { KanbanCard } from '../../src/heijunka/KanbanCard';
import { KanbanCardCollection } from '../../src/heijunka/KanbanCardCollection';
import { TransitionType } from '../../src/heijunka/StateTransition';
import { State } from '../../src/heijunka/State';


describe('KanbanCardCollection', () => {
  let board: KanbanCardCollection;
  const testStates: State[] = [new State('Backlog', 'Backlog'), new State('Done', 'Done')];
  const validStateId = testStates[0].id;

  beforeEach(() => {
    board = KanbanCardCollection.createEmptyCollection();
  });

  it('add: throws exception if called with undefined as KanbanCard', () => {
    expect(function () { board.add(undefined) }).toThrow();
  });

  it('add: adds KanbanCard.create', () => {
    const aId = 'aRandomId';
    const aKanbanCard = KanbanCard.create(aId, 'aProject');
    board = board.add(aKanbanCard);
    expect(board.getKanbanCards().length).toEqual(1);
  });

  it('has: throws exception if called with undefined as id', () => {
    expect(function () { board.has(undefined) }).toThrow();
  });

  it('has: true if KanbanCard with id available', () => {
    const aId = 'aRandomId';
    const aKanbanCard = KanbanCard.create(aId, 'aProject');
    board = board.add(aKanbanCard);
    expect(board.has(aId)).toBeTruthy();
  });

  it('has: false if KanbanCard with id is not available', () => {
    const aId = 'aRandomId';
    const anotherId = 'anotherRandomId';
    const aKanbanCard = KanbanCard.create(aId, 'aProject');
    board = board.add(aKanbanCard);
    expect(board.has(anotherId)).toBeFalsy();
  });

  it('updateProperty: throws exception if called with undefined as id', () => {
    expect(function () { board.updateProperty(undefined, 'propertyName', new Date(), "renameTo") }).toThrow();
  });

  it('updateProperty: throws exception if called with undefined as date', () => {
    expect(function () { board.updateProperty('aId', 'propertyName', undefined, 'renameTo') }).toThrow();
  });

  it('updateProperty: throws exception if called with undefined as new name', () => {
    expect(function () { board.updateProperty('aId', 'propertyName', new Date(), undefined) }).toThrow();
  });

  it('updateProperty: throws exception if called with unknown id', () => {
    const aId = 'aRandomId';
    const anotherId = 'anotherRandomId';
    const aKanbanCard = KanbanCard.create(aId, 'aProjectId');
    board = board.add(aKanbanCard);

    expect(function () { board.updateProperty(anotherId, 'propertyName', new Date(), undefined) }).toThrow();
  });

  it('updateProperty: a more recent name leads to a change', () => {
    const aId = 'aRandomId';
    const propertyName = 'propertyName';
    const initialName = 'initialName';
    const newName = 'newName';
    const initialDate = new Date(2000, 1, 1);
    const newDate = new Date(2001, 2, 2);
    let aKanbanCard = KanbanCard.create(aId, 'aProjectId');
    aKanbanCard = aKanbanCard.initializeProperty(propertyName, initialName, initialDate);
    board = board.add(aKanbanCard);
    board = board.updateProperty(aId, propertyName, newDate, newName);
    expect(board.getKanbanCards()[0].valueOfProperty(propertyName)).toEqual(newName);
  });

  it('completedState: throws exception if called with undefined as kanban card id', () => {
    expect(function () { board.completedState(undefined, validStateId, new Date()) }).toThrow();
  });

  it('completedState: throws exception if called with undefined as state id', () => {
    expect(function () { board.completedState('aId', undefined, new Date()) }).toThrow();
  });

  it('completedState: throws exception if called with undefined as date', () => {
    expect(function () { board.completedState('aId', validStateId, undefined) }).toThrow();
  });

  it('inProgressInState: throws exception if called with undefined as kanban card id', () => {
    expect(function () { board.inProgressInState(undefined, validStateId, new Date()) }).toThrow();
  });

  it('inProgressInState: throws exception if called with undefined as state id', () => {
    expect(function () { board.inProgressInState('aId', undefined, new Date()) }).toThrow();
  });

  it('inProgressInState: throws exception if called with undefined as date', () => {
    expect(function () { board.inProgressInState('aId', validStateId, undefined) }).toThrow();
  });

  it('completedState: throws exception if called with unknown kanban card id', () => {
    const aId = 'aRandomId';
    const anotherId = 'anotherRandomId';
    const aKanbanCard = KanbanCard.create(aId, 'aProjectId');
    board = board.add(aKanbanCard);

    expect(function () { board.completedState(anotherId, validStateId, new Date()) }).toThrow();
  });

  it('inProgressInState: throws exception if called with unknown kanban card id', () => {
    const aId = 'aRandomId';
    const anotherId = 'anotherRandomId';
    const aKanbanCard = KanbanCard.create(aId, 'aProjectId');
    board = board.add(aKanbanCard);

    expect(function () { board.inProgressInState(anotherId, validStateId, new Date()) }).toThrow();
  });

  it('find: Kanban cards with undefined state are reported.', () => {
    const aId = 'aRandomId';
    const aKanbanCard = KanbanCard.create(aId, 'aProjectId');
    board = board.add(aKanbanCard);
    expect(board.find().length).toEqual(1);
  });

  it('find: filtering explicitly for states ignores cards with undefined states.', () => {
    const aId = 'aRandomId';
    const aKanbanCard = KanbanCard.create(aId, 'aProjectId');
    board = board.add(aKanbanCard);
    const withStateOptions = { states: testStates };
    expect(board.find(withStateOptions).length).toEqual(0);
  });

  it('find: filtering explicitly for transition types ignores cards with undefined states.', () => {
    const aId = 'aRandomId';
    const aKanbanCard = KanbanCard.create(aId, 'aProjectId');
    board = board.add(aKanbanCard);
    const withTransitionOption = { transitionType: TransitionType.inProgress };
    expect(board.find(withTransitionOption).length).toEqual(0);
  });
});
