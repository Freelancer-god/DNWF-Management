/* eslint-disable react/no-unescaped-entities */
/* eslint-disable max-len */
import React, {useState} from "react";
import {newsHeading, newsHeadingBg} from "../assets";
import styles, {layout} from "../style";
import {removeHtmlTags} from "../utils";
// import { tt} from "../utils";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

function HotNews(props) {
    const {data} = props;
    const {t} = useTranslation();
    const tt = t
    const navigate = useNavigate();

    const copyData = data.slice();
    copyData.shift();
    const arrHotNews = copyData;

    const [hotNews, setHotNews] = useState(arrHotNews);
    const [superHotNews, setSuperHotNews] = useState(data[0]);

    return (
        <section id="hotnews" className={`${layout.section} md:flex-col`}>
            <div
                style={{"--community-image-url": `url(${newsHeadingBg})`}}
                className={`${layout.sectionInfo}  relative
         before:content-[''] before:absolute before:top-[-90px] before:left-[100px]  before:w-[154px] before:h-[123px]
         before:bg-[image:var(--community-image-url)] before:bg-cover before:bg-no-repeat z-0
      `}
            >
                <div className="flex flex-row justify-between items-center relative">
                    <img
                        src={newsHeading}
                        alt={tt("Tin HOT")}
                        className="w-[47px] h-[49px]"
                    />
                    <h2 className={styles.heading3}>{tt("Tin HOT")}</h2>
                </div>
            </div>
            <div className="flex flex-col-reverse sm:flex-row w-full  sm:gap-4 md:gap-9 sm:mt-[83px] mt-[10px] ">
                <div className="sm:w-[50%] md:w-[50%] flex flex-col items-end">
                    {hotNews.map(
                        ({id, content, title, cover, slug}, index) =>
                            index < 3 && (
                                <div
                                    key={id}
                                    className={` flex flex-row sm:max-w-[500px] border-[1px] border-[#595656] border-solid rounded-[8px] cursor-pointer ${index > 0 ? "mt-3" : ""
                                    }`}
                                    onClick={() => {
                                        navigate(`/news/${slug}`, {
                                            state: {data: {id, content, title, cover, slug}},
                                        });
                                    }}
                                >
                                    <img
                                        src={cover.path}
                                        alt={tt("Tin Hot")}
                                        className="w-[30%] sm:w-[40%] md:w-full md:h-full min-w-[173px] min-h-[154px] object-cover aspect-16/9"
                                    />
                                    <div className="flex flex-col sm:ml-1 md:ml-5 p-2 sm:p-0">
                                        <h2 className="font-inter text-white text-[18px] leading-6 mt-2 line-clamp-2 md:line-clamp-3">
                                            {title}
                                        </h2>
                                        <p className="text-[#DADADA] text-opacity-[83%] text-[14px] leading-5 line-clamp-3  mt-3">
                                            {removeHtmlTags(content)}
                                        </p>
                                    </div>
                                </div>
                            )
                    )}
                </div>
                <div className="sm:w-[50%] md:w-[50%] flex flex-col relative items-center sm:items-start mb-3 sm:mb-0">
                    <div
                        className="relative h-full cursor-pointer"
                        onClick={() => {
                            navigate(`/news/${superHotNews.slug}`, {
                                state: {data: superHotNews},
                            });
                        }}
                    >
                        <img
                            src={superHotNews.cover.path}
                            alt={tt("Tin Hot")}
                            className="sm:max-w-[530px] w-full h-full object-cover rounded-[8px]"
                        />
                        <div className="bg-[#2D2B2B] rounded-[8px] m-2 sm:m-6 absolute bottom-0  p-2 ss:p-5">
							<span
                                className="font-inter text-center text-white font-medium text-[14px] leading-[20px] ss:text-[18px] ss:leading-[23.4px] line-clamp-3">
								{superHotNews.title}
							</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HotNews;
