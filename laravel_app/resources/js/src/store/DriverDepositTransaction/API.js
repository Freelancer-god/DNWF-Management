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
        filter = {
            type: "all",
            status: "all"
        },
        order = 'created_at',
        a = [],
        sort = 'desc',
    },
) => {

    const dataToSend = {
        term, page, limit, filter, order_by: order, sort, with: a
    };

    clog(dataToSend);
    const config = {
        headers: { Authorization: `Bearer ${document.getElementById('myToken')?.value}` }
    };

    return axios
        .post(generateUrl('api/cmsService/v1/deposit_invoice/search'), dataToSend, config)
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
    driver_id,
    total,
}) => {
    const dataToSend = {
        driver_id,
        total,
    };

    clog(dataToSend);

    const config = {
        headers: { Authorization: `Bearer ${document.getElementById('myToken')?.value}` }
    };
    return axios
        .post(generateUrl('api/cmsService/v1/deposit_invoice/store'), dataToSend, config)
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
        .get(generateUrl(`api/cmsService/v1/employees/findById/${id}`), config)
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
    name,
    email,
    username,
    password,
    status, role_id
}) => {
    const dataToSend = {
        id,
        name,
        email,
        username,
        password,
        status, role_id
    };
    clog("dataToSend", dataToSend);
    const config = {
        headers: { Authorization: `Bearer ${document.getElementById('myToken')?.value}` }
    };
    return axios
        .post(generateUrl(`api/cmsService/v1/employees/update/${id}`), dataToSend, config)
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
        .delete(generateUrl(`api/cmsService/v1/employees/destroy/${id}`), config)
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

export const fetchConfirm = ({ id, status, notes }) => {
    const dataToSend = {
        id, status, notes
    };
    clog(dataToSend);
    const config = {
        headers: { Authorization: `Bearer ${document.getElementById('myToken')?.value}` }
    };
    return axios
        .post(generateUrl('api/cmsService/v1/deposit_invoice/confirm'), dataToSend, config)
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
