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
import { ProcessObjectEventCommand } from './processObjectEventCommand';

export enum KanbanCardProperties {
  NAME = "name"
}

export class KanbanCardEventFactory implements IEventFactory {
  public usedCommands(): ProcessObjectEventCommand[] {
    const result: ProcessObjectEventCommand[] = [];
    result.push(new CreateKanbanCardCommand());
    result.push(new MoveKanbanCardInProgressCommand());
    result.push(new KanbanCardCompletedStateCommand());
    result.push(new MoveKanbanCardToTrashCommand());
    result.push(new UpdatePropertyKanbanCardCommand());
    result.push(new InitializePropertyKanbanCardCommand());
    return result;
  }

  public create(topic: Topic, name: string, project: Project, stateModel: StateModel): ObjectEvent[] {
    const events: ObjectEvent[] = [];
    const newKanbanCardId = UUIDGenerator.createUUID();
    events.push(new CreateKanbanCardCommand().createEvent(topic, project.id, newKanbanCardId));
    events.push(new InitializePropertyKanbanCardCommand().createEvent(topic, newKanbanCardId, KanbanCardProperties.NAME, name));
    events.push(new MoveKanbanCardInProgressCommand().createEvent(topic, newKanbanCardId, stateModel.initialState().id));
    return events;
  }

  public initializeProperty(topic: Topic, kanbanCard: KanbanCard, propertyName: string, newValue: string): ObjectEvent {
    return new InitializePropertyKanbanCardCommand().createEvent(topic, kanbanCard.id, propertyName, newValue);
  }

  public updateProperty(topic: Topic, kanbanCard: KanbanCard, propertyName: string, newValue: string): ObjectEvent {
    return new UpdatePropertyKanbanCardCommand().createEvent(topic, kanbanCard, propertyName, newValue);
  }

  public moveToInProgress(topic: Topic, kanbanCard: KanbanCard, state: State): ObjectEvent {
    return new MoveKanbanCardInProgressCommand().createEvent(topic, kanbanCard.id, state.id);
  }

  public moveToComplete(topic: Topic, kanbanCard: KanbanCard, state: State): ObjectEvent {
    return new KanbanCardCompletedStateCommand().createEvent(topic, kanbanCard, state.id);
  }

  public moveToTrash(topic: Topic, kanbanCard: KanbanCard): ObjectEvent {
    return new MoveKanbanCardToTrashCommand().createEvent(topic, kanbanCard);
  }
}
