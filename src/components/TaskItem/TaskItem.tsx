import React, { FC } from 'react';
import './styles.less';

import {Button} from 'components/ui/Button';

const TaskItem: FC<TaskItemProps> = ({ title }) => {
  return (
    <div className="item">
        <div className="title">{title}</div>
        <div className="right">
          <div className="due-date">2.10.2022</div>
          <Button isRed>Delete</Button>
          <Button>Edit</Button>
        </div> 
    </div>
    );
};

export default TaskItem;

type TaskItemProps = {
  title: string
}

/* - создание, просмотр, редактирование (изменение полей или то, что задача выполнена) и     удаление задачи
- возможность прикрепления файлов к записи
- поля в задаче: заголовок, описание, дата завершения, прикрепленные файлы
- если дата завершения истекла или задача выполнена, это должно быть визуально отмечено  */

// название дата  edit delete 

// открываешь и заголовок описание прикрепить дата