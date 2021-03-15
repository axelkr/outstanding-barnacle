import { Project } from '../heijunka/Project';
import { StateModel } from '../heijunka/StateModel';
import { UUIDGenerator } from '../heijunka/UUIDGenerator';

import { CreateProjectCommand } from './CreateProjectCommand';
import { UpdatePropertyProjectCommand } from './UpdatePropertyProjectCommand';
import { InitializePropertyProjectCommand } from './InitializePropertyProjectCommand';

import { ObjectEvent,Topic } from 'choicest-barnacle';
import { IEventFactory } from './IEventFactory';
import { ProcessObjectEventCommand } from './processObjectEventCommand';

export enum ProjectProperties {
  NAME = "name"
}

export class ProjectEventFactory implements IEventFactory {

  public usedCommands(): ProcessObjectEventCommand[] {
    const result: ProcessObjectEventCommand[] = [];
    result.push( new CreateProjectCommand());
    result.push( new UpdatePropertyProjectCommand());
    result.push( new InitializePropertyProjectCommand());
    return result;
  }

  public create(topic: Topic, name: string, stateModel: StateModel): ObjectEvent[] {
    const events: ObjectEvent[] = [];
    const newProjectID = UUIDGenerator.createUUID();
    events.push(new CreateProjectCommand().createEvent(topic, stateModel, newProjectID));
    events.push(new InitializePropertyProjectCommand().createEvent(topic, newProjectID, ProjectProperties.NAME, name));
    return events;
  }

  public initializeProperty(topic: Topic, project: Project, propertyName: string, newValue: string): ObjectEvent {
    const initializePropertyProjectCommand = new InitializePropertyProjectCommand();
    return initializePropertyProjectCommand.createEvent(topic, project.id, propertyName, newValue);
  }

  public updateProperty(topic: Topic, project: Project, propertyName: string, newValue: string): ObjectEvent {
    const updatePropertyProjectCommand = new UpdatePropertyProjectCommand();
    return updatePropertyProjectCommand.createEvent(topic, project, propertyName, newValue);
  }
}
