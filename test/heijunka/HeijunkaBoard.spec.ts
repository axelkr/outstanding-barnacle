import { expect } from 'chai';

import { Project } from '../../src/heijunka/Project';
import { ReadOnlyProperties } from '../../src/heijunka/ReadOnlyProperties';
import { KanbanCard } from '../../src/heijunka/KanbanCard';
import { HeijunkaBoard } from '../../src/heijunka/HeijunkaBoard';
import { TransitionType } from '../../src/heijunka/StateTransition';
import { State } from '../../src/heijunka/State';
import { StateModel } from '../../src/heijunka/StateModel';


describe('HeijunkaBoard', () => {
  let board: HeijunkaBoard;
  const testStates: State[] = [new State('Backlog', 'Backlog'), new State('Done', 'Done')];
  const validStateId = testStates[0].id;

  beforeEach(() => {
    board = HeijunkaBoard.createEmptyHeijunkaBoard();
  });

  it('addProject: throws exception if called with undefined as Project', () => {
    expect(function () { board.addProject(undefined) }).throws();
  });

  it('addProject: adds new project', () => {
    const aId = 'aRandomId';
    const aStateModelId = 'aStateModelId';
    const aProject = new Project(aId, aStateModelId, new ReadOnlyProperties());
    board = board.addProject(aProject);
    expect(board.projects.length).to.equal(1);
  });

  it('addProject: doesn\'t add project with same id twice', () => {
    const aId = 'aRandomId';
    const aStateModelId = 'aStateModelId';
    const aProject = new Project(aId, aStateModelId, new ReadOnlyProperties());
    const sameProjectId = new Project(aId, aStateModelId, new ReadOnlyProperties());
    board = board.addProject(aProject);
    board = board.addProject(sameProjectId);
    expect(board.projects.length).to.equal(1);
  });

  it('hasProject: throws exception if called with undefined as id', () => {
    expect(function () { board.hasProject(undefined) }).throws();
  });

  it('hasProject: true if project with id available', () => {
    const aId = 'aRandomId';
    const aStateModelId = 'aStateModelId';
    const aProject = new Project(aId, aStateModelId, new ReadOnlyProperties());
    board = board.addProject(aProject);
    expect(board.hasProject(aId)).to.be.true;
  });

  it('hasProject: false if project with id is not available', () => {
    const aId = 'aRandomId';
    const anotherId = 'anotherRandomId';
    const aStateModelId = 'aStateModelId';
    const aProject = new Project(aId, aStateModelId, new ReadOnlyProperties());
    board = board.addProject(aProject);
    expect(board.hasProject(anotherId)).to.be.false;
  });

  it('updatePropertyOfProject: throws exception if called with undefined as id', () => {
    expect(function () { board.updatePropertyOfProject(undefined, 'propertyName', new Date(), 'renameTo') }).throws();
  });

  it('updatePropertyOfProject: throws exception if called with undefined as date', () => {
    expect(function () { board.updatePropertyOfProject('aId', 'propertyName', undefined, 'renameTo') }).throws();
  });

  it('updatePropertyOfProject: throws exception if called with undefined as new name', () => {
    expect(function () { board.updatePropertyOfProject('aId', 'propertyName', new Date(), undefined) }).throws();
  });

  it('updatePropertyOfProject: throws exception if called with unknown id', () => {
    const aId = 'aRandomId';
    const aStateModelId = 'aStateModelId';
    const anotherId = 'anotherRandomId';
    const aProject = new Project(aId, aStateModelId, new ReadOnlyProperties());
    board = board.addProject(aProject);

    expect(function () { board.updatePropertyOfProject(anotherId, 'propertyName', new Date(), undefined) }).throws();
  });

  it('updatePropertyOfProject: a more recent name leads to a change', () => {
    const aId = 'aRandomId';
    const initialName = 'initialName';
    const aStateModelId = 'aStateModelId';
    const propertyName = 'propertyName';
    const newName = 'newName';
    const initialDate = new Date(2000, 1, 1);
    const newDate = new Date(2001, 2, 2);
    const aProject = new Project(aId, aStateModelId, new ReadOnlyProperties()).initializeProperty(propertyName, initialName, initialDate);
    board = board.addProject(aProject);
    board = board.updatePropertyOfProject(aId, propertyName, newDate, newName);
    expect(board.projects[0].valueOfProperty(propertyName)).to.equal(newName);
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

  it('hasStateModel: throws exception if called with undefined as date', () => {
    expect(function () { board.hasStateModel(undefined) }).throws();
  });

  it('hasStateModel: returns true if called with id of a model previously added', () => {
    const oneState = new State('stateId', 'stateName');
    const aStateModel = new StateModel('id', 'name', [oneState], oneState, [], oneState);
    board = board.addStateModel(aStateModel);
    expect(board.hasStateModel(aStateModel.id)).to.be.true;
  });

  it('hasStateModel: returns false if called with id of no model previously added', () => {
    const oneState = new State('stateId', 'stateName');
    const aStateModel = new StateModel('id', 'name', [oneState], oneState, [], oneState);
    board = board.addStateModel(aStateModel);
    expect(board.hasStateModel('anotherStateId')).to.be.false;
  });

  it('addStateModel: throws exception if called with undefined as date', () => {
    expect(function () { board.addStateModel(undefined) }).throws();
  });

  it('addStateModel: throws exception if called with state model with same name', () => {
    const oneState = new State('stateId', 'stateName');
    const aStateModel = new StateModel('id', 'name', [oneState], oneState, [], oneState);
    const anotherStateModel = new StateModel('anotherId', 'name', [oneState], oneState, [], oneState);
    board = board.addStateModel(aStateModel);
    expect(function () { board.addStateModel(anotherStateModel) }).throws();
  });
});
