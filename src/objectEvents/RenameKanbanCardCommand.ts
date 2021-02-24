import { HeijunkaBoard } from '../heijunka/HeijunkaBoard';
import { KanbanCard } from '../heijunka/KanbanCard';

import { ObjectEvent } from 'choicest-barnacle';
import { ProcessObjectEventCommand } from './processObjectEventCommand';
import { BaseCommand, ObjectType } from './BaseCommand';

export class RenameKanbanCardCommand extends BaseCommand implements ProcessObjectEventCommand {
  constructor() {
    super(ObjectType.kanbanCard, 'Rename');
  }

  canProcess(objectEvent: ObjectEvent, board: HeijunkaBoard): boolean {
    return board.hasKanbanCard(objectEvent.object);
  }

  process(objectEvent: ObjectEvent, board: HeijunkaBoard): HeijunkaBoard {
    return board.renameKanbanCard(objectEvent.object, objectEvent.time, objectEvent.payload.get('name'));
  }

  createEvent(topic: string, kanbanCard: KanbanCard, newName: string): ObjectEvent {
    const payload = new Map([['name', newName]]);
    return this.createObjectEvent(topic, kanbanCard.id, payload);
  }
}
