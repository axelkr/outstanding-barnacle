import { HeijunkaBoard } from '../heijunka/HeijunkaBoard';
import { ObjectEvent, Topic } from 'choicest-barnacle';
import { IProcessObjectEventCommand } from './IProcessObjectEventCommand';
import { Context } from '../heijunka/Context';
import { BaseCommand, ObjectType } from './BaseCommand';

export class SetContextForKanbanCardCommand extends BaseCommand implements IProcessObjectEventCommand {
  constructor() {
    super(ObjectType.context, 'SetContextForKanbanCard');
  }

  canProcess(objectEvent: ObjectEvent, root: HeijunkaBoard): boolean {
    return root.contexts.has(objectEvent.object);
  }

  process(objectEvent: ObjectEvent, root: HeijunkaBoard): HeijunkaBoard {
    const context = root.contexts.get(objectEvent.object);
    return root.updateContexts(root.contexts.setContext(context, objectEvent.payload.get('kanbanCard')));
  }

  createEvent(topic: Topic, context: Context, kanbanCardId: string): ObjectEvent {
    const payload = new Map([['kanbanCard', kanbanCardId]]);
    return this.createObjectEvent(topic, context.id, payload);
  }
}
