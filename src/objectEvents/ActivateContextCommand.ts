import { HeijunkaBoard } from '../heijunka/HeijunkaBoard';
import { ObjectEvent, Topic } from 'choicest-barnacle';
import { IProcessObjectEventCommand } from './IProcessObjectEventCommand';
import { BaseCommand, ObjectType } from './BaseCommand';
import { Context } from '../heijunka/Context';

export class ActivateContextCommand extends BaseCommand implements IProcessObjectEventCommand {
  constructor() {
    super(ObjectType.context, 'Activate', true);
  }

  canProcess(objectEvent: ObjectEvent, root: HeijunkaBoard): boolean {
    return root.contexts.has(objectEvent.object);
  }

  process(objectEvent: ObjectEvent, root: HeijunkaBoard): HeijunkaBoard {
    const contextToActivate = root.contexts.get(objectEvent.object);
    return root.updateContexts(root.contexts.activate(contextToActivate));
  }

  createEvent(topic: Topic, context: Context): ObjectEvent {
    return this.createObjectEvent(topic, context.id);
  }
}
