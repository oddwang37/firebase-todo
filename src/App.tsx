import React, { useState, useEffect } from 'react';
import './App.less';
import { ref, onValue, set, push, query, orderByChild, remove, update } from 'firebase/database';
import { v4 as uuid } from 'uuid';
import dayjs from 'dayjs';

import { database as db } from './firebase/initialize';
import { getTodos } from './firebase/todos';
import { Task, TasksListActions, TaskPopupActions } from 'types/tasks';

import { TaskItem, Button, TaskPopup, AddTaskPopup, Spinner } from 'components';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [popupTaskInfo, setPopupTaskInfo] = useState<Task>({id: '0', title: 'Title', description: 'D', dueDate: '01.01.1970', attachedFiles: []});
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
    onValue(query(tasksRef, orderByChild('dueDate')), (snapshot) => {
      const tasksArr: Task[] = [];
      snapshot.forEach((childSnap) => {
        tasksArr.push({...childSnap.val(), id: childSnap.key});
      });
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

  const deleteTask = (id: string) => {
    const taskRef = ref(db, 'todos/' + id);
    remove(taskRef);
  }

  const editTitle = (id: string, title: string) => {
    const taskRef = ref(db, 'todos/' + id);
    update(taskRef, {title});
  }

  const editDescription = (id: string, description: string) => {
    const taskRef = ref(db, 'todos/' + id);
    update(taskRef, {description});
  }

  const changePopupTask = (id: string) => {
    const task = tasks.find((task) => task.id === id);
    if (task) {
      setPopupTaskInfo(task);
    }
  }

  const tasksListActions: TasksListActions = {
    deleteTask,
    editTitle,
    changePopupTask
  }

  const taskPopupActions: TaskPopupActions = {
    editTitle,
    editDescription,
  }

  const Content = () => {
    if (isLoading) {
      return <Spinner />
    }
    if (tasks.length === 0) {
      return <div className="no-tasks-placeholder">You have no tasks :(</div>
    } else {
      return (<div className="content">
            {tasks.map((task: any) => (
              <TaskItem
                key={task.id}
                id={task.id}
                title={task.title}
                dueDate={task.dueDate}
                openTask={openTask}
                tasksListActions={tasksListActions}
              />
            ))}
          </div>)
    }
  }

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
        <Content />
      </div>
      <TaskPopup task={popupTaskInfo} taskPopupActions={taskPopupActions} isVisible={isTaskOpened} closeModal={closeTask} />
      <AddTaskPopup isVisible={isAddTaskOpened} closeModal={closeAddTask} addTask={createTask} />
    </>
  );
}

export default App;
