import { expect } from 'chai';

import { CreateTaskCommand } from '../../src/objectEvents/createTaskCommand';
import { Task } from '../../src/model/task';
import { ObjectEvent } from '../../src/objectEvents/objectEvent';

describe('CreateTaskCommand', () => {
  let service: CreateTaskCommand;

  beforeEach(() => {
    service = new CreateTaskCommand();
  });

  it('should be created', () => {
    expect(service).to.exist;
  });

  it('should discard CreateTaskEvent if already created', () => {
    const inputTasks: Task[] = [];
    const aCreateTaskEvent: ObjectEvent = {
      topic: 'aTopic',
      time: new Date(),
      id: 23,
      eventType: service.objectEventTypeProcessing,
      object: 'asda_asda_asdads',
      objectType: 'objectType',
      payload: new Map<string, string>([['name', 'name'], ['state', 'state']])
    };
    const afterProcessingEventOnce = service.process(aCreateTaskEvent, inputTasks);
    const afterProcessingEventTwice = service.process(aCreateTaskEvent, afterProcessingEventOnce);
    expect(afterProcessingEventTwice.length).to.equal(inputTasks.length + 1);
  });

  it('should apply CreateTaskEvent if task id is not yet available', () => {
    const inputTasks: Task[] = [];
    const aCreateTaskEvent: ObjectEvent = {
      topic: 'aTopic',
      time: new Date(),
      id: 23,
      eventType: service.objectEventTypeProcessing,
      object: 'asda_asda_asdads',
      objectType: 'objectType',
      payload: new Map<string, string>([['name', 'name'], ['state', 'state']])
    };
    const afterProcessingEventOnce = service.process(aCreateTaskEvent, inputTasks);
    expect(afterProcessingEventOnce.length).to.equal(inputTasks.length + 1);
  });
});
