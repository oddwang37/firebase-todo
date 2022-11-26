import React, { useState, useEffect } from 'react';
import './App.less';
import { ref, onValue, set, push } from 'firebase/database';
import { v4 as uuid } from 'uuid';
import dayjs from 'dayjs';

import { database as db } from './firebase/initialize';
import { getTodos } from './firebase/todos';

import { TaskItem, Button, TaskPopup, AddTaskPopup, Spinner } from 'components';

function App() {
  const [tasks, setTasks] = useState<any>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isTaskOpened, setIsTaskOpened] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const openTask = () => setIsTaskOpened(true);
  const closeTask = () => setIsTaskOpened(false);

  const [isAddTaskOpened, setIsAddTaskOpened] = useState(false);

  const openAddTask = () => setIsAddTaskOpened(true);
  const closeAddTask = () => setIsAddTaskOpened(false);

  useEffect(() => {
    getTodos()
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val(), 'getTodos');
        } else {
          console.log('No data available');
        }
      })
      .catch((error) => {
        console.error(error);
      });
    const tasksRef = ref(db, 'todos/');
    onValue(tasksRef, (snapshot) => {
      const data = snapshot.val();
      const tasksArr: any = [];
      if (data) {
        console.log(Object.values(data), 'data');
        Object.values(data).forEach((task) => {
          tasksArr.push(task);
        });
      }
      setTasks(tasksArr);
    });
  }, []);

  const createTask = (title: string, date: string) => {
    setIsLoading(true);
    const taskId = uuid();
    const dueDate = dayjs(date).toISOString();
    /*
    set(ref(db, 'todos/' + taskId), {
      title,
      description: '',
      dueDate,
      attachedFiles: [],
    }); */
    const postListRef = ref(db, 'todos/');
    const newPostRef = push(postListRef);
    set(newPostRef, {
      title,
      description: '',
      dueDate,
      attachedFiles: [],
    })
      .then(() => setIsLoading(false))
      .catch(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <div className="wrapper">
        <div className="header">
        <div>Title</div>
          <div className="header-wrapper">
          <div>Due date</div>
          <Button onClick={openAddTask}>+ Add Task</Button>
        </div>
        </div>
        {isLoading ? (
          <Spinner />
        ) : (
          <div className="content">
            {tasks.map((task: any) => (
              <TaskItem
                key={task.id}
                id={task.id}
                title={task.title}
                dueDate={task.dueDate}
                onClick={openTask}
              />
            ))}
          </div>
        )}
      </div>
      <TaskPopup isVisible={isTaskOpened} closeModal={closeTask} />
      <AddTaskPopup isVisible={isAddTaskOpened} closeModal={closeAddTask} addTask={createTask} />
    </>
  );
}

export default App;
