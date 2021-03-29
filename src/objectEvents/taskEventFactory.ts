import { ObjectEvent, Topic } from 'choicest-barnacle';
import { Task } from '../heijunka/Task';

import { UUIDGenerator } from '../heijunka/UUIDGenerator';
import { KanbanCard } from '../heijunka/KanbanCard';

import { IEventFactory } from './IEventFactory';
import { IProcessObjectEventCommand } from './IProcessObjectEventCommand';
import { CreateTaskCommand} from './CreateTaskCommand';
import { UpdateDescriptionTaskCommand} from './UpdateDescriptionTaskCommand';

export class TaskEventFactory implements IEventFactory {
  public usedCommands(): IProcessObjectEventCommand[] {
    const result: IProcessObjectEventCommand[] = [];
    result.push(new CreateTaskCommand());
    result.push(new UpdateDescriptionTaskCommand());
    return result;
  }

  public create(topic: Topic, parent: Task | KanbanCard, description:string ): ObjectEvent {
    return new CreateTaskCommand().createEvent(topic, UUIDGenerator.createUUID(),parent.id, description);
  }

  public updateDescription(topic: Topic, task: Task, updatedDescription:string ): ObjectEvent {
    return new UpdateDescriptionTaskCommand().createEvent(topic, task, updatedDescription);
  }
}
