import { ProcessObjectEventCommand} from './processObjectEventCommand';
import { ObjectEvent } from './objectEvent';
import { Task } from '../model/task';

export class CreateTaskCommand implements ProcessObjectEventCommand {
  readonly objectEventTypeProcessing: string = 'CreateTask';

  process(objectEvent: ObjectEvent, tasks: Task[]): Task[] {
    const result = [...tasks];
    let name = objectEvent.payload.get('name');
    if (name === undefined) {
      name = '';
    }
    let state = objectEvent.payload.get('state');
    if (state === undefined) {
      state = '';
    }
    if ( ! this.objectAlreadyCreated(tasks,objectEvent.object)) {
      result.push({id:objectEvent.object,name,state});
    }
    return result;
  }

  private objectAlreadyCreated(tasks: Task[], objectId: string): boolean {
    let alreadyCreated = false;
    tasks.forEach(aTask => {
      if ( aTask.id === objectId) {
        alreadyCreated = true;
      }
    });
    return alreadyCreated;
  }
}
