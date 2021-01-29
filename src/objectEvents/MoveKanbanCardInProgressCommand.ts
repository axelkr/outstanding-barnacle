import { HeijunkaBoard } from '../heijunka/HeijunkaBoard';
import { KanbanCard } from '../heijunka/KanbanCard';

import { ObjectEvent } from './objectEvent';
import { ProcessObjectEventCommand } from './processObjectEventCommand';

export class MoveKanbanCardInProgressCommand implements ProcessObjectEventCommand {
  readonly objectEventTypeProcessing: string = 'KanbanCardInProgress';

  canProcess(objectEvent: ObjectEvent, board: HeijunkaBoard): boolean {
    return board.hasKanbanCard(objectEvent.object);
  }

  process(objectEvent: ObjectEvent, board: HeijunkaBoard): HeijunkaBoard {
    return board.inProgressInState(objectEvent.object,objectEvent.payload.get('newState'),objectEvent.time);
  }

  createEvent(topic: string, kanbanCard: KanbanCard, idNewState: string): ObjectEvent {
    const eventIdDiscardedByBackend = 0;
    const moveKanbanCardInProgressEvent: ObjectEvent = {
      topic,
      time: new Date(),
      id: eventIdDiscardedByBackend,
      eventType: this.objectEventTypeProcessing,
      object: kanbanCard.id,
      objectType: 'KanbanCard',
      payload: new Map([['newState', idNewState]])
    };
    return moveKanbanCardInProgressEvent;
  }
}
