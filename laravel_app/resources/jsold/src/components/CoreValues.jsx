import React from "react";
// import {tt} from "../utils";
import {GTCLChuyenNghiep, GTCLDadang, GTCLTrachNhiem, GTCLTrungThuc, GTCLUyTin} from "../assets";
import {useTranslation} from "react-i18next";


const CoreValues = () => {
    const {t} = useTranslation();
    const tt = t

    const CORE_VALUE = [
        {
            title: tt('Trung thực'),
            description: tt('Lorem ipsum dolor sit ametum dolor sit amet, consectetuer adipiscing elit'),
            icon: GTCLTrungThuc
        },
        {
            title: tt('Trách nhiệm'),
            description: tt('Lorem ipsum dolor sit amet, consectetuer met, consectetuer a'),
            icon: GTCLTrachNhiem
        },
        {
            title: tt('Chuyên nghiệp'),
            description: tt('Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet, consectetuer adipiscing elit'),
            icon: GTCLChuyenNghiep
        },
        {
            title: tt('Uy tín'),
            description: tt('Lorem ipsum dolor sit ametuer adipiscing elit'),
            icon: GTCLUyTin
        },
        {
            title: tt('Đa dạng'),
            description: tt('Lorem ipsum dolor sit amet, consectet amet, consectetuer adipiscing elit'),
            icon: GTCLDadang
        },
    ]

    return (
        <div className={"mt-[50px] mb-[50px]"}>
            <div className={'relative'}>
                <div className={'relative'}>
                    <svg width="170" height="58" viewBox="0 0 170 58" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1H169" stroke="#C86B2E" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M1 4.31055H169" stroke="#EF9D37" strokeLinecap="2" strokeLinejoin="round"/>
                        <div></div>
                        <path d="M168.99 57.1953H1" stroke="#C86B2E" strokeLinejoin="round"/>
                        <path d="M168.99 53.8848H1" stroke="#EF9D37" strokeLinecap="2" strokeLinejoin="round"/>
                    </svg>
                    <div className={'absolute top-0 flex items-center justify-center w-[170px] h-[58px]'}>
                        <span className={'font-lato text-[28px] text-[#764324]'}>{tt('Giá trị cốt lõi')}</span>
                    </div>
                </div>
            </div>
            <div className={'mt-[50px]'}>
                <div className={'hidden sm:flex flex-row flex-wrap justify-center'}>
                    {CORE_VALUE.map((value, index, array) => {
                        return (
                            <div className={'flex flex-col items-center max-w-[220px] py-[30px]'}
                                 key={'CORE_VALUE_.map' + index}>
                                {index % 2 === 0
                                    ? (
                                        <div className={'flex flex-col items-center'}>
                                            <img src={value.icon} alt={'core-value'}/>
                                            <div className={'flex flex-col items-center mt-[20px]'}>
                                                <div
                                                    className={'font-lato text-[18px] text-center text-[#764324]'}>{value.title}</div>
                                                <div
                                                    className={'mt-[6px] font-lato text-[16px] text-center text-[#181818]'}>{value.description}</div>
                                            </div>
                                        </div>
                                    )
                                    :
                                    (
                                        <div className={'flex flex-col items-center justify-between flex-1'}>
                                            <div className={'flex flex-col items-center flex-1'}>
                                                <div
                                                    className={'font-lato text-[18px] text-center text-[#764324]'}>{value.title}</div>
                                                <div
                                                    className={'mt-[6px] font-lato text-[16px] text-center text-[#181818]'}>{value.description}</div>
                                            </div>
                                            <img src={value.icon} alt={'core-value'}/>
                                        </div>
                                    )
                                }
                            </div>
                        )
                    })}
                </div>
                <div className={'sm:hidden flex flex-row flex-wrap justify-center'}>
                    {CORE_VALUE.map((value, index, array) => {
                        return (
                            <div className={'flex flex-col items-center max-w-[220px] py-[30px]'}
                                 key={'CORE_VALUE.map' + index}>
                                <div className={'flex flex-col items-center'}>
                                    <img src={value.icon} alt={'core-value'}/>
                                    <div className={'flex flex-col items-center mt-[20px]'}>
                                        <div
                                            className={'font-lato text-[18px] text-center text-[#764324]'}>{value.title}</div>
                                        <div
                                            className={'mt-[6px] font-lato text-[16px] text-center text-[#181818]'}>{value.description}</div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default CoreValues
