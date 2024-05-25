import React from 'react';
// import {tt} from '../utils';
import {rating} from '../assets';
import styles from '../style';
import {useTranslation} from "react-i18next";

function Card({feedback}) {
    const {t} = useTranslation();
    const tt = t
    const {
        content, name, id, img
    } = feedback;

    return (
        <div className="flex flex-1 flex-col mt-[25px] sm:mt-0" key={id}>
            <div className="flex flex-row items-center">
                <img src={img} alt={tt('Ảnh đại diện')} className="w-[78px] h-[78px] rounded-full"/>
                <span className="font-inter text-white font-medium text-[18px] leading-[23.4px] pl-[13px]">
          {name}
        </span>
                <img src={rating} alt={tt('Đánh giá')} className="ml-[13px]"/>
            </div>
            <p className={`${styles.paragraph1} mt-2`}>
                {content}
            </p>
        </div>
    );
}

export default Card;
