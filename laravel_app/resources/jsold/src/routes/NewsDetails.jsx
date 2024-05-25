/* eslint-disable max-len */
import React from 'react';

import { useLocation } from 'react-router-dom';
import { loadState } from '@nextcloud/initial-state';
import styles from '../style';
import { Navbar, Footer } from '../components';

import ScrollToHashElement from '../components/ScrollToHashElements';

import DownloadAppV2 from '../components/DownloadAppV2';
import Breadcrumbs from '../components/Breadcrumbs';
import BlogDetails from '../components/BlogDetails';
import SeparateSection from '../components/SeparateSection';
import News from '../components/News';
import { APP_NAME, clog } from '../utils';

/**
 * Renders the entire application.
 *
 * @returns {JSX.Element} The rendered application.
 */
function NewsDetails() {
	const { state } = useLocation();
	clog('state', state);
	let blogDetail = null;
	try {
		blogDetail = state !== null
			? state.data
			: JSON.parse(loadState(APP_NAME, 'blog_detail'));
	} catch (error) {
		blogDetail = window.blogDetail;
	}

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

			{/* The container for the hero section, vertically aligned to the top of the page.
      <div className={`${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          <HeroNews />
        </div>
      </div> */}

			{/* The container for the main content of the page, with padding on either side and vertically aligned to the top of the page. */}
			<div className={` ${styles.paddingX} ${styles.flexStart}`}>
				<div className={`${styles.boxWidth}`}>
					<Breadcrumbs blogDetail={blogDetail} />
					<BlogDetails blogDetail={blogDetail} />
					<SeparateSection />
					<News version="v2" />
					{/* <SeparateSection border={0} /> */}
					<DownloadAppV2 />
					<Footer />
				</div>
			</div>
		</div>
	);
}

export default NewsDetails;
