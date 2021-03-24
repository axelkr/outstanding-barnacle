import { ObjectEvent } from 'choicest-barnacle';

import { HeijunkaBoard } from '../heijunka/HeijunkaBoard';

import { IProcessObjectEventCommand } from './IProcessObjectEventCommand';
import { IEventFactory } from './IEventFactory';
import { ContextEventFactory } from './contextEventFactory';
import { StateModelEventFactory } from './stateModelEventFactory';
import { ProjectEventFactory } from './projectEventFactory';
import { KanbanCardEventFactory } from './kanbanCardEventFactory';

export class ObjectEventCommandProcessor {
  private currentEntity: HeijunkaBoard;
  private commands: Map<string, IProcessObjectEventCommand> = new Map<string, IProcessObjectEventCommand>();
  private stillToProcess: ObjectEvent[] = [];

  constructor() {
    this.currentEntity = HeijunkaBoard.createEmptyHeijunkaBoard();

    const factories: IEventFactory[] = [new ContextEventFactory(), new ProjectEventFactory(), new KanbanCardEventFactory(), new StateModelEventFactory()];
    factories.forEach(aFactory => {
      const usedCommands = aFactory.usedCommands();
      usedCommands.forEach(aCommand => this.commands.set(aCommand.objectEventTypeProcessing, aCommand));
    })
  }

  public process(objectEvent: ObjectEvent): void {
    if (!this.commands.has(objectEvent.eventType)) {
      return;
    }
    const aCommand = this.commands.get(objectEvent.eventType);

    if (aCommand.canProcess(objectEvent, this.currentEntity)) {
      this.currentEntity = aCommand.process(objectEvent, this.currentEntity);
      this.processFurtherEvents();
    } else {
      this.stillToProcess.push(objectEvent);
    }
  }

  public getHeijunkaBoard(): HeijunkaBoard {
    return this.currentEntity;
  }

  private processFurtherEvents(): void {
    let index = 0;
    while (index < this.stillToProcess.length) {
      const aCommand = this.commands.get(this.stillToProcess[index].eventType);
      if (aCommand.canProcess(this.stillToProcess[index], this.currentEntity)) {
        this.currentEntity = aCommand.process(this.stillToProcess[index], this.currentEntity);
        this.stillToProcess.splice(index, 1);
      } else {
        index = 1 + index;
      }
    }
  }
}
