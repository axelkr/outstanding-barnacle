import { ObjectEvent } from 'choicest-barnacle';
import { HeijunkaBoard } from '../heijunka/HeijunkaBoard';
import { ProcessObjectEventCommand } from './processObjectEventCommand';
import { CreateProjectCommand } from './CreateProjectCommand';
import { UpdatePropertyProjectCommand } from './UpdatePropertyProjectCommand';
import { CreateStateModelCommand } from './CreateStateModelCommand';
import { CreateKanbanCardCommand } from './CreateKanbanCardCommand';
import { MoveKanbanCardInProgressCommand } from './MoveKanbanCardInProgressCommand';
import { KanbanCardCompletedStateCommand } from './KanbanCardCompletedStateCommand';
import { UpdatePropertyKanbanCardCommand } from './UpdatePropertyKanbanCardCommand';
import { MoveKanbanCardToTrashCommand } from './MoveKanbanCardToTrashCommand';
import { InitializePropertyKanbanCardCommand} from './InitializePropertyKanbanCardCommand';
import { InitializePropertyProjectCommand} from './InitializePropertyProjectCommand';

export class ObjectEventCommandProcessor {
  private currentBoard: HeijunkaBoard;
  private commands: Map<string, ProcessObjectEventCommand> = new Map<string, ProcessObjectEventCommand>();
  private stillToProcess: ObjectEvent[] = [];

  constructor() {
    this.currentBoard = HeijunkaBoard.createEmptyHeijunkaBoard();

    const availableCommands: ProcessObjectEventCommand[] = [];
    availableCommands.push(new CreateProjectCommand());
    availableCommands.push(new InitializePropertyProjectCommand());
    availableCommands.push(new UpdatePropertyProjectCommand());

    availableCommands.push(new CreateKanbanCardCommand());
    availableCommands.push(new InitializePropertyKanbanCardCommand());
    availableCommands.push(new UpdatePropertyKanbanCardCommand());
    availableCommands.push(new MoveKanbanCardInProgressCommand());
    availableCommands.push(new KanbanCardCompletedStateCommand());
    availableCommands.push(new MoveKanbanCardToTrashCommand());

    availableCommands.push(new CreateStateModelCommand());

    availableCommands.forEach(aCommand => this.commands.set(aCommand.objectEventTypeProcessing, aCommand));
  }

  process(objectEvent: ObjectEvent): HeijunkaBoard {
    if (!this.commands.has(objectEvent.eventType)) {
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
}
