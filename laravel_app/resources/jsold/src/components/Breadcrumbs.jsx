/* eslint-disable react/no-array-index-key */
import React, {useCallback, useState} from "react";

import {useLocation} from "react-router-dom";
import styles from "../style";
import {APP_NAME, clog, loadStateFromHiddenField} from "../utils";
// import {tt} from "../utils";
import {useTranslation} from "react-i18next";


function MyBreadcrumbs(props) {
    const {t} = useTranslation();
    const tt = t

    const crumbMap = {
        news: tt("Tin tức"),
        contact: tt("Liên hệ"),
    };

    const {dataDetail} = props;

    const mapR = () => {
        const r = {}
        for (let i of chainStore) {
            r[i.id] = i.name
        }
        return r
    }

    const chainStore = JSON.parse(loadStateFromHiddenField(APP_NAME, 'chain-store', '[]'));
    const [routes, setRoutes] = useState({
        'about-us': tt('Về chúng tôi'),
        'contact': tt('Liên hệ'),
        'menu': tt('Menu'),
        ...mapR()
    })

    const checkIsChainStore = (path) => {
        let index = chainStore.findIndex(obj => obj.id === path.replace('/', ''))
        return index !== -1
    }

    const remapNameRoute = useCallback((key) => {
        return routes[key] || key
    }, [routes])

    const location = useLocation();
    const {pathname, state} = location;

    const parts = pathname.split("/").filter((part) => part);

    let path = "";
    let pathStore = "";

    const crumbs = parts.map((part, index) => {
        // if last part
        let pathName = "";
        if (index === parts.length - 1) {
            //  lấy pathName theo thứ tự: từ data truyền qua (ưu tiên) và từ inistate nếu không có
            if (dataDetail && dataDetail.title) {
                pathName = dataDetail.title;
            } else {
                // TODO: lấy pathName từ inistate nếu không có
                pathName = part;
            }
        } else {
            pathName += `${crumbMap[part] || part}`;
        }


        path += `/${part}`;
        if (checkIsChainStore(path) === true) {
            pathStore += `/restaurant/${part}`;
            return {path: pathStore, pathName};
        }

        return {path, pathName};
    });

    //Add home route
    crumbs.unshift({
        path: '/', pathName: tt('Trang chủ')
    })

    clog(crumbs)


    return (
        <ol className="flex flex-row items-center overflow-hidden">
            {crumbs.map((crumb, crumbIndex) => (
                <>
                    {/* nếu là last crumb thì style khác */}
                    {crumbIndex === crumbs.length - 1 ? (
                        <li
                            key={crumbIndex + 'crumbIndex' + crumbIndex}
                            className="w-full font-lato font-medium text-[18px] leading-[30px] text-[#00000074]"
                        >
							<span key={crumb.path} className="line-clamp-1">
								{remapNameRoute(crumb.pathName)}
							</span>
                        </li>
                    ) : (
                        <li
                            key={crumbIndex + 'crumbIndex_' + crumbIndex}
                            className="font-lato font-normal text-[18px] leading-[30px] text-[#000000]"
                        >
                            <a
                                href={crumb.path}
                                className="whitespace-nowrap "
                            >
                                {remapNameRoute(crumb.pathName)}
                            </a>
                        </li>
                    )}

                    {crumbIndex !== crumbs.length - 1 && (
                        // <img
                        // 	key={`${crumbIndex}arrow`}
                        // 	className="mx-4"
                        // 	src={arrowRight}
                        // 	alt={tt("Mũi tên phải")}
                        // />
                        <div className={'mx-2'}  key={crumbIndex + 'crumbIndex>' + crumbIndex}>
							<span
                                className="font-lato font-normal text-[18px] leading-[30px] text-[#000000]">{'>'}</span>
                        </div>
                    )}
                </>
            ))}
        </ol>
    );
}

function Breadcrumbs({dataDetail}) {
    return (
        <section className={`${styles.flexCenter} flex-col mt-[22px] mb-[50px]  w-full  `}>
            <div
                className="w-full relative before:content-[''] before:absolute before:top-[-165px] before:left-[-20px]  before:w-[400px] before:h-[349px] z-0">
                <div className="w-full relative">
                    <MyBreadcrumbs dataDetail={dataDetail}/>
                </div>
            </div>
        </section>
    );
}

export default Breadcrumbs;
