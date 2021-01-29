import { HeijunkaBoard } from '../heijunka/HeijunkaBoard';
import { ObjectEvent } from './objectEvent';
import { ProcessObjectEventCommand } from './processObjectEventCommand';
import { KanbanCard } from '../heijunka/KanbanCard';

export class CreateKanbanCardCommand implements ProcessObjectEventCommand {
  readonly objectEventTypeProcessing: string = 'CreateKanbanCard';

  canProcess(): boolean {
    return true;
  }

  process(objectEvent: ObjectEvent, board: HeijunkaBoard): HeijunkaBoard {
    const newCard = KanbanCard.create(objectEvent.object, objectEvent.payload.get('name'), objectEvent.time, objectEvent.payload.get('project'));
    return board.addKanbanCard(newCard);
  }

  createEvent(topic: string, project: string, name: string, newUUID: string): ObjectEvent {
    const eventIdDiscardedByBackend = 0;
    const createKanbanCardEvent: ObjectEvent = {
      topic,
      time: new Date(),
      id: eventIdDiscardedByBackend,
      eventType: this.objectEventTypeProcessing,
      object: newUUID,
      objectType: 'KanbanCard',
      payload: new Map([['name', name], ['project', project]])
    };
    return createKanbanCardEvent;
  }
}
