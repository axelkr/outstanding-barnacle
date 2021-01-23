import { expect } from 'chai';

import { Project } from '../../src/heijunka/Project';
import { KanbanCard } from '../../src/heijunka/KanbanCard';
import { HeijunkaBoard } from '../../src/heijunka/HeijunkaBoard';

describe('HeijunkaBoard', () => {
  let board: HeijunkaBoard;

  beforeEach(() => {
    board = HeijunkaBoard.createEmptyHeijunkaBoard();
  });

  it('addProject: throws exception if called with undefined as Project', () => {
    expect(function () { board.addProject(undefined) }).throws();
  });

  it('addProject: adds new project', () => {
    const aId = 'aRandomId';
    const aProject = new Project(aId, 'aName', new Date());
    board = board.addProject(aProject);
    expect(board.projects.length).to.equal(1);
  });

  it('addProject: doesn\'t add project with same id twice', () => {
    const aId = 'aRandomId';
    const aProject = new Project(aId, 'aName', new Date());
    const sameProjectId = new Project(aId, 'anotherName', new Date());
    board = board.addProject(aProject);
    board = board.addProject(sameProjectId);
    expect(board.projects.length).to.equal(1);
  });

  it('hasProject: throws exception if called with undefined as id', () => {
    expect(function () { board.hasProject(undefined) }).throws();
  });

  it('hasProject: true if project with id available', () => {
    const aId = 'aRandomId';
    const aProject = new Project(aId, 'aName', new Date());
    board = board.addProject(aProject);
    expect(board.hasProject(aId)).to.be.true;
  });

  it('hasProject: false if project with id is not available', () => {
    const aId = 'aRandomId';
    const anotherId = 'anotherRandomId';
    const aProject = new Project(aId, 'aName', new Date());
    board = board.addProject(aProject);
    expect(board.hasProject(anotherId)).to.be.false;
  });

  it('renameProject: throws exception if called with undefined as id', () => {
    expect(function () { board.renameProject(undefined, new Date(), "renameTo") }).throws();
  });

  it('renameProject: throws exception if called with undefined as date', () => {
    expect(function () { board.renameProject('aId', undefined, 'renameTo') }).throws();
  });

  it('renameProject: throws exception if called with undefined as new name', () => {
    expect(function () { board.renameProject('aId', new Date(), undefined) }).throws();
  });

  it('renameProject: throws exception if called with unknown id', () => {
    const aId = 'aRandomId';
    const anotherId = 'anotherRandomId';
    const aProject = new Project(aId, 'aName', new Date());
    board = board.addProject(aProject);

    expect(function () { board.renameProject(anotherId, new Date(), undefined) }).throws();
  });

  it('renameProject: a more recent name leads to a change', () => {
    const aId = 'aRandomId';
    const initialName = 'initialName';
    const newName = 'newName';
    const initialDate = new Date(2000, 1, 1);
    const newDate = new Date(2001, 2, 2);
    const aProject = new Project(aId, initialName, initialDate);
    board = board.addProject(aProject);
    board = board.renameProject(aId, newDate, newName);
    expect(board.projects[0].name.value).to.equal(newName);
  });

  it('addKanbanCard: throws exception if called with undefined as KanbanCard', () => {
    expect(function () { board.addKanbanCard(undefined) }).throws();
  });

  it('addKanbanCard: adds new KanbanCard', () => {
    const aId = 'aRandomId';
    const aKanbanCard = new KanbanCard(aId, 'aName', new Date(), 'aProject');
    board = board.addKanbanCard(aKanbanCard);
    expect(board.kanbanCards.length).to.equal(1);
  });

  it('addKanbanCard: doesn\'t add KanbanCard with same id twice', () => {
    const aId = 'aRandomId';
    const aKanbanCard = new KanbanCard(aId, 'aName', new Date(), 'aProject');
    const sameKanbanCardId = new KanbanCard(aId, 'anotherName', new Date(), 'aProject');
    board = board.addKanbanCard(aKanbanCard);
    board = board.addKanbanCard(sameKanbanCardId);
    expect(board.kanbanCards.length).to.equal(1);
  });

  it('hasKanbanCard: throws exception if called with undefined as id', () => {
    expect(function () { board.hasKanbanCard(undefined) }).throws();
  });

  it('hasKanbanCard: true if KanbanCard with id available', () => {
    const aId = 'aRandomId';
    const aKanbanCard = new KanbanCard(aId, 'aName', new Date(), 'aProject');
    board = board.addKanbanCard(aKanbanCard);
    expect(board.hasKanbanCard(aId)).to.be.true;
  });

  it('hasKanbanCard: false if KanbanCard with id is not available', () => {
    const aId = 'aRandomId';
    const anotherId = 'anotherRandomId';
    const aKanbanCard = new KanbanCard(aId, 'aName', new Date(), 'aProject');
    board = board.addKanbanCard(aKanbanCard);
    expect(board.hasKanbanCard(anotherId)).to.be.false;
  });

  it('renameKanbanCard: throws exception if called with undefined as id', () => {
    expect(function () { board.renameKanbanCard(undefined, new Date(), "renameTo") }).throws();
  });

  it('renameKanbanCard: throws exception if called with undefined as date', () => {
    expect(function () { board.renameKanbanCard('aId', undefined, 'renameTo') }).throws();
  });

  it('renameKanbanCard: throws exception if called with undefined as new name', () => {
    expect(function () { board.renameKanbanCard('aId', new Date(), undefined) }).throws();
  });

  it('renameKanbanCard: throws exception if called with unknown id', () => {
    const aId = 'aRandomId';
    const anotherId = 'anotherRandomId';
    const aKanbanCard = new KanbanCard(aId, 'aName', new Date(), 'aProjectId');
    board = board.addKanbanCard(aKanbanCard);

    expect(function () { board.renameKanbanCard(anotherId, new Date(), undefined) }).throws();
  });

  it('renameKanbanBoard: a more recent name leads to a change', () => {
    const aId = 'aRandomId';
    const initialName = 'initialName';
    const newName = 'newName';
    const initialDate = new Date(2000, 1, 1);
    const newDate = new Date(2001, 2, 2);
    const aKanbanCard = new KanbanCard(aId, initialName, initialDate, 'aProjectId');
    board = board.addKanbanCard(aKanbanCard);
    board = board.renameKanbanCard(aId, newDate, newName);
    expect(board.kanbanCards[0].name.value).to.equal(newName);
  });

  it('completedState: throws exception if called with undefined as kanban card id', () => {
    expect(function () { board.completedState(undefined, 'aStateId', new Date()) }).throws();
  });

  it('completedState: throws exception if called with undefined as state id', () => {
    expect(function () { board.completedState('aId', undefined, new Date()) }).throws();
  });

  it('completedState: throws exception if called with undefined as date', () => {
    expect(function () { board.completedState('aId', 'aStateId', undefined) }).throws();
  });

  it('inProgressInState: throws exception if called with undefined as kanban card id', () => {
    expect(function () { board.inProgressInState(undefined, 'aStateId', new Date()) }).throws();
  });

  it('inProgressInState: throws exception if called with undefined as state id', () => {
    expect(function () { board.inProgressInState('aId', undefined, new Date()) }).throws();
  });

  it('inProgressInState: throws exception if called with undefined as date', () => {
    expect(function () { board.inProgressInState('aId', 'aStateId', undefined) }).throws();
  });
});
