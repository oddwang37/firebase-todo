import { ref, get, child, remove, update, push, set } from 'firebase/database';

import dates from 'services/dates';
import { database as db } from './initialize';

export const getTodos = () => {
  const dbRef = ref(db);
  return get(child(dbRef, 'todos'));
};

export const deleteTask = (id: string) => {
  const taskRef = ref(db, 'todos/' + id);
  remove(taskRef);
};

export const editTitle = (id: string, title: string) => {
  const taskRef = ref(db, 'todos/' + id);
  update(taskRef, { title });
};

export const changeTaskDone = (id: string, value: boolean) => {
  const taskRef = ref(db, 'todos/' + id);
  update(taskRef, { isDone: value });
};

export const editDescription = (id: string, description: string) => {
  const taskRef = ref(db, 'todos/' + id);
  update(taskRef, { description });
};

export const createTask = (title: string, date: string) => {
  const dueDate = dates.toISO(date);
  const tasksListRef = ref(db, 'todos/');
  const newTaskRef = push(tasksListRef);
  set(newTaskRef, {
    title,
    description: '',
    isDone: false,
    dueDate,
    attachedFiles: [],
  });
};
