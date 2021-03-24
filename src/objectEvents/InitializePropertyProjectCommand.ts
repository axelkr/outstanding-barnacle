import { HeijunkaBoard } from '../heijunka/HeijunkaBoard';

import { ObjectEvent, Topic } from 'choicest-barnacle';
import { ProcessObjectEventCommand } from './processObjectEventCommand';
import { BaseCommand, ObjectType } from './BaseCommand';

export class InitializePropertyProjectCommand extends BaseCommand implements ProcessObjectEventCommand {
  constructor() {
    super(ObjectType.project, 'InitializeProperty');
  }

  canProcess(objectEvent: ObjectEvent, root: HeijunkaBoard): boolean {
    return root.projects.has(objectEvent.object);
  }

  process(objectEvent: ObjectEvent, root: HeijunkaBoard): HeijunkaBoard {
    return root.updateProjects(root.projects.initializeProperty(objectEvent.object, objectEvent.payload.get('property'), objectEvent.time, objectEvent.payload.get('value')));
  }

  createEvent(topic: Topic, projectId: string, propertyName: string, initialValue: string): ObjectEvent {
    const payload = new Map([['property', propertyName], ['value', initialValue]]);
    return this.createObjectEvent(topic, projectId, payload);
  }
}
