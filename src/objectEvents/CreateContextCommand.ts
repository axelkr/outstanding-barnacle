import { HeijunkaBoard } from '../heijunka/HeijunkaBoard';
import { ObjectEvent, Topic } from 'choicest-barnacle';
import { IProcessObjectEventCommand } from './IProcessObjectEventCommand';
import { BaseCommand, ObjectType } from './BaseCommand';
import { Context } from '../heijunka/Context';

export class CreateContextCommand extends BaseCommand implements IProcessObjectEventCommand {
  private readonly nameKey = 'name';

  constructor() {
    super(ObjectType.context, 'Create');
  }

  canProcess(): boolean {
    return true;
  }

  process(objectEvent: ObjectEvent, root: HeijunkaBoard): HeijunkaBoard {
    const newContext = new Context( objectEvent.object, objectEvent.payload.get(this.nameKey));
    if (root.contexts.has(newContext.id)) {
      return root;
    }
    return root.updateContexts(root.contexts.add(newContext));
  }

  createEvent(topic: Topic, name: string, newUUID: string): ObjectEvent {
    const payload = new Map([[this.nameKey, name]]);
    return this.createObjectEvent(topic, newUUID, payload);
  }
}
