import { FC, PropsWithChildren } from 'react';
import './styles.less';

const Overlay:FC<OverlayProps> = ({children, isVisible}) => {
	return (
		<>
		  {isVisible 
		  	?(<div className="overlay">
			  <div className="modal">
			  	{children}
			  </div>
			</div>)
			:null}
		</>
	)
}

export default Overlay

type OverlayProps = PropsWithChildren<{isVisible: boolean}>
