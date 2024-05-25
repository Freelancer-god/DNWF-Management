/* eslint-disable react/no-unescaped-entities */
/* eslint-disable max-len */
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import React, {useRef} from "react";
import {useMediaQuery} from "react-responsive";
import {useNavigate} from "react-router-dom";
// import {tt} from "../utils";
import {banLanhDao, banLanhDao1, banLanhDao2} from "../assets";
import {useTranslation} from "react-i18next";


function Leadership() {

    const {t} = useTranslation();
    const tt = t
    const navigate = useNavigate();


    const news = [
        {
            id: '1',
            title: 'Lorem ipsum',
            content: 'Lorem ipsum is simply dummy text ',
            cover: banLanhDao
        },
        {
            id: '2',
            title: 'Lorem ipsum',
            content: 'Lorem ipsum is simply dummy text ',
            cover: banLanhDao1
        },
        {
            id: '3',
            title: 'Lorem ipsum',
            content: 'Lorem ipsum is simply dummy text ',
            cover: banLanhDao2
        },
        {
            id: '4',
            title: 'Lorem ipsum',
            content: 'Lorem ipsum is simply dummy text ',
            cover: banLanhDao
        },
        {
            id: '5',
            title: 'Lorem ipsum',
            content: 'Lorem ipsum is simply dummy text ',
            cover: banLanhDao2
        },
    ]

    const $owl = useRef(null);

    const isMD = useMediaQuery({
        query: "(min-width: 1080px)",
    });
    const isMobile = useMediaQuery({
        query: "(max-width: 768px)",
    });


    return (
        <div className={"mt-[50px] mb-[50px]"}>
            <div className={'flex flex-col w-full items-center'}>
                <div className={'relative'}>
                    <svg width="191" height="58" viewBox="0 0 191 58" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1H190" stroke="#C86B2E" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M1 4.31055H190" stroke="#EF9D37" strokeLinecap="2" strokeLinejoin="round"/>
                        <div></div>
                        <path d="M189.99 57.1953H1" stroke="#C86B2E" strokeLinejoin="round"/>
                        <path d="M189.99 53.8848H1" stroke="#EF9D37" strokeLinecap="2" strokeLinejoin="round"/>
                    </svg>
                    <div className={'absolute top-0 flex items-center justify-center w-[191px] h-[58px]'}>
                        <span className={'font-lato text-[28px] text-[#764324]'}>{tt('Ban lãnh đạo')}</span>
                    </div>
                </div>
            </div>

            <OwlCarousel
                className="owl-theme mt-[50px]"
                loop
                margin={isMD ? -30 : -20}
                responsive={{0: {items: 1}, 768: {items: 2}, 1080: {items: 3}}}
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
                //   onClick={(e) => {
                //     if (e.target.dataset.position !== undefined) {
                //       $owl.current.to(+e.target.dataset.position, 300);
                //       console.log(e.target.dataset.position);
                //     }
                //   }}
            >
                {news.map((item, index) => (
                    <div
                        className="item !cursor-default !opacity-100"
                        key={item.id}
                    >
                        <div className="h-full flex flex-col justify-center items-center">
                            <img
                                src={item.cover}
                                alt={item.title}
                                data-position={index}
                                className=" rounded-[8px] max-w-[342px] max-h-[361px]"
                            />
                            <div className="mt-[30px] w-11/12">
                                <div className={'flex flex-col items-center'}>
                                    <div className={'title-news-box-news-carousel'}>{item.title}</div>
                                    <div className={'description-news-box-news-carousel'}>{item.content}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </OwlCarousel>
        </div>
    );
}

export default Leadership;
