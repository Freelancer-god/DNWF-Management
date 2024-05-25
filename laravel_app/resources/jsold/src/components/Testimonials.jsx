/* eslint-disable max-len */
import React from "react";
import {useMediaQuery} from "react-responsive";
import {feedbackIcon} from "../assets";
import styles, {layout} from "../style";
// import { tt } from "../utils";
import Card from "./Card";
import {feedback, feedbacks} from "../constants";
import {useTranslation} from "react-i18next";

function Testimonials() {
    const {t} = useTranslation();
    const tt = t
    const isMobile = useMediaQuery({
        query: "(max-width: 768px)",
    });
    return (
        <section id="arena" className="flex flex-col">
            <div className={layout.sectionReverse}>
                <div className={`${layout.sectionImgReverse} hidden sm:flex`}>
                    <div className="w-full h-full  mt-6  ">
                        {/* <img src={arena} alt={tt('Phản hồi')} className=" relative z-[5]" /> */}
                        <div className="sm:w-[477px]">
                            <Card feedback={feedback[0]}/>
                        </div>
                    </div>

                    {/* gradient start */}
                    {/* <div className="absolute z-[3] -left-1/2 top-0 w-[50%] h-[50%] rounded-full white__gradient" /> */}
                    {/* <div className="absolute z-[0] w-[50%] h-[50%] -left-1/2 bottom-0 rounded-full pink__gradient" /> */}
                    {/* gradient end */}
                </div>

                {/* <div className={layout.sectionInfo}> */}
                <div className="flex-1 flex-col ">
                    <div className="flex flex-row  items-center sm:pl-14">
                        <img
                            src={feedbackIcon}
                            alt={tt("Phản hồi")}
                            className="w-[64px] h-[50px]"
                        />
                        <h2 className={styles.heading1}>{tt("Phản hồi")}</h2>
                    </div>

                    <p className={`${styles.paragraph}  mt-10`}>
                        Đấu trường Dabi đã nhận được rất nhiều phản hồi tích cực từ khách
                        hàng. Họ đã tận hưởng những trận đấu thoải mái, gặp gỡ những đối thủ
                        tài ba và thể hiện kỹ năng của mình
                    </p>

                    {/* <div className="flex flex-row flex-wrap sm:mt-10 mt-6">
          <img src={apple} alt="google_play" className="w-[128.86px] h-[42.05px] object-contain mr-5 cursor-pointer" />
          <img src={google} alt="google_play" className="w-[144.17px] h-[43.08px] object-contain cursor-pointer" />
        </div> */}
                </div>
            </div>
            <div className="flex flex-col md:flex-row sm:gap-16">
                {feedbacks.map((item, index) =>
                    isMobile ? (
                        <Card feedback={item} key={item.id}/>
                    ) : (
                        index > 0 && <Card feedback={item} key={item.id}/>
                    )
                )}
            </div>
        </section>
    );
}

export default Testimonials;
