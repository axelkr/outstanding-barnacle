import { RootAggregate } from '../heijunka/RootAggregate';
import { KanbanCard } from '../heijunka/KanbanCard';
import { Project } from '../heijunka/Project';
import { State } from '../heijunka/State';

import { ObjectEvent, Topic } from 'choicest-barnacle';
import { ProcessObjectEventCommand } from './processObjectEventCommand';
import { BaseCommand, ObjectType } from './BaseCommand';

export class MoveKanbanCardToTrashCommand extends BaseCommand implements ProcessObjectEventCommand {
  constructor() {
    super(ObjectType.kanbanCard, 'MoveToTrash');
  }

  canProcess(objectEvent: ObjectEvent, root: RootAggregate): boolean {
    return root.kanbanCards.has(objectEvent.object) && root.projects.has(root.kanbanCards.get(objectEvent.object).project);
  }

  process(objectEvent: ObjectEvent, root: RootAggregate): RootAggregate {
    const project: Project = root.projects.get(root.kanbanCards.get(objectEvent.object).project);
    const trashState: State = root.getStateModelOf(project).trashState();
    return root.updateKanbanCards(root.kanbanCards.completedState(objectEvent.object, trashState.id, objectEvent.time));
  }

  createEvent(topic: Topic, kanbanCard: KanbanCard): ObjectEvent {
    const payload: Map<string, string> = new Map([]);
    return this.createObjectEvent(topic, kanbanCard.id, payload);
  }
}
