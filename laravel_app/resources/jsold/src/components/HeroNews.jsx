/* eslint-disable max-len */
import React from "react";
import styles from "../style";
import {beanGreen, heroBg, viewMore} from "../assets";
import {removeHtmlTags} from "../utils";
// import {tt} from "../utils";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

function HeroNews(props) {
    const {data} = props;
    const {t} = useTranslation();
    const tt = t
    const navigate = useNavigate();

    return (
        <section
            id="home-news"
            className="flex  sm:flex-row flex-col items-start px-10 md:py-16 sm:py-8  home_news_bg_gradient gap-0 sm:gap-14  mt-10 py-8"
        >
            <div
                style={{"--hero-image-url": `url(${heroBg})`}}
                className={`w-full md:w-[60%] sm:w-[50%] ${styles.flexStart}  flex-col xl:px-0
        relative before:content-[''] before:absolute before:top-[-230px] before:left-[-60px]  before:w-[430px] before:h-[370px]
      before:bg-[image:var(--hero-image-url)] before:bg-cover before:bg-no-repeat
      `}
            >
                <img
                    src={data.cover.path}
                    alt={tt("Tin tức")}
                    className="w-full max-w-[656px] z-1 rounded-[5px]"
                />
            </div>

            <div
                style={{"--hero-image-url": `url(${beanGreen})`}}
                className={`w-full md:w-[40%] sm:w-[50%] ${styles.flexStart} flex-col  relative mt-3
       before:content-[''] before:absolute before:top-[60px] before:right-[-50px]  before:w-[240px] before:h-[220px]
       before:bg-[image:var(--hero-image-url)] before:bg-cover before:bg-no-repeat
      `}
            >
                <h1 className="z-10 flex-1 font-inter font-medium min-w-[348px] md:text-[40px] text-[20px] sm:text-[25px] text-white sm:leading-[32px] md:leading-[57px] leading-[35px]">
                    {data.title}
                </h1>
                <p className="z-10 font-inter font-normal md:text-[18px] sm:text-[16px]  leading-[30px] text-white opacity-[70%] line-clamp-3">
                    {removeHtmlTags(data.content)}
                </p>
                <div className="z-10 sm:flex hidden md:mr-20 mr-0">
                    {/* <GetStarted /> */}
                    <a
                        onClick={() => {
                            navigate(`/news/${data.slug}`, {
                                state: {data: data},
                            });
                        }}
                    >
                        <img
                            src={viewMore}
                            alt={tt("Xem thêm")}
                            className="w-[60%] sm:w-[80%] cursor-pointer"
                        />
                    </a>
                </div>
            </div>

            <div className={`sm:hidden ${styles.flexCenter}`}>
                {/* <GetStarted /> */}
                <a
                    onClick={() => {
                        navigate(`/news/${data.slug}`, {
                            state: {data: data},
                        });
                    }}
                >
                    <img
                        src={viewMore}
                        alt={tt("Xem thêm")}
                        className="w-[70%] cursor-pointer"
                    />
                </a>
            </div>
        </section>
    );
}

export default HeroNews;
