import {createBrowserRouter,} from 'react-router-dom';
import React from 'react';
import App from './App';
import AboutTVPPage from "./AboutTVPPage";
import RestaurantsChainPage from "./RestaurantsChainPage";
import ContactPage from "./ContactPage";
import MenuPage from "./MenuPage";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
    },
    {
        path: '/about-us',
        element: <AboutTVPPage/>,
    },
    {
        path: '/restaurant/:restaurant',
        element: <RestaurantsChainPage/>,
    },
    {
        path: '/contact',
        element: <ContactPage/>,
    },
    {
        path: '/:restaurant/menu',
        element: <MenuPage/>,
    },
    // {
    //   path: 'news/:newsId',
    //   element: <NewsDetails />,
    // },
]);

