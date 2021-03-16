import { expect } from 'chai';

import { Project } from '../../src/heijunka/Project';
import { ReadOnlyProperties } from '../../src/heijunka/ReadOnlyProperties';
import { ProjectCollection } from '../../src/heijunka/ProjectCollection';


describe('ProjectCollection', () => {
  it('add: throws exception if called with undefined as Project', () => {
    expect(function () { ProjectCollection.createEmptyCollection().add(undefined) }).throws();
  });

  it('add: adds new project', () => {
    const aId = 'aRandomId';
    const aStateModelId = 'aStateModelId';
    const aProject = new Project(aId, aStateModelId, new ReadOnlyProperties());
    const testObject = ProjectCollection.createEmptyCollection().add(aProject);
    expect(testObject.getProjects().length).to.equal(1);
  });

  it('has: throws exception if called with undefined as id', () => {
    expect(function () { ProjectCollection.createEmptyCollection().has(undefined) }).throws();
  });

  it('has: true if project with id available', () => {
    const aId = 'aRandomId';
    const aStateModelId = 'aStateModelId';
    const aProject = new Project(aId, aStateModelId, new ReadOnlyProperties());
    const testObject = ProjectCollection.createEmptyCollection().add(aProject);
    expect(testObject.has(aId)).to.be.true;
  });

  it('has: false if project with id is not available', () => {
    const aId = 'aRandomId';
    const anotherId = 'anotherRandomId';
    const aStateModelId = 'aStateModelId';
    const aProject = new Project(aId, aStateModelId, new ReadOnlyProperties());
    const testObject = ProjectCollection.createEmptyCollection().add(aProject);
    expect(testObject.has(anotherId)).to.be.false;
  });

  it('updateProperty: throws exception if called with undefined as id', () => {
    const aId = 'aRandomId';
    const aStateModelId = 'aStateModelId';
    const aProject = new Project(aId, aStateModelId, new ReadOnlyProperties());
    const testObject = ProjectCollection.createEmptyCollection().add(aProject);
    expect(function () { testObject.updateProperty(undefined, 'propertyName', new Date(), 'renameTo') }).throws();
  });

  it('updateProperty: throws exception if called with undefined as date', () => {
    const aId = 'aRandomId';
    const aStateModelId = 'aStateModelId';
    const aProject = new Project(aId, aStateModelId, new ReadOnlyProperties());
    const testObject = ProjectCollection.createEmptyCollection().add(aProject);
    expect(function () { testObject.updateProperty('aId', 'propertyName', undefined, 'renameTo') }).throws();
  });

  it('updateProperty: throws exception if called with undefined as new name', () => {
    const aId = 'aRandomId';
    const aStateModelId = 'aStateModelId';
    const aProject = new Project(aId, aStateModelId, new ReadOnlyProperties());
    const testObject = ProjectCollection.createEmptyCollection().add(aProject);
    expect(function () { testObject.updateProperty('aId', 'propertyName', new Date(), undefined) }).throws();
  });

  it('updateProperty: throws exception if called with unknown id', () => {
    const aId = 'aRandomId';
    const aStateModelId = 'aStateModelId';
    const anotherId = 'anotherRandomId';
    const aProject = new Project(aId, aStateModelId, new ReadOnlyProperties());
    const testObject = ProjectCollection.createEmptyCollection().add(aProject);

    expect(function () { testObject.updateProperty(anotherId, 'propertyName', new Date(), undefined) }).throws();
  });

  it('updateProperty: a more recent name leads to a change', () => {
    const aId = 'aRandomId';
    const initialName = 'initialName';
    const aStateModelId = 'aStateModelId';
    const propertyName = 'propertyName';
    const newName = 'newName';
    const initialDate = new Date(2000, 1, 1);
    const newDate = new Date(2001, 2, 2);
    const aProject = new Project(aId, aStateModelId, new ReadOnlyProperties()).initializeProperty(propertyName, initialName, initialDate);
    let testObject = ProjectCollection.createEmptyCollection().add(aProject);
    testObject = testObject.updateProperty(aId, propertyName, newDate, newName);
    expect(testObject.getProjects()[0].valueOfProperty(propertyName)).to.equal(newName);
  });
});
