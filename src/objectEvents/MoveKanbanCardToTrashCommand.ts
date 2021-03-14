import { HeijunkaBoard } from '../heijunka/HeijunkaBoard';
import { KanbanCard } from '../heijunka/KanbanCard';
import { Project } from '../heijunka/Project';
import { State } from '../heijunka/State';

import { ObjectEvent } from 'choicest-barnacle';
import { ProcessObjectEventCommand } from './processObjectEventCommand';
import { BaseCommand, ObjectType } from './BaseCommand';
import { Topic } from './Topic';

export class MoveKanbanCardToTrashCommand extends BaseCommand implements ProcessObjectEventCommand {
  constructor() {
    super(ObjectType.kanbanCard, 'MoveToTrash');
  }

  canProcess(objectEvent: ObjectEvent, board: HeijunkaBoard): boolean {
    return board.hasKanbanCard(objectEvent.object) && board.hasProject(board.getKanbanCard(objectEvent.object).project);
  }

  process(objectEvent: ObjectEvent, board: HeijunkaBoard): HeijunkaBoard {
    const project: Project = board.getProject(board.getKanbanCard(objectEvent.object).project);
    const trashState: State = board.getStateModelOf(project).trashState();
    return board.completedState(objectEvent.object, trashState.id, objectEvent.time);
  }

  createEvent(topic: Topic, kanbanCard: KanbanCard): ObjectEvent {
    const payload: Map<string,string> = new Map([]);
    return this.createObjectEvent(topic, kanbanCard.id, payload);
  }
}
