/* eslint-disable react/no-unescaped-entities */
/* eslint-disable max-len */
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import React, { useRef } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";

function NewsCarousel({ news }) {
	const navigate = useNavigate();

	const $owl = useRef(null);

	const isMD = useMediaQuery({
		query: "(min-width: 1080px)",
	});
	const isMobile = useMediaQuery({
		query: "(max-width: 768px)",
	});

	//   useEffect(() => {
	//     setOwl(window.$('.owl-carousel'));
	//   }, []);

	//   useEffect(() => {
	//     if (owl) {
	//       console.log(owl.children().length);
	//       owl.children().each(handleDataPosition);

	//       window.$(document).on('click', '.owl-item>div', handleItemClick);
	//     }
	//   }, [owl]);

	return (
		<OwlCarousel
			className="owl-theme"
			loop
			margin={isMD ? -30 : -20}
			responsive={{ 0: { items: 1 }, 768: { items: 2 }, 1080: { items: 3 } }}
			autoplay
			autoplayTimeout={5000}
			autoplayHoverPause
			center
			nav
			navText={[
				'<i class="fa fa-angle-left" aria-hidden="true"></i>',
				'<i class="fa fa-angle-right" aria-hidden="true"></i>',
			]}
			dots={isMobile}
			ref={$owl}
		//   onClick={(e) => {
		//     if (e.target.dataset.position !== undefined) {
		//       $owl.current.to(+e.target.dataset.position, 300);
		//       console.log(e.target.dataset.position);
		//     }
		//   }}
		>
			{news.map((item, index) => (
				<div
					className="item"
					key={item.id}
					onClick={() => {
						navigate(`/news/${item.slug}`, {
							state: { data: item },
						});
					}}
				>
					<div className="relative h-full flex justify-center items-center">
						<img
							src={item.cover.path}
							alt={item.title}
							data-position={index}
							className="aspect-16/9 object-cover rounded-[8px]"
						/>
						<div className=" bg-dimWhiteTransparent rounded-[8px] m-0  absolute bottom-0  w-full">
							<div className="w-full p-2">
								<span className="font-inter text-center text-[#111111]  font-medium text-[14px] leading-[20px] ss:text-[18px] ss:leading-[23.4px] line-clamp-3">
									{item.title}
								</span>
							</div>

						</div>
					</div>
				</div>
			))}
		</OwlCarousel>
	);
}

export default NewsCarousel;
