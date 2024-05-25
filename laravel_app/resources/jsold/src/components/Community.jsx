/* eslint-disable max-len */
import React from "react";
import {
    community,
    communityBg,
    communityIcon,
    downloadAppButton,
} from "../assets";
import styles, {layout} from "../style";
// import { tt } from "../utils";
import {useTranslation} from "react-i18next";

function Community() {
    const {t} = useTranslation();
    const tt = t

    return (
        <section id="arena" className={layout.section}>
            <div
                style={{"--community-image-url": `url(${communityBg})`}}
                className={`${layout.sectionInfo}  relative
         before:content-[''] before:absolute before:bottom-[0px] before:left-[-50px]  before:w-[289px] before:h-[214px]
         before:bg-[image:var(--community-image-url)] before:bg-cover before:bg-no-repeat z-0
      `}
            >
                <div className="flex flex-row justify-between items-center">
                    <img
                        src={communityIcon}
                        alt={tt("Cộng đồng")}
                        className="w-[64px] h-[42px]"
                    />
                    <h2 className={styles.heading2}>{tt("Cộng đồng")}</h2>
                </div>

                <p className={`${styles.paragraph} max-w-[470px] mt-10 relative`}>
                    Cộng đồng Bida trực tuyến hội tụ đủ các cơ thủ đam mê bộ môn Billiards
                    trên thế giới. Người dùng có thể thoải mái chia sẻ, học hỏi và giao
                    lưu với người dùng ở mọi nơi. Thậm chí người dùng hoàn toàn có thể
                    thành lập một CLB, tạo ra một cộng đồng nhỏ cho mình ngay trên ứng
                    dụng.
                </p>

                <div className="w-full max-w-[470px] flex flex-col  items-center relative ">
                    <a href="#downloadapp">
                        <img
                            src={downloadAppButton}
                            alt={tt("Tải ứng dụng")}
                            className="w-[181px] h-[65px] mt-6 cursor-pointer"
                        />
                    </a>
                </div>

                {/* <div className="flex flex-row flex-wrap sm:mt-10 mt-6">
          <img src={apple} alt="google_play" className="w-[128.86px] h-[42.05px] object-contain mr-5 cursor-pointer" />
          <img src={google} alt="google_play" className="w-[144.17px] h-[43.08px] object-contain cursor-pointer" />
        </div> */}
            </div>
            <div className={`${layout.sectionImg} `}>
                <div className={`w-full h-full ${styles.flexCenter}`}>
                    <img
                        src={community}
                        alt={tt("Cộng đồng")}
                        className=" w-full h-full sm:max-h-[476px] sm:max-w-[431px] relative z-[5]"
                    />
                </div>

                {/* gradient start */}
                {/* <div className="absolute z-[3] -left-1/2 top-0 w-[50%] h-[50%] rounded-full white__gradient" /> */}
                {/* <div className="absolute z-[0] w-[50%] h-[50%] -left-1/2 bottom-0 rounded-full pink__gradient" /> */}
                {/* gradient end */}
            </div>
        </section>
    );
}

export default Community;
