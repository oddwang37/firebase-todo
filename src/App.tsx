import React, { useState } from 'react';

import logo from './logo.svg';
import './App.less';
import { TaskItem, Button, TaskPopup } from 'components';

function App() {
  const [isPopupOpened, setIsPopupOpened] = useState<boolean>(false);

  const openModal = () => setIsPopupOpened(true);
  const closeModal = () => setIsPopupOpened(false);

  const tasks = [{id: 0, title: 'First title', description: 'Description', dueDate: '12.11.2236'},
                 {id: 1, title: 'Second title', description: 'Description', dueDate: '12.12.1917'},
                 {id: 2, title: 'Third title', description: 'Description', dueDate: '17.01.2010'},
                ]
  return (
    <>
    <div className="wrapper">
      <div className="header">
        <div>Tasks</div>
        <Button>+ Add Task</Button>
      </div>
      {tasks.map((task) => (
        <TaskItem 
          key={task.id} 
          id={task.id} 
          title={task.title} 
          dueDate={task.dueDate} 
          onClick={openModal}
        />
      ))}
    </div>
    <TaskPopup isVisible={isPopupOpened} closeModal={closeModal}/>
    </>
  );
}

export default App;
