/* eslint-disable react/no-array-index-key */
import React, {useEffect} from "react";
import styles from "../style";
import {displayFullDate, removeAnchorTags} from "../utils";
import {beanGreen} from "../assets";

function BlogDetails({ blogDetail }) {
	// TODO : lấy data từ location nếu không có lấy từ initial state

	useEffect(() => {
		window.scrollTo({ top: 0, left: 0, behavior: "instant" })
		window.blogDetail = blogDetail;
		document.title = blogDetail.title
	}, []);
	useEffect(() => {
		document.title = blogDetail.title
	}, [blogDetail])
	return (
		<section
			className={`${styles.flexCenter} flex-col xxs:[70px] xs:my-[90px]  w-full  `}
		>
			<div
				style={{ "--community-image-url": `url(${beanGreen})` }}
				className="w-full flex flex-col
							relative
							before:content-[''] before:absolute before:top-[-70px] before:right-[0px]  before:w-[240px] before:h-[220px]
							before:bg-[image:var(--community-image-url)] before:bg-cover before:bg-no-repeat z-0"
			>
				<div className="w-full relative flex flex-row">
					<div className="w-full flex flex-col">
						<h2 className={`${styles.heading3}`}>
							{blogDetail && blogDetail.title}
						</h2>
						<span className="font-inter font-light text-[14px] mt-3 text-white  capitalize">
							{displayFullDate(blogDetail && blogDetail.created_date)}
						</span>
					</div>
				</div>
				<div className="mt-11">
					{blogDetail.cover && <img
						src={blogDetail && blogDetail.cover.path}
						alt={blogDetail && blogDetail.title}
						className="w-full sm:w-[50%] sm:float-right  sm:pl-16 relative"
					/>
					}
					<div id="blog-post-content"
						className="font-inter text-[16px] font-normal xxs:leading-[30px] xs:leading-[38px] text-white"
						dangerouslySetInnerHTML={{
							// __html: blogDetail && blogDetail.content,
							__html: blogDetail && removeAnchorTags(blogDetail.content),
						}}
					/>
				</div>
			</div>
		</section>
	);
}

export default BlogDetails;
