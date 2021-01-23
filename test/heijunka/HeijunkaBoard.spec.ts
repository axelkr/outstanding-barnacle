import { expect } from 'chai';

import { Project } from '../../src/heijunka/Project';
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
});
