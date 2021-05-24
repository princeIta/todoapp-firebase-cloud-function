import { Mappers } from '../data-source/data-mappers';
import { ITask } from '../models/task';

export default class TaskService {
  mappers: Mappers;
  constructor(mappers: Mappers) {
    this.mappers = mappers;
  }

  async create(taskDto: ITask) {
    const { taskMapper } = this.mappers;

    return await taskMapper.create(taskDto);
  }

  async getTasksByUserId(userId: string) {
    const { taskMapper } = this.mappers;

    return await taskMapper.find(userId);
  }

  async toggleDone(taskId: string) {
    const { taskMapper } = this.mappers;

    return await taskMapper.toggleDone(taskId);
  }

  async deleteTask(taskId: string) {
    const { taskMapper } = this.mappers;

    return await taskMapper.update(taskId, {
      isDeleted: true,
      deletedAt: new Date()
    });
  }

  async updateTask(taskId: string, task: ITask) {
    const { taskMapper } = this.mappers;

    return await taskMapper.update(taskId, task);
  }
}
