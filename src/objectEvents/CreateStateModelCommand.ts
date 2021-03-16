import { StateModel } from '../heijunka/StateModel';
import { RootAggregate } from '../heijunka/RootAggregate';
import { ObjectEvent, Topic } from 'choicest-barnacle';
import { ProcessObjectEventCommand } from './processObjectEventCommand';
import { BaseCommand, ObjectType } from './BaseCommand';

export class CreateStateModelCommand extends BaseCommand implements ProcessObjectEventCommand {
  constructor() {
    super(ObjectType.stateModel, 'Create');
  }

  canProcess(): boolean {
    return true;
  }

  process(objectEvent: ObjectEvent, root: RootAggregate): RootAggregate {
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
