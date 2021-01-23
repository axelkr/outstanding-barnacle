import { Project } from '../heijunka/Project';
import { HeijunkaBoard } from '../heijunka/HeijunkaBoard';
import { ObjectEvent } from './objectEvent';
import { ProcessObjectEventCommand } from './processObjectEventCommand';

export class CreateProjectCommand implements ProcessObjectEventCommand {
  readonly objectEventTypeProcessing: string = 'CreateProject';

  canProcess(): boolean {
    return true;
  }

  process(objectEvent: ObjectEvent, board: HeijunkaBoard): HeijunkaBoard {
    return board.addProject(new Project(objectEvent.object, objectEvent.payload.get('name'), objectEvent.time));
  }

  createEvent(topic: string, projectName: string, newUUID: string): ObjectEvent {
    const eventIdDiscardedByBackend = 0;
    const createProjectEvent: ObjectEvent = {
      topic,
      time: new Date(),
      id: eventIdDiscardedByBackend,
      eventType: this.objectEventTypeProcessing,
      object: newUUID,
      objectType: 'Project',
      payload: new Map([['name', projectName]])
    };
    return createProjectEvent;
  }
}
