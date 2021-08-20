import { KanbanCard } from '../../src/heijunka/KanbanCard';

describe('KanbanCard', () => {
  it('constructor expects that id is defined', () => {
    expect(function () { KanbanCard.create(undefined, 'aProjectId') }).toThrow();
  });

  it('constructor expects that project is defined', () => {
    expect(function () { KanbanCard.create('aId', undefined) }).toThrow();
  });

  it('constructor values are stored', () => {
    const aId = 'aId';
    const aProjectId = 'aProjectId';
    const aKanbanCard = KanbanCard.create(aId, aProjectId);
    expect(aKanbanCard.id).toEqual(aId);
    expect(aKanbanCard.project).toEqual(aProjectId);
  });
});
