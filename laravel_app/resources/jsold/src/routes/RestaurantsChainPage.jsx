/* eslint-disable max-len */
import React, {useMemo} from "react";
import styles from "../style";
import {Footer, Navbar,} from "../components";
import ScrollToHashElement from "../components/ScrollToHashElements";
import ImageHeader from "../components/ImageHeader";
import Slogan from "../components/Slogan";
import DownloadApplication from "../components/DownloadApplication";
import AboutRestaurantsChain from "../components/AboutRestaurantsChain";
import MenuCarousel from "../components/MenuCarousel";
import {APP_NAME, clog, loadStateFromHiddenField} from "../utils";
// import { tt} from "../utils";
import RestaurantInChain from "../components/RestaurantInChain";
import {useTranslation} from "react-i18next";

/**
 * Renders the entire application.
 *
 * @returns {JSX.Element} The rendered application.
 */
function RestaurantsChainPage() {
    const {t} = useTranslation();
    const tt = t
    const chainStore = JSON.parse(loadStateFromHiddenField(APP_NAME, 'chain-store', '[]'));
    const store_id = (loadStateFromHiddenField(APP_NAME, 'chain-id', ''));
    const listMenu = JSON.parse(loadStateFromHiddenField(APP_NAME, 'list-menu', '[]'));
    const listStore = JSON.parse(loadStateFromHiddenField(APP_NAME, 'list-store', '[]'));

    const data = useMemo(() => {
        let index = chainStore.findIndex(obj => obj.id === store_id)
        if (index !== -1) {
            document.title = chainStore[index].name
            return chainStore[index]
        }
        document.title = tt('Chuỗi nhà hàng')
        return null
    }, [chainStore])

    clog('data',data)

    return (
        // The top-level container for the application, sets the background color and overflow behavior.
        <div className=" w-full overflow-hidden">
            <ScrollToHashElement/>
            {/* The container for the navbar, horizontally centered with padding on either side. */}
            <div className={`${styles.flexCenter}`}>
                <div className={`absolute top-0 w-full`}>
                    <Navbar view="restaurants"/>
                </div>
                <ImageHeader img={data?.avatar}/>
            </div>

            {/* The container for the slogan section, vertically aligned to the top of the page. */}
            <div className={`${styles.paddingX} ${styles.flexStart}`}>
                <div className={`${styles.boxWidth}`}>
                    <Slogan data={data}/>
                </div>
            </div>

            {/* The container for the aboutTVP section, vertically aligned to the top of the page. */}
            <div className={`${styles.paddingX} ${styles.flexStart}`}>
                <div className={`${styles.boxWidth}`}>
                    <AboutRestaurantsChain restaurant={data}/>
                </div>
            </div>


            {/* The container for the downloadApplication section, vertically aligned to the top of the page. */}
            <div className={`${styles.flexStart}`}>
                <div className={`w-full`}>
                    <DownloadApplication/>
                </div>
            </div>

            {/* The container for the MenuCarousel section, vertically aligned to the top of the page. */}
            {listMenu.map((value, index, array) => {
                return value?.menu_products?.length > 0 && (
                    <div className={`${styles.paddingX} ${styles.flexStart}`}>
                        <div className={`${styles.boxWidth}`}>
                            <MenuCarousel data={value} store={data}/>
                        </div>
                    </div>
                )
            })}


            {/* The container for the RestaurantInChain section, vertically aligned to the top of the page. */}
            <div className={`${styles.paddingX} ${styles.flexStart}`}>
                <div className={`${styles.boxWidth}`}>
                    <RestaurantInChain data={listStore}/>
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

export default RestaurantsChainPage;
