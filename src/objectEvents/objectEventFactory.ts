import { StateModel } from '../heijunka/StateModel';
import { UUIDGenerator } from '../heijunka/UUIDGenerator';

import { CreateStateModelCommand } from './CreateStateModelCommand';
import { CreateContextCommand } from './CreateContextCommand';

import { ObjectEvent, Topic } from 'choicest-barnacle';
import { IEventFactory } from './IEventFactory';
import { ProcessObjectEventCommand } from './processObjectEventCommand';

export class ObjectEventFactory implements IEventFactory {
  public usedCommands(): ProcessObjectEventCommand[] {
    const result: ProcessObjectEventCommand[] = [];
    result.push(new CreateStateModelCommand());
    result.push(new CreateContextCommand());
    return result;
  }

  public createStateModel(topic: Topic, stateModel: StateModel): ObjectEvent {
    return new CreateStateModelCommand().createEvent(topic, stateModel, UUIDGenerator.createUUID());
  }

  public createContext(topic: Topic, name: string): ObjectEvent {
    return new CreateContextCommand().createEvent(topic, name, UUIDGenerator.createUUID());
  }
}
