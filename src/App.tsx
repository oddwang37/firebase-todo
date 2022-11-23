import React from 'react';

import logo from './logo.svg';
import './App.less';
import { TaskItem, Button } from 'components';

function App() {
  return (
    <div className="wrapper">
      <div className="header">
        <div>Tasks</div>
        <Button>+ Add Task</Button>
      </div>
      <TaskItem title="Task title" />
    </div>
  );
}

export default App;
