import { HeijunkaBoard } from '../heijunka/HeijunkaBoard';
import { KanbanCard } from '../heijunka/KanbanCard';

import { ObjectEvent } from './objectEvent';
import { ProcessObjectEventCommand } from './processObjectEventCommand';

export class KanbanCardCompletedStateCommand implements ProcessObjectEventCommand {
  readonly objectEventTypeProcessing: string = 'KanbanCardCompletedState';

  canProcess(objectEvent: ObjectEvent, board: HeijunkaBoard): boolean {
    return board.hasKanbanCard(objectEvent.object);
  }

  process(objectEvent: ObjectEvent, board: HeijunkaBoard): HeijunkaBoard {
    return board.completedState(objectEvent.object,objectEvent.payload.get('state'),objectEvent.time);
  }

  createEvent(topic: string, kanbanCard: KanbanCard, idState: string): ObjectEvent {
    const eventIdDiscardedByBackend = 0;
    const kanbanCardCompletedStateEvent: ObjectEvent = {
      topic,
      time: new Date(),
      id: eventIdDiscardedByBackend,
      eventType: this.objectEventTypeProcessing,
      object: kanbanCard.id,
      objectType: 'KanbanCard',
      payload: new Map([['state', idState]])
    };
    return kanbanCardCompletedStateEvent;
  }
}
