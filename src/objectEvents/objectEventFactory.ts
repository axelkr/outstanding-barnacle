import { StateModel } from '../heijunka/StateModel';
import { UUIDGenerator } from '../heijunka/UUIDGenerator';

import { CreateStateModelCommand } from './CreateStateModelCommand';
import { CreateContextCommand } from './CreateContextCommand';

import { ObjectEvent, Topic } from 'choicest-barnacle';

export class ObjectEventFactory {
  public createStateModel(topic: Topic, stateModel: StateModel): ObjectEvent {
    const createStateModelCommand = new CreateStateModelCommand();
    return createStateModelCommand.createEvent(topic, stateModel, UUIDGenerator.createUUID());
  }

  public createContext(topic: Topic, name: string): ObjectEvent {
    const createContextCommand = new CreateContextCommand();
    return createContextCommand.createEvent(topic, name, UUIDGenerator.createUUID());
  }
}
