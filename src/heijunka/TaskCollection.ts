import { Task } from './Task';
import { IdObjectCollection } from './IdObjectCollection';

export class TaskCollection {
    private tasks: IdObjectCollection<Task>;

    private constructor(tasks: IdObjectCollection<Task>) {
        this.tasks = tasks;
    }

    public static createEmptyCollection(): TaskCollection {
        return new TaskCollection(new IdObjectCollection<Task>([]));
    }

    public add(task: Task): TaskCollection {
        const updatedTasks = this.tasks.add(task);
        const noChange = (updatedTasks === this.tasks);
        if (noChange) {
            return this;
        }
        return new TaskCollection(updatedTasks);
    }

    public has(id: string): boolean {
        return this.tasks.has(id);
    }

    public getTasks(): Task[] {
        return this.tasks.idObjects;
    }

    public get(id: string): Task {
        return this.tasks.get(id);
    }

    public markAsDone(id:string, doneAt: Date): TaskCollection {
        const updatedTask = this.tasks.get(id).markAsDone(doneAt);
        return this.replace(updatedTask);
    }
    
    public rename(id:string, newDescription: string, updatedAt: Date): TaskCollection {
        const updatedTask = this.tasks.get(id).updateDescription(newDescription, updatedAt);
        return this.replace(updatedTask);
    }

    private replace(updatedTask: Task): TaskCollection {
        return new TaskCollection(this.tasks.replace(updatedTask.id, updatedTask));
    }
}
