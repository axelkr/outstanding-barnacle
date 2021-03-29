import { Task } from './Task';
import { IdObjectCollection } from './IdObjectCollection';

export class TaskCollection {
    private tasks: IdObjectCollection<Task>;
    private children: Map<string,string[]>;

    private constructor(tasks: IdObjectCollection<Task>, children: Map<string,string[]>) {
        this.tasks = tasks;
        this.children = children;
    }

    public static createEmptyCollection(): TaskCollection {
        return new TaskCollection(new IdObjectCollection<Task>([]), new Map<string,string[]>());
    }

    public add(task: Task): TaskCollection {
        const updatedTasks = this.tasks.add(task);
        const noChange = (updatedTasks === this.tasks);
        if (noChange) {
            return this;
        }
        const updatedChildren = new Map<string,string[]>(this.children);
        updatedChildren.set(task.id,[]);
        if ( !updatedChildren.has(task.parent())) {
            updatedChildren.set(task.parent(),[]);
        }
        updatedChildren.set(task.parent(),[...updatedChildren.get(task.parent()),task.id]);
        return new TaskCollection(updatedTasks, updatedChildren);
    }

    public has(id: string): boolean {
        return this.tasks.has(id);
    }

    public getChildrenOf(id: string): Task[] {
        if (!this.children.has(id)) {
            return [];
        }
        const childIds: string[] = this.children.get(id);
        const result: Task[] = [];
        childIds.forEach(anId => {
            result.push(this.get(anId));
        });
        return result;
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
        return new TaskCollection(this.tasks.replace(updatedTask.id, updatedTask), this.children);
    }
}
