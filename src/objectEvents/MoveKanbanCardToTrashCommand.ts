import { HeijunkaBoard } from '../heijunka/HeijunkaBoard';
import { KanbanCard } from '../heijunka/KanbanCard';
import { Project } from '../heijunka/Project';
import { State } from '../heijunka/State';

import { ObjectEvent, Topic } from 'choicest-barnacle';
import { IProcessObjectEventCommand } from './IProcessObjectEventCommand';
import { BaseCommand, ObjectType } from './BaseCommand';

export class MoveKanbanCardToTrashCommand extends BaseCommand implements IProcessObjectEventCommand {
  constructor() {
    super(ObjectType.kanbanCard, 'MoveToTrash');
  }

  canProcess(objectEvent: ObjectEvent, root: HeijunkaBoard): boolean {
    return root.kanbanCards.has(objectEvent.object) && root.projects.has(root.kanbanCards.get(objectEvent.object).project);
  }

  process(objectEvent: ObjectEvent, root: HeijunkaBoard): HeijunkaBoard {
    const project: Project = root.projects.get(root.kanbanCards.get(objectEvent.object).project);
    const trashState: State = root.stateModels.get(project.stateModelId).trashState();
    return root.updateKanbanCards(root.kanbanCards.completedState(objectEvent.object, trashState.id, objectEvent.time));
  }

  createEvent(topic: Topic, kanbanCard: KanbanCard): ObjectEvent {
    return this.createObjectEvent(topic, kanbanCard.id);
  }
}
