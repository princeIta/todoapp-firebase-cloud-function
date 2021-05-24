import {
  Response as IExpressResponse,
  Request as IExpressRequest,
  Router
} from 'express';

import TaskService from './services/task';
import dataMappers from './data-source/data-mappers';
import { ITask } from './models/task';

const router = Router();
const taskService = new TaskService(dataMappers);

router.post('/', async (req: IExpressRequest, res: IExpressResponse) => {
  const body: ITask = req.body;
  res.json(await taskService.create({ ...body, user: res.locals.uid }));
});

router.get('/', async (req: IExpressRequest, res: IExpressResponse) => {
  const { uid } = res.locals._App;
  res.json(await taskService.getTasksByUserId(uid));
});

router.put('/:taskId', async (req: IExpressRequest, res: IExpressResponse) => {
  const taskId: string = req.params.taskId;
  const body: ITask = req.body;
  res.json(await taskService.updateTask(taskId, body));
});

router.put(
  '/:taskId/done',
  async (req: IExpressRequest, res: IExpressResponse) => {
    const taskId: string = req.params.taskId;
    res.json(await taskService.toggleDone(taskId));
  }
);

router.delete(
  '/:taskId',
  async (req: IExpressRequest, res: IExpressResponse) => {
    const taskId: string = req.params.taskId;
    res.json(await taskService.deleteTask(taskId));
  }
);

export default router;
