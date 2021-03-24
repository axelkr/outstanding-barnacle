import { HeijunkaBoard } from '../heijunka/HeijunkaBoard';

import { ObjectEvent, Topic } from 'choicest-barnacle';
import { ProcessObjectEventCommand } from './processObjectEventCommand';
import { BaseCommand, ObjectType } from './BaseCommand';

export class MoveKanbanCardInProgressCommand extends BaseCommand implements ProcessObjectEventCommand {
  constructor() {
    super(ObjectType.kanbanCard, 'InProgress');
  }

  canProcess(objectEvent: ObjectEvent, root: HeijunkaBoard): boolean {
    return root.kanbanCards.has(objectEvent.object);
  }

  process(objectEvent: ObjectEvent, root: HeijunkaBoard): HeijunkaBoard {
    return root.updateKanbanCards(root.kanbanCards.inProgressInState(objectEvent.object, objectEvent.payload.get('newState'), objectEvent.time));
  }

  createEvent(topic: Topic, kanbanCardId: string, idNewState: string): ObjectEvent {
    const payload = new Map([['newState', idNewState]]);
    return this.createObjectEvent(topic, kanbanCardId, payload);
  }
}
