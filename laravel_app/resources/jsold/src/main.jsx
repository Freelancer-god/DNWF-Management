import React from 'react';

import ReactDOM from 'react-dom/client';
import {RouterProvider} from 'react-router-dom';

import './scss/index.scss';
import './fonts/index'
import './fonts/index.scss'

import {router} from './routes/router';

ReactDOM.createRoot(document.getElementById('dv_page_index')).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
        {/* <App /> */}
    </React.StrictMode>,
);
