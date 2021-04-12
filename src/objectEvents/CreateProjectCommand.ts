import { Project } from '../heijunka/Project';
import { StateModel } from '../heijunka/StateModel';
import { HeijunkaBoard } from '../heijunka/HeijunkaBoard';
import { ObjectEvent, Topic } from 'choicest-barnacle';
import { IProcessObjectEventCommand } from './IProcessObjectEventCommand';
import { BaseCommand, ObjectType } from './BaseCommand';

export class CreateProjectCommand extends BaseCommand implements IProcessObjectEventCommand {
  private readonly stateModelIdKey = 'stateModelId';
  private readonly isReadonlyKey = 'isReadonly';

  constructor() {
    super(ObjectType.project, 'Create');
  }

  canProcess(objectEvent: ObjectEvent, root: HeijunkaBoard): boolean {
    return root.stateModels.has(objectEvent.payload.get(this.stateModelIdKey));
  }

  process(objectEvent: ObjectEvent, root: HeijunkaBoard): HeijunkaBoard {
    let isReadonly = false;
    if (objectEvent.payload.has(this.isReadonlyKey)) {
      isReadonly = (objectEvent.payload.get(this.isReadonlyKey) === 'true');
    }
    const newProject = Project.create(objectEvent.object, objectEvent.payload.get(this.stateModelIdKey), isReadonly);
    if (root.projects.has(newProject.id)) {
      return root;
    }
    return root.updateProjects(root.projects.add(newProject));
  }

  createEvent(topic: Topic, stateModel: StateModel, newUUID: string, isReadOnly: boolean): ObjectEvent {
    const payload = new Map([[this.stateModelIdKey, stateModel.id], [this.isReadonlyKey, isReadOnly ? 'true' : 'false']]);
    return this.createObjectEvent(topic, newUUID, payload);
  }
}
