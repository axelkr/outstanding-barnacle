import { expect } from 'chai';

import { Project } from '../../src/heijunka/Project';

describe('Project', () => {
  it('constructor expects that id is defined', () => {
    expect(function(){new Project(undefined,'aString',new Date())}).throws();
  });

  it('constructor expects that value is defined', () => {
    expect(function(){new Project('aId',undefined,new Date())}).throws();
  });

  it('constructor expects that Date is defined', () => {
    expect(function(){new Project('aId','aString',undefined)}).throws();
  });

  it('constructor values are stored', () => {
    const aValue = 'aString';
    const aId = 'aId';
    const aDate = new Date();
    const project = new Project(aId,aValue, aDate);
    expect(project.name.value).to.equal(aValue);
    expect(project.id).to.equal(aId);
  });

  it('rename keeps current value if updated happened before', () => {
    const id = 'aId';
    const initialValue = 'aString';
    const anotherValue = 'anotherString';
    const initialDate = new Date(2020,12,24);
    const beforeInitialDate = new Date(2019,11,23);
    const aProject = new Project(id,initialValue,initialDate);
    const renamedProject = aProject.rename(anotherValue,beforeInitialDate);
    expect(renamedProject.name.value).to.equal(initialValue);
  });

  it('update keeps new value if updated happened afterwards', () => {
    const id = 'aId';
    const initialValue = 'aString';
    const anotherValue = 'anotherString';
    const initialDate = new Date(2020,12,24);
    const afterInitialDate = new Date(2021,12,25);
    const aProject = new Project(id,initialValue,initialDate);
    const renamedProject = aProject.rename(anotherValue,afterInitialDate);
    expect(renamedProject.name.value).to.equal(anotherValue);
  });
});
