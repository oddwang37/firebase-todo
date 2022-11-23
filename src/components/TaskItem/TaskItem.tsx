import React, { FC } from 'react';
import './styles.less';

import {Button} from 'components/ui/Button';

const TaskItem: FC<TaskItemProps> = ({ title, dueDate, onClick }) => {
  return (
    <div className="item" onClick={onClick}>
        <div className="title">{title}</div>
        <div className="right">
          <div className="due-date">{dueDate}</div>
          <Button isRed>Delete</Button>
          <Button>Edit</Button>
        </div> 
    </div>
    );
};

export default TaskItem;

type TaskItemProps = {
  id: number;
  title: string;
  dueDate: string;
  onClick: () => void;
}

