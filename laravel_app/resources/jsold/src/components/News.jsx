/* eslint-disable camelcase */
/* eslint-disable max-len */
import React, {useState} from "react";
import {newsHeading} from "../assets";
import styles, {layout} from "../style";
import {lastUpdated, removeHtmlTags} from "../utils";
// import {tt} from "../utils";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

function News({version = "v1"}) {
    const {t} = useTranslation();
    const tt = t

    const data = [] //JSON.parse(loadState(APP_NAME, "latest_news"));

    const navigate = useNavigate();

    const [newsData, setNewsData] = useState(data);

    return (
        <section id="news" className={`${layout.section} mt-[30px] relative z-10`}>
            <div
                className={`flex flex-1 flex-col items-start ${version === "v1" ? "sm:items-center " : ""
                } `}
            >
                <div className=" flex flex-row items-center ">
                    <img
                        src={newsHeading}
                        alt={tt("Tin tức")}
                        className="w-[47px] h-[49px]"
                    />
                    <h2 className={version === "v1" ? styles.heading2 : styles.heading3}>
                        {version === "v1" ? tt("Tin tức") : tt("Tin liên quan")}
                    </h2>
                </div>
                <div className="flex flex-col  sm:flex-row mt-10 gap-4">
                    {newsData.map(
                        ({id, content, created_at, title, cover}, index) =>
                            index < 3 && (
                                <div
                                    className={`flex flex-col w-full cursor-pointer ${index > 0 ? "mt-10 sm:mt-0" : ""
                                    }`}
                                    key={id}
                                    onClick={() => {
                                        navigate(`/news/${data[index].slug}`, {
                                            state: {data: data[index]},
                                        });
                                        window.scrollTo({top: 0, left: 0, behavior: "instant"})
                                    }}
                                >
                                    <img
                                        src={cover.path}
                                        alt={title}
                                        className="w-full object-cover rounded-[8px] h-auto aspect-16/9"
                                    />
                                    <h4 className="font-inter  font-medium xs:text-[18px] text-[18px] xs:leading-[22x] leading-[22px] text-white mt-[13px] line-clamp-2">
                                        {title}
                                    </h4>
                                    <span className="font-inter font-medium text-[12px] text-[#BBBFC7] text-left">
										{lastUpdated(created_at)}
									</span>

                                    <p className="font-inter font-normal text-[14px] leading-4 text-[#BBBFC7] mt-4 line-clamp-4">
                                        {removeHtmlTags(content)}
                                    </p>
                                </div>
                            )
                    )}
                </div>
            </div>
        </section>
    );
}

export default News;
