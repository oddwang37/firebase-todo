import { FC, useState, useEffect } from 'react';
import './styles.less';

import dates from 'services/dates';
import { Task, TaskPopupActions } from 'types/tasks';

import { Overlay } from 'components/ui/Overlay';

const TaskPopup: FC<TaskPopupProps> = ({ task, taskPopupActions, isVisible, closeModal }) => {
  const { editTitle, editDescription } = taskPopupActions;
  const [titleValue, setTitleValue] = useState<string>(task.title);
  const [textareaValue, setTextareaValue] = useState<string>(task.description);

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitleValue(e.target.value);
  };

  const onChangeTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaValue(e.target.value);
  };

  const onBlurTitle = () => {
  	editTitle(task.id, titleValue);
  }

  const onBlurDescr = () => {
  	editDescription(task.id, textareaValue);
  }

  useEffect(() => {
    setTitleValue(task.title);
    setTextareaValue(task.description);
  }, [task]);

  return (
	    <Overlay isVisible={isVisible}>
	      <div className="modal">
	        {task ? (<><div className="close" onClick={closeModal}>
	          &#10006;
	        </div>
	        <input className="title-input" value={titleValue} onChange={onChangeTitle} onBlur={onBlurTitle}/>
	        <div className="due-date">Due date – {dates.format(task.dueDate, 'DD.MM.YYYY')}</div>
	        <div className="heading">Description</div>
	        <textarea className="textarea" value={textareaValue} onChange={onChangeTextarea} onBlur={onBlurDescr} />
	        <div className="heading">Attached files </div>
	        <div className="attached-files"></div></>) : null}
	      </div>
	    </Overlay>
  );
};

export default TaskPopup;

type TaskPopupProps = {
  task: Task;
  taskPopupActions: TaskPopupActions;
  isVisible: boolean;
  closeModal: () => void;
};
