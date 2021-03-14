import { HeijunkaBoard } from '../heijunka/HeijunkaBoard';

import { ObjectEvent } from 'choicest-barnacle';
import { ProcessObjectEventCommand } from './processObjectEventCommand';
import { BaseCommand, ObjectType } from './BaseCommand';

export class MoveKanbanCardInProgressCommand extends BaseCommand implements ProcessObjectEventCommand {
  constructor() {
    super(ObjectType.kanbanCard, 'InProgress');
  }

  canProcess(objectEvent: ObjectEvent, board: HeijunkaBoard): boolean {
    return board.hasKanbanCard(objectEvent.object);
  }

  process(objectEvent: ObjectEvent, board: HeijunkaBoard): HeijunkaBoard {
    return board.inProgressInState(objectEvent.object, objectEvent.payload.get('newState'), objectEvent.time);
  }

  createEvent(topic: string, kanbanCardId: string, idNewState: string): ObjectEvent {
    const payload = new Map([['newState', idNewState]]);
    return this.createObjectEvent(topic, kanbanCardId, payload);
  }
}
