import { HeijunkaBoard } from '../heijunka/HeijunkaBoard';
import { ObjectEvent } from 'choicest-barnacle';

export interface ProcessObjectEventCommand {
  readonly objectEventTypeProcessing: string;
  process(objectEvent: ObjectEvent, board: HeijunkaBoard ): HeijunkaBoard;
  canProcess(objectEvent: ObjectEvent, board: HeijunkaBoard ): boolean;
}
