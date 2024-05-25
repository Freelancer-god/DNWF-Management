/* eslint-disable react/no-unescaped-entities */
/* eslint-disable max-len */
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import React, {useRef} from "react";
import {useMediaQuery} from "react-responsive";
import {useNavigate} from "react-router-dom";
import ItemMenu from "./ItemMenu";

const news = [
	{
		id: '1',
	},
	{
		id: '2',
	},
	{
		id: '3',
	},
	{
		id: '3',
	},
	{
		id: '3',
	},
]

function MenuCarouselOnly() {
	const navigate = useNavigate();

	const $owl = useRef(null);

	const isMD = useMediaQuery({
		query: "(min-width: 1080px)",
	});
	const isMobile = useMediaQuery({
		query: "(max-width: 768px)",
	});


	return (
		<div className={"mt-[50px] mb-[50px]"}>
			<OwlCarousel
				className="owl-theme mt-[50px]"
				loop
				margin={isMD ? -30 : -20}
				responsive={{0: {items: 1}, 768: {items: 2}, 1080: {items: 3}, 1340: {items: 4}}}
				autoplay={false}
				autoplayTimeout={5000}
				autoplayHoverPause
				nav
				navText={[
					'<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAoCAYAAADzL6qcAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADUSURBVHgB7ZVRDcJAEEQnKEDCSUACEpCABBwUB9RBcYKESkBCcXDsJluYHPDR2U/6kv3c18t0rgUS1Fq3yGKSYjPa7JAhJM5dPpktdvVNDwVbPJJEO03kMpGkYCn+5FieOUDBFgeSnKHQhHuDgvekCbdgKREu51KgQKVzTlBYS/dTNKyl+2BjU2KcR4yGtzadD8muJOug8qVDe6g0rZ7U4GcZ37OxZn6CttyT7IIM/vZIpn2LQsRF9bz0X7O/uebqpPJay7pM9m9lRQYqq34ikr2uzRM72WNSIFpurAAAAABJRU5ErkJggg==" alt="back" />',
					'<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAoCAYAAADzL6qcAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADYSURBVHgB7ZJRDcJADIb/oAAJJ2ESJgEH4IA5YA6GAyQgAQkn4XBwODja0IRyhJC1e1ruS5rtpV967Q8IpZQtvJAkUEX+wgpPQpXKixs8kOBc3kywIlNFJdvDiuwpiyh797VTUyXXJal5VLILPPD1lGyAlSoSTA8r1NxV+wqwws9SshbW/7IW1nmyr7BuYONBdZf/QGVbPE1wVRONsECNJ/flFsmSpDu5012d/AAL1DgtsdyjkkRYkL18BA9zqZbLdLDQQvdTlFYUOhFlV+iUaHCFrpL1cPAElNpdJJqiiPEAAAAASUVORK5CYII=" alt="next" />',
				]}
				dots={isMobile}
				ref={$owl}
			>
				{news.map((item, index) => (
					<ItemMenu item={item} index={index}/>
				))}
			</OwlCarousel>
		</div>
	);
}

export default MenuCarouselOnly;
