import { RootAggregate } from '../heijunka/RootAggregate';
import { KanbanCard } from '../heijunka/KanbanCard';

import { ObjectEvent, Topic } from 'choicest-barnacle';
import { ProcessObjectEventCommand } from './processObjectEventCommand';
import { BaseCommand, ObjectType } from './BaseCommand';

export class UpdatePropertyKanbanCardCommand extends BaseCommand implements ProcessObjectEventCommand {
  constructor() {
    super(ObjectType.kanbanCard, 'UpdateProperty');
  }

  canProcess(objectEvent: ObjectEvent, root: RootAggregate): boolean {
    return root.heijunkaBoard.hasKanbanCard(objectEvent.object);
  }

  process(objectEvent: ObjectEvent, root: RootAggregate): RootAggregate {
    return root.updateHeijunkaBoard(root.heijunkaBoard.updatePropertyKanbanCard(objectEvent.object, objectEvent.payload.get('property'), objectEvent.time, objectEvent.payload.get('value')));
  }

  createEvent(topic: Topic, kanbanCard: KanbanCard, propertyName: string, newValue: string): ObjectEvent {
    const payload = new Map([['property', propertyName], ['value', newValue]]);
    return this.createObjectEvent(topic, kanbanCard.id, payload);
  }
}
