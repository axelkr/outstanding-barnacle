import { HeijunkaBoard } from '../heijunka/HeijunkaBoard';
import { KanbanCard } from '../heijunka/KanbanCard';

import { ObjectEvent, Topic } from 'choicest-barnacle';
import { IProcessObjectEventCommand } from './IProcessObjectEventCommand';
import { BaseCommand, ObjectType } from './BaseCommand';

export class UpdatePropertyKanbanCardCommand extends BaseCommand implements IProcessObjectEventCommand {
  constructor() {
    super(ObjectType.kanbanCard, 'UpdateProperty');
  }

  canProcess(objectEvent: ObjectEvent, root: HeijunkaBoard): boolean {
    return root.kanbanCards.has(objectEvent.object);
  }

  process(objectEvent: ObjectEvent, root: HeijunkaBoard): HeijunkaBoard {
    return root.updateKanbanCards(root.kanbanCards.updateProperty(objectEvent.object, objectEvent.payload.get('property'), objectEvent.time, objectEvent.payload.get('value')));
  }

  createEvent(topic: Topic, kanbanCard: KanbanCard, propertyName: string, newValue: string): ObjectEvent {
    const payload = new Map([['property', propertyName], ['value', newValue]]);
    return this.createObjectEvent(topic, kanbanCard.id, payload);
  }
}
