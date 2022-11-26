import { FC, useState, useEffect } from 'react';
import './styles.less';

import { Input } from 'components/ui/Input';
import { Button } from 'components/ui/Button';
import { Overlay } from 'components/ui/Overlay';
import dayjs from 'dayjs';

const AddTaskPopup: FC<AddTaskPopupProps> = ({ isVisible, closeModal, addTask }) => {
  const [inputValue, setInputValue] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const [dateInput, setDateInput] = useState<string>('');

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateInput(e.target.value);
    console.log(dateInput);
  };

  const onClick = () => {
    if (inputValue && dateInput) {
      addTask(inputValue, dateInput);
      setInputValue('');
      closeModal();
    }
  };

  const getNow = () => {
    return dayjs().format('YYYY-MM-DD');
  };

  return (
    <Overlay isVisible={isVisible}>
      <form className="task-form">
        <div className="close" onClick={closeModal}>
          &#10006;
        </div>
        <div>Enter task title</div>
        <Input value={inputValue} onChange={handleChange} />
        <div>Enter due date</div>
        <Input value={dateInput} onChange={handleDateChange} min={getNow()} type="date" />
        <Button onClick={onClick}>Add task</Button>
      </form>
    </Overlay>
  );
};

export default AddTaskPopup;

type AddTaskPopupProps = {
  isVisible: boolean;
  addTask: (title: string, date: string) => void;
  closeModal: () => void;
};
