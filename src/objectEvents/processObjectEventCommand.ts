import { ObjectEvent } from 'choicest-barnacle';

import { RootAggregate } from '../heijunka/RootAggregate';

export interface ProcessObjectEventCommand {
  readonly objectEventTypeProcessing: string;
  process(objectEvent: ObjectEvent, root: RootAggregate): RootAggregate;
  canProcess(objectEvent: ObjectEvent, root: RootAggregate): boolean;
}
