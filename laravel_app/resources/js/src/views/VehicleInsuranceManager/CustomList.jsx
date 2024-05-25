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
    ExclamationCircleFilled,
    FilterFilled,
    SearchOutlined,
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
} from "../../store/VehicleInsuranceManager";
import CustomTable from "./CustomTable";
import CustomFilter from "../../components/Filter/CustomFilter";
import { clog, formatFilterDynamicToTerm, formatNumber, tt } from "../../utils";
import { getBreadcrumb } from "../../utils/function";
import { useRefDimensions } from "../../hook/useRefDimensions";
import {
    commonFiledDynamicFilter,
    commonTimeAvailableDynamicFilter,
} from "../../components/Filter/FilterDynamic/function";
import { requireAdmin } from "../../store";
import { throttleOnPressAction } from "../../hook/throttlePressAcion";
import { PermissionsContext, permission } from "../../store/Permissions";
import { showError, showSuccess } from "../../components/dialogs";
import { formatNgayThang } from "../../utils/dateTime";
import { PAGE_UNLIMIT } from "../../CONSTANT";
import {
    exportVehicles,
    exportVehiclesInsurance,
} from "../../store/VehicleInsuranceManager/API";
import {
    PERMISSIONS_MAP,
    VEHICLE_MAP,
    VEHICLE_MAP_W_COLOR,
} from "../../constants";

const { confirm } = Modal;

function CustomList() {
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
            title: tt("Mã tài xế"),
            label: tt("Mã tài xế"),
            key: "driver_reference",
            dataIndex: "driver_reference",
            width: 150,

            sorter: false,
            render: (value, item) => <Tag>{value}</Tag>,
        },
        {
            title: tt("Tên tài xế"),
            label: tt("Tên tài xế"),
            key: "owner_name",
            dataIndex: "owner_name",
            width: 200,

            sorter: false,
            render: (value, item) =>
                value ? (
                    <div className=" whitespace-normal">{value}</div>
                ) : (
                    <Tag />
                ),
        },
        {
            title: tt("Số điện thoại"),
            label: tt("Số điện thoại"),
            key: "driver_phone",
            dataIndex: "driver_phone",
            width: 80,

            sorter: false,
            render: (value, item) =>
                value ? (
                    <div className=" whitespace-normal">{value}</div>
                ) : (
                    <Tag />
                ),
        },
        {
            title: tt("Biển số"),
            label: tt("Biển số"),
            key: "license_plates",
            dataIndex: "license_plates",
            width: 80,

            sorter: false,
            render: (value, item) =>
                value ? (
                    <div className=" whitespace-normal">{value}</div>
                ) : (
                    <Tag />
                ),
        },
        {
            title: tt("Số đăng ký"),
            label: tt("Số đăng ký"),
            key: "registration_certificate",
            dataIndex: "registration_certificate",
            width: 120,

            sorter: false,
            render: (value, item) =>
                value ? (
                    <div className=" whitespace-normal">{value}</div>
                ) : (
                    <Tag />
                ),
        },
        {
            title: tt("Hãng xe"),
            label: tt("Hãng xe"),
            key: "brand_name",
            dataIndex: "brand_name",
            width: 120,

            sorter: false,
            render: (value, item) =>
                value ? (
                    <div className=" whitespace-normal">{value}</div>
                ) : (
                    <Tag />
                ),
        },
        {
            title: tt("Dòng xe"),
            label: tt("Dòng xe"),
            key: "model_name",
            dataIndex: "model_name",
            width: 120,

            sorter: false,
            render: (value, item) =>
                value ? (
                    <div className=" whitespace-normal">{value}</div>
                ) : (
                    <Tag />
                ),
        },
        {
            title: tt("Màu xe"),
            label: tt("Màu xe"),
            key: "color",
            dataIndex: "color",
            width: 120,

            sorter: false,
            render: (value, item) =>
                value ? (
                    <div className=" whitespace-normal">{value}</div>
                ) : (
                    <Tag />
                ),
        },
        {
            title: tt("Loại xe"),
            label: tt("Loại xe"),
            key: "vehicle_type_id",
            dataIndex: "vehicle_type_id",
            width: 80,
            show: true,
            sorter: false,
            render: (value, item) => {
                if (value) {
                    return (
                        <Tag color={VEHICLE_MAP_W_COLOR[value].color}>
                            {VEHICLE_MAP_W_COLOR[value].text}
                        </Tag>
                    );
                }
                return <Tag />;
            },
        },
        {
            title: tt("Năm sản xuất"),
            label: tt("Năm sản xuất"),
            key: "model_years",
            dataIndex: "model_years",
            width: 120,

            sorter: false,
            render: (value, item) =>
                value ? (
                    <div className=" whitespace-normal">{value}</div>
                ) : (
                    <Tag />
                ),
        },
        {
            title: tt("Số khung"),
            label: tt("Số khung"),
            key: "frame_number",
            dataIndex: "frame_number",
            width: 120,

            sorter: false,
            render: (value, item) =>
                value ? (
                    <div className=" whitespace-normal">{value}</div>
                ) : (
                    <Tag />
                ),
        },
        {
            title: tt("Số máy"),
            label: tt("Số máy"),
            key: "engine_number",
            dataIndex: "engine_number",
            width: 120,

            sorter: false,
            render: (value, item) =>
                value ? (
                    <div className=" whitespace-normal">{value}</div>
                ) : (
                    <Tag />
                ),
        },

        {
            title: tt("Ngày hết hạn BHTNDS"),
            label: tt("Ngày hết hạn BHTNDS"),
            key: "insurance_civil_accident_date",
            dataIndex: "insurance_civil_accident_date",
            width: 100,

            // sorter: true,
            render: (value, item) =>
                value !== null ? (
                    <div className=" whitespace-normal">
                        {formatNgayThang(value)}
                    </div>
                ) : (
                    <Tag />
                ),
        },
        {
            title: tt("Giá trị BHTNDS"),
            label: tt("Giá trị BHTNDS"),
            key: "insurance_civil_accident_price",
            dataIndex: "insurance_civil_accident_price",
            width: 100,

            // sorter: true,
            render: (value, item) =>
                value !== null ? (
                    <div className=" whitespace-normal">
                        {formatNumber(value)}
                    </div>
                ) : (
                    <Tag />
                ),
        },
        {
            title: tt("Ngày hết hạn BHVCX"),
            label: tt("Ngày hết hạn BHVCX"),
            key: "insurance_vehicle_material_date",
            dataIndex: "insurance_vehicle_material_date",
            width: 100,

            // sorter: true,
            render: (value, item) =>
                value !== null ? (
                    <div className=" whitespace-normal">
                        {formatNgayThang(value)}
                    </div>
                ) : (
                    <Tag />
                ),
        },
        {
            title: tt("Giá trị BHVCX"),
            label: tt("Giá trị BHVCX"),
            key: "insurance_vehicle_material_price",
            dataIndex: "insurance_vehicle_material_price",
            width: 100,

            // sorter: true,
            render: (value, item) =>
                value !== null ? (
                    <div className=" whitespace-normal">
                        {formatNumber(value)}
                    </div>
                ) : (
                    <Tag />
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
        {
            label: tt("Biển kiểm soát"),
            value: "vehicles.license_plates",
            type: "input",
        },
        {
            label: tt("Số đăng kiểm"),
            value: "vehicles.registration_certificate",
            type: "input",
        },
        {
            label: tt("Số khung"),
            value: "vehicles.frame_number",
            type: "input",
        },
        {
            label: tt("Số máy"),
            value: "vehicles.engine_number",
            type: "input",
        },
        {
            label: tt("Thương hiệu"),
            value: "vehicles.brand_name",
            type: "input",
        },
        {
            label: tt("Nhãn hiệu"),
            value: "vehicles.model_name",
            type: "input",
        },
        {
            label: tt("	Ngày hết hạn BHTNDS"),
            value: "vehicles.insurance_civil_accident_date",
            type: "date",
        },
        {
            label: tt("Ngày hết hạn BHVCX"),
            value: "vehicles.insurance_vehicle_material_date",
            type: "date",
        },
        {
            label: tt("Ngày tạo"),
            value: "vehicles.created_at",
            type: "date",
        },

        // { label: tt('Mã hành khách'), value: 'trips.passenger_reference', type: 'input' },
        // { label: tt('SĐT hành khách'), value: 'trips.passenger_phone', type: 'input' },
        // { label: tt('Mã BHHT'), value: 'trips.req_code', type: 'input' },
        // {
        //   label: tt('Loại xe'),
        //   value: 'trips.type',
        //   type: 'select',
        //   selectOption: [
        //     { label: VEHICLE_MAP[1], value: 1 },
        //     { label: VEHICLE_MAP[2], value: 2 },
        //     { label: VEHICLE_MAP[3], value: 3 },
        //   ],
        // },
        // {
        //   label: tt('Trạng thái'),
        //   value: 'trips.status',
        //   type: 'select',
        //   selectOption: [
        //     { label: TRIP_STATUS_MAP_W_COLOR[0].text, value: 0 },
        //     { label: TRIP_STATUS_MAP_W_COLOR[1].text, value: 1 },
        //     { label: TRIP_STATUS_MAP_W_COLOR[2].text, value: 2 },
        //     { label: TRIP_STATUS_MAP_W_COLOR[3].text, value: 3 },
        //     { label: TRIP_STATUS_MAP_W_COLOR[4].text, value: 4 },
        //     { label: TRIP_STATUS_MAP_W_COLOR[5].text, value: 5 },
        //     { label: TRIP_STATUS_MAP_W_COLOR[6].text, value: 6 },
        //     { label: TRIP_STATUS_MAP_W_COLOR[7].text, value: 7 },
        //   ],
        // },
        // { label: tt('Ngày tạo'), value: 'trips.created_at', type: 'date' },
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
    ].concat(commonFiledDynamicFilter("vehicles"));

    const listAvailableFilter = [
        {
            id: "1",
            value: "1",
            groupId: "0",
            label: VEHICLE_MAP[1],
            data: [
                {
                    id: "vehicle_type_id",
                    field: "vehicles.vehicle_type_id",
                    cond: "is",
                    value: 1,
                },
            ],
        },
        {
            id: "2",
            value: "2",
            groupId: "0",
            label: VEHICLE_MAP[2],
            data: [
                {
                    id: "vehicle_type_id",
                    field: "vehicles.vehicle_type_id",
                    cond: "is",
                    value: 2,
                },
            ],
        },
        {
            id: "3",
            value: "3",
            groupId: "0",
            label: VEHICLE_MAP[3],
            data: [
                {
                    id: "vehicle_type_id",
                    field: "vehicles.vehicle_type_id",
                    cond: "is",
                    value: 3,
                },
            ],
        },
    ].concat(commonTimeAvailableDynamicFilter("vehicles"));

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
            title: (
                <Link to="/cms/vehicles_insurance">
                    {tt("Thời hạn bảo hiểm")}
                </Link>
            ),
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
            filter: { status: 1 },
            order: _order?.order,
            sort: _order?.sort,
        };
        const path = await exportVehiclesInsurance(dataToSend);
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
        return axios
            .post(
                generateUrl("api/cmsService/v1/drivers/exportExcel"),
                dataToSend
            )
            .then((res) => res.data)
            .then((data) => {
                if (data.success === false) {
                    return showError(data.error);
                }
                // window.open(data.data.data.path, '_blank').focus();
                const fileUrl = data.data.data.path;
                const link = document.createElement("a");
                link.href = fileUrl;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            })
            .catch((error) => {
                showError(
                    tt("Không thể thực hiện ngay lúc này, vui lòng thử lại sau")
                );
            });
    };

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
                                    placeholder={tt(
                                        "Tìm theo biển kiểm soát..."
                                    )}
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
                                        PERMISSIONS_MAP["export-vehicle"]
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
        </div>
    );
}

export default CustomList;
