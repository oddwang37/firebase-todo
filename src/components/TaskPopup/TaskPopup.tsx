import { FC, useState } from 'react';
import './styles.less';

import { Overlay } from 'components/ui/Overlay';

const TaskPopup:FC<TaskPopupProps> = ({isVisible, closeModal}) => {

	const [titleValue, setTitleValue] = useState<string>('Title');
	const [textareaValue, setTextareaValue] = useState<string>('Description');

	 const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    	setTitleValue(e.target.value);
    };

    const onChangeTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    	setTextareaValue(e.target.value);
    }

	return (
		<Overlay isVisible={isVisible}>
			<div className="modal">
				<div className="close" onClick={closeModal}>&#10006;</div>
				<input className="title-input" value={titleValue} onChange={onChangeTitle} />	
				<div className="due-date">Until 23.10.2022</div>
				<div className="heading">Description</div>
				<textarea className="textarea" value={textareaValue} onChange={onChangeTextarea} />
				<div className="heading">Attached files	</div>
				<div className="attached-files"></div>
			</div>
		</Overlay>
	)
}

export default TaskPopup

type TaskPopupProps = {
	isVisible: boolean;
	closeModal: () => void;
}

// открываешь и заголовок описание прикрепить дата

/* - создание, просмотр, редактирование (изменение полей или то, что задача выполнена) и     удаление задачи
- возможность прикрепления файлов к записи
- поля в задаче: заголовок, описание, дата завершения, прикрепленные файлы
- если дата завершения истекла или задача выполнена, это должно быть визуально отмечено  */

// название дата  edit delete 