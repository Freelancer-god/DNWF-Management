/* eslint-disable max-len */
import React, {useEffect} from "react";
import styles from "../style";
import {Footer, Navbar,} from "../components";
import ScrollToHashElement from "../components/ScrollToHashElements";
import ImageHeader from "../components/ImageHeader";
import AboutTVP from "../components/AboutTVP";
import DownloadApplication from "../components/DownloadApplication";
import {bgHeaderAboutUs} from "../assets";
import Breadcrumbs from "../components/Breadcrumbs";
import MissionAndVision from "../components/MissionAndVision";
import Leadership from "../components/Leadership";
// import {tt} from "../utils";
import {useTranslation} from "react-i18next";

/**
 * Renders the entire application.
 *
 * @returns {JSX.Element} The rendered application.
 */
function AboutTVPPage() {
	const {t} = useTranslation();
	const tt = t
	useEffect(() => {
		document.title = tt('Về chúng tôi')
	}, []);

	return (
		// The top-level container for the application, sets the background color and overflow behavior.
		<div className=" w-full overflow-hidden">
			<ScrollToHashElement/>
			{/* The container for the navbar, horizontally centered with padding on either side. */}
			<div className={`${styles.flexCenter}`}>
				<div className={`absolute top-0 w-full`}>
					<Navbar view="about-us"/>
				</div>
				<ImageHeader img={bgHeaderAboutUs}/>
			</div>


			{/* The container for the slogan section, vertically aligned to the top of the page. */}
			<div className={`${styles.paddingX} ${styles.flexStart}`}>
				<div className={`${styles.boxWidth}`}>
					<Breadcrumbs />
				</div>
			</div>


			{/* The container for the aboutTVP section, vertically aligned to the top of the page. */}
			<div className={`${styles.paddingX} ${styles.flexStart}`}>
				<div className={`${styles.boxWidth}`}>
					<AboutTVP isDetail={true}/>
				</div>
			</div>

			{/* The container for the downloadApplication section, vertically aligned to the top of the page. */}
			<div className={`${styles.flexStart}`}>
				<div className={`w-full`}>
					<DownloadApplication/>
				</div>
			</div>

			{/* The container for the achievement section, vertically aligned to the top of the page. */}
			<div className={`${styles.paddingX} ${styles.flexStart}`}>
				<div className={`${styles.boxWidth}`}>
					<MissionAndVision/>
				</div>
			</div>

			{/* The container for the Leadership section, vertically aligned to the top of the page. */}
			<div className={`${styles.paddingX} ${styles.flexStart} mb-[50px]`}>
				<div className={`${styles.boxWidth}`}>
					<Leadership/>
				</div>
			</div>

			{/* The container for the downloadApplication section, vertically aligned to the top of the page. */}
			<div className={`${styles.flexStart}`}>
				<div className={`w-full`}>
					<Footer/>
				</div>
			</div>
		</div>
	);
}

export default AboutTVPPage;
