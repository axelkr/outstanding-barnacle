import { HeijunkaBoard } from '../heijunka/HeijunkaBoard';
import { ObjectEvent, Topic } from 'choicest-barnacle';
import { IProcessObjectEventCommand } from './IProcessObjectEventCommand';
import { BaseCommand, ObjectType } from './BaseCommand';
import { Task } from '../heijunka/Task';

export class CreateTaskCommand extends BaseCommand implements IProcessObjectEventCommand {
  private readonly parentIdKey = 'parentId';
  private readonly descriptionKey = 'description';

  constructor() {
    super(ObjectType.task, 'Create');
  }

  canProcess(objectEvent: ObjectEvent, root: HeijunkaBoard): boolean {
    const parentId = objectEvent.payload.get(this.parentIdKey);
    return root.kanbanCards.has(parentId) || root.tasks.has(parentId);
  }

  process(objectEvent: ObjectEvent, root: HeijunkaBoard): HeijunkaBoard {
    const newTask = Task.create(objectEvent.object, objectEvent.payload.get(this.parentIdKey),objectEvent.time, objectEvent.payload.get(this.descriptionKey));
    if (root.tasks.has(newTask.id)) {
      return root;
    }
    return root.updateTasks(root.tasks.add(newTask));
  }

  createEvent(topic: Topic, newUUID: string, parentId: string, description: string): ObjectEvent {
    const payload = new Map([[this.parentIdKey, parentId],[this.descriptionKey, description]]);
    return this.createObjectEvent(topic, newUUID, payload);
  }
}
