import { ObjectEvent, Topic } from 'choicest-barnacle';

import { UUIDGenerator } from '../heijunka/UUIDGenerator';
import { Context } from '../heijunka/Context'
import { KanbanCard } from '../heijunka/KanbanCard'

import { IEventFactory } from './IEventFactory';
import { IProcessObjectEventCommand } from './IProcessObjectEventCommand';
import { CreateContextCommand } from './CreateContextCommand';
import { SetContextForKanbanCardCommand } from './SetContextForKanbanCardCommand';
import { UnsetContextForKanbanCardCommand } from './UnsetContextForKanbanCardCommand';

export class ContextEventFactory implements IEventFactory {
  public usedCommands(): IProcessObjectEventCommand[] {
    const result: IProcessObjectEventCommand[] = [];
    result.push(new CreateContextCommand());
    result.push(new SetContextForKanbanCardCommand());
    result.push(new UnsetContextForKanbanCardCommand());
    return result;
  }

  public create(topic: Topic, name: string): ObjectEvent {
    return new CreateContextCommand().createEvent(topic, name, UUIDGenerator.createUUID());
  }

  public setContext(topic: Topic, context: Context, kanbanCard: KanbanCard): ObjectEvent {
    return new SetContextForKanbanCardCommand().createEvent(topic, context, kanbanCard);
  }

  public unsetContext(topic: Topic, context: Context, kanbanCard: KanbanCard): ObjectEvent {
    return new UnsetContextForKanbanCardCommand().createEvent(topic, context, kanbanCard);
  }
}
