import { ObjectEvent, Topic } from 'choicest-barnacle';
import { Task } from '../heijunka/Task';

import { UUIDGenerator } from '../heijunka/UUIDGenerator';
import { KanbanCard } from '../heijunka/KanbanCard';

import { IEventFactory } from './IEventFactory';
import { IProcessObjectEventCommand } from './IProcessObjectEventCommand';
import { CreateTaskCommand} from './CreateTaskCommand';

export class TaskEventFactory implements IEventFactory {
  public usedCommands(): IProcessObjectEventCommand[] {
    const result: IProcessObjectEventCommand[] = [];
    result.push(new CreateTaskCommand())
    return result;
  }

  public create(topic: Topic, parent: Task | KanbanCard, description:string ): ObjectEvent {
    return new CreateTaskCommand().createEvent(topic, UUIDGenerator.createUUID(),parent.id, description);
  }
}
