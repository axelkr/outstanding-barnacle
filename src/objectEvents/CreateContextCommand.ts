import { HeijunkaBoard } from '../heijunka/HeijunkaBoard';
import { ObjectEvent, Topic } from 'choicest-barnacle';
import { ProcessObjectEventCommand } from './processObjectEventCommand';
import { BaseCommand, ObjectType } from './BaseCommand';
import { Context } from '../heijunka/Context';

export class CreateContextCommand extends BaseCommand implements ProcessObjectEventCommand {
  private readonly nameKey = 'name';

  constructor() {
    super(ObjectType.context, 'Create');
  }

  canProcess(): boolean {
    return true;
  }

  process(objectEvent: ObjectEvent, board: HeijunkaBoard): HeijunkaBoard {
    const newContext = new Context( objectEvent.object, objectEvent.payload.get(this.nameKey));
    return board.addContext(newContext);
  }

  createEvent(topic: Topic, name: string, newUUID: string): ObjectEvent {
    const payload = new Map([[this.nameKey, name]]);
    return this.createObjectEvent(topic, newUUID, payload);
  }
}