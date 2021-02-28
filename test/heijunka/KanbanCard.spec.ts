import { expect } from 'chai';

import { KanbanCard } from '../../src/heijunka/KanbanCard';

describe('KanbanCard', () => {
  it('constructor expects that id is defined', () => {
    expect(function(){KanbanCard.create(undefined,'aString',new Date(),'aProjectId')}).throws();
  });

  it('constructor expects that value is defined', () => {
    expect(function(){KanbanCard.create('aId',undefined,new Date(),'aProjectId')}).throws();
  });

  it('constructor expects that Date is defined', () => {
    expect(function(){KanbanCard.create('aId','aString',undefined,'aProjectId')}).throws();
  });

  it('constructor expects that project is defined', () => {
    expect(function(){KanbanCard.create('aId','aString',new Date(),undefined)}).throws();
  });

  it('constructor values are stored', () => {
    const aValue = 'aString';
    const aId = 'aId';
    const aProjectId = 'aProjectId';
    const aDate = new Date();
    const aKanbanCard = KanbanCard.create(aId,aValue, aDate,aProjectId);
    expect(aKanbanCard.name.value).to.equal(aValue);
    expect(aKanbanCard.id).to.equal(aId);
    expect(aKanbanCard.project).to.equal(aProjectId);
  });

  it('rename keeps current value if updated happened before', () => {
    const id = 'aId';
    const initialValue = 'aString';
    const anotherValue = 'anotherString';
    const initialDate = new Date(2020,12,24);
    const beforeInitialDate = new Date(2019,11,23);
    const aKanbanCard = KanbanCard.create(id,initialValue,initialDate,'aProjectId');
    const renamedKanbanCard = aKanbanCard.rename(anotherValue,beforeInitialDate);
    expect(renamedKanbanCard.name.value).to.equal(initialValue);
  });

  it('rename keeps new value if updated happened afterwards', () => {
    const id = 'aId';
    const initialValue = 'aString';
    const anotherValue = 'anotherString';
    const initialDate = new Date(2020,12,24);
    const afterInitialDate = new Date(2021,12,25);
    const aKanbanCard = KanbanCard.create(id,initialValue,initialDate,'aProjectId');
    const renamedKanbanCard = aKanbanCard.rename(anotherValue,afterInitialDate);
    expect(renamedKanbanCard.name.value).to.equal(anotherValue);
  });
});
