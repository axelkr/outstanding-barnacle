import { StateModel } from '../heijunka/StateModel';
import { UUIDGenerator } from '../heijunka/UUIDGenerator';

import { CreateStateModelCommand } from './CreateStateModelCommand';
import { Topic } from './Topic';

import { ObjectEvent } from 'choicest-barnacle';

export class ObjectEventFactory {
  public createStateModel(topic: Topic, stateModel: StateModel): ObjectEvent {
    const createStateModelCommand = new CreateStateModelCommand();
    return createStateModelCommand.createEvent(topic, stateModel, UUIDGenerator.createUUID());
  }
}
