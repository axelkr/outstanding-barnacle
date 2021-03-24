import { IProcessObjectEventCommand } from './IProcessObjectEventCommand';

export interface IEventFactory {
    usedCommands(): IProcessObjectEventCommand[];
}
