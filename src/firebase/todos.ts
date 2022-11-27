import { ref, set, get, child, push } from 'firebase/database';
import { v4 as uuid } from 'uuid';
import dayjs from 'dayjs';

import { database as db } from './initialize';

export const createTask = (title: string, date: string) => {
  const taskId = uuid();
  const dueDate = dayjs(date).toISOString();
  /*
  set(ref(db, 'todos/' + taskId), {
    title,
    description: '',
    dueDate,
    attachedFiles: [],
  }); */
  /*
  const postListRef = ref(db, 'todos/');
  const newPostRef = push(postListRef);
  set(newPostRef, {
    title,
    description: '',
    dueDate,
    attachedFiles: [],
  }).then(() => console.log('done'));
  */
};

export const getTodos = () => {
  const dbRef = ref(db);
  return get(child(dbRef, 'todos'));
};

