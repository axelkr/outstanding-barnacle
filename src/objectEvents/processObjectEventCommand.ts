import { HeijunkaBoard } from '../heijunka/HeijunkaBoard';
import { ObjectEvent } from './objectEvent';

export interface ProcessObjectEventCommand {
  readonly objectEventTypeProcessing: string;
  process(objectEvent: ObjectEvent, board: HeijunkaBoard ): HeijunkaBoard;
}
