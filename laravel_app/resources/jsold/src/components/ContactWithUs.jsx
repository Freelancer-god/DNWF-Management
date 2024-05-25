import {APP_NAME, loadStateFromHiddenField} from "../utils";
// import { tt} from "../utils";
import React from "react";
import {iconContactClock, iconContactLocation, iconContactMail, iconContactPhone} from "../assets";
import MyMap from "./MyMap";
import {useTranslation} from "react-i18next";

const ContactWithUs = () => {
    const {t} = useTranslation();
    const tt = t

    const listStore = JSON.parse(loadStateFromHiddenField(APP_NAME, 'all-store', '[]'))


    const openGoogleMap = () => {
        window.open(`https://www.google.com/maps/place/Nh%C3%A0+H%C3%A0ng+Neo/@10.9471327,106.8274516,21z/data=!4m6!3m5!1s0x3174deafb8f9cd81:0xc8500f087e8db5fe!8m2!3d10.9471752!4d106.8275788!16s%2Fg%2F11c57cqhk_?entry=ttu`);
    }

    return (
        <div className={"mt-[50px] mb-[50px]"}>
            <div className={'flex flex-col w-full items-center'}>
                <div className={'relative'}>
                    <svg width="276" height="58" viewBox="0 0 276 58" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1H275" stroke="#C86B2E" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M1 4.31055H275" stroke="#EF9D37" strokeLinecap="2" strokeLinejoin="round"/>
                        <div></div>
                        <path d="M274.99 57.1953H1" stroke="#C86B2E" strokeLinejoin="round"/>
                        <path d="M274.99 53.8848H1" stroke="#EF9D37" strokeLinecap="2" strokeLinejoin="round"/>
                    </svg>
                    <div className={'absolute top-0 flex items-center justify-center w-[276px] h-[58px]'}>
                        <span className={'font-lato text-[28px] text-[#764324]'}>{tt('Liên hệ với chúng tôi')}</span>
                    </div>
                </div>
            </div>

            <div className={'mt-[83px]'}>
                <div className={'flex md:flex-row flex-col items-center'}>
                    <div className={'md:h-[435px] md:w-2/5 w-full flex flex-col md:justify-center items-center'}>
                        <div className={'md:pl-16 flex flex-row max-[450px]:flex-col gap-[20px] max-[450px]:gap-0'}>
                            <div className={"flex flex-col"}>
                                <div className={'flex flex-col items-center max-w-[244px]'}>
                                    <img src={iconContactLocation} alt={'address'}/>
                                    <div className={'mt-[6px] text-center'}>
										<span onClick={openGoogleMap}
                                              className={'cursor-pointer font-lato text-[16px] text-center leading-[1.6]'}>{'90-101 Võ Thị Sáu, KP7, P Thống Nhất, Biên Hòa, Đồng Nai'}</span>
                                    </div>
                                </div>
                                <div className={'flex flex-col items-center max-[450px]:mt-[30px] mt-[60px]'}>
                                    <img src={iconContactClock} alt={'open'}/>
                                    <div className={'mt-[6px]'}>
                                        <span className={'font-lato text-[16px] text-center'}>{'8:00 - 22:00'}</span>
                                    </div>
                                </div>
                            </div>
                            <div className={"flex flex-col justify-between max-[450px]:mt-[30px]"}>
                                <div className={'flex flex-col items-center'}>
                                    <img src={iconContactPhone} alt={'phone'}/>
                                    <div className={'mt-[6px] text-center'}>
                                        <a href={`tel:${'033208188'}`}
                                           className={'font-lato text-[16px] text-center'}>{'033208188'}</a>
                                    </div>
                                </div>
                                <div className={'flex flex-col items-center max-[450px]:mt-[30px]'}>
                                    <img src={iconContactMail} alt={'mail'}/>
                                    <div className={'mt-[6px]'}>
                                        <a href={`mailto:${'tvp@gmail.com'}`}
                                           className={'font-lato text-[16px] text-center'}>{'tvp@gmail.com'}</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{height: '435px'}} className={'md:mt-0 mt-[30px] md:w-3/5 w-full'}>
                        <MyMap store={listStore}/>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ContactWithUs
