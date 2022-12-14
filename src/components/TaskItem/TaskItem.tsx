import React, { FC, useRef, useState } from 'react';
import './styles.less';

import dates from 'services/dates';

import { Button } from 'components/ui/Button';
import { TasksListActions } from 'types/tasks';

const TaskItem: FC<TaskItemProps> = ({
  id,
  title,
  isDone,
  dueDate,
  openTask,
  tasksListActions,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputTitle, setInputTitle] = useState<string>(title);
  const [isTitleEditable, setIsTitleEditable] = useState<boolean>(false);

  const { deleteTask, changeTaskDone, editTitle, changePopupTask } = tasksListActions;

  const onClick = () => {
    changePopupTask(id);
    openTask();
  };
  const onClickDelete = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    deleteTask(id);
  };

  const onClickEditButton = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    if (isTitleEditable) {
      editTitle(id, inputTitle);
      setIsTitleEditable(false);
    } else {
      setIsTitleEditable(true);
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputTitle(e.target.value);
  };

  const onChangeCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeTaskDone(id, e.target.checked);
  };

  const onClickInput = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
  };

  return (
    <div className="item" onClick={onClick}>
      <div className="left">
        <input
          type="checkbox"
          checked={isDone}
          onChange={onChangeCheckbox}
          onClick={onClickInput}
        />
        <input
          className={isDone ? 'title-input line-through' : 'title-input'}
          onClick={onClickInput}
          ref={inputRef}
          value={inputTitle}
          onChange={onChange}
          readOnly={!isTitleEditable}
        />
      </div>
      <div className="right">
        {isTitleEditable && (
          <div className="edit-message">Enter title name and click on save button</div>
        )}
        <div
          className={dates.isSameOrAfter(Date.now(), dueDate) ? 'due-date text-red' : 'due-date'}>
          {dates.format(dueDate, 'DD.MM.YYYY')}
        </div>
        <Button onClick={onClickDelete} isRed>
          Delete
        </Button>
        <Button onClick={onClickEditButton}>{isTitleEditable ? 'Save' : 'Edit'}</Button>
      </div>
    </div>
  );
};

export default TaskItem;

type TaskItemProps = {
  id: string;
  title: string;
  isDone: boolean;
  dueDate: string;
  openTask: () => void;
  tasksListActions: TasksListActions;
};
