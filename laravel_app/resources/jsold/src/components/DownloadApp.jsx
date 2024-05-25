/* eslint-disable max-len */
import React from 'react';
import {
    appStore,
    downloadAppHeading, googlePlay, iphone, qr, ratingDownload,
} from '../assets';
import styles, {layout} from '../style';
// import { tt } from '../utils';
import {useTranslation} from "react-i18next";

function DownloadApp() {

    const {t} = useTranslation();
    const tt = t
    return (
        <section id="downloadapp" className={`${layout.section} `}>
            <div className={`${layout.sectionInfo}
      `}
            >
                <div className="flex flex-row justify-between items-center">
                    <img src={downloadAppHeading} alt={tt('Tải ứng dụng')} className="w-[47px] h-[49px]"/>
                    <h2 className={styles.heading2}>
                        {tt('Tải ứng dụng')}
                    </h2>
                </div>

                <div
                    className="w-full sm:max-w-[470px] flex flex-row mt-[50px] sm:mt-[100px] gap-4 sm:gap-8 justify-center sm:justify-start">
                    <img src={qr} className="w-[120px] sm:w-[155px] sm:h-[155px]" alt={tt('Mã QR')}/>
                    <div className="flex flex-col gap-[10px]">
                        <a href='https://play.google.com/store/apps/details?id=com.dabi.android'><img src={googlePlay}
                                                                                                      alt={tt('Google Play')}
                                                                                                      className="w-[180px] sm:w-[218px] sm:h-[72px]"/></a>
                        <a href='https://apps.apple.com/vn/app/dabi/id1665113719?l=vi'><img src={appStore}
                                                                                            alt={tt('Google Play')}
                                                                                            className="w-[180px] sm:w-[218px] sm:h-[72px]"/></a>
                    </div>

                </div>
                <div className="w-full sm:max-w-[470px] flex flex-row mt-12 gap-16 justify-center sm:justify-start">
                    <div className="flex flex-col items-center ">
                        <img src={ratingDownload} className="w-full sm:w-[235px] sm:h-[35px]" alt=""/>
                        <span className="text-white text-[24px] font-normal mt-6">
							{tt('Đánh giá ứng dụng')}
						</span>
                    </div>
                    <div className="flex flex-col items-center ">
						<span className="text-[#FFD700] text-[32px] text-center font-bold leading-[35px]">
							1050
						</span>
                        <span className="text-white text-[24px] text-normal mt-5">{tt('Lượt tải')}</span>
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
            <div className={layout.sectionImg}>
                <div className={`w-full h-full ${styles.flexCenter}`}>
                    <img src={iphone} alt={tt('Cộng đồng')}
                         className=" w-full h-full sm:max-h-[1107px] sm:max-w-[805px] relative z-[5]"/>
                </div>

                {/* gradient start */}
                {/* <div className="absolute z-[3] -left-1/2 top-0 w-[50%] h-[50%] rounded-full white__gradient" /> */}
                {/* <div className="absolute z-[0] w-[50%] h-[50%] -left-1/2 bottom-0 rounded-full pink__gradient" /> */}
                {/* gradient end */}
            </div>

        </section>
    );
}

export default DownloadApp;
