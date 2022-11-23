import React, { useState } from 'react';

import logo from './logo.svg';
import './App.less';
import { TaskItem, Button, TaskPopup } from 'components';

function App() {
  const [isPopupOpened, setIsPopupOpened] = useState<boolean>(false);

  const openModal = () => setIsPopupOpened(true);
  const closeModal = () => setIsPopupOpened(false);

  return (
    <>
    <div className="wrapper">
      <div className="header">
        <div>Tasks</div>
        <Button>+ Add Task</Button>
      </div>
      <TaskItem title="Task title" onClick={openModal}/>
      <TaskItem title="Task title 2" onClick={openModal}/>
      <TaskItem title="Task title 3" onClick={openModal}/>
    </div>
    <TaskPopup isVisible={isPopupOpened} closeModal={closeModal}/>
    </>


  );
}

export default App;
