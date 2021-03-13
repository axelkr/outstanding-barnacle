import { HeijunkaBoard } from '../heijunka/HeijunkaBoard';
import { ObjectEvent } from 'choicest-barnacle';
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

  process(objectEvent: ObjectEvent, board: HeijunkaBoard): HeijunkaBoard {
    let newCard = KanbanCard.create(objectEvent.object, objectEvent.payload.get('project'));
    newCard = newCard.initializeProperty('name',objectEvent.payload.get('name'), objectEvent.time);
    return board.addKanbanCard(newCard);
  }

  createEvent(topic: string, project: string, name: string, newUUID: string): ObjectEvent {
    const payload = new Map([['name', name], ['project', project]]);
    return this.createObjectEvent(topic, newUUID, payload);
  }
}
