/* eslint-disable react/no-unescaped-entities */
/* eslint-disable max-len */
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import React, {useRef} from "react";
import {useMediaQuery} from "react-responsive";
// import {tt} from "../utils";
import {iconRestaurantLocation, iconRestaurantPhone} from "../assets";
import {useTranslation} from "react-i18next";

const RestaurantInChain = ({data}) => {
	const { t } = useTranslation();
	const tt = t
	const $owl = useRef(null);

	const isMD = useMediaQuery({
		query: "(min-width: 1080px)",
	});
	const isMobile = useMediaQuery({
		query: "(max-width: 768px)",
	});


	const openGoogleMap = (item) => () => {
		if (item && item.address && item.address.lat && item.address.lng) {
			window.open(`https://maps.google.com?q=${item.address.lat},${item.address.lng}`);
		}
	}

	return (
		<div className={"mt-[50px] mb-[50px]"}>
			<div className={'flex flex-col w-full items-center'}>
				<div className={'relative'}>
					<svg width="226" height="58" viewBox="0 0 226 58" fill="none"
						 xmlns="http://www.w3.org/2000/svg">
						<path d="M1 1H225" stroke="#C86B2E" strokeLinecap="round" strokeLinejoin="round"/>
						<path d="M1 4.31055H225" stroke="#EF9D37" strokeLinecap="2" strokeLinejoin="round"/>
						<div></div>
						<path d="M224.99 57.1953H1" stroke="#C86B2E" strokeLinejoin="round"/>
						<path d="M224.99 53.8848H1" stroke="#EF9D37" strokeLinecap="2" strokeLinejoin="round"/>
					</svg>
					<div className={'absolute top-0 flex items-center justify-center w-[226px] h-[58px]'}>
						<span className={'font-lato text-[28px] text-[#764324]'}>{tt('Cửa hàng')}</span>
					</div>
				</div>
			</div>
			<div>
				<OwlCarousel
					className="owl-theme mt-[50px]"
					loop
					margin={isMD ? -30 : -20}
					responsive={{
						0: {items: 1},
						1080: {items: data.length > 2 ? 2 : data.length},
						1340: {items: data.length > 3 ? 3 : data.length}
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
					{data.map((item, index) => (
						<div className="item flex flex-col items-center !cursor-default !opacity-100" key={item.id}>
							<div className={'restaurant-item-container'}>
								<img src={item?.restaurant_cover} alt={'img'}
									 className={'rounded-[10px] max-w-[415px] w-full h-auto max-h-[293px]'}/>
								<div className={'py-[15px] px-[20px]'}>
									<div
										className={'flex max-[850px]:flex-col max-[850px]:items-start flex-row items-center'}>
										{/*<div className={'flex flex-row items-center mr-[30px]'}>*/}
										{/*    <img src={iconRestaurantClock} alt={'phone'} className={'mr-[9px] !w-[18px] h-[18px]'}/>*/}
										{/*    <span className={'font-lato text-[14px]'}>{`10:00 - 22:00`}</span>*/}
										{/*</div>*/}
										{/*<div className={'flex flex-row items-center max-[850px]:mt-[10px] max-[850px]:ml-[-5px]'}>*/}
										{/*    <img src={iconRestaurantPhone} alt={'phone'} className={'mr-[2px] !w-[27px] h-[27px]'}/>*/}
										{/*    <a href="tel:033208188"*/}
										{/*       className={'font-lato text-[14px]'}>{`033208188`}</a>*/}
										{/*</div>*/}
										<div className={'flex flex-row items-center max-[850px]:mt-[10px] ml-[-5px]'}>
											<img src={iconRestaurantPhone} alt={'phone'}
												 className={'mr-[2px] !w-[27px] h-[27px]'}/>
											<a href={`tel:${item?.phone}`}
											   className={'font-lato text-[14px]'}>{item?.phone}</a>
										</div>
									</div>
									<div className={'flex flex-row items-start mt-[10px] justify-center'}>
										<img src={iconRestaurantLocation} alt={'phone'}
											 className={'mr-[9px] !w-[20px] h-[20px]'}/>
										<span onClick={openGoogleMap(item)}
											  className={'cursor-pointer font-lato text-[14px] leading-[1.4]'}>{item?.address?.address}</span>
									</div>
								</div>
							</div>
						</div>
					))}
				</OwlCarousel>
			</div>
		</div>
	)
}

export default RestaurantInChain
