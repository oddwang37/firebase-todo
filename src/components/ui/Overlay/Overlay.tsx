import { FC, PropsWithChildren } from 'react';
import './styles.less';

const Overlay:FC<OverlayProps> = ({children, isVisible}) => {
	return (
		<>
		  {isVisible 
		  	?(<div className="overlay">
			  	{children}
			</div>)
			:null}
		</>
	)
}

export default Overlay

type OverlayProps = PropsWithChildren<{isVisible: boolean}>
