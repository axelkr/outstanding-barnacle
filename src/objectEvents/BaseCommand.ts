import { ObjectEvent } from './objectEvent';

export enum ObjectType {
  project = 'Project',
  kanbanCard = 'KanbanCard',
}

export class BaseCommand {
  readonly objectEventTypeProcessing: string;
  private readonly objectType: ObjectType;

  constructor(objectType: ObjectType, commandName:string) {
    this.objectEventTypeProcessing = objectType + commandName;
  }
  
  protected createObjectEvent(topic:string,object:string,payload:Map<string,string>): ObjectEvent {
    const eventIdDiscardedByBackend = 0;
    const createdObjectEvent: ObjectEvent = {
      topic,
      time: new Date(),
      id: eventIdDiscardedByBackend,
      eventType: this.objectEventTypeProcessing,
      object: object,
      objectType: this.objectType,
      payload
    }
    return createdObjectEvent;
  }
}
