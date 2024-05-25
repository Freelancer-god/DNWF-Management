/* eslint-disable max-len */
import React from "react";
import {arenaBg, arenaIcon, downloadAppButton, PhoneGame,} from "../assets";
import styles, {layout} from "../style";
// import {tt} from "../utils";
import {useTranslation} from "react-i18next";

function Arena() {
    const {t} = useTranslation();
    const tt = t

    return (
        <section id="arena" className={layout.sectionReverse}>
            <div className={layout.sectionImgReverse}>
                <div className={`w-full h-full ${styles.flexCenter}`}>
                    <img
                        src={PhoneGame}
                        alt={tt("Đấu trường")}
                        className=" w-full h-full sm:max-h-[659px] sm:max-w-[538px] relative z-[5]"
                    />
                </div>

                {/* gradient start */}
                <div className="absolute z-[3] -left-1/2 top-0 w-[50%] h-[50%] rounded-full white__gradient"/>
                <div className="absolute z-[0] w-[50%] h-[50%] -left-1/2 bottom-0 rounded-full pink__gradient"/>
                {/* gradient end */}
            </div>

            <div
                style={{"--arena-image-url": `url(${arenaBg})`}}
                className={`${layout.sectionInfo} relative
         before:content-[''] before:absolute before:top-[-160px] before:right-[70px]  before:w-[218px] before:h-[185px]
         before:bg-[image:var(--arena-image-url)] before:bg-cover before:bg-no-repeat
      `}
            >
                <div className="flex flex-row justify-between items-center">
                    <img
                        src={arenaIcon}
                        alt={tt("Đấu trường")}
                        className="w-[99.57px] h-[42px]"
                    />
                    <h2 className={styles.heading2}>{tt("Đấu trường")}</h2>
                </div>

                <p className={`${styles.paragraph} max-w-[470px] mt-10`}>
                    Cơ hội được nhận nhiều phần quà giá trị và hấp dẫn. Người chơi có thể
                    giao lưu, kết bạn và đấu hạng với người chơi khác, từ đó nâng cao
                    trình độ Bida của bản thân. Phần quà sẽ được tài trợ từ ứng dụng Dabi
                    và các câu lạc bộ nhằm mục đích khích lệ, tạo sân chơi lành mạnh, sôi
                    động cho các cơ thủ.
                </p>

                <div className="w-full max-w-[470px] flex flex-col  items-center ">
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
        </section>
    );
}

export default Arena;
