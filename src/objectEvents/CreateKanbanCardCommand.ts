import { HeijunkaBoard } from '../heijunka/HeijunkaBoard';
import { ObjectEvent } from 'choicest-barnacle';
import { ProcessObjectEventCommand } from './processObjectEventCommand';
import { KanbanCard } from '../heijunka/KanbanCard';
import { BaseCommand, ObjectType } from './BaseCommand';
import { Topic } from './Topic';

export class CreateKanbanCardCommand extends BaseCommand implements ProcessObjectEventCommand {
  constructor() {
    super(ObjectType.kanbanCard, 'Create');
  }

  canProcess(): boolean {
    return true;
  }

  process(objectEvent: ObjectEvent, board: HeijunkaBoard): HeijunkaBoard {
    const newCard = KanbanCard.create(objectEvent.object, objectEvent.payload.get('project'));
    return board.addKanbanCard(newCard);
  }

  createEvent(topic: Topic, project: string, newUUID: string): ObjectEvent {
    const payload = new Map([['project', project]]);
    return this.createObjectEvent(topic, newUUID, payload);
  }
}
