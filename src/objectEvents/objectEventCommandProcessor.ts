import { ObjectEvent } from './objectEvent';
import { HeijunkaBoard } from '../heijunka/HeijunkaBoard';
import { ProcessObjectEventCommand } from './processObjectEventCommand';
import { CreateProjectCommand } from './CreateProjectCommand';
import { RenameProjectCommand } from './RenameProjectCommand';

export class ObjectEventCommandProcessor {
  private currentBoard : HeijunkaBoard;
  private commands : Map<string,ProcessObjectEventCommand> = new Map<string,ProcessObjectEventCommand>();

  constructor() {
    this.currentBoard = HeijunkaBoard.createEmptyHeijunkaBoard();

    const availableCommands : ProcessObjectEventCommand[] = [];
    availableCommands.push(new CreateProjectCommand());
    availableCommands.push(new RenameProjectCommand());

    availableCommands.forEach(aCommand => this.commands.set(aCommand.objectEventTypeProcessing,aCommand));
  }

  process(objectEvent: ObjectEvent): HeijunkaBoard {
    const aCommand = this.commands.get(objectEvent.eventType);
    this.currentBoard = aCommand.process(objectEvent,this.currentBoard);
    return this.currentBoard;
  }

  get() : HeijunkaBoard {
    return this.currentBoard;
  }
}
