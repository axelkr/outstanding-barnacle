import { HeijunkaBoard } from '../heijunka/HeijunkaBoard';

import { ObjectEvent } from 'choicest-barnacle';
import { ProcessObjectEventCommand } from './processObjectEventCommand';
import { BaseCommand, ObjectType } from './BaseCommand';
import { Topic } from './Topic';

export class InitializePropertyProjectCommand extends BaseCommand implements ProcessObjectEventCommand {
  constructor() {
    super(ObjectType.project, 'InitializeProperty');
  }

  canProcess(objectEvent: ObjectEvent, board: HeijunkaBoard): boolean {
    return board.hasProject(objectEvent.object);
  }

  process(objectEvent: ObjectEvent, board: HeijunkaBoard): HeijunkaBoard {
    return board.initializePropertyOfProject(objectEvent.object, objectEvent.payload.get('property'), objectEvent.time, objectEvent.payload.get('value'));
  }

  createEvent(topic: Topic, projectId: string, propertyName: string, initialValue: string): ObjectEvent {
    const payload = new Map([['property', propertyName],['value', initialValue]]);
    return this.createObjectEvent(topic, projectId, payload);
  }
}
