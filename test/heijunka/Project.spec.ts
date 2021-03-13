import { expect } from 'chai';

import { Project } from '../../src/heijunka/Project';
import { ReadOnlyProperties } from '../../src/heijunka/ReadOnlyProperties';

describe('Project', () => {
  it('constructor expects that id is defined', () => {
    expect(function () { new Project(undefined, 'aStateModelId', new ReadOnlyProperties()) }).throws();
  });

  it('constructor expects that statemodel id is defined', () => {
    expect(function () { new Project('aId', undefined, new ReadOnlyProperties()) }).throws();
  });

  it('constructor values are stored', () => {
    const aId = 'aId';
    const aStateModelId = 'aStateModelId';
    const project = new Project(aId, aStateModelId, new ReadOnlyProperties());
    expect(project.stateModelId).to.equal(aStateModelId);
    expect(project.id).to.equal(aId);
  });
});
