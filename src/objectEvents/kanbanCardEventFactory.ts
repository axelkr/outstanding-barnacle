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
import { Topic } from './Topic';

import { ObjectEvent } from 'choicest-barnacle';

export enum KanbanCardProperties {
  NAME = "name"
}

export class KanbanCardEventFactory {
  public create(topic: Topic, name: string, project: Project, stateModel: StateModel): ObjectEvent[] {
    const events: ObjectEvent[] = [];
    const newKanbanCardId = UUIDGenerator.createUUID();
    events.push(new CreateKanbanCardCommand().createEvent(topic, project.id, newKanbanCardId));
    events.push(new InitializePropertyKanbanCardCommand().createEvent(topic, newKanbanCardId, KanbanCardProperties.NAME, name));
    events.push(new MoveKanbanCardInProgressCommand().createEvent(topic, newKanbanCardId, stateModel.initialState().id));
    return events;
  }

  public initializeProperty(topic: Topic, kanbanCard: KanbanCard, propertyName: string, newValue: string): ObjectEvent {
    const initializePropertyKanbanCardCommand = new InitializePropertyKanbanCardCommand();
    return initializePropertyKanbanCardCommand.createEvent(topic, kanbanCard.id, propertyName, newValue);
  }

  public updateProperty(topic: Topic, kanbanCard: KanbanCard, propertyName: string, newValue: string): ObjectEvent {
    const updatePropertyKanbanCardCommand = new UpdatePropertyKanbanCardCommand();
    return updatePropertyKanbanCardCommand.createEvent(topic, kanbanCard, propertyName, newValue);
  }

  public moveToInProgress(topic: Topic, kanbanCard: KanbanCard, state: State): ObjectEvent {
    const moveKanbanCardInProgressCommand = new MoveKanbanCardInProgressCommand();
    return moveKanbanCardInProgressCommand.createEvent(topic, kanbanCard.id, state.id);
  }

  public moveToComplete(topic: Topic, kanbanCard: KanbanCard, state: State): ObjectEvent {
    const moveKanbanCardCompleteCommand = new KanbanCardCompletedStateCommand();
    return moveKanbanCardCompleteCommand.createEvent(topic, kanbanCard, state.id);
  }

  public moveToTrash(topic: Topic, kanbanCard: KanbanCard): ObjectEvent {
    const moveKanbanCardToTrashCommand = new MoveKanbanCardToTrashCommand();
    return moveKanbanCardToTrashCommand.createEvent(topic, kanbanCard);
  }
}
