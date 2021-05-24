import admin from 'firebase-admin';

import TaskMapper from './task';

admin.initializeApp();

const db = admin.firestore();

export const taskMapper = new TaskMapper(db);

export type Mappers = {
  taskMapper: TaskMapper;
};

export default <Mappers>{
  taskMapper
};
