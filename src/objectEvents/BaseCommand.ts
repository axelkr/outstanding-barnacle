import { ObjectEvent, Topic } from 'choicest-barnacle';

export enum ObjectType {
  project = 'Project',
  kanbanCard = 'KanbanCard',
  stateModel = 'StateModel',
  context = 'Context'
}

export class BaseCommand {
  readonly objectEventTypeProcessing: string;
  private readonly objectType: ObjectType;

  public constructor(objectType: ObjectType, commandName: string) {
    this.objectEventTypeProcessing = objectType + commandName;
    this.objectType = objectType;
  }

  protected createObjectEvent(topic: Topic, object: string, payload: Map<string, string>): ObjectEvent {
    const eventIdDiscardedByBackend = 0;
    const createdObjectEvent: ObjectEvent = {
      topic: topic.id,
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
