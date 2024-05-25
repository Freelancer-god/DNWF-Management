/* eslint-disable max-len */
import React from "react";
import styles from "../style";
import {banner, downloadApp, heroBg} from "../assets";

// import { tt } from "../utils";
import {useTranslation} from "react-i18next";

function Hero() {
    const {t} = useTranslation();
    const tt = t

    return (
        <section
            id="home"
            className={`flex md:flex-row flex-col ${styles.paddingY}  `}
        >
            <div
                style={{"--hero-image-url": `url(${heroBg})`}}
                className={`flex-1 ${styles.flexStart}  flex-col xl:px-0 sm:px-16 px-6 relative
      before:content-[''] before:absolute before:top-[-50px] before:left-[-50px]  before:w-[430px] before:h-[370px]
      before:bg-[image:var(--hero-image-url)] before:bg-cover before:bg-no-repeat z-0
      `}
            >
                {/* <div className="flex flex-row items-center py-[6px] px-4 bg-discount-gradient rounded-[10px] mb-2">
          <img src={discount} alt="discount" className="w-[32px] h-[32px]" />
          <p className={`${styles.paragraph} ml-2`}>
            <span className="text-white">20%</span>
            {' '}
            Discount For
            {' '}
            <span className="text-white">1 Month</span>
            {' '}
            Account
          </p>
        </div> */}

                <div className="flex flex-row justify-between items-center w-full relative">
                    <h1 className="flex-1 font-inter font-normal ss:text-[65px] text-[52px] text-white ss:leading-[100.8px] leading-[75px]">
                        {tt("Trải nghiệm")} <br className="block"/>{" "}
                        <span className="text-gradient font-semibold">
              {tt("App DABI")}
            </span>{" "}
                    </h1>
                    <div className="ss:flex hidden md:mr-20 mr-0">
                        {/* <GetStarted /> */}
                        <a href="#downloadapp">
                            <img
                                src={downloadApp}
                                alt={tt("Tải ứng dụng")}
                                className="cursor-pointer"
                            />
                        </a>
                    </div>
                </div>

                <h1 className="font-inter font-normal ss:text-[68px] text-[52px] text-white ss:leading-[100.8px] leading-[75px] w-full relative">
                    {tt("Đấu trường BIDA")}
                </h1>
                <p className={`${styles.paragraph} max-w-[470px] mt-5 relative`}>
                    Ứng dụng Dabi tiên phong cho xu hướng phát triển cộng đồng Bida trên
                    nền tảng công nghệ 4.0
                </p>
            </div>

            <div
                className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative`}
            >
                <img src={banner} alt="billing" className="w-[100%]  relative z-[5]"/>

                {/* gradient start */}
                {/* <div className="absolute z-[0] w-[40%] h-[35%] top-0 pink__gradient" />
        <div className="absolute z-[1] w-[80%] h-[80%] rounded-full white__gradient bottom-40" />
        <div className="absolute z-[0] w-[50%] h-[50%] right-20 bottom-20 blue__gradient" /> */}
                {/* gradient end */}
            </div>

            <div className={`ss:hidden ${styles.flexCenter}`}>
                {/* <GetStarted /> */}
                <a href="#downloadapp">
                    <img
                        src={downloadApp}
                        alt={tt("Tải ứng dụng")}
                        className="cursor-pointer"
                    />
                </a>
            </div>
        </section>
    );
}

export default Hero;
