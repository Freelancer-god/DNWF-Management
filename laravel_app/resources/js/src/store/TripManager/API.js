/* eslint-disable camelcase */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */

import axios from 'axios';

import { clog, tt } from '../../utils';
import { generateUrl } from '../../utils/function';
import { showError } from '../../components/dialogs';
import { PAGE_UNLIMIT } from '../../CONSTANT';

export const fetchGetList = (
    {
        term,
        page = 1,
        limit = 10,
        filter = {},
        order = 'updated_at',
        sort = 'desc',
    },
) => {
    const dataToSend = {
        term, page, limit, filter, order_by: order, sort,
    };

    clog(dataToSend);
    const config = {
        headers: { Authorization: `Bearer ${document.getElementById('myToken')?.value}` },
    };

    return axios
        .post(generateUrl('api/cmsService/v1/trip/search'), dataToSend, config)
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
    display_name,
    description,
    permission_ids,
}) => {
    const dataToSend = {
        display_name,
        description,
        permission_ids,
    };
    clog(dataToSend);
    return axios
        .post(generateUrl('api/v1/roles/store'), dataToSend)
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

export const fetchGetByID = ({ id }) => axios
    .get(generateUrl(`api/v1/roles/findById/${id}`))
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

export const fetchUpdate = ({
    id,
    display_name,
    description,
    permission_ids,
}) => {
    const dataToSend = {
        display_name,
        description,
        permission_ids,
    };
    clog('dataToSend', dataToSend);
    return axios
        .post(generateUrl(`api/v1/roles/update/${id}`), dataToSend)
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

export const fetchDelete = ({ id }) => axios
    .delete(generateUrl(`api/v1/roles/destroy/${id}`))
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

export const getDriverCurrentSubmitedForms = ({
    driver_id,

}) => {
    const config = {
        headers: { Authorization: `Bearer ${document.getElementById('myToken')?.value}` },
    };
    const dataToSend = {
        driver_id,
    };
    clog('dataToSend', dataToSend);
    return axios
        .post(generateUrl('api/cmsService/v1/drivers/searchDriver'), dataToSend, config)
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

export const updateDriverForms = ({
    driver_id,
    form_list,

}) => {
    const config = {
        headers: { Authorization: `Bearer ${document.getElementById('myToken')?.value}` },
    };
    const dataToSend = {
        driver_id,
        form_list,
    };
    clog('dataToSend', dataToSend);
    return axios
        .post(generateUrl('api/cmsService/v1/driver_forms/verifiedFormList'), dataToSend, config)
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

export const updateVehicleForms = ({
    driver_id,
    form_list,

}) => {
    const config = {
        headers: { Authorization: `Bearer ${document.getElementById('myToken')?.value}` },
    };
    const dataToSend = {
        driver_id,
        form_list,
    };
    clog('dataToSend', dataToSend);
    return axios
        .post(generateUrl('api/cmsService/v1/vehicle_forms/verifiedFormList'), dataToSend, config)
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

export const getVehicleBranchList = ({
    filter,
}) => {
    const config = {
        headers: { Authorization: `Bearer ${document.getElementById('myToken')?.value}` },
    };
    const dataToSend = {
        term: [],
        with: [],
        page: 1,
        limit: PAGE_UNLIMIT,
        filter,
        order_by: 'order_sort',
        sort: 'asc',
    };
    clog('dataToSend', dataToSend);
    return axios
        .post(generateUrl('api/cmsService/v1/vehicle_brands/search'), dataToSend, config)
        .then((res) => res.data)
        .then((data) => {
            if (data.success === false) {
                showError(data.error);
                return null;
            }
            return data.data.data;
        })
        .catch((error) => {
            showError(tt('Không thể thực hiện ngay lúc này, vui lòng thử lại sau'));
            return null;
        });
};

export const getVehicleModelList = ({
    filter,
}) => {
    const config = {
        headers: { Authorization: `Bearer ${document.getElementById('myToken')?.value}` },
    };
    const dataToSend = {
        term: [],
        with: [],
        page: 1,
        limit: PAGE_UNLIMIT,
        filter,
        order_by: 'order_sort',
        sort: 'asc',
    };
    clog('dataToSend', dataToSend);
    return axios
        .post(generateUrl('api/cmsService/v1/vehicle_brand_models/search'), dataToSend, config)
        .then((res) => res.data)
        .then((data) => {
            if (data.success === false) {
                showError(data.error);
                return null;
            }
            return data.data.data;
        })
        .catch((error) => {
            showError(tt('Không thể thực hiện ngay lúc này, vui lòng thử lại sau'));
            return null;
        });
};

export const toggleRecieveDrive = ({
    driver_id,
    status,

}) => {
    const config = {
        headers: { Authorization: `Bearer ${document.getElementById('myToken')?.value}` },
    };
    const dataToSend = {
        driver_id,
        status,
    };
    clog('dataToSend', dataToSend);
    return axios
        .post(generateUrl('api/cmsService/v1/drivers/setReceiveRide'), dataToSend, config)
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

export const cancelTrip = ({
    trip_id,
    notes,

}) => {
    const config = {
        headers: { Authorization: `Bearer ${document.getElementById('myToken')?.value}` },
    };
    const dataToSend = {
        trip_id,
        notes,
    };
    clog('dataToSend', dataToSend);
    return axios
        .post(generateUrl('api/cmsService/v1/trip/cancelTripCms'), dataToSend, config)
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

export const exportDrivers = (dataToSend) => {
    const config = {
        headers: { Authorization: `Bearer ${document.getElementById('myToken')?.value}` },
    };

    clog('dataToSend', dataToSend);
    return axios
        .post(generateUrl('api/cmsService/v1/trip/exportExcel'), dataToSend, config)
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

export const getTracker = (dataToSend) => {
    const config = {
        headers: { Authorization: `Bearer ${document.getElementById('myToken')?.value}` },
    };

    clog('dataToSend', dataToSend);
    return axios
        .post(generateUrl('api/cmsService/v1/locations/getTripTracker'), dataToSend, config)
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
