/* eslint-disable max-len */
import React from 'react';
import {
    appStore,
    arenaBg,
    beanBottom,
    downloadAppHeading, googlePlay, qr, ratingDownload,
} from '../assets';
import styles, {layout} from '../style';
// import { tt } from '../utils';
import {useTranslation} from "react-i18next";

function DownloadAppV2() {

    const {t} = useTranslation();
    const tt = t

    return (
        <section id="downloadapp" className={layout.section}>
            <div className={`${layout.sectionInfo}
      `}
            >
                <div
                    style={{'--community-image-url': `url(${beanBottom})`}}
                    className={`flex flex-row justify-between items-center
       relative
       before:content-[''] before:absolute before:top-[-90px] before:left-[20px]  before:w-[299px] before:h-[346px]
       before:bg-[image:var(--community-image-url)] before:bg-cover before:bg-no-repeat z-0
       `}
                >
                    <img src={downloadAppHeading} alt={tt('Tải ứng dụng')} className="w-[47px] h-[49px]"/>
                    <h2 className={`${styles.heading3} z-10`}>
                        {tt('Tải ứng dụng')}
                    </h2>
                </div>

                <div
                    className="z-10 relative w-full  flex flex-col ss:flex-row mt-[50px] sm:mt-[100px] gap-4 sm:gap-8 justify-center items-center ">
                    <img src={qr} className="w-[120px] sm:w-[155px] sm:h-[155px]" alt={tt('Mã QR')}/>
                    <div className="flex flex-col gap-[10px]">
                        <a href='https://play.google.com/store/apps/details?id=com.dabi.android'><img src={googlePlay}
                                                                                                      alt={tt('Google Play')}
                                                                                                      className="w-[180px] sm:w-[218px] sm:h-[72px]"/></a>
                        <a href='https://apps.apple.com/vn/app/dabi/id1665113719?l=vi'><img src={appStore}
                                                                                            alt={tt('Google Play')}
                                                                                            className="w-[180px] sm:w-[218px] sm:h-[72px]"/></a>
                    </div>

                    <div className="sm:max-w-[470px] flex flex-col  justify-center sm:justify-start gap-[10px] ">
                        <div className="flex flex-col items-center ss:items-start ">
                            <img src={ratingDownload} className="w-full sm:w-[235px] sm:h-[35px]" alt=""/>
                            <span className="text-white text-[24px] font-normal mt-3">
								{tt('Đánh giá ứng dụng')}
							</span>
                        </div>
                        <div className="flex flex-col items-center ss:items-start mt-3 ss:mt-0">
							<span className="text-[#FFD700] text-[32px] text-center font-bold leading-[35px]">
								1050
							</span>
                            <span className="text-white text-[24px] text-normal mt-3">{tt('Lượt tải')}</span>
                        </div>

                    </div>

                </div>

                {/*
        <div className="w-full max-w-[470px] flex flex-col items-center ">
          <img src={downloadAppButton} alt={tt('Tải ứng dụng')} className="w-[181px] h-[65px] mt-6 cursor-pointer" />

        </div> */}

                {/* <div className="flex flex-row flex-wrap sm:mt-10 mt-6">
          <img src={apple} alt="google_play" className="w-[128.86px] h-[42.05px] object-contain mr-5 cursor-pointer" />
          <img src={google} alt="google_play" className="w-[144.17px] h-[43.08px] object-contain cursor-pointer" />
        </div> */}
            </div>
            <div
                style={{'--community-image-url': `url(${arenaBg})`}}
                className={`${styles.flexStart} md:flex-row flex-col mb-8
      relative
      before:content-[''] before:absolute before:top-[-230px] before:right-[0px]  before:w-[288px] before:h-[244px]
      before:bg-[image:var(--community-image-url)] before:bg-cover before:bg-no-repeat z-0
      `}
            />

        </section>
    );
}

export default DownloadAppV2;
