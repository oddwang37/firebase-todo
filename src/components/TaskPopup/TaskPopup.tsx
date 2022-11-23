import { FC } from 'react';
import './styles.less';

import { Overlay } from 'components/ui/Overlay';

const TaskPopup:FC<TaskPopupProps> = ({isVisible, closeModal}) => {
	return (
		<Overlay isVisible={isVisible}>
			<div className="modal">
				<div className="close" onClick={closeModal}>&#10006;</div>
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