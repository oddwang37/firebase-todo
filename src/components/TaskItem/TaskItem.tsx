import React, { FC } from 'react';
import './styles.less';
import dayjs from 'dayjs';

import { Button } from 'components/ui/Button';

const TaskItem: FC<TaskItemProps> = ({ title, dueDate, onClick }) => {

  const formatDate = () => {
   return dayjs(dueDate).format('DD.MM.YYYY');
  }
  return (
    <div className="item" onClick={onClick}>
      <div className="title">{title}</div>
      <div className="right">
        <div className="due-date">{formatDate()}</div>
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
};
