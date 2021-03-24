import { StateModel } from '../heijunka/StateModel';
import { HeijunkaBoard } from '../heijunka/HeijunkaBoard';
import { ObjectEvent, Topic } from 'choicest-barnacle';
import { IProcessObjectEventCommand } from './IProcessObjectEventCommand';
import { BaseCommand, ObjectType } from './BaseCommand';

export class CreateStateModelCommand extends BaseCommand implements IProcessObjectEventCommand {
  constructor() {
    super(ObjectType.stateModel, 'Create');
  }

  canProcess(): boolean {
    return true;
  }

  process(objectEvent: ObjectEvent, root: HeijunkaBoard): HeijunkaBoard {
    const stateModel: StateModel = StateModel.deserialize(objectEvent.payload.get('stateModel'))
    if (root.stateModels.has(stateModel.id)) {
      return root;
    }
    return root.updateStateModels(root.stateModels.add(stateModel));
  }

  createEvent(topic: Topic, stateModel: StateModel, newUUID: string): ObjectEvent {
    const payload = new Map([['stateModel', StateModel.serialize(stateModel)]]);
    return this.createObjectEvent(topic, newUUID, payload);
  }
}
