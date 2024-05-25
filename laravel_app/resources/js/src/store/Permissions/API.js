import axios from 'axios';

import { tt } from '../../utils';
import { showError } from '../../components/dialogs';
import { generateUrl } from '../../utils/function';

const config = {
    headers: { Authorization: `Bearer ${document.getElementById('myToken')?.value}` },
};
export const fetchGetAllPermissions = () => axios
    .get(generateUrl('api/cmsService/v1/employees/getPermission'), config)
    .then((res) => res.data)
    .then((data) => {
        if (data.success === false) {
            showError(data.error);
            return null;
        }

        const perDic = {};
        const lampieng = {};

        data.data.forEach(({ name, id }) => {
            perDic[name] = { name, id };
            lampieng[name] = name;
        });
        return perDic;
    })
    .catch((error) =>
        // showError(tt('Không thể thực hiện ngay lúc này, vui lòng thử lại sau'));
        null);
