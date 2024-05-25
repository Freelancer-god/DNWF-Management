/* eslint-disable max-len */
import React from "react";

import {beanGreen, newsHeading} from "../assets";
import styles, {layout} from "../style";
// import {tt} from "../utils";
import NewsCarousel from "./NewsCarousel";
import {useTranslation} from "react-i18next";

function LatestNews(props) {
    const {t} = useTranslation();
    const tt = t
    const {data} = props;

    return (
        <section id="latestnews" className={`${layout.section} md:flex-col`}>
            <div
                style={{"--community-image-url": `url(${beanGreen})`}}
                className={`${layout.sectionInfo}  relative
         before:content-[''] before:absolute before:top-[-90px] before:right-[-40px]  before:w-[240px] before:h-[220px]
         before:bg-[image:var(--community-image-url)] before:bg-cover before:bg-no-repeat
      `}
            >
                <div className="flex flex-row justify-between items-center z-10">
                    <img
                        src={newsHeading}
                        alt={tt("Tin mới")}
                        className="w-[47px] h-[49px]"
                    />
                    <h2 className={styles.heading3}>{tt("Tin mới")}</h2>
                </div>
            </div>
            <div className="flex flex-col-reverse sm:flex-row w-full  sm:gap-4 md:gap-9 sm:mt-[83px] mt-[10px] ">
                <NewsCarousel news={data}/>
            </div>
        </section>
    );
}

export default LatestNews;
