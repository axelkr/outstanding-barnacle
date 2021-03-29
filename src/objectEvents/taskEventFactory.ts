import { ObjectEvent, Topic } from 'choicest-barnacle';
import { Task } from '../heijunka/Task';

import { UUIDGenerator } from '../heijunka/UUIDGenerator';

import { IEventFactory } from './IEventFactory';
import { IProcessObjectEventCommand } from './IProcessObjectEventCommand';

export class TaskEventFactory implements IEventFactory {
  public usedCommands(): IProcessObjectEventCommand[] {
    const result: IProcessObjectEventCommand[] = [];
    return result;
  }

  /*public create(topic: Topic, stateModel: StateModel): ObjectEvent {
    return new CreateStateModelCommand().createEvent(topic, stateModel, UUIDGenerator.createUUID());
  }*/
}
