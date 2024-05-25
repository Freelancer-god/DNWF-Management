/* eslint-disable react/no-unescaped-entities */
/* eslint-disable max-len */
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import React, {useRef} from "react";
import {useMediaQuery} from "react-responsive";
// import {tt} from "../utils";
import {arrowBlack} from "../assets";
import {useTranslation} from "react-i18next";


function MenuCarousel({data,store}) {
	const { t } = useTranslation();
	const tt = t
	const $owl = useRef(null);

	const isMD = useMediaQuery({
		query: "(min-width: 1080px)",
	});
	const isMobile = useMediaQuery({
		query: "(max-width: 768px)",
	});

	const widthTitle = (sub = 0) => {
		let title = data?.title || tt('Menu Highlight')
		return title.length * 20 - sub
	}


	return (
		<div className={"mt-[50px] mb-[50px]"}>
			<div className={'flex flex-col w-full items-center'}>
				<div className={'relative'}>
					<svg width={`${widthTitle()}`} height="58" viewBox={`0 0 ${widthTitle()} 58`} fill="none"
						 xmlns="http://www.w3.org/2000/svg">
						<path d={`M1 1H${widthTitle(1)}`} stroke="#C86B2E" strokeLinecap="round"
							  strokeLinejoin="round"/>
						<path d={`M1 4.31055H${widthTitle(1)}`} stroke="#EF9D37" strokeLinecap="2"
							  strokeLinejoin="round"/>
						<div></div>
						<path d={`M${widthTitle(2)}.99 57.1953H1`} stroke="#C86B2E" strokeLinejoin="round"/>
						<path d={`M${widthTitle(2)}.99 53.8848H1`} stroke="#EF9D37" strokeLinecap="2"
							  strokeLinejoin="round"/>
					</svg>
					<div className={'absolute top-0 flex items-center justify-center w-full h-[58px]'}>
						<span
							className={'font-lato text-[28px] text-[#764324]'}>{data.title || tt('Menu Highlight')}</span>
					</div>
				</div>
			</div>

			<div className={'flex flex-col'}>
				<OwlCarousel
					className="owl-theme mt-[50px]"
					loop
					margin={isMD ? -30 : -20}
					responsive={{
						0: {items: 1},
						768: {items: data?.menu_products?.length > 2 ? 2 : data?.menu_products?.length},
						1080: {items: data?.menu_products?.length > 3 ? 3 : data?.menu_products?.length},
						1340: {items: data?.menu_products?.length > 4 ? 4 : data?.menu_products?.length}
					}}
					autoplay={false}
					autoplayTimeout={5000}
					autoplayHoverPause
					nav
					navText={[
						'<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAoCAYAAADzL6qcAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADUSURBVHgB7ZVRDcJAEEQnKEDCSUACEpCABBwUB9RBcYKESkBCcXDsJluYHPDR2U/6kv3c18t0rgUS1Fq3yGKSYjPa7JAhJM5dPpktdvVNDwVbPJJEO03kMpGkYCn+5FieOUDBFgeSnKHQhHuDgvekCbdgKREu51KgQKVzTlBYS/dTNKyl+2BjU2KcR4yGtzadD8muJOug8qVDe6g0rZ7U4GcZ37OxZn6CttyT7IIM/vZIpn2LQsRF9bz0X7O/uebqpPJay7pM9m9lRQYqq34ikr2uzRM72WNSIFpurAAAAABJRU5ErkJggg==" alt="back" />',
						'<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAoCAYAAADzL6qcAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADYSURBVHgB7ZJRDcJADIb/oAAJJ2ESJgEH4IA5YA6GAyQgAQkn4XBwODja0IRyhJC1e1ruS5rtpV967Q8IpZQtvJAkUEX+wgpPQpXKixs8kOBc3kywIlNFJdvDiuwpiyh797VTUyXXJal5VLILPPD1lGyAlSoSTA8r1NxV+wqwws9SshbW/7IW1nmyr7BuYONBdZf/QGVbPE1wVRONsECNJ/flFsmSpDu5012d/AAL1DgtsdyjkkRYkL18BA9zqZbLdLDQQvdTlFYUOhFlV+iUaHCFrpL1cPAElNpdJJqiiPEAAAAASUVORK5CYII=" alt="next" />',
					]}
					dots={isMobile}
					ref={$owl}
					//   onClick={(e) => {
					//     if (e.target.dataset.position !== undefined) {
					//       $owl.current.to(+e.target.dataset.position, 300);
					//       console.log(e.target.dataset.position);
					//     }
					//   }}
				>
					{data?.menu_products?.map((item, index) => (
						<div className="item flex flex-col items-center !cursor-default !opacity-100" key={item.id}>
							<div className="menu-item-container h-full flex flex-col justify-center items-center">
								<div
									className={'menu-item-container-inner h-full flex flex-col justify-between items-center'}>
									<div className={'flex flex-col flex-1 pt-[48px]'}>
										<img src={item?.cover[0]?.path} alt={'menu item'}
											 className={'max-w-[180px] max-h-[115px] w-full h-auto'}/>
									</div>
									<div className={'flex flex-col justify-between flex-1 mt-[25px]'}>
										<div>
										<span
											className={'menu-item-title'}>{item?.title}</span>
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
					))}
				</OwlCarousel>

				<div className={'flex flex-col items-end'}>
					<a href={`/${store?.id}/menu?category=${data.id}`} className={'flex flex-row items-center cursor-pointer hover:opacity-50 transition duration-300 ease-in-out'}>
						<span className={'font-lato text-[20px]'}>{tt('Xem menu')}</span>
						<img src={arrowBlack} alt={'go'} className={'ml-1 mb-[-4px]'}/>
					</a>
				</div>
			</div>
		</div>
	);
}

export default MenuCarousel;
