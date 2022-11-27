import React, { FC, useRef, useState } from 'react';
import './styles.less';
import dayjs from 'dayjs';

import { Button } from 'components/ui/Button';
import { Task, TasksListActions } from 'types/tasks';

const TaskItem: FC<TaskItemProps> = ({ id, title, dueDate, onClick, tasksListActions }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputTitle, setInputTitle] = useState<string>(title);
  const [isTitleEditable, setIsTitleEditable] = useState<boolean>(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputTitle(e.target.value);
  }

  const {deleteTask, editTitle} = tasksListActions;

  const onClickDelete = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    deleteTask(id);
  }

  const onClickEditButton = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    if (isTitleEditable) {
        editTitle(id, inputTitle);
    } else {
        setIsTitleEditable(true);
        if (inputRef.current) {
          inputRef.current.focus();
        }
    }
  }

  const onClickInput = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
  }

  const formatDate = () => {
   return dayjs(dueDate).format('DD.MM.YYYY');
  }

  return (
    <div className="item" onClick={onClick}>
      <input className="title-input" onClick={onClickInput} ref={inputRef} value={inputTitle} onChange={onChange} />
      <div className="right">
        <div className="due-date">{formatDate()}</div>
        <Button onClick={onClickDelete} isRed>Delete</Button>
        <Button onClick={onClickEditButton}>{isTitleEditable ? 'Save' : 'Edit'}</Button>
      </div>
    </div>
  );
};

export default TaskItem;

type TaskItemProps = {
  id: string;
  title: string;
  dueDate: string;
  onClick: () => void;
  tasksListActions: TasksListActions;
};
