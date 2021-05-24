export interface ITask {
  description: string;
  startAt: Date;
  endAt: Date;
  isDone: boolean;
  user: string;
}

export interface ITaskDoc extends ITask {
  id: string;
  createdAt: Date;
  isDeleted: boolean;
  deletedAt?: Date;
}

export default class Task {
  id?: string;
  createdAt?: Date = new Date();
  deletedAt?: Date;
  startAt: Date;
  endAt: Date;
  description: string;
  isDone: boolean = false;
  isDeleted: boolean = false;
  user: string;

  constructor(task: ITask) {
    this.description = task.description;
    this.startAt = task.startAt;
    this.endAt = task.endAt;
    this.user = task.user;
  }
}
