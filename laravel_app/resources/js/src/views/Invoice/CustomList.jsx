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
    FrownOutlined,
    MehOutlined,
    SearchOutlined,
    SmileOutlined,
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
    deleteItem,
    dynamicFilter,
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
} from "../../store/Invoice";
import CustomTable from "./CustomTable";
import CustomFilter from "../../components/Filter/CustomFilter";
import { clog, formatFilterDynamicToTerm, formatNumber, tt } from "../../utils";
import { generateUrl, getBreadcrumb } from "../../utils/function";
import { useRefDimensions } from "../../hook/useRefDimensions";
import {
    commonFiledDynamicFilter,
    commonTimeAvailableDynamicFilter,
} from "../../components/Filter/FilterDynamic/function";
import { requireAdmin } from "../../store";
import { throttleOnPressAction } from "../../hook/throttlePressAcion";
import { PermissionsContext, permission } from "../../store/Permissions";
import { showError } from "../../components/dialogs";
import { dataInvoice } from "./data";
import { formatNgayThang } from "../../utils/dateTime";
import { PERMISSIONS_MAP } from "../../constants";

const { confirm } = Modal;

function CustomList() {
    const _search = useSelector(search);
    const _data = useSelector(data);
    // const _data = dataInvoice;
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
            title: tt("Mã hóa đơn"),
            label: tt("Mã hóa đơn"),
            dataIndex: "reference",
            key: "reference",
            width: 150,
            sorter: true,
            fixed: "left",
            render: (value, item) => <Tag color="orange">{value}</Tag>,
        },
        {
            title: tt("Mã khách hàng"),
            label: tt("Mã khách hàng"),
            dataIndex: "passenger_reference",
            key: "passenger_reference",
            width: 200,
            sorter: true,
            render: (value, item) => (value ? <Tag>{value}</Tag> : <Tag />),
        },
        {
            title: tt("Tên khách hàng"),
            label: tt("Tên khách hàng"),
            dataIndex: "passenger_name",
            key: "passenger_name",
            width: 200,
            sorter: true,
            render: (value, item) => (value ? <div>{value}</div> : <Tag />),
        },
        {
            title: tt("SĐT khách hàng"),
            label: tt("SĐT khách hàng"),
            dataIndex: "passenger_phone",
            key: "passenger_phone",
            width: 200,
            sorter: true,
            render: (value, item) => (value ? <div>{value}</div> : <Tag />),
        },
        {
            title: tt("Mã chuyến đi"),
            label: tt("Mã chuyến đi"),
            dataIndex: "trip_reference",
            key: "trip_reference",
            width: 150,
            sorter: true,
            render: (value, item) => (value ? <Tag>{value}</Tag> : <Tag />),
        },
        {
            title: tt("Thông tin chuyến đi"),
            label: tt("Thông tin chuyến đi"),
            dataIndex: "trip_reference",
            key: "trip_reference",
            width: 500,
            // sorter: true,
            render: (value, item) => {
                if (
                    item?.trip?.trip_locations &&
                    item?.trip?.trip_locations.length > 1
                ) {
                    if (item.is_tester) {
                        return (
                            <Tooltip title={tt("Chuyến đi kiểm thử")}>
                                <div className=" whitespace-normal text-blue-500">
                                    <div
                                        title={
                                            item?.trip?.trip_locations[0]
                                                .address
                                        }
                                    >
                                        <span className=" font-bold">
                                            {tt("Từ: ")}
                                        </span>
                                        <span className="text-blue-300">{`${item?.trip?.trip_locations[0].address}`}</span>
                                    </div>
                                    <div
                                        title={
                                            item?.trip?.trip_locations[1]
                                                .address
                                        }
                                    >
                                        <span className=" font-bold">
                                            {tt("Đến: ")}
                                        </span>
                                        <span className="text-blue-300">{`${item?.trip?.trip_locations[1].address}`}</span>
                                    </div>
                                </div>
                            </Tooltip>
                        );
                    }
                    return (
                        <Tooltip title={tt("Chuyến đi kiểm thử")}>
                            <div className=" whitespace-normal ">
                                <div
                                    title={
                                        item?.trip?.trip_locations[0].address
                                    }
                                >
                                    <span className=" font-bold">
                                        {tt("Từ: ")}
                                    </span>
                                    <span className="text-[#7d7d7d]">{`${item?.trip?.trip_locations[0].address}`}</span>
                                </div>
                                <div
                                    title={
                                        item?.trip?.trip_locations[1].address
                                    }
                                >
                                    <span className=" font-bold">
                                        {tt("Đến: ")}
                                    </span>
                                    <span className="text-[#7d7d7d]">{`${item?.trip?.trip_locations[1].address}`}</span>
                                </div>
                            </div>
                        </Tooltip>
                    );
                }
                return <Tag />;
            },
        },
        {
            title: tt("Khoảng cách"),
            label: tt("Khoảng cách"),
            dataIndex: "total_distance",
            key: "total_distance",
            width: 150,
            sorter: true,
            render: (value, item) =>
                value ? <div>{`${parseFloat(value) / 1000} km`}</div> : <Tag />,
        },
        {
            title: tt("Thời gian"),
            label: tt("Thời gian"),
            dataIndex: "total_duration",
            key: "total_duration",
            width: 150,
            sorter: true,
            render: (value, item) =>
                value ? (
                    <div>{`${Math.floor(parseFloat(value) / 60)} phút`}</div>
                ) : (
                    <Tag />
                ),
        },
        {
            title: tt("Số tiền"),
            label: tt("Số tiền"),
            dataIndex: "total_payment",
            key: "total_payment",
            width: 150,
            sorter: true,
            render: (value, item) => <div>{formatNumber(value)}</div>,
        },
        {
            title: tt("Mã tài xế"),
            label: tt("Mã tài xế"),
            dataIndex: "driver_reference",
            key: "driver_reference",
            width: 150,
            sorter: true,
            render: (value, item) => (value ? <Tag>{value}</Tag> : <Tag />),
        },
        {
            title: tt("Tên tài xế"),
            label: tt("Tên tài xế"),
            dataIndex: "driver_name",
            key: "driver_name",
            width: 150,
            sorter: true,
            render: (value, item) => (value ? <div>{value}</div> : <Tag />),
        },
        {
            title: tt("SĐT tài xế"),
            label: tt("SĐT tài xế"),
            dataIndex: "driver_phone",
            key: "driver_phone",
            width: 150,
            sorter: true,
            render: (value, item) => (value ? <div>{value}</div> : <Tag />),
        },
        {
            title: tt("Loại thanh toán"),
            label: tt("Loại thanh toán"),
            dataIndex: "payment_type",
            key: "payment_type",
            width: 150,
            sorter: true,
            fixed: "right",
            render: (value, item) => {
                const mapType = {
                    1: { color: "green", text: "Tiền mặt" },
                    2: { color: "purple", text: "Momo" },
                    3: { color: "blue", text: "Ngân hàng" },
                    4: { color: "yellow", text: "Visa" },
                    5: { color: "red", text: "Master card" },
                };
                return (
                    <Tag color={mapType[value]?.color}>
                        {mapType[value]?.text}
                    </Tag>
                );
            },
        },
        {
            title: tt("Ngày tạo"),
            dataIndex: "created_at",
            width: 200,
            fixed: "right",
            sorter: true,
            render: (value, item) => <div>{formatNgayThang(value, true)}</div>,
        },
    ];

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
        navigate("/cms/invoices?view_type=form");
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
                    title: tt("Xoá đánh giá"),
                    icon: <ExclamationCircleFilled />,
                    content: `${tt("Bạn có chắc chắn muốn xóa đánh giá")} "${
                        _selectedRows[0].name
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
            label: tt("Mã hóa đơn"),
            value: "invoices.reference",
            type: "input",
        },
        {
            label: tt("Mã chuyến đi"),
            value: "invoices.trip_reference",
            type: "input",
        },
        {
            label: tt("Mã khách hàng"),
            value: "invoices.passenger_reference",
            type: "input",
        },
        {
            label: tt("Tên khách hàng"),
            value: "invoices.passenger_name",
            type: "input",
        },
        {
            label: tt("Số điện thoại khách hàng"),
            value: "invoices.passenger_phone",
            type: "input",
        },
        {
            label: tt("Mã tài xế"),
            value: "invoices.driver_reference",
            type: "input",
        },
        {
            label: tt("Tên tài xế"),
            value: "invoices.driver_name",
            type: "input",
        },
        {
            label: tt("Số điện thoại tài xế"),
            value: "invoices.driver_phone",
            type: "input",
        },
        {
            label: tt("Số tiền"),
            value: "invoices.total_payment",
            type: "number",
        },
        // { label: tt("Tổng giải thưởng"), value: "roles.total_point", type: "number" },
        // { label: tt("Số lượng giải"), value: "roles.quantity", type: "number" },
        // { label: tt("Giá trị giải thưởng"), value: "roles.point", type: "number" },
        // {
        //   label: tt("Câu lạc bộ"),
        //   value: "s.id",
        //   type: "selectAndSearch",
        //   api: "/apps/dabi/api/v1/store/search",
        //   filter: { status: 1 },
        // },
        // { label: tt("Hoa hồng"), value: "roles.commission", type: "number" },
        // { label: tt("Thời gian bắt đầu"), value: "roles.start_date", type: "date" },
        // { label: tt("Thời gian kết thúc"), value: "roles.end_date", type: "date" },
        {
            label: tt("Loại thanh toán"),
            value: "invoices.payment_type",
            type: "select",
            selectOption: [
                { label: tt("Tiền mặt"), value: 1 },
                { label: tt("Momo"), value: 2 },
                { label: tt("Ngân hàng"), value: 3 },
                { label: tt("VISA"), value: 4 },
                { label: tt("Master card"), value: 5 },
            ],
        },
        {
            label: tt("Ngày tạo"),
            value: "invoices.createdat",
            type: "date",
        },
    ].concat(commonFiledDynamicFilter("invoices"));

    const listAvailableFilter = [
        {
            id: "0",
            type: "group",
            title: tt("Loại thanh toán"),
            children: [
                {
                    id: "0_1",
                    value: "0_1",
                    groupId: "0",
                    label: tt("Tiền mặt"),
                    data: [
                        {
                            id: "payment_type",
                            field: "invoices.payment_type",
                            cond: "is",
                            value: 1,
                        },
                    ],
                },
                {
                    id: "0_2",
                    value: "0_2",
                    groupId: "0",
                    label: tt("Momo"),
                    data: [
                        {
                            id: "payment_type",
                            field: "invoices.payment_type",
                            cond: "is",
                            value: 2,
                        },
                    ],
                },
                {
                    id: "0_3",
                    value: "0_3",
                    groupId: "0",
                    label: tt("Ngân hàng"),
                    data: [
                        {
                            id: "payment_type",
                            field: "invoices.payment_type",
                            cond: "is",
                            value: 3,
                        },
                    ],
                },
                {
                    id: "0_4",
                    value: "0_4",
                    groupId: "0",
                    label: tt("VISA"),
                    data: [
                        {
                            id: "payment_type",
                            field: "invoices.payment_type",
                            cond: "is",
                            value: 4,
                        },
                    ],
                },
                {
                    id: "0_5",
                    value: "0_5",
                    groupId: "0",
                    label: tt("Master card"),
                    data: [
                        {
                            id: "payment_type",
                            field: "invoices.payment_type",
                            cond: "is",
                            value: 5,
                        },
                    ],
                },
            ],
        },
        {
            id: "1",
            type: "group",
            title: tt("Lọc hóa đơn kiểm thử"),
            children: [
                {
                    id: "1_1",
                    value: "1_1",
                    groupId: "1",
                    label: tt("Không hiển thị tài khoản kiểm thử"),
                    data: [
                        {
                            id: "status",
                            field: "invoices.is_tester",
                            cond: "is",
                            value: 0,
                        },
                    ],
                },
            ],
        },
    ].concat(commonTimeAvailableDynamicFilter("invoices"));

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
            title: <Link to="/cms/Invoices">{tt("Danh sách chứng từ")}</Link>,
            key: "product_category_home",
        },
    ].concat(extraBreadcrumbItems);

    const observedDiv = useRef(null);
    const height = useRefDimensions(observedDiv);

    const handleOnPressDownload = () => {
        const dataToSend = {
            term: formatFilterDynamicToTerm(_dynamicFilter, _search),
            filter: {},
            order: _order?.order,
            sort: _order?.sort,
        };
        const config = {
            headers: {
                Authorization: `Bearer ${
                    document.getElementById("myToken")?.value
                }`,
            },
        };
        return axios
            .post(
                generateUrl("api/cmsService/v1/invoices/exportExcel"),
                dataToSend,
                config
            )
            .then((res) => res.data)
            .then((data) => {
                if (data.success === false) {
                    return showError(data.error);
                }
                // window.open(data.data.data.path, '_blank').focus();
                const fileUrl = data.data;
                const link = document.createElement("a");
                link.href = `${fileUrl}?token=${
                    document.getElementById("myToken")?.value
                }`;
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

    useEffect(() => {
        setColumns(initColumns.filter((column) => column.show !== false));
    }, []);

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
                                        "Tìm theo mã hóa đơn, tên  KH, Số điện thoại KH, mã chuyến đi, tên tài xế..."
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
                                                clog(
                                                    "filteredColumns",
                                                    filteredColumns
                                                );
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
                                                clog(
                                                    "filteredColumns",
                                                    filteredColumns
                                                );
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
                                        PERMISSIONS_MAP["export-invoice"]
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
                                            showSizeChanger={false}
                                            onChange={handleOnChangePage}
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
