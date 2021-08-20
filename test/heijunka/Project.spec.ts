import { Project } from '../../src/heijunka/Project';

describe('Project', () => {
  it('constructor expects that id is defined', () => {
    expect(function () { Project.create(undefined, 'aStateModelId') }).toThrow();
  });

  it('constructor expects that statemodel id is defined', () => {
    expect(function () { Project.create('aId', undefined) }).toThrow();
  });

  it('constructor values are stored', () => {
    const aId = 'aId';
    const aStateModelId = 'aStateModelId';
    const project = Project.create(aId, aStateModelId);
    expect(project.stateModelId).toEqual(aStateModelId);
    expect(project.id).toEqual(aId);
  });
});
