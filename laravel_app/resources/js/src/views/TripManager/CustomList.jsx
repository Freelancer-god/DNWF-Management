import React, {
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import {
    Breadcrumb,
    Button,
    Dropdown,
    Form,
    Modal,
    Pagination,
    Rate,
    Select,
    Spin,
    Tag,
    Tooltip,
} from "antd";
import {
    CheckCircleOutlined,
    ClockCircleOutlined,
    CloseCircleOutlined,
    ExclamationCircleFilled,
    ExclamationCircleOutlined,
    FilterFilled,
    FrownOutlined,
    MehOutlined,
    SearchOutlined,
    SmileOutlined,
    SyncOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "lodash";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";
import {
    addDynamicFilterItem,
    changePage,
    changeSearch,
    data,
    dynamicFilter,
    getData,
    initCreateWithoutShowModal,
    limit,
    order,
    page,
    removeAllDynamicFilterItem,
    removeDynamicFilterItem,
    search,
    selectedRows,
    setDynamicFilterItem,
    spinnerSearch,
    total,
} from "../../store/TripManager";
import CustomTable from "./CustomTable";
import CustomFilter from "../../components/Filter/CustomFilter";
import { clog, formatFilterDynamicToTerm, tt } from "../../utils";
import { generateUrl, getBreadcrumb } from "../../utils/function";
import { useRefDimensions } from "../../hook/useRefDimensions";
import {
    commonFiledDynamicFilter,
    commonTimeAvailableDynamicFilter,
} from "../../components/Filter/FilterDynamic/function";
import { requireAdmin } from "../../store";
import { throttleOnPressAction } from "../../hook/throttlePressAcion";
import { PermissionsContext, permission } from "../../store/Permissions";
import { showError, showSuccess } from "../../components/dialogs";
import { formatNgayThang, getRangeTodayUnix } from "../../utils/dateTime";
import { COLORS, PAGE_UNLIMIT } from "../../CONSTANT";
import { cancelTrip, exportDrivers } from "../../store/TripManager/API";
import {
    PERMISSIONS_MAP,
    REGION_MAP,
    TRIP_STATUS_MAP,
    TRIP_STATUS_MAP_TEXT,
    TRIP_STATUS_MAP_W_COLOR,
    VEHICLE_MAP,
    VEHICLE_MAP_W_COLOR,
} from "../../constants";
import { formatMoneyVND } from "../../utils/fotmatMoney";
import AntdButton from "../../components/AntdButton";
import MyMap from "../../components/GoogleMap/MyMap";
import CancelForm from "./FormCancel/CancelForm";

const { confirm } = Modal;
const statusMap = {
    0: { color: "", text: tt("Ngưng hoạt động") },
    1: { color: "blue", text: tt("Chờ nộp hồ sơ") },
    2: { color: "warning", text: tt("Hồ sơ chưa hoàn chỉnh") },
    3: { color: "red", text: tt("Chưa nạp tiền") },
    4: { color: "success", text: tt("Đang hoạt động") },
    5: { color: "red", text: tt("Bị khoá tài khoản") },
};
function CustomList() {
    const [cancelForm] = Form.useForm();
    const [currentTrip, setCurrentTrip] = useState(null);
    const [isLoading, setIloading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const _search = useSelector(search);
    const _data = useSelector(data);
    const _selectedRows = useSelector(selectedRows);
    const _page = useSelector(page);
    const _limit = useSelector(limit);
    const _order = useSelector(order);
    const _total = useSelector(total);
    const _spinnerSearch = useSelector(spinnerSearch);
    const _dynamicFilter = useSelector(dynamicFilter);
    const _permission = useSelector(permission);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [tempSearch, setTempSearch] = useState(_search);
    const [columns, setColumns] = useState();
    const myPermissions = useContext(PermissionsContext).permissions;
    const initColumns = [
        {
            title: tt("Mã ref"),
            label: tt("Mã ref"),
            key: "reference",
            dataIndex: "reference",
            width: 150,
            sorter: true,
            fixed: "left",
            render: (value, item) => <Tag color="orange">{value}</Tag>,
        },
        {
            title: tt("Thông tin chuyến"),
            label: tt("Thông tin chuyến"),
            key: "driver_id",
            dataIndex: "driver_id",
            width: "18%",

            sorter: false,

            render: (value, item) => {
                if (item.trip_location && item.trip_location.length > 1) {
                    if (item.is_tester) {
                        return (
                            <Tooltip title={tt("Chuyến đi kiểm thử")}>
                                <div className=" whitespace-normal text-blue-500">
                                    <div title={item.trip_location[0].address}>
                                        <span className=" font-bold">
                                            {tt("Từ: ")}
                                        </span>
                                        <span className="text-blue-300">{`${item.trip_location[0].address}`}</span>
                                    </div>
                                    <div title={item.trip_location[1].address}>
                                        <span className=" font-bold">
                                            {tt("Đến: ")}
                                        </span>
                                        <span className="text-blue-300">{`${item.trip_location[1].address}`}</span>
                                    </div>
                                </div>
                            </Tooltip>
                        );
                    }
                    return (
                        <div className=" whitespace-normal ">
                            <div title={item.trip_location[0].address}>
                                <span className=" font-bold">{tt("Từ: ")}</span>
                                <span className="text-[#7d7d7d]">{`${item.trip_location[0].address}`}</span>
                            </div>
                            <div title={item.trip_location[1].address}>
                                <span className=" font-bold">
                                    {tt("Đến: ")}
                                </span>
                                <span className="text-[#7d7d7d]">{`${item.trip_location[1].address}`}</span>
                            </div>
                        </div>
                    );
                }
                return <Tag />;
            },
        },
        {
            title: tt("Loại xe"),
            label: tt("Loại xe"),
            key: "trip_vehicle_types",
            dataIndex: "trip_vehicle_types",
            width: 115,
            show: true,
            sorter: false,
            render: (value, item) => {
                if (value && value.length === 1) {
                    return (
                        <Tag
                            color={
                                VEHICLE_MAP_W_COLOR[value[0].vehicle_type_id]
                                    .color
                            }
                        >
                            {VEHICLE_MAP_W_COLOR[value[0].vehicle_type_id].text}
                        </Tag>
                    );
                }
                return <Tag />;
            },
        },
        {
            title: tt("Mã BHHT"),
            label: tt("Mã BHHT"),
            key: "req_code",
            dataIndex: "req_code",
            width: 160,
            show: true,
            sorter: false,
            render: (value, item) => (value ? <Tag>{value}</Tag> : <Tag />),
        },
        {
            title: tt("Khoảng cách"),
            label: tt("Khoảng cách"),
            key: "total_distance",
            dataIndex: "total_distance",
            width: 115,
            show: true,
            sorter: true,
            render: (value, item) =>
                value ? `${parseFloat(value) / 1000} km` : <Tag />,
        },
        {
            title: tt("Thời gian"),
            label: tt("Thời gian"),
            key: "total_duration",
            dataIndex: "total_duration",
            width: 100,
            show: true,
            sorter: true,
            render: (value, item) =>
                value ? `${Math.floor(parseFloat(value) / 60)} phút` : <Tag />,
        },
        {
            title: tt("Giá"),
            label: tt("Giá"),
            key: "total_paid",
            dataIndex: "total_paid",
            width: 100,
            show: true,
            sorter: true,
            render: (value, item) =>
                value ? `${formatMoneyVND(value)}` : <Tag />,
        },
        {
            title: tt("Mã tài xế"),
            label: tt("Mã tài xế"),
            key: "driver_reference",
            dataIndex: "driver_reference",
            width: 120,

            sorter: true,
            render: (value, item) => (value ? <Tag>{value}</Tag> : <Tag />),
        },
        {
            title: tt("Tên tài xế"),
            label: tt("Tên tài xế"),
            key: "driver_name",
            dataIndex: "driver_name",
            // width: 150,

            sorter: true,
            render: (value, item) =>
                value ? (
                    <div className=" whitespace-normal">{value}</div>
                ) : (
                    <Tag />
                ),
        },
        {
            title: tt("SĐT tài xế"),
            label: tt("SĐT tài xế"),
            key: "driver_phone",
            dataIndex: "driver_phone",
            width: 150,

            sorter: true,
            render: (value, item) => value || <Tag />,
        },
        {
            title: tt("Mã KH"),
            label: tt("Mã KH"),
            key: "passenger_reference",
            dataIndex: "passenger_reference",
            width: 120,

            sorter: true,
            render: (value, item) => (value ? <Tag>{value}</Tag> : <Tag />),
        },
        {
            title: tt("Tên KH"),
            label: tt("Tên KH"),
            key: "passenger_name",
            dataIndex: "passenger_name",
            // width: 150,

            sorter: true,
            render: (value, item) =>
                value ? (
                    <div className=" whitespace-normal">{value}</div>
                ) : (
                    <Tag />
                ),
        },
        {
            title: tt("SĐT KH"),
            label: tt("SĐT KH"),
            key: "passenger_phone",
            dataIndex: "passenger_phone",
            width: 150,

            sorter: true,
            render: (value, item) => value || <Tag />,
        },

        {
            title: tt("Đại lý"),
            label: tt("Đại lý"),
            key: "agency_name",
            dataIndex: "agency_name",
            width: 150,
            sorter: true,
            render: (value, item) => value || <Tag />,
        },

        {
            title: tt("Ngày tạo"),
            label: tt("Ngày tạo"),
            key: "created_at",
            dataIndex: "created_at",
            width: 120,
            sorter: true,
            show: true,
            render: (value, item) =>
                value !== null ? (
                    <div className=" whitespace-normal">
                        {formatNgayThang(value, true)}
                    </div>
                ) : (
                    <Tag />
                ),
        },
        {
            title: tt("Ngày cập nhật"),
            label: tt("Ngày cập nhật"),
            key: "updated_at",
            dataIndex: "updated_at",
            width: 120,
            sorter: true,
            show: true,
            render: (value, item) =>
                value !== null ? (
                    <div className=" whitespace-normal">
                        {formatNgayThang(value, true)}
                    </div>
                ) : (
                    <Tag />
                ),
        },

        {
            title: tt("Đánh giá"),
            label: tt("Đánh giá"),
            key: "ratings",
            dataIndex: "ratings",
            width: 220,
            sorter: false,
            show: true,
            render: (item) => {
                const customIcons = {
                    1: <FrownOutlined />,
                    2: <FrownOutlined />,
                    3: <MehOutlined />,
                    4: <SmileOutlined />,
                    5: <SmileOutlined />,
                };
                if (item) {
                    const { rating } = item;
                    return (
                        <Tooltip title={`${rating} sao`}>
                            <div className="flex flex-wrap gap-[3px]">
                                {item.on_time && (
                                    <Tag color="#f50">{tt("Đúng giờ")}</Tag>
                                )}
                                {item.professional && (
                                    <Tag color="#2db7f5">
                                        {tt("Chuyên nghiệp")}
                                    </Tag>
                                )}
                                {item.devoted && (
                                    <Tag color="#87d068">{tt("Tận tâm")}</Tag>
                                )}
                                {item.clean && (
                                    <Tag color="#108ee9">{tt("Sạch sẽ")}</Tag>
                                )}
                            </div>
                            <div className="mt-1">
                                <Rate
                                    allowHalf
                                    defaultValue={rating}
                                    disabled
                                    character={({ index }) =>
                                        customIcons[index + 1]
                                    }
                                />
                            </div>
                        </Tooltip>
                    );
                }
                return <Tag />;
            },
        },

        {
            title: tt("Trạng thái"),
            label: tt("Trạng thái"),
            key: "status",
            dataIndex: "status",
            width: 180,
            sorter: true,
            fixed: "right",
            render: (value, item) => {
                let icon = null;
                switch (value) {
                    case 0:
                        icon = <ExclamationCircleOutlined />;
                        break;
                    case 1:
                        icon = <ClockCircleOutlined />;
                        break;
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                        icon = <SyncOutlined spin />;
                        break;
                    case 7:
                        icon = <CheckCircleOutlined />;
                        break;
                    default:
                }
                if (item.cancel_type) {
                    return (
                        <Tooltip title={item.notes}>
                            <Tag
                                icon={icon}
                                color={TRIP_STATUS_MAP_W_COLOR[value].color}
                            >
                                {TRIP_STATUS_MAP_W_COLOR[value].text}
                            </Tag>
                        </Tooltip>
                    );
                }
                return (
                    <Tooltip title={TRIP_STATUS_MAP_W_COLOR[value].description}>
                        <Tag
                            icon={icon}
                            color={TRIP_STATUS_MAP_W_COLOR[value].color}
                        >
                            {TRIP_STATUS_MAP_W_COLOR[value].text}
                        </Tag>
                    </Tooltip>
                );
            },
        },
        {
            title: tt("Hành động"),
            label: tt("Hành động"),
            key: "updated_at",
            dataIndex: "updated_at",
            width: 120,
            fixed: "right",
            sorter: true,
            show: true,
            render: (value, item) => (
                <div className="flex flex-col">
                    <AntdButton
                        type="link"
                        onClick={() => {
                            setCurrentTrip(item);
                            setIsModalOpen(true);
                        }}
                    >
                        {tt("Xem bản đồ")}
                    </AntdButton>
                    {myPermissions[PERMISSIONS_MAP["cancel-trip"]] &&
                        item.status !== TRIP_STATUS_MAP_TEXT["Bị huỷ"] &&
                        item.status !== TRIP_STATUS_MAP_TEXT["Đã kết thúc"] && (
                            <AntdButton
                                type="link"
                                onClick={() => {
                                    setCurrentTrip(item);
                                    setIsConfirmModalOpen(true);
                                }}
                            >
                                {tt("Huỷ chuyến")}
                            </AntdButton>
                        )}
                </div>
            ),
        },
    ];
    useEffect(() => {
        setColumns(initColumns.filter((column) => column.show !== false));
    }, []);
    const items = [
        // {
        //   label: tt('Xuất'),
        //   key: '0',
        // },
        {
            label: tt("Xoá"),
            key: "1",
        },
    ];
    const showTotal = () => `${tt("Tổng")} ${_total}`;

    const functionChange = (text) => {
        dispatch(changePage(1));
        dispatch(changeSearch(text));
    };
    const handlerSearch = useCallback(
        debounce((nextValue) => functionChange(nextValue), 500),
        []
    );
    const handleOnChangeSearch = (value) => {
        handlerSearch(value);
        setTempSearch(value);
    };

    const handleOnChangePage = (nextPage) => {
        // nextPage, pageSize
        dispatch(changePage(nextPage));
    };

    const hasSelection = () => _selectedRows.length > 0;

    const handleOnPressCreate = () => {
        dispatch(initCreateWithoutShowModal());
        navigate("/cms/drivers?view_type=form");
    };

    const submitDelete = () => {
        requireAdmin().then(() => {
            dispatch(deleteItem());
        });
    };

    const handleMenuClick = (e) => {
        switch (e.key) {
            case "0":
                break;
            case "1":
                confirm({
                    title: tt("Xoá vai trò"),
                    icon: <ExclamationCircleFilled />,
                    content: `${tt("Bạn có chắc chắn muốn xóa vai trò")} "${
                        _selectedRows[0].display_name
                    }" ?`,
                    onOk() {
                        throttleOnPressAction(submitDelete);
                    },
                    onCancel() {},
                });
                break;
            default:
                break;
        }
    };

    const listField = [
        { label: tt("Mã ref"), value: "trips.reference", type: "input" },
        {
            label: tt("Mã tài xế"),
            value: "trips.driver_reference",
            type: "input",
        },
        { label: tt("SĐT tài xế"), value: "trips.driver_phone", type: "input" },
        {
            label: tt("Mã hành khách"),
            value: "trips.passenger_reference",
            type: "input",
        },
        {
            label: tt("SĐT hành khách"),
            value: "trips.passenger_phone",
            type: "input",
        },
        { label: tt("Mã BHHT"), value: "trips.req_code", type: "input" },
        {
            label: tt("Loại xe"),
            value: "trips.type",
            type: "select",
            selectOption: [
                { label: VEHICLE_MAP[1], value: 1 },
                { label: VEHICLE_MAP[2], value: 2 },
                { label: VEHICLE_MAP[3], value: 3 },
            ],
        },
        {
            label: tt("Trạng thái"),
            value: "trips.status",
            type: "select",
            selectOption: [
                { label: TRIP_STATUS_MAP_W_COLOR[0].text, value: 0 },
                { label: TRIP_STATUS_MAP_W_COLOR[1].text, value: 1 },
                { label: TRIP_STATUS_MAP_W_COLOR[2].text, value: 2 },
                { label: TRIP_STATUS_MAP_W_COLOR[3].text, value: 3 },
                { label: TRIP_STATUS_MAP_W_COLOR[4].text, value: 4 },
                { label: TRIP_STATUS_MAP_W_COLOR[5].text, value: 5 },
                { label: TRIP_STATUS_MAP_W_COLOR[6].text, value: 6 },
                { label: TRIP_STATUS_MAP_W_COLOR[7].text, value: 7 },
            ],
        },
        { label: tt("Ngày tạo"), value: "trips.created_at", type: "date" },
        {
            label: tt("Đại lý"),
            value: "trips.agency_id",
            type: "selectAndSearch",
            api: "api/cmsService/v1/agencies/search",
            filter: { status: 1 },
            // formatData: handleFormatRoleSearchData,
        },
        // { label: tt('Họ tên GPLX'), value: 'drivers.driver_name', type: 'input' },
        // { label: tt('Số GPLX'), value: 'drivers.driver_license', type: 'input' },
        // { label: tt('Hạng GPLX'), value: 'drivers.driver_class', type: 'input' },
        // { label: tt('Địa chỉ nơi cư ngụ GPLX'), value: 'drivers.driver_of_residence', type: 'input' },

        // {
        //   label: tt('Được phép nhận cuốc xe'),
        //   value: 'drivers.is_active',
        //   type: 'select',
        //   selectOption: [
        //     { label: tt('Có'), value: 1 },
        //     { label: tt('Không'), value: 0 },
        //   ],
        // },

        // {
        //   label: tt('Loại xe'),
        //   value: 'vehicles.vehicle_type_id',
        //   type: 'select',
        //   selectOption: [
        //     { label: tt('Xe máy'), value: 1 },
        //     { label: tt('Xe ô tô 4 chỗ'), value: 2 },
        //     { label: tt('Xe ô tô 7 chỗ'), value: 3 },
        //   ],
        // },
        // { label: tt('Biển số'), value: 'vehicles.license_plates', type: 'input' },
        // { label: tt('Số đăng ký'), value: 'vehicles.registration_certificate', type: 'input' },
        // {
        //   label: tt('Xe chính chủ'),
        //   value: 'vehicles.is_owner',
        //   type: 'select',
        //   selectOption: [
        //     { label: tt('Có'), value: 1 },
        //     { label: tt('Không'), value: 0 },
        //   ],
        // },

        // {
        //   label: tt('Hãng xe'),
        //   value: 'vehicle_brands.id',
        //   type: 'selectAndSearch',
        //   api: 'api/cmsService/v1/vehicle_brands/search',
        //   // filter: { },
        //   formatData: (data) => {
        //     const array = [];
        //     for (const i of data) {
        //       array.push({
        //         id: i.id,
        //         value: i.id,
        //         label: i.display_name || i.name || i.label,
        //       });
        //     }
        //     return array;
        //   },
        // },

        // {
        //   label: tt('Câu lạc bộ'),
        //   value: 's.id',
        //   type: 'selectAndSearch',
        //   api: '/apps/dabi/api/v1/store/search',
        //   filter: { status: 1 },
        // },
        // { label: tt('Hoa hồng'), value: 'roles.commission', type: 'number' },
        // { label: tt('Thời gian bắt đầu'), value: 'roles.start_date', type: 'date' },
        // { label: tt('Thời gian kết thúc'), value: 'roles.end_date', type: 'date' },
        // {
        //   label: tt('Trạng thái'),
        //   value: 'roles.status',
        //   type: 'select',
        //   selectOption: [
        //     { label: tt('Chưa hoạt động'), value: 1 },
        //     { label: tt('Đang hoạt động'), value: 2 },
        //   ],
        // },
    ].concat(commonFiledDynamicFilter("trips"));

    const listAvailableFilter = [
        {
            id: "0",
            type: "group",
            title: tt("Trạng thái"),
            children: [
                {
                    id: "0_3",
                    value: "0_3",
                    groupId: "0",
                    label: TRIP_STATUS_MAP[7],
                    data: [
                        {
                            id: "status",
                            field: "trips.status",
                            cond: "is",
                            value: 7,
                        },
                    ],
                },
                {
                    id: "0_2",
                    value: "0_2",
                    groupId: "0",
                    label: TRIP_STATUS_MAP[0],
                    data: [
                        {
                            id: "status",
                            field: "trips.status",
                            cond: "is",
                            value: 0,
                        },
                    ],
                },
                {
                    id: "0_6",
                    value: "0_6",
                    groupId: "0",
                    label: TRIP_STATUS_MAP[1],
                    data: [
                        {
                            id: "status",
                            field: "trips.status",
                            cond: "is",
                            value: 1,
                        },
                    ],
                },
                {
                    id: "0_1",
                    value: "0_1",
                    groupId: "0",
                    label: tt("Đang diễn ra"),
                    data: [
                        {
                            id: "status_2",
                            field: "trips.status",
                            cond: "is",
                            value: 2,
                        },
                        {
                            id: "status_3",
                            field: "trips.status",
                            cond: "is",
                            value: 3,
                        },
                        {
                            id: "status_4",
                            field: "trips.status",
                            cond: "is",
                            value: 4,
                        },
                        {
                            id: "status_5",
                            field: "trips.status",
                            cond: "is",
                            value: 5,
                        },
                        {
                            id: "status_6",
                            field: "trips.status",
                            cond: "is",
                            value: 6,
                        },
                    ],
                },
            ],
        },
        {
            id: "5",
            type: "group",
            title: tt("Loại xe"),
            children: [
                {
                    id: "5_1",
                    value: "5_1",
                    groupId: "5",
                    label: VEHICLE_MAP[1],
                    data: [
                        {
                            id: "type",
                            field: "trips.type",
                            cond: "is",
                            value: 1,
                        },
                    ],
                },
                {
                    id: "5_2",
                    value: "5_2",
                    groupId: "5",
                    label: VEHICLE_MAP[2],
                    data: [
                        {
                            id: "type",
                            field: "trips.type",
                            cond: "is",
                            value: 2,
                        },
                    ],
                },
                {
                    id: "5_3",
                    value: "5_3",
                    groupId: "5",
                    label: VEHICLE_MAP[3],
                    data: [
                        {
                            id: "type",
                            field: "trips.type",
                            cond: "is",
                            value: 3,
                        },
                    ],
                },
            ],
        },
        {
            id: "4",
            type: "group",
            title: tt("Lọc chuyến đi kiểm thử"),
            children: [
                {
                    id: "4_1",
                    value: "4_1",
                    groupId: "1",
                    label: tt("Không hiển thị chuyến đi kiểm thử"),
                    data: [
                        {
                            id: "status",
                            field: "trips.is_tester",
                            cond: "is",
                            value: 0,
                        },
                    ],
                },
            ],
        },
        {
            id: "6",
            type: "group",
            title: tt("Khu vực"),
            children: [
                {
                    id: "6_1",
                    value: "6_1",
                    groupId: "6",
                    label: REGION_MAP[1],
                    data: [
                        {
                            id: "region",
                            field: "trips.region_id",
                            cond: "is",
                            value: 1,
                        },
                    ],
                },
                {
                    id: "6_2",
                    value: "6_2",
                    groupId: "6",
                    label: REGION_MAP[2],
                    data: [
                        {
                            id: "region",
                            field: "trips.region_id",
                            cond: "is",
                            value: 2,
                        },
                    ],
                },
                {
                    id: "6_3",
                    value: "6_3",
                    groupId: "6",
                    label: REGION_MAP[3],
                    data: [
                        {
                            id: "region",
                            field: "trips.region_id",
                            cond: "is",
                            value: 3,
                        },
                    ],
                },
            ],
        },
        // {
        //   id: '1',
        //   value: '1',
        //   label: statusMap[0].text,
        //   data: [
        //     {
        //       id: 'status',
        //       field: 'drivers.status',
        //       cond: 'is',
        //       value: 0,
        //     },
        //   ],
        // },
        // {
        //   id: '2',
        //   value: '2',
        //   label: tt('Đang hoạt động'),
        //   data: [
        //     {
        //       id: 'status',
        //       field: 'roles.status',
        //       cond: 'is',
        //       value: 2,
        //     },
        //   ],
        // },
        // {
        //   id: '3',
        //   type: 'divider',
        // },
        // {
        //   id: '4',
        //   type: 'group',
        //   title: tt('Thời gian bắt đầu'),
        //   children: [
        //     {
        //       id: '4_1',
        //       value: '4_1',
        //       label: tt('Hôm nay'),
        //       data: [
        //         {
        //           id: 'start_date',
        //           field: 'roles.start_date',
        //           cond: 'between',
        //           value: getRangeTodayUnix(),
        //         },
        //       ],
        //     },
        //   ],
        // },
        // {
        //   id: '5',
        //   type: 'group',
        //   title: tt('Thời gian kết thúc'),
        //   children: [
        //     {
        //       id: '5_1',
        //       value: '5_1',
        //       label: tt('Hôm nay'),
        //       data: [
        //         {
        //           id: 'end_date',
        //           field: 'roles.end_date',
        //           cond: 'between',
        //           value: getRangeTodayUnix(),
        //         },
        //       ],
        //     },
        //   ],
        // },
    ].concat(commonTimeAvailableDynamicFilter("trips"));

    const handleOnChangeDeSelect = (value, option) => {
        clog("handleOnDeSelect", value, option);
        dispatch(removeDynamicFilterItem(option.id));
    };
    const handleOnChangeClearSelect = () => {
        dispatch(removeAllDynamicFilterItem());
    };

    const handleOnDynamicFilterChange = (data_) => {
        dispatch(addDynamicFilterItem(data_));
    };
    const handleOnAvailableFilterChange = (data_) => {
        dispatch(setDynamicFilterItem(data_));
    };

    const breadcrumbNameMap = {
        // '?view_type=list': '',
    };
    const extraBreadcrumbItems = getBreadcrumb(breadcrumbNameMap);
    const breadcrumbItems = [
        {
            title: <Link to="/cms/trips">{tt("Quản lý chuyến đi")}</Link>,
            key: "product_category_home",
        },
    ].concat(extraBreadcrumbItems);

    const observedDiv = useRef(null);
    const height = useRefDimensions(observedDiv);

    const handleOnPressDownload = async () => {
        const dataToSend = {
            term: formatFilterDynamicToTerm(_dynamicFilter, _search),
            with: [],
            page: 1,
            limit: PAGE_UNLIMIT,
            filter: {},
            order: _order?.order,
            sort: _order?.sort,
        };

        const path = await exportDrivers(dataToSend);
        if (path) {
            const fileUrl = `${path}?token=${
                document.getElementById("myToken")?.value
            }`;
            const link = document.createElement("a");
            link.href = fileUrl;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            showSuccess(tt("Dữ liệu đã được tải về thành công"));
        }
        // return axios
        //   .post(
        //     generateUrl(
        //       'api/cmsService/v1/drivers/exportExcel',
        //     ),
        //     dataToSend,
        //   )
        //   .then((res) => res.data)
        //   .then((data) => {
        //     if (data.success === false) {
        //       return showError(data.error);
        //     }
        //     // window.open(data.data.data.path, '_blank').focus();
        //     const fileUrl = data.data.data.path;
        //     const link = document.createElement('a');
        //     link.href = fileUrl;
        //     document.body.appendChild(link);
        //     link.click();
        //     document.body.removeChild(link);
        //   })
        //   .catch((error) => {
        //     showError(
        //       tt('Không thể thực hiện ngay lúc này, vui lòng thử lại sau'),
        //     );
        //   });
    };
    const handleOk = () => {
        cancelForm
            .validateFields()
            .then(async (values) => {
                setIloading(true);
                const dataToSend = {
                    trip_id: currentTrip?.id,
                    notes: values.notes,
                };

                const rs = await cancelTrip(dataToSend);
                if (rs) {
                    showSuccess(tt("Đã huỷ chuyến thành công"));
                    dispatch(getData());
                    setIsModalOpen(false);
                    setIsConfirmModalOpen(false);
                }
                setIloading(false);
            })
            .catch((info) => {
                clog("Validate Failed:", info);
            });
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const renderModalButtons = () => [
        <Button key="back" onClick={() => setIsConfirmModalOpen(false)}>
            {tt("Đóng")}
        </Button>,

        <Button
            key="submit"
            type="primary"
            loading={isLoading}
            onClick={handleOk}
        >
            {tt("Huỷ chuyến đi")}
        </Button>,
    ];

    return (
        <div className="w-full flex h-screen flex-col">
            <div>
                <div
                    ref={observedDiv}
                    style={{ padding: "10px" }}
                    className="flex-initial"
                >
                    <div className="bp450:grid bp450:grid-cols-2 bp450:gap-4 mb-1.5">
                        <div>
                            <div className="ant-breadcrumb_custom_fontsize">
                                <Breadcrumb items={breadcrumbItems} />
                            </div>
                        </div>
                        <div>
                            <div>
                                <Select
                                    mode="multiple"
                                    allowClear
                                    showSearch
                                    autoClearSearchValue={false}
                                    style={{ width: "100%" }}
                                    className="custom-select-item-ant-full"
                                    placeholder={tt("Tìm theo tên, mã, sđt")}
                                    value={_dynamicFilter}
                                    options={_dynamicFilter}
                                    onDeselect={handleOnChangeDeSelect}
                                    onClear={handleOnChangeClearSelect}
                                    suffixIcon={<SearchOutlined />}
                                    searchValue={tempSearch}
                                    onSearch={handleOnChangeSearch}
                                    popupClassName="hidden"
                                    dropdownRender={null}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="bp950:grid bp950:grid-cols-2 bp950:gap-4">
                        <div>
                            <div className="bp375:grid bp375:grid-cols-2 bp375:gap-4">
                                <div>
                                    {/* <div>
                                        <Button
                                            type="primary"
                                            style={{ marginRight: "8px" }}
                                            onClick={handleOnPressCreate}
                                            className="mb-1.5"
                                        >
                                            {tt("Tạo")}
                                        </Button>
                                    </div> */}
                                    <Dropdown
                                        menu={{
                                            items: initColumns,
                                            selectable: true,
                                            defaultSelectedKeys: initColumns
                                                .filter(
                                                    (column) =>
                                                        column.show !== false
                                                ) // Lọc những cột có sorter không phải là false
                                                .map((item) => item.key),
                                            multiple: true,

                                            onSelect: (value) => {
                                                const filteredColumns =
                                                    initColumns.filter(
                                                        (column) =>
                                                            value.selectedKeys.includes(
                                                                column.key
                                                            )
                                                    );
                                                setColumns(filteredColumns);
                                                clog("change", value);
                                            },
                                            onDeselect: (value) => {
                                                const filteredColumns =
                                                    initColumns.filter(
                                                        (column) =>
                                                            value.selectedKeys.includes(
                                                                column.key
                                                            )
                                                    );
                                                setColumns(filteredColumns);
                                                clog("change", value);
                                            },
                                        }}
                                    >
                                        <Tooltip
                                            title={tt("Lựa chọn hiển thị cột")}
                                        >
                                            <Button
                                                icon={
                                                    <i className="fa fa-table" />
                                                }
                                                className="mr-2"
                                            />
                                        </Tooltip>
                                    </Dropdown>
                                    {myPermissions[
                                        PERMISSIONS_MAP["export-trip"]
                                    ] &&
                                        !hasSelection() && (
                                            <Tooltip title={tt("Xuất file")}>
                                                <Button
                                                    icon={
                                                        <i className="fa fa-download" />
                                                    }
                                                    onClick={
                                                        handleOnPressDownload
                                                    }
                                                />
                                            </Tooltip>
                                        )}
                                    {hasSelection() && (
                                        <div
                                            className="inline-flex"
                                            style={{ height: "32px" }}
                                        >
                                            <div
                                                className="px-1 py-0 m-0 mb-1.5 alert alert-info inline-flex items-center "
                                                style={{ height: "32px" }}
                                            >
                                                <span
                                                    className="mr-1"
                                                    style={{ fontSize: "13px" }}
                                                >
                                                    {`${
                                                        _selectedRows.length
                                                    } ${tt("Đã Chọn")}`}
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                {hasSelection() && (
                                    <div>
                                        <Dropdown
                                            menu={{
                                                items,
                                                onClick: handleMenuClick,
                                            }}
                                            trigger={["click"]}
                                        >
                                            <Button
                                                icon={
                                                    <i className="fa fa-cog" />
                                                }
                                                onClick={(e) =>
                                                    e.preventDefault()
                                                }
                                                className="custom-button-ant-span bp375:float-right mb-1.5"
                                            >
                                                {tt("Tác vụ")}
                                            </Button>
                                        </Dropdown>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div>
                            <div className="bp450:grid bp450:grid-cols-2 bp450:gap-4">
                                <div className="mb-1.5">
                                    <div style={{ display: "flex" }}>
                                        <div className="bpm450:w-screen">
                                            <div
                                                style={{
                                                    backgroundColor: "#F8F9FA",
                                                    display: "flex",
                                                }}
                                            >
                                                <CustomFilter
                                                    className="bpm450:flex-1 bpm450:flex"
                                                    dfListField={listField}
                                                    dfListAvailableFilter={
                                                        listAvailableFilter
                                                    }
                                                    dynamicFilter={
                                                        _dynamicFilter
                                                    }
                                                    onDynamicFilterChange={
                                                        handleOnDynamicFilterChange
                                                    }
                                                    onAvailableFilterChange={
                                                        handleOnAvailableFilterChange
                                                    }
                                                >
                                                    <Button
                                                        className="bpm450:flex-1"
                                                        type="text"
                                                        icon={<FilterFilled />}
                                                    >
                                                        {tt("Bộ lọc")}
                                                    </Button>
                                                </CustomFilter>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="float-right mb-1.5">
                                        <Pagination
                                            size="small"
                                            simple
                                            current={_page}
                                            pageSize={_limit}
                                            onChange={handleOnChangePage}
                                            showSizeChanger={false}
                                            total={_total}
                                            showTotal={showTotal}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex-auto">
                    <Spin spinning={_spinnerSearch}>
                        <CustomTable
                            data={_data}
                            selectedRows={_selectedRows}
                            usageHeight={height}
                            columns={columns}
                        />
                    </Spin>
                </div>
            </div>
            <Modal
                title={tt("Bản đồ chuyến đi")}
                open={isModalOpen}
                onOk={null}
                style={{ top: 20 }}
                width="100vw"
                onCancel={handleCancel}
                footer={null}
                destroyOnClose
            >
                {currentTrip && <MyMap trip={currentTrip} />}
            </Modal>
            <Modal
                title={tt("Xác nhận huỷ chuyến")}
                open={isConfirmModalOpen}
                onOk={null}
                style={{ top: 20 }}
                width="600px"
                onCancel={() => setIsConfirmModalOpen(false)}
                footer={renderModalButtons()}
                destroyOnClose
            >
                {currentTrip && (
                    <CancelForm trip={currentTrip} form={cancelForm} />
                )}
            </Modal>
        </div>
    );
}

export default CustomList;
