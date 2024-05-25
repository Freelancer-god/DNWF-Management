/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-console */
import React from 'react';
import {iconSearch} from '../assets';
// import { tt } from '../utils';
import {useTranslation} from "react-i18next";

function SearchInput() {
    const {t} = useTranslation();
    const tt = t

    return (
        <div className="w-full flex flex-col">
            <div className="w-full flex ">
                <input
                    type="text"
                    placeholder={tt('Tìm kiếm')}
                    className="w-full font-inter text-[16px] text-white border-0 bg-transparent focus:outline-none
        placeholder:text-[16px]
        caret-white placeholder-dimWhite"
                />
                <img src={iconSearch} alt={tt('Tìm kiếm')}
                     className="w-[20px] h-[21px] object-contain cursor-pointer" onClick={() => console.log()}/>
            </div>
            <div className="h-[1px] w-[100%] bg-gradient-to-r from-[#7B7FFF] via-[#907CFF] to-[#F676FE] mt-[3px]"/>

        </div>

    );
}

export default SearchInput;
