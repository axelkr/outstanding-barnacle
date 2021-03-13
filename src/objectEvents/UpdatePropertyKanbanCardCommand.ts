import { HeijunkaBoard } from '../heijunka/HeijunkaBoard';
import { KanbanCard } from '../heijunka/KanbanCard';

import { ObjectEvent } from 'choicest-barnacle';
import { ProcessObjectEventCommand } from './processObjectEventCommand';
import { BaseCommand, ObjectType } from './BaseCommand';

export class UpdatePropertyKanbanCardCommand extends BaseCommand implements ProcessObjectEventCommand {
  constructor() {
    super(ObjectType.kanbanCard, 'UpdateProperty');
  }

  canProcess(objectEvent: ObjectEvent, board: HeijunkaBoard): boolean {
    return board.hasKanbanCard(objectEvent.object);
  }

  process(objectEvent: ObjectEvent, board: HeijunkaBoard): HeijunkaBoard {
    return board.updatePropertyKanbanCard(objectEvent.object, objectEvent.payload.get('property'), objectEvent.time, objectEvent.payload.get('value'));
  }

  createEvent(topic: string, kanbanCard: KanbanCard, propertyName: string, newValue: string): ObjectEvent {
    const payload = new Map([['property', propertyName],['value', newValue]]);
    return this.createObjectEvent(topic, kanbanCard.id, payload);
  }
}
