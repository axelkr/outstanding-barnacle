import { ObjectEvent } from './objectEvent';
import { Task } from '../model/task';

export interface ProcessObjectEventCommand {
  readonly objectEventTypeProcessing: string;
  process(objectEvent: ObjectEvent, tasks: Task[]): Task[];
}
