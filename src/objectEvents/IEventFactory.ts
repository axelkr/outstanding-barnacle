import { ProcessObjectEventCommand } from './processObjectEventCommand';

export interface IEventFactory {
    usedCommands(): ProcessObjectEventCommand[];
}
