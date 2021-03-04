import { StateModel } from '../heijunka/StateModel';

import { HeijunkaBoard } from '../heijunka/HeijunkaBoard';
import { ObjectEvent } from 'choicest-barnacle';
import { ProcessObjectEventCommand } from './processObjectEventCommand';
import { BaseCommand, ObjectType } from './BaseCommand';

export class CreateStateModelCommand extends BaseCommand implements ProcessObjectEventCommand {
  constructor() {
    super(ObjectType.stateModel, 'Create');
  }

  canProcess(): boolean {
    return true;
  }

  process(objectEvent: ObjectEvent, board: HeijunkaBoard): HeijunkaBoard {
    const stateModel :StateModel = StateModel.deserialize( objectEvent.payload.get('stateModel')) 
    return board.addStateModel(stateModel);
  }

  createEvent(topic: string, stateModel: StateModel, newUUID: string): ObjectEvent {
    const payload = new Map([['stateModel', StateModel.serialize(stateModel)]]);
    return this.createObjectEvent(topic, newUUID, payload);
  }
}
