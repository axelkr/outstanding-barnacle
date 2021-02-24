import { Project } from '../heijunka/Project';
import { HeijunkaBoard } from '../heijunka/HeijunkaBoard';
import { ObjectEvent } from 'choicest-barnacle';
import { ProcessObjectEventCommand } from './processObjectEventCommand';
import { BaseCommand, ObjectType } from './BaseCommand';

export class CreateProjectCommand extends BaseCommand implements ProcessObjectEventCommand {
  constructor() {
    super(ObjectType.project, 'Create');
  }

  canProcess(): boolean {
    return true;
  }

  process(objectEvent: ObjectEvent, board: HeijunkaBoard): HeijunkaBoard {
    return board.addProject(new Project(objectEvent.object, objectEvent.payload.get('name'), objectEvent.time));
  }

  createEvent(topic: string, projectName: string, newUUID: string): ObjectEvent {
    const payload = new Map([['name', projectName]]);
    return this.createObjectEvent(topic, newUUID, payload);
  }
}
