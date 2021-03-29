import { HeijunkaBoard } from '../heijunka/HeijunkaBoard';
import { ObjectEvent, Topic } from 'choicest-barnacle';
import { IProcessObjectEventCommand } from './IProcessObjectEventCommand';
import { BaseCommand, ObjectType } from './BaseCommand';
import { Task } from '../heijunka/Task';

export class MarkAsDoneTaskCommand extends BaseCommand implements IProcessObjectEventCommand {
  constructor() {
    super(ObjectType.task, 'markAsDone');
  }

  canProcess(objectEvent: ObjectEvent, root: HeijunkaBoard): boolean {
    return root.tasks.has(objectEvent.object);
  }

  process(objectEvent: ObjectEvent, root: HeijunkaBoard): HeijunkaBoard {
    return root.updateTasks(root.tasks.markAsDone(objectEvent.object,objectEvent.time));
  }

  createEvent(topic: Topic, task: Task): ObjectEvent {
    return this.createObjectEvent(topic, task.id);
  }
}
