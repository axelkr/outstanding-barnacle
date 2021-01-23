import { ObjectEvent } from './objectEvent';

export class ObjectEventFactory {

  public constructCreateKanbanEvent(topic: string, name: string, state: string): ObjectEvent {
    const eventIdDiscardedByBackend = 0;
    const createObjectEvent: ObjectEvent = {
      topic,
      time: new Date(),
      id: eventIdDiscardedByBackend,
      eventType: 'CreateTask',
      object: this.createUUID(),
      objectType: 'Task',
      payload: new Map([['name', name], ['state', state]])
    };
    return createObjectEvent;
  }

  private createUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) { // eslint-disable-line
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);// eslint-disable-line
      return v.toString(16);
    });
  }
}
