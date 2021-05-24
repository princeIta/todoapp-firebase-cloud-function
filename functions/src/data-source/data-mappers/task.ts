import error from '../../error';
import Task, { ITask, ITaskDoc } from '../../models/task';

type TaskUpdateType = {
  description?: string;
  startAt?: Date;
  endAt?: Date;
  isDone?: boolean;
  user?: string;
  createdAt?: Date;
  isDeleted?: boolean;
  deletedAt?: Date;
};

export default class TaskMapper {
  db: FirebaseFirestore.Firestore;
  constructor(db: FirebaseFirestore.Firestore) {
    this.db = db;
  }

  async find(userId: string) {
    const taskList: Array<Task> = [];
    const taskDocs = await this.db
      .collection('task')
      .where('user', '==', userId)
      .where('isDeleted', '==', false)
      .get();

    taskDocs.forEach((result) => {
      const data = <ITaskDoc>result.data();
      const task = new Task(data);
      task.createdAt = data.createdAt;
      task.isDone = data.isDone;

      taskList.push(task);
    });

    return taskList;
  }

  async create(taskDto: ITask): Promise<FirebaseFirestore.WriteResult> {
    const tasks = await this.db
      .collection('task')
      .where('userId', '==', taskDto.user)
      .where('isDone', '==', false)
      .where('isDeleted', '==', false)
      .get();

    let conflictsWith: Array<ITaskDoc> = [];
    tasks.forEach((result) => {
      const data = <ITaskDoc>result.data();
      const startAtMs = new Date(data.startAt).getTime();
      const endAtMs = new Date(data.endAt).getTime();
      const startAtMsArg = new Date(taskDto.startAt).getTime();
      const endAtMsArg = new Date(taskDto.endAt).getTime();
      if (
        (startAtMsArg >= startAtMs && startAtMsArg < endAtMs) ||
        (endAtMsArg >= startAtMs && endAtMsArg < endAtMs)
      ) {
        conflictsWith.push(Object.assign({}, data, { id: result.id }));
      }
    });

    if (conflictsWith.length) {
      throw error({
        code: 'failed-precondition',
        message:
          'the interval specified by "startAt" and "endAt" conflicts with existing tasks',
        details: { conflictsWith }
      });
    }

    const task = new Task(taskDto);

    return await this.db.collection('task').doc().create({
      desciption: task.description,
      createdAt: task.createdAt,
      startAt: task.startAt,
      endAt: task.endAt,
      isDone: task.isDone,
      user: task.user
    });
  }

  async update(taskId: string, updates: TaskUpdateType) {
    const taskDocRef = this.db.collection('task').doc(taskId);
    const data = await taskDocRef.set(updates);

    return data;
  }

  async toggleDone(taskId: string) {
    const taskDocRef = this.db.collection('task').doc(taskId);
    const result = await taskDocRef.get();

    const isDone = result.data()?.isDone;
    if (isDone) {
      return taskDocRef.set({ isDone: false });
    }

    return taskDocRef.set({ isDone: true });
  }
}
