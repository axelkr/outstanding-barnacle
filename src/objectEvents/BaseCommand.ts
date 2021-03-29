import { ObjectEvent, Topic } from 'choicest-barnacle';

export enum ObjectType {
  project = 'Project',
  kanbanCard = 'KanbanCard',
  stateModel = 'StateModel',
  context = 'Context',
  task = 'Task'
}

export class BaseCommand {
  readonly objectEventTypeProcessing: string;
  private readonly objectType: ObjectType;
  private readonly isTransient: boolean;

  public constructor(objectType: ObjectType, commandName: string, isTransient = false) {
    this.objectEventTypeProcessing = objectType + commandName;
    this.objectType = objectType;
    this.isTransient = isTransient;
  }

  protected createObjectEvent(topic: Topic, object: string, payload: Map<string, string> = new Map<string, string>()): ObjectEvent {
    const eventIdDiscardedByBackend = 0;
    const createdObjectEvent: ObjectEvent = {
      topic: topic.id,
      time: new Date(),
      id: eventIdDiscardedByBackend,
      eventType: this.objectEventTypeProcessing,
      object: object,
      objectType: this.objectType,
      payload,
      isTransient: this.isTransient
    }
    return createdObjectEvent;
  }
}
