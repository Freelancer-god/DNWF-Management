import React from "react";
// import {tt} from "../utils";
import {MucTieu, ThanhTuu} from "../assets";
import {useTranslation} from "react-i18next";

const AchievementAndTarget = () => {
    const {t} = useTranslation();
    const tt = t

    return (
        <div className={"mt-[50px] mb-[50px]"}>
            <div>
                <div className={"flex md:flex-row flex-col md:items-start items-center justify-between"}>
                    <div className={'hidden sm:flex flex-col'}>
                        <img src={ThanhTuu} alt={'achievement'}
                             className={'w-full h-auto max-w-[550px] max-[540px]:w-[300px] md:w-[410px]'}/>
                    </div>
                    <div className={'flex md:ml-[250px] md:mt-0 mt-[20px] flex-col items-start '}>
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
                                <span className={'font-lato text-[28px] text-[#764324]'}>{tt('Thành tựu')}</span>
                            </div>
                        </div>
                        <div className={'mt-[38px]'}>
                            <div
                                className={'font-lato text-[18px] font-semibold'}>{'Lorem ipsum dolor sit amet, consectetuer adipiscing elit'}</div>
                            <div className={'mt-[11px] font-lato text-[14px] font-normal'}>
                                {'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam quis nostrud exerci tation ullamcorper suscipit lobortis.'}</div>
                        </div>
                    </div>
                    <div className={'sm:hidden flex flex-col mt-[20px]'}>
                        <img src={ThanhTuu} alt={'achievement'}
                             className={'w-full h-auto max-w-[550px] max-[540px]:w-[300px] md:w-[410px]'}/>
                    </div>
                </div>
            </div>
            <div className={"mt-[100px]"}>
                <div className={"flex md:flex-row flex-col md:items-start items-center justify-between"}>
                    <div className={'flex flex-col items-start'}>
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
                                <span className={'font-lato text-[28px] text-[#764324]'}>{tt('Mục tiêu')}</span>
                            </div>
                        </div>
                        <div className={'mt-[38px] '}>
                            <div
                                className={'font-lato text-[18px] font-semibold'}>{'Lorem ipsum dolor sit amet, consectetuer adipiscing elit'}</div>
                            <div className={'mt-[11px] font-lato text-[14px] font-normal'}>
                                {'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam quis nostrud exerci tation ullamcorper suscipit lobortis.'}</div>
                        </div>
                    </div>
                    <div className={'md:ml-[250px] md:mt-[-50px] mt-[20px]'}>
                        <img src={MucTieu} alt={'target'}
                             className={'w-full h-auto max-w-[550px] max-[540px]:w-[300px] md:w-[410px]'}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AchievementAndTarget
