import axios from 'axios';

import { clog, tt } from '../../utils';
import { generateUrl } from '../../utils/function';
import { showError } from '../../components/dialogs';

export const getTotalUsers = () => {
  const config = {
    headers: { Authorization: `Bearer ${document.getElementById('myToken')?.value}` },
  };

  return axios
    .get(generateUrl('api/cmsService/v1/passengers/reportByMonth'), config)
    .then((res) => res.data)
    .then((data) => {
      if (data.success === false) {
        showError(data.error);
        return null;
      }
      return data.data;
    })
    .catch((error) =>
    //   showError(tt('Không thể thực hiện ngay lúc này, vui lòng thử lại sau'));
      null);
};
export const getTotalDrivers = () => {
  const config = {
    headers: { Authorization: `Bearer ${document.getElementById('myToken')?.value}` },
  };

  return axios
    .get(generateUrl('api/cmsService/v1/drivers/reportByMonth'), config)
    .then((res) => res.data)
    .then((data) => {
      if (data.success === false) {
        showError(data.error);
        return null;
      }
      return data.data;
    })
    .catch((error) =>
    //   showError(tt('Không thể thực hiện ngay lúc này, vui lòng thử lại sau'));
      null);
};

export const getTotalTrips = () => {
  const config = {
    headers: { Authorization: `Bearer ${document.getElementById('myToken')?.value}` },
  };

  return axios
    .get(generateUrl('api/cmsService/v1/trip_cards/reportMonthlyTotalTrip'), config)
    .then((res) => res.data)
    .then((data) => {
      if (data.success === false) {
        showError(data.error);
        return null;
      }
      return data.data;
    })
    .catch((error) =>
      //   showError(tt('Không thể thực hiện ngay lúc này, vui lòng thử lại sau'));
      null);
};

export const getTotalIncome = () => {
  const config = {
    headers: { Authorization: `Bearer ${document.getElementById('myToken')?.value}` },
  };

  return axios
    .get(generateUrl('api/cmsService/v1/trip_cards/reportMonthlyTotalPaid'), config)
    .then((res) => res.data)
    .then((data) => {
      if (data.success === false) {
        showError(data.error);
        return null;
      }
      return data.data;
    })
    .catch((error) =>
    //   showError(tt('Không thể thực hiện ngay lúc này, vui lòng thử lại sau'));
      null);
};

export const getTotalProfit = ({ type }) => {
  const config = {
    headers: { Authorization: `Bearer ${document.getElementById('myToken')?.value}` },
  };

  return axios
    .post(generateUrl('api/cmsService/v1/trip_cards/reportTotalPaid'), { type }, config)
    .then((res) => res.data)
    .then((data) => {
      if (data.success === false) {
        showError(data.error);
        return null;
      }
      return data.data;
    })
    .catch((error) =>
      //   showError(tt('Không thể thực hiện ngay lúc này, vui lòng thử lại sau'));
      null);
};
export const getTotalTripsReport = ({ type }) => {
  const config = {
    headers: { Authorization: `Bearer ${document.getElementById('myToken')?.value}` },
  };

  return axios
    .post(generateUrl('api/cmsService/v1/trip_cards/reportTotalTrip'), { type }, config)
    .then((res) => res.data)
    .then((data) => {
      if (data.success === false) {
        showError(data.error);
        return null;
      }
      return data.data;
    })
    .catch((error) =>
      //   showError(tt('Không thể thực hiện ngay lúc này, vui lòng thử lại sau'));
      null);
};
export const getTotalRatingReport = ({ type }) => {
  const config = {
    headers: { Authorization: `Bearer ${document.getElementById('myToken')?.value}` },
  };

  return axios
    .post(generateUrl('api/cmsService/v1/rating/reportRating'), { type }, config)
    .then((res) => res.data)
    .then((data) => {
      if (data.success === false) {
        showError(data.error);
        return null;
      }
      return data.data;
    })
    .catch((error) =>
      //   showError(tt('Không thể thực hiện ngay lúc này, vui lòng thử lại sau'));
      null);
};
