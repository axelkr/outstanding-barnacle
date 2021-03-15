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
    const createStateModelCommand = new CreateStateModelCommand();
    return createStateModelCommand.createEvent(topic, stateModel, UUIDGenerator.createUUID());
  }

  public createContext(topic: Topic, name: string): ObjectEvent {
    const createContextCommand = new CreateContextCommand();
    return createContextCommand.createEvent(topic, name, UUIDGenerator.createUUID());
  }
}
