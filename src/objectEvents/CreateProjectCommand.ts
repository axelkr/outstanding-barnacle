import { Project } from '../heijunka/Project';
import { StateModel } from '../heijunka/StateModel';
import { RootAggregate } from '../heijunka/RootAggregate';
import { ObjectEvent, Topic } from 'choicest-barnacle';
import { ProcessObjectEventCommand } from './processObjectEventCommand';
import { BaseCommand, ObjectType } from './BaseCommand';
import { ReadOnlyProperties } from '../heijunka/ReadOnlyProperties';

export class CreateProjectCommand extends BaseCommand implements ProcessObjectEventCommand {
  private readonly stateModelIdKey = 'stateModelId';

  constructor() {
    super(ObjectType.project, 'Create');
  }

  canProcess(objectEvent: ObjectEvent, root: RootAggregate): boolean {
    return root.heijunkaBoard.hasStateModel(objectEvent.payload.get(this.stateModelIdKey));
  }

  process(objectEvent: ObjectEvent, root: RootAggregate): RootAggregate {
    const newProject = new Project(objectEvent.object, objectEvent.payload.get(this.stateModelIdKey), new ReadOnlyProperties());
    return root.setHeijunkaBoard(root.heijunkaBoard.addProject(newProject));
  }

  createEvent(topic: Topic, stateModel: StateModel, newUUID: string): ObjectEvent {
    const payload = new Map([[this.stateModelIdKey, stateModel.id]]);
    return this.createObjectEvent(topic, newUUID, payload);
  }
}
