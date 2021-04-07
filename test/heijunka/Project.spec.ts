import { expect } from 'chai';

import { Project } from '../../src/heijunka/Project';

describe('Project', () => {
  it('constructor expects that id is defined', () => {
    expect(function () { Project.create(undefined, 'aStateModelId') }).throws();
  });

  it('constructor expects that statemodel id is defined', () => {
    expect(function () { Project.create('aId', undefined) }).throws();
  });

  it('constructor values are stored', () => {
    const aId = 'aId';
    const aStateModelId = 'aStateModelId';
    const project = Project.create(aId, aStateModelId);
    expect(project.stateModelId).to.equal(aStateModelId);
    expect(project.id).to.equal(aId);
  });
});
