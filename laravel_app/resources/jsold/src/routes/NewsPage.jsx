/* eslint-disable max-len */
import React, {useState} from 'react';
import {loadState} from '@nextcloud/initial-state';
import styles from '../style';
import {Footer, Navbar} from '../components';

import ScrollToHashElement from '../components/ScrollToHashElements';
import HeroNews from '../components/HeroNews';
import HotNews from '../components/HotNews';
import LatestNews from '../components/LatestNews';
import Blogs from '../components/Blogs';
import DownloadAppV2 from '../components/DownloadAppV2';
import {APP_NAME, clog} from '../utils';

/**
 * Renders the entire application.
 *
 * @returns {JSX.Element} The rendered application.
 */
function NewsPage() {
	const headlineNews = JSON.parse(loadState(APP_NAME, 'headline_news'));
	clog("headlineNews", headlineNews)
	const hotNews = JSON.parse(loadState(APP_NAME, 'hot_news'));
	const latestNews = JSON.parse(loadState(APP_NAME, 'latest_news'));
	// const blogs = JSON.parse(loadState(APP_NAME, "blogs"));
	const blogs = [];
	clog("headlineNews", headlineNews)

	const [newsData, setNewsData] = useState(headlineNews);
	const [hotNewsData, setHotNewsData] = useState(hotNews);
	const [latestNewsData, setLatestNewsData] = useState(latestNews);
	//   const [blogsData, setBlogsData] = useState(blogs);

	return (
		// The top-level container for the application, sets the background color and overflow behavior.
		<div className="background-gradient w-full overflow-hidden">
			<ScrollToHashElement />
			{/* The container for the navbar, horizontally centered with padding on either side. */}
			<div className={`${styles.paddingX} ${styles.flexCenter} `}>
				<div className={`${styles.boxWidth}`}>
					<Navbar view="news" />
				</div>
			</div>

			{/* The container for the hero section, vertically aligned to the top of the page. */}
			<div className={`${styles.flexStart}`}>
				<div className={`${styles.boxWidth}`}>
					{newsData && <HeroNews data={newsData} />}
				</div>
			</div>

			{/* The container for the main content of the page, with padding on either side and vertically aligned to the top of the page. */}
			<div className={` ${styles.paddingX} ${styles.flexStart}`}>
				<div className={`${styles.boxWidth}`}>
					{/* <Search /> */}
					{hotNewsData.length > 0 && <HotNews data={hotNewsData} />}
					{latestNews.length > 0 && <LatestNews data={latestNewsData} />}
					<Blogs />
					<DownloadAppV2 />
					<Footer />
				</div>
			</div>
		</div>
	);
}

export default NewsPage;
