import React from "react";
import {bannerNeosuki} from "../assets";
// import {tt} from "../utils";
import {useTranslation} from "react-i18next";

const AboutRestaurantsChain = ({restaurant}) => {
    const {t} = useTranslation();
    const tt = t
    const widthTitle = (sub = 0) => {
        let title = restaurant?.name || 'NEOSUKI'
        return title.length * 26 - sub
    }

    return (
        <div className={"mt-[30px] mb-[50px]"}>
            <div className={"flex md:flex-row flex-col md:items-start items-center justify-between"}>
                <div>
                    <img src={restaurant?.logo?.path || bannerNeosuki} alt={'about-restaurant'}
                         className={'w-full h-auto md:min-w-[524px] max-[700px]:max-w-[497px] max-[540px]:max-w-[297px]'}/>
                </div>
                <div className={'flex md:ml-[70px] flex-col items-start md:mt-0 mt-[20px] flex-1'}>
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
                        <div className={`absolute top-0 flex items-center justify-center w-full h-[58px]`}>
                            <span
                                className={'font-lato text-[28px] text-[#764324]'}>{`${tt('Về ')} ${restaurant?.name || 'NEOSUKI'}`}</span>
                        </div>
                    </div>
                    <div className={'mt-[58px]'}>
                        <div className={'font-lato text-[16px]'}>{restaurant?.description}</div>
                        {/*<div*/}
                        {/*	className={'mt-[15px] font-lato text-[16px]'}>{'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam quis nostrud exerci tation ullamcorper suscipit lobortis.'}</div>*/}
                    </div>
                    <div className={'mt-[70px] flex flex-col items-end w-full'}>
                        <a href={`/${restaurant?.id}/menu`}
                           className={'hover:opacity-50 transition duration-300 ease-in-out cursor-pointer border-button-radius font-lato title-border-button-radius'}>
                            {tt('Xem Menu')}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutRestaurantsChain
