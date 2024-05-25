import React from "react";
import {aboutTvp, iconCreativePassion, iconQualityNew} from "../assets";
// import {tt} from "../utils";
import {useTranslation} from "react-i18next";

const AboutTVP = ({isDetail}) => {
	const { t } = useTranslation();
	const tt = t
	return (
		<div className={"mt-[30px] mb-[50px]"}>
			<div className={"flex md:flex-row flex-col md:items-start items-center justify-between"}>
				<div>
					<img src={aboutTvp} alt={'about-tvp'}
						 className={'w-full h-auto md:min-w-[597px] max-[700px]:max-w-[497px] max-[540px]:max-w-[297px]'}/>
				</div>
				<div className={'flex md:ml-[70px] flex-col items-start'}>
					<div className={'relative'}>
						<svg width="139" height="58" viewBox="0 0 139 58" fill="none"
							 xmlns="http://www.w3.org/2000/svg">
							<path d="M1 1H138" stroke="#C86B2E" strokeLinecap="round" strokeLinejoin="round"/>
							<path d="M1 4.31055H138" stroke="#EF9D37" strokeLinecap="2" strokeLinejoin="round"/>
							<div></div>
							<path d="M137.99 57.1953H1" stroke="#C86B2E" strokeLinejoin="round"/>
							<path d="M137.99 53.8848H1" stroke="#EF9D37" strokeLinecap="2" strokeLinejoin="round"/>
						</svg>
						<div className={'absolute top-0 flex items-center justify-center w-[139px] h-[58px]'}>
							<span className={'font-lato text-[28px] text-[#764324]'}>{tt('Về TVP')}</span>
						</div>
					</div>
					<div className={'mt-[58px]'}>
						<div
							className={'font-lato text-[16px]'}>{'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam quis nostrud exerci tation ullamcorper suscipit lobortis.'}</div>
						<div
							className={'mt-[15px] font-lato text-[16px]'}>{'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam quis nostrud exerci tation ullamcorper suscipit lobortis.'}</div>
					</div>
					{isDetail ?
						(<div className={'flex flex-col mt-[16px]'}>
							<div className={'flex flex-row items-start'}>
								<img src={iconQualityNew} alt={'quality'}
									 className={'w-full max-w-[55px] h-auto'}/>
								<div className={'ml-[28px]'}>
									<div className={'font-lato font-semibold text-[#181818] text-[18px]'}>
										{tt('Chất lượng và đổi mới')}
									</div>
									<div className={'mt-[5px] font-lato font-normal text-[#00] text-[15px]'}>
										{tt('Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat...')}
									</div>
								</div>
							</div>
							<div className={'flex flex-row mt-[21px] items-start'}>
								<img src={iconCreativePassion} alt={'creative'}
									 className={'w-full max-w-[55px] h-auto'}/>
								<div className={'ml-[28px]'}>
									<div className={'font-lato font-semibold text-[#181818] text-[18px]'}>
										{tt('Chất lượng và đổi mới')}
									</div>
									<div className={'mt-[5px] font-lato font-normal text-[#00] text-[15px]'}>
										{tt('Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat...')}
									</div>
								</div>
							</div>
						</div>)
						:
						(<div className={'mt-[70px] flex flex-col items-end w-full'}>
							<a href={'/about-us'}
							   className={'hover:opacity-50 transition duration-300 ease-in-out cursor-pointer border-button-radius font-lato title-border-button-radius'}>
								{tt('Xem Thêm')}
							</a>
						</div>)
					}
				</div>
			</div>
		</div>
	)
}

export default AboutTVP
