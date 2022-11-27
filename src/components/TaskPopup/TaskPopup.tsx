import { FC, useState, useEffect } from 'react';
import './styles.less';

import dates from 'services/dates';
import { Task, TaskPopupActions } from 'types/tasks';

import { Overlay } from 'components/ui/Overlay';
import { Button } from 'components/ui/Button';
import { FileItem } from 'components/FileItem';

const TaskPopup: FC<TaskPopupProps> = ({ task, taskPopupActions, isVisible, closeModal }) => {
  const { editTitle, editDescription, uploadFile} = taskPopupActions;
  const [titleValue, setTitleValue] = useState<string>(task.title);
  const [textareaValue, setTextareaValue] = useState<string>(task.description);
  const [fileUpload, setFileUpload ] = useState<File | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFileUpload(e.target.files[0]);
    }
  }

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

  const onUploadClick = () => {
    if (fileUpload !== null) {
      uploadFile(fileUpload);
    }
  }

  useEffect(() => {
    setTitleValue(task.title);
    setTextareaValue(task.description);
  }, [task]);

  const formatTitle = (name: string) => name.length > 22 ? name.slice(0, 22) + '...' : name;

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
	        </>) : null}
          <div className="upload-files-wrapper">
            <label className="upload-files-label" htmlFor="#upload-file">
              Choose file...
            </label>
            <div className="choosen-file">{fileUpload && formatTitle(fileUpload.name)}</div>
            <input type="file" onChange={onChange} className="upload-files-button" id="upload-file"/>
            <Button onClick={onUploadClick}>Upload</Button>
          </div>
            {task.attachedFiles && (
            <div className="attached-files">
                {Object.values(task.attachedFiles).reverse().map((file) => {
                    return <FileItem url={file.url} name={file.name} contentType={file.contentType} fullPath={file.fullPath} />
                })}
            </div>)
            }
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
