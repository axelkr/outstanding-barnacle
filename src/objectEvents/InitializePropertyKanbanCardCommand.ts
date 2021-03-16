import { RootAggregate } from '../heijunka/RootAggregate';

import { ObjectEvent, Topic } from 'choicest-barnacle';
import { ProcessObjectEventCommand } from './processObjectEventCommand';
import { BaseCommand, ObjectType } from './BaseCommand';

export class InitializePropertyKanbanCardCommand extends BaseCommand implements ProcessObjectEventCommand {
  constructor() {
    super(ObjectType.kanbanCard, 'InitializeProperty');
  }

  canProcess(objectEvent: ObjectEvent, root: RootAggregate): boolean {
    return root.heijunkaBoard.hasKanbanCard(objectEvent.object);
  }

  process(objectEvent: ObjectEvent, root: RootAggregate): RootAggregate {
    return root.setHeijunkaBoard(root.heijunkaBoard.initializePropertyKanbanCard(objectEvent.object, objectEvent.payload.get('property'), objectEvent.time, objectEvent.payload.get('value')));
  }

  createEvent(topic: Topic, kanbanCardId: string, propertyName: string, newValue: string): ObjectEvent {
    const payload = new Map([['property', propertyName], ['value', newValue]]);
    return this.createObjectEvent(topic, kanbanCardId, payload);
  }
}
