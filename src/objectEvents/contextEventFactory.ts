import { ObjectEvent, Topic } from 'choicest-barnacle';

import { UUIDGenerator } from '../heijunka/UUIDGenerator';

import { CreateContextCommand } from './CreateContextCommand';
import { IEventFactory } from './IEventFactory';
import { IProcessObjectEventCommand } from './IProcessObjectEventCommand';

export class ContextEventFactory implements IEventFactory {
  public usedCommands(): IProcessObjectEventCommand[] {
    const result: IProcessObjectEventCommand[] = [];
    result.push(new CreateContextCommand());
    return result;
  }

  public create(topic: Topic, name: string): ObjectEvent {
    return new CreateContextCommand().createEvent(topic, name, UUIDGenerator.createUUID());
  }
}
