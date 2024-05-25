/* eslint-disable max-len */
import React, {useEffect} from "react";
import styles from "../style";
import {Footer, Navbar,} from "../components";
import ScrollToHashElement from "../components/ScrollToHashElements";
import ImageHeader from "../components/ImageHeader";
import {bgHeaderHome} from "../assets";
import Breadcrumbs from "../components/Breadcrumbs";
import ContactWithUs from "../components/ContactWithUs";
import SendFeedback from "../components/SendFeedback";
// import {tt} from "../utils";
import {useTranslation} from "react-i18next";

/**
 * Renders the entire application.
 *
 * @returns {JSX.Element} The rendered application.
 */
function ContactPage() {
	const {t} = useTranslation();
	const tt = t
	useEffect(() => {
		document.title = tt('Liên hệ')
	}, []);

	return (
		// The top-level container for the application, sets the background color and overflow behavior.
		<div className=" w-full overflow-hidden">
			<ScrollToHashElement/>
			{/* The container for the navbar, horizontally centered with padding on either side. */}
			<div className={`${styles.flexCenter}`}>
				<div className={`absolute top-0 w-full`}>
					<Navbar view="contact"/>
				</div>
				<ImageHeader img={bgHeaderHome}/>
			</div>


			{/* The container for the slogan section, vertically aligned to the top of the page. */}
			<div className={`${styles.paddingX} ${styles.flexStart}`}>
				<div className={`${styles.boxWidth}`}>
					<Breadcrumbs/>
				</div>
			</div>


			{/* The container for the downloadApplication section, vertically aligned to the top of the page. */}
			<div className={`${styles.flexStart}`}>
				<div className={`w-full`}>
					<ContactWithUs/>
				</div>
			</div>

			{/* The container for the achievement section, vertically aligned to the top of the page. */}
			<div className={`${styles.paddingX} ${styles.flexStart}`}>
				<div className={`${styles.boxWidth}`}>
					<SendFeedback/>
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

export default ContactPage;
