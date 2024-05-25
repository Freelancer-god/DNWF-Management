/* eslint-disable max-len */
import React, {useEffect} from "react";
import styles from "../style";
import {Footer, Navbar,} from "../components";
import ScrollToHashElement from "../components/ScrollToHashElements";
import ImageHeader from "../components/ImageHeader";
import Slogan from "../components/Slogan";
import AboutTVP from "../components/AboutTVP";
import CoreValues from "../components/CoreValues";
import AchievementAndTarget from "../components/AchievementAndTarget";
import DownloadApplication from "../components/DownloadApplication";
import RestaurantChain from "../components/RestaurantChain";
import Feedback from "../components/Feedback";
import NewsHomeCarousel from "../components/NewsHomeCarousel";
import DevelopmentProcess from "../components/DevelopmentProcess";
// import {tt} from "../utils";
import {useTranslation} from "react-i18next";

/**
 * Renders the entire application.
 *
 * @returns {JSX.Element} The rendered application.
 */
function App() {
    const { t } = useTranslation();
    const tt = t
	useEffect(() => {
		document.title = tt('TVP')
	}, []);

	return (
		// The top-level container for the application, sets the background color and overflow behavior.
		<div className=" w-full overflow-hidden">
			<ScrollToHashElement/>
			{/* The container for the navbar, horizontally centered with padding on either side. */}
			<div className={`${styles.flexCenter}`}>
				<div className={`absolute top-0 w-full`}>
					<Navbar view="home"/>
				</div>
				<ImageHeader/>
			</div>


			{/* The container for the slogan section, vertically aligned to the top of the page. */}
			<div className={`${styles.paddingX} ${styles.flexStart}`}>
				<div className={`${styles.boxWidth}`}>
					<Slogan/>
				</div>
			</div>

			{/* The container for the aboutTVP section, vertically aligned to the top of the page. */}
			<div className={`${styles.paddingX} ${styles.flexStart}`}>
				<div className={`${styles.boxWidth}`}>
					<AboutTVP/>
				</div>
			</div>

			{/* The container for the coreValues section, vertically aligned to the top of the page. */}
			<div className={`${styles.paddingX} ${styles.flexStart}`}>
				<div className={`${styles.boxWidth}`}>
					<CoreValues/>
				</div>
			</div>

			{/* The container for the achievement section, vertically aligned to the top of the page. */}
			<div className={`${styles.paddingX} ${styles.flexStart}`}>
				<div className={`${styles.boxWidth}`}>
					<AchievementAndTarget/>
				</div>
			</div>
			{/* The container for the downloadApplication section, vertically aligned to the top of the page. */}
			<div className={`${styles.flexStart}`}>
				<div className={`w-full`}>
					<DownloadApplication/>
				</div>
			</div>

			{/* The container for the RestaurantChain section, vertically aligned to the top of the page. */}
			<div className={`${styles.paddingX} ${styles.flexStart}`}>
				<div className={`${styles.boxWidth}`}>
					<RestaurantChain/>
				</div>
			</div>

			{/* The container for the Feedback section, vertically aligned to the top of the page. */}
			<div className={`${styles.paddingX} ${styles.flexStart}`}>
				<div className={`${styles.boxWidth}`}>
					<Feedback/>
				</div>
			</div>

			{/* The container for the NewsHomeCarousel section, vertically aligned to the top of the page. */}
			<div className={`${styles.paddingX} ${styles.flexStart}`}>
				<div className={`${styles.boxWidth}`}>
					<NewsHomeCarousel/>
				</div>
			</div>

			{/* The container for the DevelopmentProcess section, vertically aligned to the top of the page. */}
			<div className={`${styles.paddingX} ${styles.flexStart} mb-[50px]`}>
				<div className={`${styles.boxWidth}`}>
					<DevelopmentProcess/>
				</div>
			</div>

			{/*/!* The container for the hero section, vertically aligned to the top of the page. *!/*/}
			{/*<div className={`background-gradient ${styles.flexStart}`}>*/}
			{/*	<div className={`${styles.boxWidth}`}>*/}
			{/*		<Hero/>*/}
			{/*	</div>*/}
			{/*</div>*/}

			{/*/!* The container for the main content of the page, with padding on either side and vertically aligned to the top of the page. *!/*/}
			{/*<div className={` ${styles.paddingX} ${styles.flexStart}`}>*/}
			{/*	<div className={`${styles.boxWidth}`}>*/}
			{/*		<Stats/>*/}
			{/*		<Arena/>*/}
			{/*		<Community/>*/}
			{/*		/!* <CardDeal /> *!/*/}
			{/*		<Testimonials/>*/}
			{/*		<DownloadApp/>*/}
			{/*		<News/>*/}
			{/*		/!* <Clients /> *!/*/}
			{/*		/!* <CTA /> *!/*/}
			{/*		<Footer/>*/}
			{/*	</div>*/}
			{/*</div>*/}

			{/* The container for the downloadApplication section, vertically aligned to the top of the page. */}
			<div className={`${styles.flexStart}`}>
				<div className={`w-full`}>
					<Footer/>
				</div>
			</div>
		</div>
	);
}

export default App;
