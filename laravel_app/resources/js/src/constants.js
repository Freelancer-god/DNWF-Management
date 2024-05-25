import { moto, oto, oto7 } from './assets';
import { tt } from './utils';

export const IMAGE_TYPE = {
    CCCD: 'CCCD', // Căn cước công dân type 1
    CCCD_MT: 'CCCD_MT', // Căn cước công dân mặt trước
    CCCD_MS: 'CCCD_MS', // Căn cước công dân mặt sau
    GPLX: 'GPLX', // Giấy phép lái xe type 2
    GPLX_MT: 'GPLX_MT', // Giấy phép lái xe mặt trước
    GPLX_MS: 'GPLX_MS', // Giấy phép lái xe mặt sau
    DKX: 'DKX', // Đăng ký xe type 1
    DKX_MT: 'DKX_MT', // Đăng ký xe mặt trước
    DKX_MS: 'DKX_MS', // Đăng ký xe mặt sau
    HAX: 'HAX', // Hình ảnh xe type 2
    HAX_1: 'HAX_1', // Hình ảnh phía sau xe
    HAX_2: 'HAX_2', // Hình ảnh phía trước xe
    HAX_3: 'HAX_3', // Hình ảnh ngang, bên phải xe
    HAX_4: 'HAX_4', // Hình ảnh ngang, bên trái xe
    GCNDK: 'GCNDK', // Giấy chứng nhận đăng kiểm type 3
    GCNDK_1: 'GCNDK_1', // Giấy chứng nhận đăng kiểm mặt trong
    BHBBTNDS: 'BHBBTNDS', // Bảo hiểm bắt buộc tai nạn dân sự type 4
    BHBBTNDS_1: 'BHBBTNDS_1', // Bảo hiểm bắt buộc tai nạn dân sự mặt trong
    GNPSDDB: 'GNPSDDB', // Giấy nộp phí sử dụng đường bộ type 5
    GNPSDDB_1: 'GNPSDDB_1', // Giấy nộp phí sử dụng đường bộ mặt trong
    DRIVER_COVER: 'DRIVER_COVER', // anh tài xế
};

export const IMAGE_TYPE_DESCRIPTION = {
    CCCD: tt('Căn cước công dân'), // Căn cước công dân
    CCCD_MT: tt('Căn cước công dân mặt trước'), // Căn cước công dân mặt trước
    CCCD_MS: tt('Căn cước công dân mặt sau'), // Căn cước công dân mặt sau
    GPLX: tt('Giấy phép lái xe'), // Giấy phép lái xe
    GPLX_MT: tt('Giấy phép lái xe mặt trước'), // Giấy phép lái xe mặt trước
    GPLX_MS: tt('Giấy phép lái xe mặt sau'), // Giấy phép lái xe mặt sau
    DKX: tt('Đăng ký xe'), // Đăng ký xe
    DKX_MT: tt('Đăng ký xe mặt trước'), // Đăng ký xe mặt trước
    DKX_MS: tt('Đăng ký xe mặt sau'), // Đăng ký xe mặt sau
    HAX: tt('Ảnh xe'), // Ảnh xe xe
    HAX_1: tt('Ảnh xe phía sau '), // Ảnh xe phía sau xe
    HAX_2: tt('Ảnh xe phía trước '), // Ảnh xe phía trước xe
    HAX_3: tt('Ảnh xe ngang, bên phải '), // Ảnh xe ngang, bên phải xe
    HAX_4: tt('Ảnh xe ngang, bên trái '), // Hình ảnh ngang, bên trái xe
    GCNDK: tt('Giấy chứng nhận đăng kiểm'), // Giấy chứng nhận đăng kiểm
    GCNDK_1: tt('Giấy chứng nhận đăng kiểm mặt trong'), // Giấy chứng nhận đăng kiểm mặt trong
    BHBBTNDS: tt('Bảo hiểm BBTNDS'), // Bảo hiểm BBTNDS
    BHBBTNDS_1: tt('Bảo hiểm BBTNDS mặt trong'), // Bảo hiểm bắt buộc tai nạn dân sự mặt trong
    BHVCX: tt('Bảo hiểm BHVCX'), // Bảo hiém BHVCX Mặt trong nam chung cho voi BHBBTNDS_1
    GNPSDDB: tt('Giấy nộp phí sử dụng đường bộ'), // Giấy nộp phí sử dụng đường bộ
    GNPSDDB_1: tt('Hình ảnh tem đăng kiểm'), // Giấy nộp phí sử dụng đường bộ mặt trong (thông tin đã được sữa lại tem đăng kiểm)
    DRIVER_COVER: tt('Ảnh tài xế'),
};

export const DRIVER_TYPE = {
    XE_MAY: 1,
    XE_4CHO: 2,
    XE_7CHO: 3,
};

export const VEHICLE_INFOMATION_TYPE = {
    DKX: 1,
    HAX: 2,
    BHBBTNDS: 3,
    GCNDK: 4,
    GNPSDDB: 5,

};

export const PROFILE_MAP = {
    CCCD: 1,
    GPLX: 2,
    ANH: 3,
};

export const DRIVER_FORM_STATUS = {
    NOT_VERIFIED: 1,
    VERIFIED: 2,
    DENINED: 3,
    EXPIRED: 4,
};

export const VEHICLE_MAP = {
    1: tt('Xe máy'),
    2: tt('Xe ô tô 4 chỗ'),
    3: tt('Xe ô tô 7 chỗ'),
};

export const REGION_MAP = {
    1: tt('Miền Bắc'),
    2: tt('Miền Trung'),
    3: tt('Miền Nam'),
};

export const VEHICLE_MAP_W_COLOR = {
    1: { color: 'cyan', text: tt('Xe máy'), icon: moto },
    2: { color: 'volcano', text: tt('Xe ô tô 4 chỗ'), icon: oto },
    3: { color: 'purple', text: tt('Xe ô tô 7 chỗ'), icon: oto7 },
};

export const TRIP_STATUS_MAP = {
    0: tt('Bị huỷ'),
    1: tt('Mới tạo'),
    2: tt('Đang tìm tài xế'),
    3: tt('Tài xế đang đến'),
    4: tt('Tài xế đã đến'),
    5: tt('Đang trong hành trình'),
    6: tt('Đã trả khách'),
    7: tt('Đã kết thúc'),
};

export const TRIP_STATUS_MAP_TEXT = {
    'Bị huỷ': 0,
    'Mới tạo': 1,
    'Đang tìm tài xế': 2,
    'Tài xế đang đến': 3,
    'Tài xế đã đến': 4,
    'Đang trong hành trình': 5,
    'Đã trả khách': 6,
    'Đã kết thúc': 7,
};

export const TRIP_STATUS_MAP_W_COLOR = {
    0: { color: '', text: tt('Bị huỷ'), description: tt('Bị huỷ') },

    1: { color: 'blue', text: tt('Mới tạo'), description: tt('Trạng thái khách hàng chỉ mới hành động chọn địa điểm đi và đến. Hệ thống đang chờ xác nhận từ khách hàng') },
    2: { color: 'geekblue', text: tt('Đang tìm tài xế'), description: tt('Hệ thống đang thực hiện tìm tài xế phù hợp cho khách hàng. Và chờ xác nhận nhận cuốc từ tài xế được chọn') },
    3: { color: 'cyan', text: tt('Tài xế đang đến'), description: tt('Tài xế đã nhận cuốc xe và đang trên đường đến điểm đón khách') },
    4: { color: 'purple', text: tt('Tài xế đã đến'), description: tt('Tài xế đã đến điểm đón khách và đang đợi khách hàng để tiếp tục hành trình') },
    5: { color: 'magenta', text: tt('Đang trong hành trình'), description: tt('Tài xế và khách đang đi đến điểm trả khách') },
    6: { color: 'gold', text: tt('Đã trả khách'), description: tt('Tài xế đã đến điểm trả khách và đang chờ khách thanh toán') },
    7: { color: 'green', text: tt('Đã kết thúc'), description: tt('Tài xế đã xác nhận thanh toán và kết thúc chuyến') },
};

// export const DRIVER_STATUS_MAP = {
//   0: { color: '', text: tt('Ngừng hoạt động') },
//   1: { color: 'blue', text: tt('Chờ nộp hồ sơ') },
//   2: { color: 'warning', text: tt('Hồ sơ chưa hoàn chỉnh') },
//   3: { color: 'red', text: tt('Chưa nạp tiền') },
//   4: { color: 'success', text: tt('Đang hoạt động') },
//   5: { color: 'red', text: tt('Bị khoá tài khoản') },
// };

export const DRIVER_STATUS_MAP = {
    0: { color: 'red', text: tt('Ngừng hoạt động'), description: tt('Tài khoản không thể log in vào hệ thống') },
    1: { color: 'blue', text: tt('Chờ nộp hồ sơ'), description: tt('Tài khoản mới tạo và chưa nộp hồ sơ bao giờ') },
    2: { color: 'warning', text: tt('Chờ duyệt'), description: tt('Tài khoản đã nộp hồ sơ có một hoặc nhiều hồ sơ chưa được duyệt') },
    3: { color: 'warning', text: tt('Chờ bổ sung hồ sơ'), description: tt('Một trong các hồ sơ không được duyệt và không có hồ sơ nào đang chờ duyệt') },
    4: { color: 'blue', text: tt('Hồ sơ hoàn tất'), description: tt('Tất cả các hồ sơ đều hợp lệ và được duyệt') },
    5: { color: 'success', text: tt('Đang hoạt động'), description: tt('User được phép sử dụng chức năng nhận cuốc xe') },
    6: { color: 'volcano', text: tt('Chưa đặt cọc'), description: tt('User chưa đặt cọc') },
    7: { color: 'volcano', text: tt('Chờ xác nhận đặt cọc'), description: tt('User đã tạo phiếu đặt cọc và đợi xác nhận') },
};

export const ENABLE_WALLET = true;

export const statusOptions = () => {
    const options = [];

    for (const key in DRIVER_STATUS_MAP) {
        if (DRIVER_STATUS_MAP.hasOwnProperty(key)) {
            options.push({ label: DRIVER_STATUS_MAP[key].text, value: key });
        }
    }
    return options;
};

export const DASHBOARD_REFRESH_TIMEOUT = 5 * 60 * 1000;
export const RELOAD_DATA_TIMEOUT = 1 * 60 * 1000;

export const DASHBOARD_REPORT_TIME_TYPES = {
    DAY: { label: tt('Ngày') },
    MONTH: { label: tt('Tháng') },
    YEAR: { label: tt('Năm') },
};

export const SEND_NOTIFICATION_TYPE = {
    ONCE: 1,
    EVERYDAY: 2,
    EVERYWEEK: 3,
    EVERYMONTH: 4,
};

export const DAY_OF_WEEK = {
    0: tt("Chủ nhật"),
    1: tt("Thứ hai"),
    2: tt("Thứ ba"),
    3: tt("Thứ tư"),
    4: tt("Thứ năm"),
    5: tt("Thứ sáu"),
    6: tt("Thứ bảy"),
};

export const DASHBOARD_REPORT_TIME_TYPES_MAP = {
    [DASHBOARD_REPORT_TIME_TYPES.DAY.label]: 1,
    [DASHBOARD_REPORT_TIME_TYPES.MONTH.label]: 2,
    [DASHBOARD_REPORT_TIME_TYPES.YEAR.label]: 3,
};

export const PERMISSIONS_MAP = {
    'view-employee': 'view-employee',
    'create-employee': 'create-employee',
    'update-employee': 'update-employee',
    'delete-employee': 'delete-employee',
    'export-employee': 'export-employee',
    'view-role': 'view-role',
    'create-role': 'create-role',
    'update-role': 'update-role',
    'delete-role': 'delete-role',
    'view-passenger': 'view-passenger',
    'update-passenger': 'update-passenger',
    'view-passenger-address': 'view-passenger-address',
    'export-passenger': 'export-passenger',
    'view-invoice': 'view-invoice',
    'export-invoice': 'export-invoice',
    'view-rating-review': 'view-rating-review',
    'export-rating-review': 'export-rating-review',
    'view-driver': 'view-driver',
    'confirm-driver-form': 'confirm-driver-form',
    'update-driver-account': 'update-driver-account',
    'update-driver-active': 'update-driver-active',
    'export-driver': 'export-driver',
    'view-trip': 'view-trip',
    'cancel-trip': 'cancel-trip',
    'export-trip': 'export-trip',
    'view-deposit-invoice': 'view-deposit-invoice',
    'create-deposit-invoice': 'create-deposit-invoice',
    'update-deposit-invoice': 'update-deposit-invoice',
    'export-deposit-invoice': 'export-deposit-invoice',
    'view-support-service': 'view-support-service',
    'update-support-service': 'update-support-service',
    'view-config': 'view-config',
    'create-config': 'create-config',
    'update-config': 'update-config',
    'view-question': 'view-question',
    'create-question': 'create-question',
    'update-question': 'update-question',
    'delete-question': 'delete-question',
    'view-answer': 'view-answer',
    'create-answer': 'create-answer',
    'update-answer': 'update-answer',
    'delete-answer': 'delete-answer',
    'view-notification': 'view-notification',
    'create-notification': 'create-notification',
    'update-notification': 'update-notification',
    'delete-notification': 'delete-notification',
    'view-dashboard': 'view-dashboard',
    'view-vehicle': 'view-vehicle',
    'export-vehicle': 'export-vehicle',
    'update-driver-agency': 'update-driver-agency',
};
