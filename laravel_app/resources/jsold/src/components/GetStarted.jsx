import React from 'react';
import styles from '../style';

// import { tt } from '../utils';
import {useTranslation} from "react-i18next";

function GetStarted() {
    const {t} = useTranslation();
    const tt = t

    return (
        <div
            className={`${styles.flexCenter} w-[140px] h-[140px] rounded-full bg-purple-gradient p-[2px] cursor-pointer`}>
            <div className={`${styles.flexCenter} flex-col bg-primary w-[100%] h-[100%] rounded-full`}>
                <div className={`${styles.flexStart} flex-row`}>
                    <p className="font-inter font-medium text-[20px] leading-[23.4px]">
                        <span className="text-gradient">{tt('Tải')}</span>
                    </p>
                    {/* <img src={arrowUp} alt="arrow-up" className="w-[23px] h-[23px] object-contain" /> */}
                </div>

                <p className="font-inter font-medium text-[20px] leading-[23.4px]">
                    <span className="text-gradient">{tt('Ứng dụng')}</span>
                </p>
            </div>
        </div>
    );
}

export default GetStarted;
