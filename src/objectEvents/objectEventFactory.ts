import { Project } from '../heijunka/Project';
import { KanbanCard } from '../heijunka/KanbanCard';
import { State } from '../heijunka/State';
import { CreateProjectCommand } from './CreateProjectCommand';
import { RenameProjectCommand } from './RenameProjectCommand';
import { CreateKanbanCardCommand } from './CreateKanbanCardCommand';
import { MoveKanbanCardInProgressCommand } from './MoveKanbanCardInProgressCommand';
import { KanbanCardCompletedStateCommand } from './KanbanCardCompletedStateCommand';

import { ObjectEvent } from './objectEvent';

export class ObjectEventFactory {

  public createProject(topic: string, projectName: string): ObjectEvent {
    const createProjectCommand = new CreateProjectCommand();
    return createProjectCommand.createEvent(topic, projectName, this.createUUID());
  }

  public renameProject(topic: string, project: Project, newName: string): ObjectEvent {
    const renameProjectCommand = new RenameProjectCommand();
    return renameProjectCommand.createEvent(topic, project, newName);
  }

  public createKanbanCard(topic: string, project: Project, name: string): ObjectEvent {
    const createKanbanCardCommand = new CreateKanbanCardCommand();
    return createKanbanCardCommand.createEvent(topic, project.id, name, this.createUUID());
  }

  public moveKanbanCardInProgress(topic: string, kanbanCard: KanbanCard, state: State): ObjectEvent {
    const moveKanbanCardInProgressCommand = new MoveKanbanCardInProgressCommand();
    return moveKanbanCardInProgressCommand.createEvent(topic, kanbanCard, state.id);
  }

  public moveKanbanCardComplete(topic: string, kanbanCard: KanbanCard, state: State): ObjectEvent {
    const moveKanbanCardCompleteCommand = new KanbanCardCompletedStateCommand();
    return moveKanbanCardCompleteCommand.createEvent(topic, kanbanCard, state.id);
  }

  private createUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) { // eslint-disable-line
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);// eslint-disable-line
      return v.toString(16);
    });
  }
}
