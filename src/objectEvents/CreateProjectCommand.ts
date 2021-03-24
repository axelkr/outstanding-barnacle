import { Project } from '../heijunka/Project';
import { StateModel } from '../heijunka/StateModel';
import { HeijunkaBoard } from '../heijunka/HeijunkaBoard';
import { ObjectEvent, Topic } from 'choicest-barnacle';
import { IProcessObjectEventCommand } from './IProcessObjectEventCommand';
import { BaseCommand, ObjectType } from './BaseCommand';
import { ReadOnlyProperties } from '../heijunka/ReadOnlyProperties';

export class CreateProjectCommand extends BaseCommand implements IProcessObjectEventCommand {
  private readonly stateModelIdKey = 'stateModelId';

  constructor() {
    super(ObjectType.project, 'Create');
  }

  canProcess(objectEvent: ObjectEvent, root: HeijunkaBoard): boolean {
    return root.stateModels.has(objectEvent.payload.get(this.stateModelIdKey));
  }

  process(objectEvent: ObjectEvent, root: HeijunkaBoard): HeijunkaBoard {
    const newProject = new Project(objectEvent.object, objectEvent.payload.get(this.stateModelIdKey), new ReadOnlyProperties());
    if (root.projects.has(newProject.id)) {
      return root;
    }
    return root.updateProjects(root.projects.add(newProject));
  }

  createEvent(topic: Topic, stateModel: StateModel, newUUID: string): ObjectEvent {
    const payload = new Map([[this.stateModelIdKey, stateModel.id]]);
    return this.createObjectEvent(topic, newUUID, payload);
  }
}
