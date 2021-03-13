import { Project } from '../heijunka/Project';
import { StateModel } from '../heijunka/StateModel';
import { HeijunkaBoard } from '../heijunka/HeijunkaBoard';
import { ObjectEvent } from 'choicest-barnacle';
import { ProcessObjectEventCommand } from './processObjectEventCommand';
import { BaseCommand, ObjectType } from './BaseCommand';
import { ReadOnlyProperties } from '../heijunka/ReadOnlyProperties';

export class CreateProjectCommand extends BaseCommand implements ProcessObjectEventCommand {
  private readonly projectNameKey = 'name';
  private readonly stateModelIdKey = 'stateModelId';

  constructor() {
    super(ObjectType.project, 'Create');
  }

  canProcess(objectEvent: ObjectEvent, board: HeijunkaBoard): boolean {
    return board.hasStateModel(objectEvent.payload.get(this.stateModelIdKey));
  }

  process(objectEvent: ObjectEvent, board: HeijunkaBoard): HeijunkaBoard {
    let newProject = new Project(objectEvent.object, objectEvent.payload.get(this.stateModelIdKey), new ReadOnlyProperties());
    newProject = newProject.initializeProperty('name',objectEvent.payload.get(this.projectNameKey), objectEvent.time)
    return board.addProject(newProject);
  }

  createEvent(topic: string, projectName: string, stateModel: StateModel, newUUID: string): ObjectEvent {
    const payload = new Map([[this.projectNameKey, projectName],[this.stateModelIdKey,stateModel.id]]);
    return this.createObjectEvent(topic, newUUID, payload);
  }
}
