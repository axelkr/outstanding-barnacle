import { Project } from '../heijunka/Project';
import { KanbanCard } from '../heijunka/KanbanCard';
import { State } from '../heijunka/State';
import { StateModel } from '../heijunka/StateModel';

import { UUIDGenerator } from '../heijunka/UUIDGenerator';

import { CreateKanbanCardCommand } from './CreateKanbanCardCommand';
import { MoveKanbanCardInProgressCommand } from './MoveKanbanCardInProgressCommand';
import { KanbanCardCompletedStateCommand } from './KanbanCardCompletedStateCommand';
import { MoveKanbanCardToTrashCommand } from './MoveKanbanCardToTrashCommand';
import { UpdatePropertyKanbanCardCommand } from './UpdatePropertyKanbanCardCommand';
import { InitializePropertyKanbanCardCommand } from './InitializePropertyKanbanCardCommand';

import { ObjectEvent, Topic } from 'choicest-barnacle';
import { IEventFactory } from './IEventFactory';
import { IProcessObjectEventCommand } from './IProcessObjectEventCommand';

export enum KanbanCardProperties {
  NAME = "name"
}

export class KanbanCardEventFactory implements IEventFactory {
  public usedCommands(): IProcessObjectEventCommand[] {
    const result: IProcessObjectEventCommand[] = [];
    result.push(new CreateKanbanCardCommand());
    result.push(new MoveKanbanCardInProgressCommand());
    result.push(new KanbanCardCompletedStateCommand());
    result.push(new MoveKanbanCardToTrashCommand());
    result.push(new UpdatePropertyKanbanCardCommand());
    result.push(new InitializePropertyKanbanCardCommand());
    return result;
  }

  public create(topic: Topic, name: string, project: Project, stateModel: StateModel): { events: ObjectEvent[], kanbanCardId: string } {
    const events: ObjectEvent[] = [];
    const kanbanCardId = UUIDGenerator.createUUID();
    events.push(new CreateKanbanCardCommand().createEvent(topic, project.id, kanbanCardId));
    events.push(new InitializePropertyKanbanCardCommand().createEvent(topic, kanbanCardId, KanbanCardProperties.NAME, name));
    events.push(new MoveKanbanCardInProgressCommand().createEvent(topic, kanbanCardId, stateModel.initialState().id));
    return { events, kanbanCardId };
  }

  public initializeProperty(topic: Topic, kanbanCard: KanbanCard | string, propertyName: string, newValue: string): ObjectEvent {
    return new InitializePropertyKanbanCardCommand().createEvent(topic, this.toKanbanCardId(kanbanCard), propertyName, newValue);
  }

  public updateProperty(topic: Topic, kanbanCard: KanbanCard, propertyName: string, newValue: string): ObjectEvent {
    return new UpdatePropertyKanbanCardCommand().createEvent(topic, kanbanCard, propertyName, newValue);
  }

  public moveToInProgress(topic: Topic, kanbanCard: KanbanCard | string, state: State): ObjectEvent {
    return new MoveKanbanCardInProgressCommand().createEvent(topic, this.toKanbanCardId(kanbanCard), state.id);
  }

  public moveToComplete(topic: Topic, kanbanCard: KanbanCard, state: State): ObjectEvent {
    return new KanbanCardCompletedStateCommand().createEvent(topic, kanbanCard, state.id);
  }

  public moveToTrash(topic: Topic, kanbanCard: KanbanCard): ObjectEvent {
    return new MoveKanbanCardToTrashCommand().createEvent(topic, kanbanCard);
  }

  private toKanbanCardId(kanbanCard: KanbanCard | string): string {
    if (kanbanCard instanceof KanbanCard) {
      return kanbanCard.id;
    } else {
      return kanbanCard;
    }
  }
}
