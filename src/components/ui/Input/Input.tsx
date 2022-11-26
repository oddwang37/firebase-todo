import { FC, InputHTMLAttributes } from 'react';
import './styles.less';

const Input: FC<InputProps> = (props) => {
  return <input className="input" {...props} />;
};

export default Input;

type InputProps = InputHTMLAttributes<HTMLInputElement>;
