import { ProcessObjectEventCommand } from './processObjectEventCommand';
import { ObjectEvent } from './objectEvent';
import { Task } from '../model/task';

export class UpdateStateCommand implements ProcessObjectEventCommand {
  readonly objectEventTypeProcessing: string = 'UpdateTaskState';

  constructor() { }

  process(objectEvent: ObjectEvent, tasks: Task[]): Task[] {
    const result: Task[] = [];
    let state = objectEvent.payload.get('state');
    if (state === undefined) {
      state = '';
    }
    tasks.forEach(aTask => {
      if (aTask.id === objectEvent.object && state !== undefined) {
        aTask.state = state;
      }
      result.push(aTask);
    });

    return result;
  }
}
