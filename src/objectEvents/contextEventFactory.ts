import { ObjectEvent, Topic } from 'choicest-barnacle';

import { UUIDGenerator } from '../heijunka/UUIDGenerator';
import { Context } from '../heijunka/Context'
import { KanbanCard } from '../heijunka/KanbanCard'

import { IEventFactory } from './IEventFactory';
import { IProcessObjectEventCommand } from './IProcessObjectEventCommand';
import { CreateContextCommand } from './CreateContextCommand';
import { SetContextForKanbanCardCommand } from './SetContextForKanbanCardCommand';
import { UnsetContextForKanbanCardCommand } from './UnsetContextForKanbanCardCommand';
import { ActivateContextCommand } from './ActivateContextCommand';
import { DeactivateContextCommand } from './DeactivateContextCommand';

export class ContextEventFactory implements IEventFactory {
  public usedCommands(): IProcessObjectEventCommand[] {
    const result: IProcessObjectEventCommand[] = [];
    result.push(new CreateContextCommand());
    result.push(new SetContextForKanbanCardCommand());
    result.push(new UnsetContextForKanbanCardCommand());
    result.push(new ActivateContextCommand());
    result.push(new DeactivateContextCommand());
    return result;
  }

  public create(topic: Topic, name: string): ObjectEvent {
    return new CreateContextCommand().createEvent(topic, name, UUIDGenerator.createUUID());
  }

  public setContext(topic: Topic, context: Context, kanbanCard: KanbanCard | string): ObjectEvent {
    return new SetContextForKanbanCardCommand().createEvent(topic, context, this.toKanbanCardId(kanbanCard));
  }

  public unsetContext(topic: Topic, context: Context, kanbanCard: KanbanCard | string): ObjectEvent {
    return new UnsetContextForKanbanCardCommand().createEvent(topic, context, this.toKanbanCardId(kanbanCard));
  }

  public activate(topic: Topic, context: Context): ObjectEvent {
    return new ActivateContextCommand().createEvent(topic, context);
  }

  public deactivate(topic: Topic, context: Context): ObjectEvent {
    return new DeactivateContextCommand().createEvent(topic, context);
  }

  private toKanbanCardId(kanbanCard: KanbanCard | string): string {
    if (kanbanCard instanceof KanbanCard) {
      return kanbanCard.id;
    }
    return kanbanCard;
  }
}
