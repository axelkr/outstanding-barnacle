import { RootAggregate } from '../heijunka/RootAggregate';
import { ObjectEvent, Topic } from 'choicest-barnacle';
import { ProcessObjectEventCommand } from './processObjectEventCommand';
import { KanbanCard } from '../heijunka/KanbanCard';
import { BaseCommand, ObjectType } from './BaseCommand';

export class CreateKanbanCardCommand extends BaseCommand implements ProcessObjectEventCommand {
  constructor() {
    super(ObjectType.kanbanCard, 'Create');
  }

  canProcess(): boolean {
    return true;
  }

  process(objectEvent: ObjectEvent, root: RootAggregate): RootAggregate {
    const newCard = KanbanCard.create(objectEvent.object, objectEvent.payload.get('project'));
    return root.updateKanbanCards(root.kanbanCards.addKanbanCard(newCard));
  }

  createEvent(topic: Topic, project: string, newUUID: string): ObjectEvent {
    const payload = new Map([['project', project]]);
    return this.createObjectEvent(topic, newUUID, payload);
  }
}
