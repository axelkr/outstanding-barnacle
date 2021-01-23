import { HeijunkaBoard } from '../heijunka/HeijunkaBoard';
import { Project } from '../heijunka/Project';

import { ObjectEvent } from './objectEvent';
import { ProcessObjectEventCommand } from './processObjectEventCommand';

export class RenameProjectCommand implements ProcessObjectEventCommand {
  readonly objectEventTypeProcessing: string = 'RenameProject';

  process(objectEvent: ObjectEvent, board: HeijunkaBoard): HeijunkaBoard {
    return board;
  }

  createEvent(topic: string, project: Project, newName: string): ObjectEvent {
    const eventIdDiscardedByBackend = 0;
    const createProjectEvent: ObjectEvent = {
      topic,
      time: new Date(),
      id: eventIdDiscardedByBackend,
      eventType: this.objectEventTypeProcessing,
      object: project.id,
      objectType: 'Project',
      payload: new Map([['name', newName]])
    };
    return createProjectEvent;
  }
}
