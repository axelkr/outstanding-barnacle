import { ObjectEvent } from 'choicest-barnacle';

import { HeijunkaBoard } from '../heijunka/HeijunkaBoard';

export interface IProcessObjectEventCommand {
  readonly objectEventTypeProcessing: string;
  process(objectEvent: ObjectEvent, root: HeijunkaBoard): HeijunkaBoard;
  canProcess(objectEvent: ObjectEvent, root: HeijunkaBoard): boolean;
}
