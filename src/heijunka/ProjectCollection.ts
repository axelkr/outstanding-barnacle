import { Project } from './Project';
import { IdObjectCollection } from './IdObjectCollection';

export class ProjectCollection {
    private readonly projects: IdObjectCollection<Project>;

    private constructor(projects: IdObjectCollection<Project>) {
        this.projects = projects;
    }

    public static createEmptyCollection(): ProjectCollection {
        return new ProjectCollection(new IdObjectCollection<Project>());
    }

    public has(id: string): boolean {
        return this.projects.has(id);
    }

    public get(id: string): Project {
        return this.projects.get(id);
    }

    public getProjects(): Project[] {
        return this.projects.idObjects;
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
        this.projects.idObjects.forEach(aProject => {
            if (aProject.id === id) {
                const updatedProject = aProject.initializeProperty(propertyName, updateTo, updateAt);
                newProjects.push(updatedProject);
            } else {
                newProjects.push(aProject);
            }
        })
        return new ProjectCollection(new IdObjectCollection<Project>(newProjects));
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
        this.projects.idObjects.forEach(aProject => {
            if (aProject.id === id) {
                const updatedProject = aProject.updateProperty(propertyName, updateTo, updateAt);
                didUpdate = updatedProject.valueOfProperty(propertyName) !== aProject.valueOfProperty(propertyName);
                newProjects.push(updatedProject);
            } else {
                newProjects.push(aProject);
            }
        })
        if (didUpdate) {
            return new ProjectCollection(new IdObjectCollection(newProjects));
        } else {
            return this;
        }
    }

    public add(aProject: Project): ProjectCollection {
        return new ProjectCollection(this.projects.add(aProject));
    }
}