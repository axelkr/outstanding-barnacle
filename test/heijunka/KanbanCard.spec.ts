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
});
