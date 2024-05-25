/* eslint-disable camelcase */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */

import axios from 'axios';


import { clog, tt } from '../../utils';
import { generateUrl } from '../../utils/function';
import { showError } from '../../components/dialogs';

export const fetchGetList = (
    {
        term,
        page = 1,
        limit = 10,
        filter = {},
        order = 'created_at',
        sort = 'desc',
    },
) => {

    const dataToSend = {
        term, page, limit, filter, order_by: order, sort
    };

    clog(dataToSend);
    const config = {
        headers: { Authorization: `Bearer ${document.getElementById('myToken')?.value}` }
    };

    return axios
        .post(generateUrl('api/cmsService/v1/questions/search'), dataToSend, config)
        .then((res) => res.data)
        .then((data) => {
            if (data.success === false) {
                showError(data.error);
                return null;
            }
            return data.data;
        })
        .catch((error) => {
            showError(tt('Không thể thực hiện ngay lúc này, vui lòng thử lại sau'));
            return null;
        });
};

export const fetchAdd = ({
    title, type
}) => {
    const dataToSend = {
        title, type
    };

    clog(dataToSend);

    const config = {
        headers: { Authorization: `Bearer ${document.getElementById('myToken')?.value}` }
    };
    return axios
        .post(generateUrl('api/cmsService/v1/questions/store'), dataToSend, config)
        .then((res) => res.data)
        .then((data) => {
            if (data.success === false) {
                showError(data.error);
                return null;
            }
            return data.data;
        })
        .catch((error) => {
            showError(tt('Không thể thực hiện ngay lúc này, vui lòng thử lại sau'));
            return null;
        });
};

export const fetchGetByID = ({ id }) => {
    const config = {
        headers: { Authorization: `Bearer ${document.getElementById('myToken')?.value}` }
    };
    return axios
        .get(generateUrl(`api/cmsService/v1/questions/findById/${id}`), config)
        .then((res) => res.data)
        .then((data) => {
            if (data.success === false) {
                showError(data.error);
                return null;
            }
            return data.data;
        })
        .catch((error) => {
            showError(tt('Không thể thực hiện ngay lúc này, vui lòng thử lại sau'));
            return null;
        });
}

export const fetchUpdate = ({
    id,
    title,
    type
}) => {
    const dataToSend = {
        id,
        title,
        type
    };
    clog("dataToSend", dataToSend);
    const config = {
        headers: { Authorization: `Bearer ${document.getElementById('myToken')?.value}` }
    };
    return axios
        .post(generateUrl(`api/cmsService/v1/questions/update/${id}`), dataToSend, config)
        .then((res) => res.data)
        .then((data) => {
            if (data.success === false) {
                showError(data.error);
                return null;
            }
            return data.data;
        })
        .catch((error) => {
            showError(tt('Không thể thực hiện ngay lúc này, vui lòng thử lại sau'));
            return null;
        });
};

export const fetchDelete = ({ id }) => {
    const config = {
        headers: { Authorization: `Bearer ${document.getElementById('myToken')?.value}` }
    };
    return axios
        .delete(generateUrl(`api/cmsService/v1/questions/destroy/${id}`), config)
        .then((res) => res.data)
        .then((data) => {
            if (data.success === false) {
                showError(data.error);
                return null;
            }
            return data.data;
        })
        .catch((error) => {
            showError(tt('Không thể thực hiện ngay lúc này, vui lòng thử lại sau'));
            return null;
        });
}

export const fetchDeleteMulti = ({ ids }) => {
    const dataToSend = { prizes: ids };
    return axios
        .post(generateUrl('/apps/championshipvouchers/api/v1/vouchers/deleteList'), { data: dataToSend })
        .then((res) => res.data)
        .then((data) => {
            if (data.success === false) {
                showError(data.error);
                return null;
            }
            return data.data;
        })
        .catch((error) => {
            showError(tt('Không thể thực hiện ngay lúc này, vui lòng thử lại sau'));
            return null;
        });
};
