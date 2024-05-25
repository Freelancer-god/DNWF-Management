// import React from 'react';
// import './bootstrap';
// import * as ReactDOM from 'react-dom/client';
// import '../sass/app.scss';
// import Test from './components/Test';
//
// const root = ReactDOM.createRoot(
//   document.getElementById('root'),
// );
//
// root.render(<Test />);


import React from 'react';
import ReactDOM from 'react-dom/client';
import {RouterProvider} from 'react-router-dom';

import './src/i18n/config';
import './src/scss/index.scss';
// import './src/fonts/index'
// import './src/fonts/index.scss'

import {router} from './src/routes/router';

import dayjs from "dayjs";
import vi from 'dayjs/locale/vi'

dayjs.locale(vi) // use locale globally


if (document.getElementById('dv_page_index')) {
    ReactDOM.createRoot(document.getElementById('dv_page_index')).render(
        <React.StrictMode>
            <RouterProvider router={router}/>
        </React.StrictMode>,
    );
}

if (document.getElementById('dv_about_us_index')) {
    ReactDOM.createRoot(document.getElementById('dv_about_us_index')).render(
        <React.StrictMode>
            <RouterProvider router={router}/>
        </React.StrictMode>,
    );
}

if (document.getElementById('dv_contact_index')) {
    ReactDOM.createRoot(document.getElementById('dv_contact_index')).render(
        <React.StrictMode>
            <RouterProvider router={router}/>
        </React.StrictMode>,
    );
}

if (document.getElementById('dv_menu_index')) {
    ReactDOM.createRoot(document.getElementById('dv_menu_index')).render(
        <React.StrictMode>
            <RouterProvider router={router}/>
        </React.StrictMode>,
    );
}

if (document.getElementById('dv_restaurant_index')) {
    ReactDOM.createRoot(document.getElementById('dv_restaurant_index')).render(
        <React.StrictMode>
            <RouterProvider router={router}/>
        </React.StrictMode>,
    );
}


if (import.meta.hot) {
    import.meta.hot.accept();
}
