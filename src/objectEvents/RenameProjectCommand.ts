import { HeijunkaBoard } from '../heijunka/HeijunkaBoard';
import { Project } from '../heijunka/Project';

import { ObjectEvent } from 'choicest-barnacle';
import { ProcessObjectEventCommand } from './processObjectEventCommand';
import { BaseCommand, ObjectType } from './BaseCommand';

export class RenameProjectCommand extends BaseCommand implements ProcessObjectEventCommand {
  constructor() {
    super(ObjectType.project, 'Rename');
  }

  canProcess(objectEvent: ObjectEvent, board: HeijunkaBoard): boolean {
    return board.hasProject(objectEvent.object);
  }

  process(objectEvent: ObjectEvent, board: HeijunkaBoard): HeijunkaBoard {
    return board.renameProject(objectEvent.object, objectEvent.time, objectEvent.payload.get('name'));
  }

  createEvent(topic: string, project: Project, newName: string): ObjectEvent {
    const payload = new Map([['name', newName]]);
    return this.createObjectEvent(topic, project.id, payload);
  }
}
