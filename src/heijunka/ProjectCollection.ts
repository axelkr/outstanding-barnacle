import { Project } from './Project';

export class ProjectCollection {
    private readonly _projects: Project[];

    constructor(projects: Project[] = []) {
        this._projects = projects;
    }

    public has(id: string): boolean {
        if (typeof id === "undefined") {
            throw new Error('parameter id cannot be undefined.');
        }
        return this._projects.some(aProject => aProject.id === id);
    }

    public get(id: string): Project {
        const aProject = this._projects.find(project => project.id === id);

        if (aProject === undefined) {
            throw new Error('no project available with id ' + id);
        } else {
            return aProject;
        }
    }

    public projects(): Project[] {
        return this._projects;
    }

    public initializeProperty(id: string, propertyName: string, updateAt: Date, updateTo: string): ProjectCollection {
        if (typeof id === "undefined") {
            throw new Error('parameter id cannot be undefined.');
        }
        if (typeof updateAt === "undefined") {
            throw new Error('parameter updateAt cannot be undefined.');
        }
        if (typeof updateTo === "undefined") {
            throw new Error('parameter updateTo cannot be undefined.');
        }
        if (!this.has(id)) {
            throw new Error('unknown project with id ' + id);
        }

        const newProjects: Project[] = [];
        this._projects.forEach(aProject => {
            if (aProject.id === id) {
                const updatedProject = aProject.initializeProperty(propertyName, updateTo, updateAt);
                newProjects.push(updatedProject);
            } else {
                newProjects.push(aProject);
            }
        })
        return new ProjectCollection(newProjects);
    }

    public updateProperty(id: string, propertyName: string, updateAt: Date, updateTo: string): ProjectCollection {
        if (typeof id === "undefined") {
            throw new Error('parameter id cannot be undefined.');
        }
        if (typeof updateAt === "undefined") {
            throw new Error('parameter updateAt cannot be undefined.');
        }
        if (typeof updateTo === "undefined") {
            throw new Error('parameter updateTo cannot be undefined.');
        }
        if (!this.has(id)) {
            throw new Error('unknown project with id ' + id);
        }

        let didUpdate = true;
        const newProjects: Project[] = [];
        this._projects.forEach(aProject => {
            if (aProject.id === id) {
                const updatedProject = aProject.updateProperty(propertyName, updateTo, updateAt);
                didUpdate = updatedProject.valueOfProperty(propertyName) !== aProject.valueOfProperty(propertyName);
                newProjects.push(updatedProject);
            } else {
                newProjects.push(aProject);
            }
        })
        if (didUpdate) {
            return new ProjectCollection(newProjects);
        } else {
            return this;
        }
    }

    public add(aProject: Project): ProjectCollection {
        if (typeof aProject === "undefined") {
            throw new Error('parameter aProject cannot be undefined.');
        }
        if (this.has(aProject.id)) {
            return this;
        }
        const newProjects = [...this._projects];
        newProjects.push(aProject);
        return new ProjectCollection(newProjects);
    }
}
