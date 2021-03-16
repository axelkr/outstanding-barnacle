import { RootAggregate } from '../heijunka/RootAggregate';

import { ObjectEvent, Topic } from 'choicest-barnacle';
import { ProcessObjectEventCommand } from './processObjectEventCommand';
import { BaseCommand, ObjectType } from './BaseCommand';

export class MoveKanbanCardInProgressCommand extends BaseCommand implements ProcessObjectEventCommand {
  constructor() {
    super(ObjectType.kanbanCard, 'InProgress');
  }

  canProcess(objectEvent: ObjectEvent, root: RootAggregate): boolean {
    return root.heijunkaBoard.hasKanbanCard(objectEvent.object);
  }

  process(objectEvent: ObjectEvent, root: RootAggregate): RootAggregate {
    return root.updateHeijunkaBoard(root.heijunkaBoard.inProgressInState(objectEvent.object, objectEvent.payload.get('newState'), objectEvent.time));
  }

  createEvent(topic: Topic, kanbanCardId: string, idNewState: string): ObjectEvent {
    const payload = new Map([['newState', idNewState]]);
    return this.createObjectEvent(topic, kanbanCardId, payload);
  }
}
