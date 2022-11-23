import { FC, PropsWithChildren } from 'react';
import './styles.less';

const Overlay:FC<PropsWithChildren<{}>> = ({children}) => {
	return (
		<div className="overlay">
			{children}
		</div>
	)
}

export default Overlay
