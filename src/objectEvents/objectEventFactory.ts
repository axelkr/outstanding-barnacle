import { Project } from '../heijunka/Project';
import { KanbanCard } from '../heijunka/KanbanCard';
import { State } from '../heijunka/State';
import { StateModel } from '../heijunka/StateModel';
import { UUIDGenerator } from '../heijunka/UUIDGenerator';

import { CreateProjectCommand } from './CreateProjectCommand';
import { UpdatePropertyProjectCommand } from './UpdatePropertyProjectCommand';
import { CreateStateModelCommand } from './CreateStateModelCommand';
import { CreateKanbanCardCommand } from './CreateKanbanCardCommand';
import { MoveKanbanCardInProgressCommand } from './MoveKanbanCardInProgressCommand';
import { KanbanCardCompletedStateCommand } from './KanbanCardCompletedStateCommand';
import { MoveKanbanCardToTrashCommand } from './MoveKanbanCardToTrashCommand';
import { UpdatePropertyKanbanCardCommand } from './UpdatePropertyKanbanCardCommand';
import { InitializePropertyKanbanCardCommand} from './InitializePropertyKanbanCardCommand';
import { InitializePropertyProjectCommand} from './InitializePropertyProjectCommand';

import { ObjectEvent } from 'choicest-barnacle';

export class ObjectEventFactory {

  public createStateModel(topic: string, stateModel: StateModel): ObjectEvent {
    const createStateModelCommand = new CreateStateModelCommand();
    return createStateModelCommand.createEvent(topic, stateModel, this.createUUID());
  }

  public createProject(topic: string, stateModel: StateModel): ObjectEvent {
    const createProjectCommand = new CreateProjectCommand();
    return createProjectCommand.createEvent(topic, stateModel, this.createUUID());
  }

  public initializeProjectProperties(topic: string, project: Project, propertyName: string, newValue: string): ObjectEvent {
    const initializePropertyProjectCommand = new InitializePropertyProjectCommand();
    return initializePropertyProjectCommand.createEvent(topic, project, propertyName, newValue);
  }

  public updateProjectProperties(topic: string, project: Project, propertyName: string, newValue: string): ObjectEvent {
    const updatePropertyProjectCommand = new UpdatePropertyProjectCommand();
    return updatePropertyProjectCommand.createEvent(topic, project, propertyName, newValue);
  }

  public createKanbanCard(topic: string, project: Project): ObjectEvent {
    const createKanbanCardCommand = new CreateKanbanCardCommand();
    return createKanbanCardCommand.createEvent(topic, project.id, this.createUUID());
  }

  public initializeKanbanCardProperties(topic: string, kanbanCard: KanbanCard, propertyName: string, newValue: string): ObjectEvent {
    const initializePropertyKanbanCardCommand = new InitializePropertyKanbanCardCommand();
    return initializePropertyKanbanCardCommand.createEvent(topic, kanbanCard, propertyName, newValue);
  }

  public updateKanbanCardProperties(topic: string, kanbanCard: KanbanCard, propertyName: string, newValue: string): ObjectEvent {
    const updatePropertyKanbanCardCommand = new UpdatePropertyKanbanCardCommand();
    return updatePropertyKanbanCardCommand.createEvent(topic, kanbanCard, propertyName, newValue);
  }

  public moveKanbanCardInProgress(topic: string, kanbanCard: KanbanCard, state: State): ObjectEvent {
    const moveKanbanCardInProgressCommand = new MoveKanbanCardInProgressCommand();
    return moveKanbanCardInProgressCommand.createEvent(topic, kanbanCard, state.id);
  }

  public moveKanbanCardComplete(topic: string, kanbanCard: KanbanCard, state: State): ObjectEvent {
    const moveKanbanCardCompleteCommand = new KanbanCardCompletedStateCommand();
    return moveKanbanCardCompleteCommand.createEvent(topic, kanbanCard, state.id);
  }

  public moveKanbanCardToTrash(topic: string, kanbanCard: KanbanCard): ObjectEvent {
    const moveKanbanCardToTrashCommand = new MoveKanbanCardToTrashCommand();
    return moveKanbanCardToTrashCommand.createEvent(topic, kanbanCard);
  }

  private createUUID(): string {
    return UUIDGenerator.createUUID();
  }
}
