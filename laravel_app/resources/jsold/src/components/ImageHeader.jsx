import {bgHeaderHome} from "../assets";

const ImageHeader = ({img}) => {

	return (
		<div className={'w-full'}>
			<img src={img || bgHeaderHome} alt={'bg-header'} className={'w-full h-auto'}/>
		</div>
	)
}

export default ImageHeader
