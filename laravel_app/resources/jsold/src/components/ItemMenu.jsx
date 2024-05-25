import React from "react";

const ItemMenu = ({item, index}) => {
	return (
		<div className="item flex flex-col items-center !cursor-default" key={item.id}>
			<div className="menu-item-container h-full flex flex-col justify-center items-center">
				<div
					className={'menu-item-container-inner h-full flex flex-col justify-between items-center'}>
					<div className={'flex flex-col flex-1 pt-[48px]'}>
						<img src={item?.cover[0]?.path} alt={'menu item'}
							 className={'max-w-[180px] max-h-[115px] w-full h-auto'}/>
					</div>
					<div className={'flex flex-col justify-between flex-1 mt-[25px]'}>
						<div>
							<span className={'menu-item-title'}>{item?.title}</span>
						</div>
						<div>
							<span className={'menu-item-price'}>{item?.price?.toLocaleString('vi-VN', {
								style: 'currency',
								currency: 'VND'
							})}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ItemMenu
