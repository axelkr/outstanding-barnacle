import { HeijunkaBoard } from '../heijunka/HeijunkaBoard';
import { Project } from '../heijunka/Project';

import { ObjectEvent, Topic } from 'choicest-barnacle';
import { IProcessObjectEventCommand } from './IProcessObjectEventCommand';
import { BaseCommand, ObjectType } from './BaseCommand';

export class UpdatePropertyProjectCommand extends BaseCommand implements IProcessObjectEventCommand {
  constructor() {
    super(ObjectType.project, 'UpdateProperty');
  }

  canProcess(objectEvent: ObjectEvent, root: HeijunkaBoard): boolean {
    return root.projects.has(objectEvent.object);
  }

  process(objectEvent: ObjectEvent, root: HeijunkaBoard): HeijunkaBoard {
    return root.updateProjects(root.projects.updateProperty(objectEvent.object, objectEvent.payload.get('property'), objectEvent.time, objectEvent.payload.get('value')));
  }

  createEvent(topic: Topic, project: Project, propertyName: string, newValue: string): ObjectEvent {
    const payload = new Map([['property', propertyName], ['value', newValue]]);
    return this.createObjectEvent(topic, project.id, payload);
  }
}
