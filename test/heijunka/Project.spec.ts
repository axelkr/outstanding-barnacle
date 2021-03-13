import { expect } from 'chai';

import { Property } from '../../src/heijunka/Property';
import { Project } from '../../src/heijunka/Project';

describe('Project', () => {
  it('constructor expects that id is defined', () => {
    expect(function () { new Project(undefined, 'aStateModelId', new Map<string,Property<string>>()) }).throws();
  });

  it('constructor expects that statemodel id is defined', () => {
    expect(function () { new Project('aId', undefined, new Map<string,Property<string>>()) }).throws();
  });

  it('constructor values are stored', () => {
    const aId = 'aId';
    const aStateModelId = 'aStateModelId';
    const project = new Project(aId, aStateModelId, new Map<string,Property<string>>());
    expect(project.stateModelId).to.equal(aStateModelId);
    expect(project.id).to.equal(aId);
  });
});
