import { expect } from 'chai';

import { KanbanCard } from '../../src/heijunka/KanbanCard';

describe('KanbanCard', () => {
  it('constructor expects that id is defined', () => {
    expect(function () { KanbanCard.create(undefined, 'aProjectId') }).throws();
  });

  it('constructor expects that project is defined', () => {
    expect(function () { KanbanCard.create('aId', undefined) }).throws();
  });

  it('constructor values are stored', () => {
    const aId = 'aId';
    const aProjectId = 'aProjectId';
    const aKanbanCard = KanbanCard.create(aId, aProjectId);
    expect(aKanbanCard.id).to.equal(aId);
    expect(aKanbanCard.project).to.equal(aProjectId);
  });

  it('updateProperty keeps current value if update happened before', () => {
    const id = 'aId';
    const initialValue = 'aString';
    const anotherValue = 'anotherString';
    const propertyName = 'name';
    const initialDate = new Date(2020, 12, 24);
    const beforeInitialDate = new Date(2019, 11, 23);
    const aKanbanCard = KanbanCard.create(id, 'aProjectId').initializeProperty(propertyName, initialValue, initialDate);
    const updatedKanbanCard = aKanbanCard.updateProperty(propertyName, anotherValue, beforeInitialDate);
    expect(updatedKanbanCard.valueOfProperty(propertyName)).to.equal(initialValue);
  });

  it('updateProperty keeps new value if update happened afterwards', () => {
    const id = 'aId';
    const initialValue = 'aString';
    const anotherValue = 'anotherString';
    const propertyName = 'name';
    const initialDate = new Date(2020, 12, 24);
    const afterInitialDate = new Date(2021, 12, 25);
    const aKanbanCard = KanbanCard.create(id, 'aProjectId').initializeProperty(propertyName, initialValue, initialDate);
    const updatedKanbanCard = aKanbanCard.updateProperty(propertyName, anotherValue, afterInitialDate);
    expect(updatedKanbanCard.valueOfProperty(propertyName)).to.equal(anotherValue);
  });
});
