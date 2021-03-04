import { StateModel } from '../heijunka/StateModel';

import { HeijunkaBoard } from '../heijunka/HeijunkaBoard';
import { ObjectEvent } from 'choicest-barnacle';
import { ProcessObjectEventCommand } from './processObjectEventCommand';
import { BaseCommand, ObjectType } from './BaseCommand';

export class SetStateModelCommand extends BaseCommand implements ProcessObjectEventCommand {
  constructor() {
    super(ObjectType.stateModel, 'Set');
  }

  canProcess(objectEvent: ObjectEvent, board: HeijunkaBoard): boolean {
    return board.hasStateModel(objectEvent.payload.get('stateModelUUID'));
  }

  process(objectEvent: ObjectEvent, board: HeijunkaBoard): HeijunkaBoard {
    return board.setStateModel( objectEvent.payload.get('stateModelUUID'));
  }

  createEvent(topic: string, stateModel: StateModel, newUUID: string): ObjectEvent {
    const payload = new Map([['stateModelUUID', stateModel.id ]]);
    return this.createObjectEvent(topic, newUUID, payload);
  }
}
