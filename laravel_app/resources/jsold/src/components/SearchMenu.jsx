import {iconFilterMenu, iconSearchMenu, restaurantNameTag, restaurantNameTagUnselect} from "../assets";
import {APP_NAME, loadStateFromHiddenField} from "../utils";
// import { tt} from "../utils";
import Pagination from "./Pagination";
import {message, Popover, Spin} from "antd";
import React, {useEffect, useState} from "react";
import ItemMenu from "./ItemMenu";
import axios from "@nextcloud/axios";
import {LIMIT_ITEM_MENU} from "../constants";
import {throttleOnPressAction} from "../utils/throttle";
import {useSearchParams} from "react-router-dom";
import {useTranslation} from "react-i18next";

const SearchMenu = () => {
    const {t} = useTranslation();
    const tt = t
    const category = JSON.parse(loadStateFromHiddenField(APP_NAME, 'menu-category', '[]'))
    const chainStore = JSON.parse(loadStateFromHiddenField(APP_NAME, 'chain-store', '[]'))
    const [searchParams] = useSearchParams();
    const paramCategory = searchParams.get('category')

    const [selectedCategory, setSelectedCategory] = useState(paramCategory ? [{id: paramCategory}] : [])
    const [spinner, setSpinner] = useState(false)
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const [isFirstTimePage, setIsFirstTimePage] = useState(true)
    const [isFirstTimeCategory, setIsFirstTimeCategory] = useState(paramCategory ? false : true)
    const menuItems = JSON.parse(loadStateFromHiddenField(APP_NAME, 'menu-items', '[]'))
    const chain_id = (loadStateFromHiddenField(APP_NAME, 'chain-id', ''))

    const [menus, setMenus] = useState(menuItems.data)
    const [total, setTotal] = useState(menuItems.total)

    const handleOnPageChange = (page) => {
        setPage(page)
    }
    const handleOnChangeSearch = (e) => {
        let value = e.target.value
        setSearch(value)
    }

    const handleOnSelectCategory = (category) => () => {
        let selectedCategoryCopy = selectedCategory.slice()
        let index = selectedCategoryCopy.findIndex(obj => obj.id === category.id)
        if (index !== -1) {
            //unselect
            selectedCategoryCopy.splice(index, 1)
        } else {
            selectedCategoryCopy.push(category)
        }
        setSelectedCategory(selectedCategoryCopy)
    }

    const isSelect = (category) => {
        let index = selectedCategory.findIndex(obj => obj.id === category.id)
        return index !== -1
    }


    const getCategory = () => {
        let array = []
        for (let i of selectedCategory) {
            array.push(i.id)
        }
        return array.length > 0 ? array : []
    }

    const handleOnKeyDown = (event) => {
        if (event.key === 'Enter') {
            throttleOnPressAction(handleOnSubmitSearch)
        }
    }

    useEffect(() => {
        if (isFirstTimePage === false) {
            handleSearch()
        }
        setIsFirstTimePage(false)
    }, [page]);

    useEffect(() => {
        if (isFirstTimeCategory === false) {
            handleOnSubmitSearch()
        }
        setIsFirstTimeCategory(false)
    }, [selectedCategory]);

    const handleOnSubmitSearch = () => {
        if (page === 1) {
            handleSearch()
        } else {
            setPage(1)
        }
    }

    const handleSearch = async () => {
        setSpinner(true)
        let dataToSend = {
            search: search,
            filter: {
                menu_product_category_id: getCategory(),
                restaurant_type_id: chain_id
            },
            order_by: "title",
            sort: "asc",
            page: page,
            limit: LIMIT_ITEM_MENU,
            select: "*",
        }
        let data = await fetchSearchMenu(dataToSend)
        setSpinner(false)
        if (data) {
            setMenus(data.data)
            setTotal(data.total)
        }
    }

    const fetchSearchMenu = (dataToSend) => {
        return axios
            .post(`${window.location.protocol}//${window.location.hostname}/api/v1/menu_product/searchApp`, {data: dataToSend})
            .then((res) => res.data)
            .then((data) => {
                if (data.success === false) {
                    message.error(data.error);
                    return null;
                }
                return data.data;
            })
            .catch((error) => {
                message.error(tt('Không thể thực hiện ngay lúc này, vui lòng thử lại sau'));
                return null;
            });
    };

    const handleStyleGrid = () => {
        if (menus.length >= 4) {
            return `grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 original:grid-cols-4 gap-4`
        } else if (menus.length >= 3) {
            return `grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4`
        } else if (menus.length >= 2) {
            return `grid grid-cols-1 sm:grid-cols-2 gap-4`
        } else {
            return `grid grid-cols-1 gap-4`
        }
    }

    return (
        <div className={"mb-[50px] flex flex-col"}>
            <div className={'flex flex-col items-center mx-6'}>
                <div className={'search-menu-box flex flex-row items-center w-full max-w-[762px] z-50'}>
                    <input className={'input-search-menu w-full'}
                           onChange={handleOnChangeSearch}
                           value={search}
                           onKeyDown={handleOnKeyDown}
                           placeholder={tt('Tìm món...')}/>
                    <div onClick={handleOnSubmitSearch}>
                        <img src={iconSearchMenu} alt={'search'} className={'w-[33px] h-[33px]'}/>
                    </div>
                    <Popover
                        className={'ml-[25px] '}
                        content={
                            <div className={'min-w-[150px] max-w-[300px] p-[8px] pt-0'}>
                                <div className={'w-full flex flex-col '}>
                                    <span className={'font-lato text-[18px] text-center'}>{tt('Bộ lọc')}</span>
                                    <div
                                        className={'mt-[15px] flex flex-col justify-start max-h-[300px] overflow-scroll hide-scrollbar'}>
                                        {category?.map((value, index, array) => {
                                            return (
                                                <div onClick={handleOnSelectCategory(value)} key={index + 'category'}
                                                     className={'mt-[3px] mb-[3px] cursor-pointer'}>
                                                    <div className={'flex flex-col'}>
                                                        <div className={'flex flex-row items-center'}>
                                                            <div
                                                                className={`font-lato text-[16px] flex-1 ${isSelect(value) ? 'text-[#EF9D37]' : ''}`}>{value.title}</div>
                                                            <div
                                                                className={`${isSelect(value) ? 'dot-select-menu ' : 'dot-unselect-menu'}`}/>
                                                        </div>
                                                        <div className={'mt-[5px] line-item-menu'}/>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        }
                        title={null}
                        trigger="click"
                        arrow={false}
                        placement={'bottom'}
                    >
                        <div>
                            <img src={iconFilterMenu} alt={'search'} className={'w-[28px] h-[28px]'}/>
                        </div>
                    </Popover>
                </div>
            </div>

            <div className={'hidden sm:flex flex-col items-start self-start z-50 '}>
                <div className={'mr-[-4rem]'}>
                    {chainStore?.map((value, index, array) => {
                        return (
                            <div key={index + 'chainStore'}
                                 className={`relative mt-[1px] mb-[1px] ${chain_id === value.id ? 'pointer-events-none' : 'cursor-pointer'}`}>
                                <a href={`/${value.id}/menu`}>
                                    <img src={chain_id === value.id
                                        ? restaurantNameTag
                                        : restaurantNameTagUnselect}
                                         alt={'name tag'} className={'w-[100px]'}/>
                                    <div
                                        className={'absolute top-0 w-full max-w-[90px] h-full flex flex-col items-center justify-center'}>
                                        <div
                                            className={`nametag-restaurant !text-[12px] ${chain_id === value.id ? '' : 'opacity-[70%]'}`}>{value.name}</div>
                                    </div>
                                </a>
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className={'mt-[30px] mb-[30px]'}>
                <Spin spinning={spinner}>
                    <div className={`${handleStyleGrid()}`}>
                        {menus?.map((value, index, array) => {
                            return (
                                <ItemMenu key={value.id} item={value} index={index}/>
                            )
                        })}
                    </div>
                    {menus?.length === 0 &&
                        <div className={'flex flex-col h-[318px] items-center justify-center'}>
                            <div
                                className={'font-lato text-[20px] text-center'}>{tt('Rất tiếc, không tìm thấy món bạn yêu cầu.')}</div>
                        </div>
                    }
                </Spin>
            </div>

            {menus?.length > 0 &&
                <Pagination page={page} total={total} onChange={handleOnPageChange}/>
            }

        </div>
    )
}

export default SearchMenu
