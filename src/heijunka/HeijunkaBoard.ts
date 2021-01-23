import { Project } from './Project';
import { StateModel } from './StateModel';

export class HeijunkaBoard {
    readonly projects: Array<Project>;
    readonly stateModel: StateModel;

    static createEmptyHeijunkaBoard(): HeijunkaBoard {
        return new HeijunkaBoard([],StateModel.Kanban());
    }

    private constructor(projects: Array<Project>, stateModel: StateModel) {
        this.projects = projects;
        this.stateModel = stateModel;
    }

    public addProject(aProject: Project): HeijunkaBoard {
        if (typeof aProject === "undefined") {
            throw new Error('parameter aProject cannot be undefined.');
        }
        if (this.hasProject(aProject.id)) {
            return this;
        }
        const newProjects = [...this.projects];
        newProjects.push(aProject);
        return new HeijunkaBoard(newProjects, this.stateModel);
    }

    public renameProject(id: string, renameAt: Date, renameTo: string): HeijunkaBoard {
        if (typeof id === "undefined") {
            throw new Error('parameter id cannot be undefined.');
        }
        if (typeof renameAt === "undefined") {
            throw new Error('parameter renameAt cannot be undefined.');
        }
        if (typeof renameTo === "undefined") {
            throw new Error('parameter renameTo cannot be undefined.');
        }
        if (!this.hasProject(id)) {
            throw new Error('unknown project with id ' + id);
        }

        let didRename = true;
        const newProjects : Project[] = [];
        this.projects.forEach(aProject => {
            if (aProject.id === id) {
                const renamedProject = aProject.rename(renameTo,renameAt);
                didRename = renamedProject.name.value !== aProject.name.value;
                newProjects.push(renamedProject);
            } else {
                newProjects.push(aProject);
            }
        })
        if (didRename) {
            return new HeijunkaBoard(newProjects, this.stateModel);
        } else {
            return this;
        }
    }

    public hasProject(id: string): boolean {
        if (typeof id === "undefined") {
            throw new Error('parameter id cannot be undefined.');
        }
        return this.projects.some(aProject => aProject.id === id);
    }
}
