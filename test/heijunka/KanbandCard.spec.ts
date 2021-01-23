import { expect } from 'chai';

import { KanbanCard } from '../../src/heijunka/KanbanCard';

describe('KanbanCard', () => {
  it('constructor expects that id is defined', () => {
    expect(function(){new KanbanCard(undefined,'aString',new Date())}).throws();
  });

  it('constructor expects that value is defined', () => {
    expect(function(){new KanbanCard('aId',undefined,new Date())}).throws();
  });

  it('constructor expects that Date is defined', () => {
    expect(function(){new KanbanCard('aId','aString',undefined)}).throws();
  });

  it('constructor values are stored', () => {
    const aValue = 'aString';
    const aId = 'aId';
    const aDate = new Date();
    const aKanbanCard = new KanbanCard(aId,aValue, aDate);
    expect(aKanbanCard.name.value).to.equal(aValue);
    expect(aKanbanCard.id).to.equal(aId);
  });

  it('rename keeps current value if updated happened before', () => {
    const id = 'aId';
    const initialValue = 'aString';
    const anotherValue = 'anotherString';
    const initialDate = new Date(2020,12,24);
    const beforeInitialDate = new Date(2019,11,23);
    const aKanbanCard = new KanbanCard(id,initialValue,initialDate);
    const renamedKanbanCard = aKanbanCard.rename(anotherValue,beforeInitialDate);
    expect(renamedKanbanCard.name.value).to.equal(initialValue);
  });

  it('update keeps new value if updated happened afterwards', () => {
    const id = 'aId';
    const initialValue = 'aString';
    const anotherValue = 'anotherString';
    const initialDate = new Date(2020,12,24);
    const afterInitialDate = new Date(2021,12,25);
    const aKanbanCard = new KanbanCard(id,initialValue,initialDate);
    const renamedKanbanCard = aKanbanCard.rename(anotherValue,afterInitialDate);
    expect(renamedKanbanCard.name.value).to.equal(anotherValue);
  });
});
