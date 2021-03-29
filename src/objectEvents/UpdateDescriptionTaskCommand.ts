import { HeijunkaBoard } from '../heijunka/HeijunkaBoard';
import { ObjectEvent, Topic } from 'choicest-barnacle';
import { IProcessObjectEventCommand } from './IProcessObjectEventCommand';
import { BaseCommand, ObjectType } from './BaseCommand';
import { Task } from '../heijunka/Task';

export class UpdateDescriptionTaskCommand extends BaseCommand implements IProcessObjectEventCommand {
  private readonly descriptionKey = 'description';

  constructor() {
    super(ObjectType.task, 'updateDescription');
  }

  canProcess(objectEvent: ObjectEvent, root: HeijunkaBoard): boolean {
    return root.tasks.has(objectEvent.object);
  }

  process(objectEvent: ObjectEvent, root: HeijunkaBoard): HeijunkaBoard {
    return root.updateTasks(root.tasks.rename(objectEvent.object,objectEvent.payload.get(this.descriptionKey),objectEvent.time));
  }

  createEvent(topic: Topic, task: Task, newDescription: string): ObjectEvent {
    const payload = new Map([[this.descriptionKey, newDescription]]);
    return this.createObjectEvent(topic, task.id, payload);
  }
}
