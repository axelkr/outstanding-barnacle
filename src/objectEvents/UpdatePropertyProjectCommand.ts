import { HeijunkaBoard } from '../heijunka/HeijunkaBoard';
import { Project } from '../heijunka/Project';

import { ObjectEvent } from 'choicest-barnacle';
import { ProcessObjectEventCommand } from './processObjectEventCommand';
import { BaseCommand, ObjectType } from './BaseCommand';

export class UpdatePropertyProjectCommand extends BaseCommand implements ProcessObjectEventCommand {
  constructor() {
    super(ObjectType.project, 'UpdateProperty');
  }

  canProcess(objectEvent: ObjectEvent, board: HeijunkaBoard): boolean {
    return board.hasProject(objectEvent.object);
  }

  process(objectEvent: ObjectEvent, board: HeijunkaBoard): HeijunkaBoard {
    return board.updatePropertyOfProject(objectEvent.object, objectEvent.payload.get('property'), objectEvent.time, objectEvent.payload.get('value'));
  }

  createEvent(topic: string, project: Project, propertyName: string, newValue: string): ObjectEvent {
    const payload = new Map([['property', propertyName],['value', newValue]]);
    return this.createObjectEvent(topic, project.id, payload);
  }
}
