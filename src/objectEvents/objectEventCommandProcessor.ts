import { ObjectEvent } from './objectEvent';
import { HeijunkaBoard } from '../heijunka/HeijunkaBoard';
import { ProcessObjectEventCommand } from './processObjectEventCommand';
import { CreateProjectCommand } from './CreateProjectCommand';
import { RenameProjectCommand } from './RenameProjectCommand';
import { CreateKanbanCardCommand } from './CreateKanbanCardCommand';
import { MoveKanbanCardInProgressCommand } from './MoveKanbanCardInProgressCommand';
import { KanbanCardCompletedStateCommand } from './KanbanCardCompletedStateCommand';
import { StateModel } from '../heijunka/StateModel';
import { State } from '../heijunka/State';

export class ObjectEventCommandProcessor {
  private currentBoard: HeijunkaBoard;
  private commands: Map<string, ProcessObjectEventCommand> = new Map<string, ProcessObjectEventCommand>();
  private stillToProcess: ObjectEvent[] = [];

  constructor() {
    this.currentBoard = HeijunkaBoard.createEmptyHeijunkaBoard().setStateModel(this.PersonalKanban());

    const availableCommands: ProcessObjectEventCommand[] = [];
    availableCommands.push(new CreateProjectCommand());
    availableCommands.push(new RenameProjectCommand());
    availableCommands.push(new CreateKanbanCardCommand());  
    availableCommands.push(new MoveKanbanCardInProgressCommand());
    availableCommands.push(new KanbanCardCompletedStateCommand());  

    availableCommands.forEach(aCommand => this.commands.set(aCommand.objectEventTypeProcessing, aCommand));
  }

  process(objectEvent: ObjectEvent): HeijunkaBoard {
    if (! this.commands.has(objectEvent.eventType)) {
      return;
    }
    const aCommand = this.commands.get(objectEvent.eventType);

    if (aCommand.canProcess(objectEvent, this.currentBoard)) {
      this.currentBoard = aCommand.process(objectEvent, this.currentBoard);
      this.processFurtherEvents();
    } else {
      this.stillToProcess.push(objectEvent);
    }
    return this.currentBoard;
  }

  get(): HeijunkaBoard {
    return this.currentBoard;
  }

  private processFurtherEvents(): void {
    let index = 0;
    while (index < this.stillToProcess.length) {
      const aCommand = this.commands.get(this.stillToProcess[index].eventType);
      if (aCommand.canProcess(this.stillToProcess[index], this.currentBoard)) {
        this.currentBoard = aCommand.process(this.stillToProcess[index], this.currentBoard);
        this.stillToProcess.splice(index, 1);
      } else {
        index = 1 + index;
      }
    }
  }

  private PersonalKanban(): StateModel {
    const states: State[] = [];
    states.push(new State('Backlog', 'Backlog'));
    states.push(new State('Doing', 'Doing'));
    states.push(new State('Done', 'Done'));
    return new StateModel('PersonalKanban', states);
}
}
