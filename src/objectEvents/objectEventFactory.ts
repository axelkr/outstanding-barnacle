import { Project } from '../heijunka/Project';
import { CreateProjectCommand } from './CreateProjectCommand';
import { RenameProjectCommand } from './RenameProjectCommand';
import { ObjectEvent } from './objectEvent';

export class ObjectEventFactory {

  public createProject(topic: string, projectName: string): ObjectEvent {
    const createProjectCommand = new CreateProjectCommand();
    return createProjectCommand.createEvent(topic,projectName,this.createUUID());
  }

  public renameProject(topic: string, project: Project, newName: string): ObjectEvent {
    const renameProjectCommand = new RenameProjectCommand();
    return renameProjectCommand.createEvent(topic,project,newName);
  }

  private createUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) { // eslint-disable-line
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);// eslint-disable-line
      return v.toString(16);
    });
  }
}
