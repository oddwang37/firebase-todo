import React, { useState, useEffect } from 'react';
import './App.less';
import { ref, onValue, set, push, query, orderByChild } from 'firebase/database';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';

import { database as db, storage } from './firebase/initialize';
import {
  getTodos,
  deleteTask,
  editTitle,
  changeTaskDone,
  editDescription,
  createTask,
} from './firebase/todos';
import { Task, TasksListActions, TaskPopupActions, AttachedFile } from 'types/tasks';

import { TaskItem, Button, TaskPopup, AddTaskPopup } from 'components';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  /**
   * Represent info of task which displays in task popup
   *  after click on task item in list
   */
  const [popupTaskInfo, setPopupTaskInfo] = useState<Task>({
    id: '0',
    title: 'Title',
    description: 'D',
    isDone: false,
    dueDate: '01.01.1970',
    attachedFiles: [],
  });
  const [isTaskOpened, setIsTaskOpened] = useState<boolean>(false);

  const openTask = () => setIsTaskOpened(true);
  const closeTask = () => setIsTaskOpened(false);

  const [isAddTaskOpened, setIsAddTaskOpened] = useState(false);

  const openAddTask = () => setIsAddTaskOpened(true);
  const closeAddTask = () => setIsAddTaskOpened(false);

  useEffect(() => {
    getTodos();
    // Enable listener for database changes in order to update tasks UI
    const tasksRef = ref(db, 'todos/');
    onValue(query(tasksRef, orderByChild('dueDate')), (snapshot) => {
      const tasksArr: Task[] = [];
      snapshot.forEach((childSnap) => {
        // Transform objects to arrays
        const attachedFiles = childSnap.val().attachedFiles as any;
        if (attachedFiles) {
          let filesArr: AttachedFile[] = [];
          for (let key in attachedFiles) {
            filesArr.push({ ...attachedFiles[key], id: key });
          }
          tasksArr.push({ id: childSnap.key, ...childSnap.val(), attachedFiles: attachedFiles });
        } else {
          tasksArr.push({ id: childSnap.key, ...childSnap.val(), attachedFiles: attachedFiles });
        }
      });
      setTasks(tasksArr);
    });
  }, []);

  /**
   * Finds task by id and setting it to state for displaying task in popup
   * @param {string} id - task id
   */
  const changePopupTask = (id: string) => {
    const task = tasks.find((task) => task.id === id);
    if (task) {
      setPopupTaskInfo(task);
    }
  };
  /**
   * Attaches file to task opened in popup and updates state
   * @param {AttachedFile} file - Passed file
   */
  const attachFile = (file: AttachedFile) => {
    const filesListRef = ref(db, `todos/${popupTaskInfo.id}/attachedFiles`);
    const newFileRef = push(filesListRef);
    const newFileKey = newFileRef.key as string;
    set(newFileRef, file).then((snap) => {
      let newFile = { ...file, id: newFileKey };
      let newPopupTask;
      if (popupTaskInfo.attachedFiles) {
        const newAttachedFiles = [...popupTaskInfo.attachedFiles, newFile];
        newPopupTask = { ...popupTaskInfo, attachedFiles: newAttachedFiles };
      } else {
        newPopupTask = { ...popupTaskInfo, attachedFiles: [newFile] };
      }
      setPopupTaskInfo(newPopupTask);
    });
  };

  /**
   * Uploads file to Firebase Storage, then gets it's URL and metadata
   * for storing in database
   * @param {File} file - File uploaded wit input type="file"
   */
  const uploadFile = async (file: File) => {
    if (file) {
      const fileRef = storageRef(storage, `files/${popupTaskInfo.id}/${file.name}`);
      const snapshot = await uploadBytes(fileRef, file);
      if (snapshot) {
        const {
          metadata: { name, contentType, fullPath },
        } = snapshot;
        const url = await getDownloadURL(snapshot.ref);
        if (url) {
          if (contentType) {
            await attachFile({ url, name, contentType, fullPath });
          } else {
            await attachFile({ url, name, fullPath });
          }
        }
      }
    }
  };

  const tasksListActions: TasksListActions = {
    deleteTask,
    editTitle,
    changePopupTask,
    changeTaskDone,
  };

  const taskPopupActions: TaskPopupActions = {
    editTitle,
    editDescription,
    uploadFile,
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
        {tasks.length === 0 ? (
          <div className="no-tasks-placeholder">You have no tasks :(</div>
        ) : (
          <div className="content">
            {tasks.map((task: any) => (
              <TaskItem
                key={task.id}
                id={task.id}
                title={task.title}
                isDone={task.isDone}
                dueDate={task.dueDate}
                openTask={openTask}
                tasksListActions={tasksListActions}
              />
            ))}
          </div>
        )}
      </div>
      <TaskPopup
        task={popupTaskInfo}
        taskPopupActions={taskPopupActions}
        isVisible={isTaskOpened}
        closeModal={closeTask}
      />
      <AddTaskPopup isVisible={isAddTaskOpened} closeModal={closeAddTask} addTask={createTask} />
    </>
  );
}

export default App;

//release changes for git
