import { FC, useState } from 'react';
import './styles.less';

import dates from 'services/dates';

import { Input } from 'components/ui/Input';
import { Button } from 'components/ui/Button';
import { Overlay } from 'components/ui/Overlay';

const AddTaskPopup: FC<AddTaskPopupProps> = ({ isVisible, closeModal, addTask }) => {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [inputValue, setInputValue] = useState<string>('');
  const [dateInput, setDateInput] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateInput(e.target.value);
  };

  const onClick = () => {
    if (inputValue && dateInput) {
      setErrorMessage('');
      addTask(inputValue, dateInput);
      setInputValue('');
      setDateInput('');
      closeModal();
    } else {
      setErrorMessage('All fields must be filled');
    }
  };

  const getNow = () => {
    return dates.format(Date.now(), 'YYYY-MM-DD');
  };

  const onClose = () => {
    closeModal();
    setErrorMessage('');
  };

  return (
    <Overlay isVisible={isVisible}>
      <form className="task-form">
        <div className="close" onClick={onClose}>
          &#10006;
        </div>
        <div>Enter task title</div>
        <Input value={inputValue} onChange={handleChange} />
        <div>Enter due date</div>
        <Input value={dateInput} onChange={handleDateChange} min={getNow()} type="date" />
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <Button onClick={onClick} type="button">
          Add task
        </Button>
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
