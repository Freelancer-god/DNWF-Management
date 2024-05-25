import React from "react";
import {APP_NAME, loadStateFromHiddenField} from "../utils";
// import { tt} from "../utils";
import {useTranslation} from "react-i18next";


const RestaurantChain = () => {
    const {t} = useTranslation();
    const tt = t
    const chainStore = JSON.parse(loadStateFromHiddenField(APP_NAME, 'chain-store', '[]'));

    return (
        <div className={"mt-[50px] mb-[50px]"}>

            <div className={'md:hidden mb-[50px] flex flex-col items-start'}>
                <div className={'flex flex-col'}>
                    <div className={'relative'}>
                        <svg width="223" height="58" viewBox="0 0 223 58" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1H222" stroke="#C86B2E" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                            <path d="M1 4.31055H222" stroke="#EF9D37" strokeLinecap="2"
                                  strokeLinejoin="round"/>
                            <div></div>
                            <path d="M221.99 57.1953H1" stroke="#C86B2E" strokeLinejoin="round"/>
                            <path d="M221.99 53.8848H1" stroke="#EF9D37" strokeLinecap="2"
                                  strokeLinejoin="round"/>
                        </svg>
                        <div
                            className={'absolute top-0 flex items-center justify-center w-[223px] h-[58px]'}>
										<span
                                            className={'font-lato text-[28px] text-[#764324]'}>{tt('Chuỗi nhà hàng')}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className={'flex md:flex-row items-center flex-col self-center md:justify-center md:items-start'}>
                <div>
                    {chainStore?.map((item, index) => {
                        return index % 2 === 0 && (
                            <div className={'mb-[90px] md:w-[435px] w-full flex flex-col md:items-end items-center'}>
                                <img src={item?.logo?.path} alt={item.name}
                                     className={'md:max-w-[435px] w-full h-auto'}/>
                                <div className={'mt-[30px] px-2'}>
                                    <div
                                        className={'font-lato font-bold text-[28px] text-center'}>{(item.name)}</div>
                                </div>
                                <div className={'flex flex-col items-end mt-[32px] w-full'}>
                                    <a href={`/restaurant/${item.id}`}
                                       className={"button-radius-bg flex items-center justify-center cursor-pointer hover:bg-[#76432470] transition duration-300 ease-in-out"}>
									<span className={'header-button-login-label font-lato font-semibold text-[25px]'}>
										{tt('Xem Thêm')}</span>
                                    </a>
                                </div>
                            </div>
                        )
                    })}

                </div>

                <div className={'md:ml-[100px]'}>
                    <div className={'md:w-[435px] w-full flex flex-col md:items-end items-center'}>
                        <div className={'mb-[84px] md:flex flex-row justify-end hidden'}>
                            <div>
                                <div className={'relative'}>
                                    <svg width="223" height="58" viewBox="0 0 223 58" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1 1H222" stroke="#C86B2E" strokeLinecap="round"
                                              strokeLinejoin="round"/>
                                        <path d="M1 4.31055H222" stroke="#EF9D37" strokeLinecap="2"
                                              strokeLinejoin="round"/>
                                        <div></div>
                                        <path d="M221.99 57.1953H1" stroke="#C86B2E" strokeLinejoin="round"/>
                                        <path d="M221.99 53.8848H1" stroke="#EF9D37" strokeLinecap="2"
                                              strokeLinejoin="round"/>
                                    </svg>
                                    <div
                                        className={'absolute top-0 flex items-center justify-center w-[223px] h-[58px]'}>
										<span
                                            className={'font-lato text-[28px] text-[#764324]'}>{tt('Chuỗi nhà hàng')}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {chainStore?.map((item, index) => {
                        return index % 2 !== 0 && (
                            <div className={'md:w-[435px] w-full flex flex-col md:items-end items-center'}>
                                <img src={item?.logo?.path} alt={item.name}
                                     className={'md:max-w-[435px] w-full h-auto'}/>
                                <div className={'mt-[30px] px-2 flex flex-col md:items-end items-center w-full'}>
                                    <div
                                        className={'font-lato font-bold text-[28px] text-center'}>{item.name}</div>
                                </div>
                                <div className={'flex flex-col items-end mt-[32px] w-full'}>
                                    <a href={`/restaurant/${item.id}`}
                                       className={"button-radius-bg flex items-center justify-center cursor-pointer hover:bg-[#76432470] transition duration-300 ease-in-out"}>
									<span className={'header-button-login-label font-lato font-semibold text-[25px]'}>
										{tt('Xem Thêm')}</span>
                                    </a>
                                </div>
                            </div>
                        )
                    })}

                </div>
            </div>
        </div>
    )

}

export default RestaurantChain
