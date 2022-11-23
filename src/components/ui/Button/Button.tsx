import React, {FC, ButtonHTMLAttributes, PropsWithChildren} from 'react';
import './styles.less';



const Button:FC<ButtonProps> = ({isRed, children, color, ...props}) => {
	return <button {...props} className={`button ${isRed ? 'red' : ''}`}>{children}</button>
}

export default Button;

type ButtonProps = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement> & {isRed?: boolean}>