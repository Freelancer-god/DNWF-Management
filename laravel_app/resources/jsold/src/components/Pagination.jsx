import {iconBack1Step, iconBack2Step, iconNext1Step, iconNext2Step} from "../assets";
import React, {useEffect, useState} from "react";
import {LIMIT_ITEM_MENU} from "../constants";

const Pagination = ({total, limit = LIMIT_ITEM_MENU, page, onChange}) => {

    const [currentPage, setCurrentPage] = useState(page || 1)

    useEffect(() => {
        onChange(currentPage)
    }, [currentPage]);

    useEffect(() => {
        setCurrentPage(page)
    }, [page]);

    const handleNumberPage = (total, limit) => {
        const arrayRange = (start, stop, step) =>
            Array.from(
                {length: (stop - start) / step + 1},
                (value, index) => start + index * step
            );
        return arrayRange(1, Math.ceil(total / limit), 1)
    }

    const getMiddle = (arr, input) => {
        if (arr.length <= 3) {
            return arr
        }
        if (input < 0 || input > arr.length) {
            return [];
        }
        if (input <= 2) {
            const result = [];
            result.push(arr[0]);
            result.push(arr[1]);
            result.push(arr[2]);
            return result;
        }
        if ((input === arr.length) || (input === arr.length - 1)) {
            const result = [];
            result.push(arr[arr.length - 3]);
            result.push(arr[arr.length - 2]);
            result.push(arr[arr.length - 1]);
            return result;
        }
        const result = [];
        result.push(arr[input - 2]);
        result.push(arr[input - 1]);
        result.push(arr[input]);
        return result;
    }

    const handleOnClickPage = (page) => () => {
        setCurrentPage(page)
    }

    const handleBack1Step = () => {
        if (currentPage > 1) {
            setCurrentPage(prevState => prevState - 1)
        }
    }
    const handleBack2Step = () => {
        if (currentPage > 2) {
            setCurrentPage(prevState => prevState - 2)
            return
        }
        if (currentPage > 1) {
            setCurrentPage(1)
        }
    }

    const handleNext1Step = () => {
        if (currentPage < (handleNumberPage(total, limit).length)) {
            setCurrentPage(prevState => prevState + 1)
        }
    }
    const handleNext2Step = () => {
        if (currentPage < (handleNumberPage(total, limit).length) - 1) {
            setCurrentPage(prevState => prevState + 2)
            return
        }
        if (currentPage < (handleNumberPage(total, limit).length)) {
            setCurrentPage(handleNumberPage(total, limit).length)
        }
    }

    const styleItem = `max-[500px]:w-[35px] w-[40px] max-[500px]:h-[35px] h-[40px] flex flex-col items-center justify-center bg-[#F9A121] rounded-[8px]`

    return (
        <div className={'flex flex-col max-[500px]:items-center items-end w-full'}>
            <div className={'flex flex-row items-center gap-[10px]'}>
                <div onClick={handleBack2Step}
                     className={`${styleItem} cursor-pointer`}>
                    <img src={iconBack2Step} alt={'back2'}/>
                </div>
                <div onClick={handleBack1Step}
                     className={`${styleItem} cursor-pointer`}>
                    <img src={iconBack1Step} alt={'back1'}/>
                </div>

                {(getMiddle(handleNumberPage(total, limit), currentPage)).map((value, index, array) => {
                    return (
                        <div onClick={handleOnClickPage(value)}
                             className={`${styleItem}
							 ${currentPage === value ? 'opacity-50 cursor-default' : 'cursor-pointer'}`}
                             key={'value_Pagination' + value}>
                            <span className={'font-lato text-[#ffffff] sm:text-[20px] text-[18px]'}>{value}</span>
                        </div>
                    )
                })}

                <div onClick={handleNext1Step}
                     className={`${styleItem} cursor-pointer`}>
                    <img src={iconNext1Step} alt={'next1'}/>
                </div>
                <div onClick={handleNext2Step}
                     className={`${styleItem} cursor-pointer`}>
                    <img src={iconNext2Step} alt={'next2'}/>
                </div>
            </div>
        </div>
    )
}

export default Pagination
