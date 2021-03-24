import { ObjectEvent, Topic } from 'choicest-barnacle';
import { StateModel } from '../heijunka/StateModel';

import { UUIDGenerator } from '../heijunka/UUIDGenerator';

import { CreateStateModelCommand } from './CreateStateModelCommand';
import { IEventFactory } from './IEventFactory';
import { IProcessObjectEventCommand } from './IProcessObjectEventCommand';

export class StateModelEventFactory implements IEventFactory {
  public usedCommands(): IProcessObjectEventCommand[] {
    const result: IProcessObjectEventCommand[] = [];
    result.push(new CreateStateModelCommand());
    return result;
  }

  public create(topic: Topic, stateModel: StateModel): ObjectEvent {
    return new CreateStateModelCommand().createEvent(topic, stateModel, UUIDGenerator.createUUID());
  }
}
