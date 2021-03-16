import { ObjectEvent } from 'choicest-barnacle';
import { HeijunkaBoard } from '../heijunka/HeijunkaBoard';
import { RootAggregate } from '../heijunka/RootAggregate';
import { ProcessObjectEventCommand } from './processObjectEventCommand';
import { IEventFactory } from './IEventFactory';
import { ObjectEventFactory } from './objectEventFactory';
import { ProjectEventFactory } from './projectEventFactory';
import { KanbanCardEventFactory } from './kanbanCardEventFactory';

export class ObjectEventCommandProcessor {
  private currentEntity: RootAggregate;
  private commands: Map<string, ProcessObjectEventCommand> = new Map<string, ProcessObjectEventCommand>();
  private stillToProcess: ObjectEvent[] = [];

  constructor() {
    this.currentEntity = RootAggregate.createEmptyRootAggregate();

    const factories: IEventFactory[] = [new ObjectEventFactory(), new ProjectEventFactory(), new KanbanCardEventFactory()];
    factories.forEach(aFactory => {
      const usedCommands = aFactory.usedCommands();
      usedCommands.forEach(aCommand => this.commands.set(aCommand.objectEventTypeProcessing, aCommand));
    })
  }

  process(objectEvent: ObjectEvent): HeijunkaBoard {
    if (!this.commands.has(objectEvent.eventType)) {
      return;
    }
    const aCommand = this.commands.get(objectEvent.eventType);

    if (aCommand.canProcess(objectEvent, this.currentEntity.heijunkaBoard)) {
      this.currentEntity = this.currentEntity.setHeijunkaBoard(aCommand.process(objectEvent, this.currentEntity.heijunkaBoard));
      this.processFurtherEvents();
    } else {
      this.stillToProcess.push(objectEvent);
    }
    return this.currentEntity.heijunkaBoard;
  }

  get(): HeijunkaBoard {
    return this.currentEntity.heijunkaBoard;
  }

  private processFurtherEvents(): void {
    let index = 0;
    while (index < this.stillToProcess.length) {
      const aCommand = this.commands.get(this.stillToProcess[index].eventType);
      if (aCommand.canProcess(this.stillToProcess[index], this.currentEntity.heijunkaBoard)) {
        this.currentEntity = this.currentEntity.setHeijunkaBoard(aCommand.process(this.stillToProcess[index], this.currentEntity.heijunkaBoard));
        this.stillToProcess.splice(index, 1);
      } else {
        index = 1 + index;
      }
    }
  }
}
