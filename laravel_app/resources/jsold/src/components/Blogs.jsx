/* eslint-disable camelcase */
/* eslint-disable max-len */
import React, {useEffect, useState} from 'react';

import {Link} from 'react-router-dom';
import {Skeleton} from 'antd';
import axios from 'axios';
import {generateUrl} from '../../../utils/function';
import {showError} from '../../dialogs';
import {arrowRightDisabled, arrowRightV2, beanDouble, blogsHeading} from '../assets';
import styles, {layout} from '../style';
import {clog, lastUpdated, removeHtmlTags,} from '../utils';
// import { tt} from '../utils';
import {LIMIT} from '../constants';
import {useTranslation} from "react-i18next";

function Paging({activePage, dataTotal, handleChangePage}) {
    clog("activePage,dataTotal", activePage, dataTotal)
    const renderPageNumber = () => {

        const components = []
        let count = 0
        for (let i = activePage - 2; i < dataTotal; i++) {

            if (count < 3) {
                count++
                if (i + 1 !== 0) {
                    components.push(
                        <div
                            className={`bg-[#262629] ${activePage === i + 1
                                ? 'text-[#464646] cursor-not-allowed'
                                : 'text-[#ffffff] cursor-pointer'
                            } max-w-[70px] max-h-[70px] font-inter font-medium text-[14px] leading-[18px]  py-3 px-5 rounded-[8px] ml-[10px]`}
                            onClick={activePage === i + 1 ? () => {
                            } : handleChangePage(i + 1)}
                        >
                            {i + 1}
                        </div>
                    )
                }

            } else {
                break
            }

        }

        return components

    }
    return <>
        <div
            className={`bg-[#262629] max-w-[70px] max-h-[70px] ${activePage !== 1 ? 'cursor-pointer' : 'cursor-not-allowed'}  font-inter font-medium text-[14px] leading-[18px]  py-3 px-5 rounded-[8px] ml-[10px]`}
            onClick={activePage !== 1 ? handleChangePage(1) : () => {
            }}
        >
            {activePage !== 1 ? <img src={arrowRightV2} width={`12px`} className='scale-x-[-1]'/> :
                <img src={arrowRightDisabled} width={`12px`} className='scale-x-[-1]'/>}
            {/* <i className="fa fa-solid fa-chevron-left" /> */}
            {/* <i class=" fa-solid fa-arrow-right-to-line"></i> */}
        </div>

        {renderPageNumber()}

        <div
            className={`bg-[#262629] max-w-[70px] max-h-[70px] ${activePage !== dataTotal ? 'text-[#ffffff] cursor-pointer' : 'text-[#464646] cursor-not-allowed'}  font-inter font-medium text-[14px] leading-[18px]  py-3 px-5 rounded-[8px] ml-[10px] cursor-pointer`}
            onClick={activePage !== dataTotal ? handleChangePage(dataTotal) : () => {
            }}
        >
            {/* <i className="fa fa-solid fa-chevron-right" /> */}
            {activePage !== dataTotal ? <img src={arrowRightV2} width={`12px`}/> :
                <img src={arrowRightDisabled} width={`12px`}/>}
            {/* <i class=" fa-solid fa-arrow-right-to-line"></i> */}
        </div>

    </>
}

function Blogs() {
    //   const { data, total } = props;
    const {t} = useTranslation();
    const tt = t
    const [activePage, setActivePage] = useState(1);
    const [loadingBlogs, setLoadingBlogs] = useState(false);
    const [dataBlog, setDataBlog] = useState([]);
    const [dataTotal, setDataTotal] = useState(0);

    //   const totalPage = Math.ceil(total / LIMIT);


    const fetchListBlog = (page = 1) => {
        axios
            .post(generateUrl('/apps/blogs/api/v1/blog/searchApp'), {
                data: {
                    term: '',
                    select: [
                        'id',
                        'title',
                        'content',
                        'cover',
                        'slug',
                        'created_at',
                        'updated_at',
                        'is_content',
                        'display_areas',
                    ],
                    filter: {
                        category_id: 'all',
                        status: 1,
                        is_content: 1,
                    },
                    page,
                    limit: LIMIT,
                    order: 'created_at',
                    sort: 'desc',
                },
            })
            .then((res) => res.data)
            .then((data) => {
                if (data.success === false) {
                    setLoadingBlogs(false);
                    showError(data.error);
                }
                setLoadingBlogs(false);
                setDataBlog(data.data.data);
                setDataTotal(Math.ceil(data.data.total / LIMIT));
            })
            .catch((error) => {
                setLoadingBlogs(false);
                showError(tt('Không thể thực hiện ngay lúc này, vui lòng thử lại sau'));
            });
    };

    const handleChangePage = (page) => () => {
        clog("handleChangePage", page)
        setActivePage(page);
        setLoadingBlogs(true);
        fetchListBlog(page);
    };

    useEffect(() => {
        fetchListBlog();
    }, []);

    return (
        <section id="blogs" className={`${layout.section} md:flex-col`}>
            <div
                style={{'--community-image-url': `url(${beanDouble})`}}
                className={`${layout.sectionInfo}  relative
         before:content-[''] before:absolute before:top-[0px] before:left-[20px]  before:w-[300px] before:h-[221px]
         before:bg-[image:var(--community-image-url)] before:bg-cover before:bg-no-repeat
      `}
            >
                <div className="flex flex-row justify-between items-center z-10">
                    <img
                        src={blogsHeading}
                        alt={tt('Bài viết')}
                        className="w-[40px] h-[40px]"
                    />
                    <h2 className={styles.heading3}>{tt('Bài viết')}</h2>
                </div>
            </div>
            <div
                className=" sm:mt-[53px] mt-[10px] z-10
          ss:grid ss:grid-cols-2 md:grid-cols-3 grid-rows-3 sm:grid-rows-2 p-0 md:p-14 gap-4
       "
            >
                {dataBlog.map(
                    ({
                         id, content, created_at, title, cover, slug,
                     }, index) => index < 6 && (
                        <Link
                            className="flex flex-col bg-[#262629] rounded-[8px] mb-5 ss:mb-0 relative"
                            to={`/news/${slug}`}
                            state={{
                                data: {
                                    id,
                                    content,
                                    created_at,
                                    title,
                                    cover,
                                    crumbName: title,
                                },
                            }}
                            key={id}
                            title={title}
                        >
                            <img
                                src={cover.path}
                                alt={title}
                                className="w-[100%] aspect-16/9 object-cover rounded-t-[8px]"
                            />
                            <h4 className="font-inter font-medium text:[20px] leading-[22px] text-white line-clamp-2 mt-2 px-2">
                                {title}
                            </h4>
                            <span className="font-inter font-normal text-[16px] leading-[24px] text-[#959595] px-2">
								{lastUpdated(created_at)}
							</span>
                            <p className="font-inter font-normal text-[16px] leading-[24px] text-dimWhite line-clamp-2 mt-3 px-2 mb-5">
                                {removeHtmlTags(content)}
                            </p>
                            {loadingBlogs && (
                                <div
                                    className="bg-dimWhiteTransparent rounded-[8px] w-full h-full absolute top-0 left-0">
                                    <Skeleton
                                        active
                                        paragraph={{rows: 10}}
                                        className="m-[15px]"
                                    />
                                </div>
                            )}
                        </Link>
                    ),
                )}
            </div>
            <div className="flex flex-row  justify-end px-0 md:px-14 mt-5 md:mt-0 z-10">
                <Paging activePage={activePage} dataTotal={dataTotal} handleChangePage={handleChangePage}/>
            </div>
        </section>
    );
}

export default Blogs;
