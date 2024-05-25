/* eslint-disable react/no-unescaped-entities */
/* eslint-disable max-len */
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import React, {useRef} from "react";
import {useMediaQuery} from "react-responsive";
import {APP_NAME, loadStateFromHiddenField, removeHtmlTags} from "../utils";
// import { tt} from "../utils";
import {useTranslation} from "react-i18next";


function NewsHomeCarousel() {
    const {t} = useTranslation();
    const tt = t

    const listNews = JSON.parse(loadStateFromHiddenField(APP_NAME, 'list-news', '[]'))

    const $owl = useRef(null);

    const isMD = useMediaQuery({
        query: "(min-width: 1080px)",
    });
    const isMobile = useMediaQuery({
        query: "(max-width: 768px)",
    });


    return (
        <div className={"mt-[50px] mb-[50px]"}>
            <div className={'flex flex-col w-full sm:items-center items-start'}>
                <div className={'relative'}>
                    <svg width="139" height="58" viewBox="0 0 139 58" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1H138" stroke="#C86B2E" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M1 4.31055H138" stroke="#EF9D37" strokeLinecap="2" strokeLinejoin="round"/>
                        <div></div>
                        <path d="M137.99 57.1953H1" stroke="#C86B2E" strokeLinejoin="round"/>
                        <path d="M137.99 53.8848H1" stroke="#EF9D37" strokeLinecap="2" strokeLinejoin="round"/>
                    </svg>
                    <div className={'absolute top-0 flex items-center justify-center w-[139px] h-[58px]'}>
                        <span className={'font-lato text-[28px] text-[#764324]'}>{tt('Tin tức')}</span>
                    </div>
                </div>
            </div>

            <OwlCarousel
                className="owl-theme mt-[50px]"
                loop
                margin={isMD ? -30 : -20}
                responsive={{
                    0: {items: 1},
                    768: {items: listNews.length > 2 ? 2 : listNews.length},
                    1080: {items: listNews.length > 3 ? 3 : listNews.length}
                }}
                autoplay
                autoplayTimeout={5000}
                autoplayHoverPause
                center
                nav
                navText={[
                    '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAoCAYAAADzL6qcAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADUSURBVHgB7ZVRDcJAEEQnKEDCSUACEpCABBwUB9RBcYKESkBCcXDsJluYHPDR2U/6kv3c18t0rgUS1Fq3yGKSYjPa7JAhJM5dPpktdvVNDwVbPJJEO03kMpGkYCn+5FieOUDBFgeSnKHQhHuDgvekCbdgKREu51KgQKVzTlBYS/dTNKyl+2BjU2KcR4yGtzadD8muJOug8qVDe6g0rZ7U4GcZ37OxZn6CttyT7IIM/vZIpn2LQsRF9bz0X7O/uebqpPJay7pM9m9lRQYqq34ikr2uzRM72WNSIFpurAAAAABJRU5ErkJggg==" alt="back" />',
                    '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAoCAYAAADzL6qcAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADYSURBVHgB7ZJRDcJADIb/oAAJJ2ESJgEH4IA5YA6GAyQgAQkn4XBwODja0IRyhJC1e1ruS5rtpV967Q8IpZQtvJAkUEX+wgpPQpXKixs8kOBc3kywIlNFJdvDiuwpiyh797VTUyXXJal5VLILPPD1lGyAlSoSTA8r1NxV+wqwws9SshbW/7IW1nmyr7BuYONBdZf/QGVbPE1wVRONsECNJ/flFsmSpDu5012d/AAL1DgtsdyjkkRYkL18BA9zqZbLdLDQQvdTlFYUOhFlV+iUaHCFrpL1cPAElNpdJJqiiPEAAAAASUVORK5CYII=" alt="next" />',
                ]}
                dots={isMobile}
                ref={$owl}
            >
                {listNews?.map((item, index) => (
                    <div
                        className="item !cursor-default flex flex-col items-center !opacity-100"
                        key={item.id}
                    >
                        <div className="max-w-[378px] h-full flex flex-col justify-center items-center">
                            <img
                                src={item?.cover}
                                alt={item?.title}
                                data-position={index}
                                className="aspect-16/9 object-cover rounded-[8px]"
                            />
                            <div className="box-news-carousel mt-[-30px] w-8/12">
                                <div>
                                    <div className={'font-lato title-news-box-news-carousel'}>{item?.title}</div>
                                    <div
                                        className={'font-lato description-news-box-news-carousel'}>{removeHtmlTags(item?.sub_title)}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </OwlCarousel>
        </div>
    );
}

export default NewsHomeCarousel;
