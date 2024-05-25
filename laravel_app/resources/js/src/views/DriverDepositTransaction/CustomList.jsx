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
    Divider,
    Dropdown,
    Form,
    Input,
    Modal,
    Pagination,
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
    confirmRequest,
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
} from "../../store/DriverDepositTransaction";
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
import { formatNgayThang } from "../../utils/dateTime";
import { PERMISSIONS_MAP } from "../../constants";
import {
    removeAllDynamicFilterItem as removeAllDynamicFilterItemNewDriver,
    addDynamicFilterItem as addDynamicFilterItemNewDriver,
} from "../../store/NewDriverManager";
import {
    removeAllDynamicFilterItem as removeAllDynamicFilterItemActiveDriver,
    addDynamicFilterItem as addDynamicFilterItemActiveDriver,
} from "../../store/ActiveDriverManager";

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
    const [notes, setNotes] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const myPermissions = useContext(PermissionsContext).permissions;

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const availableColors = [
        "magenta",
        "red",
        "volcano",
        "orange",
        "gold",
        "lime",
        "green",
        "cyan",
        "blue",
        "geekblue",
        "purple",
    ];

    const mapStatus = {
        4: {
            color: "red",
        },
        3: {
            color: "success",
        },
        2: {
            color: "blue",
        },
        1: {
            color: "",
        },
    };

    const initColumns = [
        {
            title: tt("Mã ref"),
            dataIndex: "reference",
            label: tt("Mã ref"),
            key: "reference",
            width: 180,
            fixed: "left",
            sorter: true,
            render: (value, item) => <Tag color="orange">{value}</Tag>,
        },
        {
            title: tt("Tên tài xế/Số điện thoại"),
            dataIndex: "driver_name",
            label: tt("Tên tài xế/Số điện thoại"),
            key: "driver_name",
            //   width: 300,
            sorter: true,
            render: (value, item) => (
                <div>
                    <a onClick={(e) => handleOnClickDriverName(e, item)}>
                        <div
                            style={{
                                fontSize: "13px",
                            }}
                        >
                            {item?.driver_phone || ""}
                        </div>
                        <div
                            style={{
                                fontSize: "12px",
                                color: "#888",
                            }}
                        >
                            {item?.driver_name || ""}
                        </div>
                    </a>
                </div>
            ),
        },
        {
            title: tt("Định danh tài xế"),
            dataIndex: "driver_reference",
            label: tt("Định danh tài xế"),
            key: "driver_reference",
            width: 170,
            show: true,
            sorter: true,
            render: (value, item) => <Tag color="orange">{value}</Tag>,
        },
        {
            title: tt("Số tiền"),
            dataIndex: "total_paid",
            label: tt("Số tiền"),
            key: "total_paid",
            width: 120,
            sorter: true,
            render: (value, item) => formatNumber(value),
        },
        // {
        //   title: tt('Người tạo'),
        //   dataIndex: 'created_by_name',
        //   label: tt('Người tạo'),
        //   key: 'created_by_name',
        //   // width: 150,
        //   sorter: true,
        //   render: (value, item) =>
        //     (value ? <div className="truncate">{value}</div> : <Tag />),
        // },
        // {
        //   title: tt('Người xác nhận'),
        //   dataIndex: 'confirmed_name',
        //   label: tt('Người xác nhận'),
        //   key: 'confirmed_name',
        //   // width: 150,
        //   sorter: true,
        //   render: (value, item) =>
        //     (value ? <div className="truncate">{value}</div> : <Tag />),
        // },
        {
            title: tt("Loại thanh toán"),
            dataIndex: "type",
            label: tt("Loại thanh toán"),
            key: "type",
            width: 200,
            sorter: true,
            render: (value, item) =>
                item.type ? (
                    <Tag color={availableColors[item.type]}>
                        {item?.type_name}
                    </Tag>
                ) : (
                    <Tag />
                ),
        },

        {
            title: tt("Tài khoản nhận"),
            dataIndex: "account_number",
            label: tt("Tài khoản nhận"),
            key: "account_number",
            width: 150,
            sorter: true,
            render: (account_number, item) => account_number || <Tag />,
        },
        {
            title: tt("Mã giao dịch "),
            dataIndex: "transaction_code",
            label: tt("Mã giao dịch"),
            key: "transaction_code",
            width: 150,
            sorter: true,
            render: (transaction_code, item) =>
                transaction_code ? <Tag>{transaction_code}</Tag> : <Tag />,
        },
        {
            title: tt("Thời gian giao dịch"),
            dataIndex: "transaction_date",
            label: tt("Thời gian giao dịch"),
            key: "transaction_date",
            width: 150,
            sorter: true,
            render: (transaction_date, item) =>
                transaction_date ? (
                    formatNgayThang(transaction_date, true)
                ) : (
                    <Tag />
                ),
        },
        {
            title: tt("Ngày tạo phiếu"),
            dataIndex: "created_at",
            label: tt("Ngày tạo phiếu"),
            key: "created_at",
            width: 150,
            sorter: true,
            render: (value, item) => formatNgayThang(value, true),
        },
        // {
        //   title: tt('Trạng thái'),
        //   dataIndex: 'status',
        //   label: tt('Trạng thái'),
        //   key: 'status',
        //   width: 150,
        //   sorter: true,
        //   render: (value, item) => (
        //     <div
        //       style={{ fontSize: '10px', color: 'red' }}
        //       className="text-center text-sx"
        //     >
        //       <Tag color={mapStatus[value]?.color}>
        //         {item?.status_name}
        //       </Tag>
        //       {value === 4 && (
        //         <div className="mt-1">
        //           <span style={{ marginRight: '5px' }}>
        //             {`${tt('Lý do')} :`}
        //           </span>
        //           <span className="whitespace-pre-wrap">
        //             {item.notes}
        //           </span>
        //         </div>
        //       )}
        //     </div>
        //   ),
        // },
    ];

    useEffect(() => {
        setColumns(initColumns.filter((column) => column.show !== false));
    }, []);

    const items = [
        // {
        //   label: tt('Xuất'),
        //   key: '0',
        // },
        // {
        //     label: tt("Xoá"),
        //     key: "1",
        // },
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
        navigate("/cms/driverDepositTransaction?view_type=form");
    };

    const submitDelete = () => {
        requireAdmin().then(() => {
            dispatch(deleteItem());
        });
    };

    const handleAccept = () => {
        confirm({
            title: tt("Bạn có chắc chắn muốn xác nhận?"),
            icon: <ExclamationCircleFilled />,
            content: `${tt("Bán có muốn xác nhận phiếu đặt cọc cho tài xế")} ${
                _selectedRows[0].driver_name || _selectedRows[0].driver_phone
            }`,
            onOk() {
                dispatch(
                    confirmRequest({
                        id: _selectedRows[0].id,
                        status: 3,
                        notes: "",
                    })
                );
            },
            onCancel() {},
        });
    };

    const handleOnClickDriverName = (e, item) => {
        e.stopPropagation();
        if (item?.driver?.status === 5 || item?.driver?.status === 0) {
            if (item?.driver_phone) {
                dispatch(removeAllDynamicFilterItemActiveDriver());
                dispatch(
                    addDynamicFilterItemActiveDriver({
                        id: "1",
                        value: "1",
                        label: `${tt("Số điện thoại tài xế")} ${tt("là")} ${
                            item?.driver_phone
                        }`,
                        data: [
                            {
                                id: "phone",
                                field: "drivers.phone",
                                cond: "is",
                                value: item?.driver_phone,
                            },
                        ],
                    })
                );
                navigate("/cms/drivers_active?view_type=list");
            }
        } else {
            if (item?.driver_phone) {
                dispatch(removeAllDynamicFilterItemNewDriver());
                dispatch(
                    addDynamicFilterItemNewDriver({
                        id: "1",
                        value: "1",
                        label: `${tt("Số điện thoại tài xế")} ${tt("là")} ${
                            item?.driver_phone
                        }`,
                        data: [
                            {
                                id: "phone",
                                field: "drivers.phone",
                                cond: "is",
                                value: item?.driver_phone,
                            },
                        ],
                    })
                );
                navigate("/cms/drivers_new?view_type=list");
            }
        }
    };
    // const handleAccept = () => {
    //     confirm({
    //         title: tt("Bạn có chắc chắn muốn hủy?"),
    //         icon: <ExclamationCircleFilled />,
    //         content: `${tt(
    //             "Bán có muốn hủy phiếu đặt cọc của tài xế"
    //         )} ${
    //             _selectedRows[0].driver_name || _selectedRows[0].driver_phone
    //         }`,
    //         onOk() {
    //
    //         },
    //         onCancel() {},
    //     });
    // };

    const handleMenuClick = (e) => {
        switch (e.key) {
            case "0":
                break;
            case "1":
                confirm({
                    title: tt("Xoá phiếu đặt cọc"),
                    icon: <ExclamationCircleFilled />,
                    content: `${tt(
                        "Bạn có chắc chắn muốn xóa phiếu đặt cọc"
                    )} "${_selectedRows[0].name}" ?`,
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
            label: tt("Tên tài xế"),
            value: "deposit_invoices.driver_name",
            type: "input",
        },
        {
            label: tt("Số điện thoại tài xế"),
            value: "deposit_invoices.driver_phone",
            type: "input",
        },
        {
            label: tt("Số tiền"),
            value: "deposit_invoices.total_paid",
            type: "number",
        },
        // {
        //   label: tt('Người tạo'),
        //   value: 'deposit_invoices.created_by_name',
        //   type: 'number',
        // },
        // {
        //   label: tt('Người xác nhận'),
        //   value: 'deposit_invoices.confirmed_name',
        //   type: 'number',
        // },
        {
            label: tt("Loại thanh toán"),
            value: "deposit_invoices.type",
            type: "select",
            selectOption: [
                { label: tt("Tiền mặt"), value: 1 },
                { label: tt("Ngân hàng"), value: 2 },
                { label: tt("Thẻ visa"), value: 3 },
            ],
        },
        // { label: tt("Mã ref"), value: "roles.reference", type: "input" },
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
        {
            label: tt("Ngày tạo phiếu"),
            value: "deposit_invoices.created_at",
            type: "time",
        },
        {
            label: tt("Tài khoản nhận"),
            value: "deposit_invoices.account_number",
            type: "input",
        },
        {
            label: tt("Mã giao dịch"),
            value: "deposit_invoices.transaction_code",
            type: "input",
        },
        {
            label: tt("Ngày giao dịch"),
            value: "deposit_invoices.transaction_date",
            type: "time",
        },
        // {
        // { label: tt("Thời gian kết thúc"), value: "roles.end_date", type: "date" },
        // {
        //   label: tt('Trạng thái'),
        //   value: 'deposit_invoices.status',
        //   type: 'select',
        //   selectOption: [
        //     { label: tt('Nháp'), value: 1 },
        //     { label: tt('Mới tạo'), value: 2 },
        //     { label: tt('Đã xác nhận'), value: 3 },
        //     { label: tt('Đã hủy'), value: 4 },
        //   ],
        // },
    ].concat(commonFiledDynamicFilter("deposit_invoices"));

    const listAvailableFilter = [
        // {
        //   id: '0',
        //   type: 'group',
        //   title: tt('Trạng thái'),
        //   children: [
        //     {
        //       id: '0_7',
        //       value: '0_7',
        //       groupId: '0',
        //       label: tt('Mới tạo'),
        //       data: [
        //         {
        //           id: 'status7',
        //           field: 'deposit_invoices.status',
        //           cond: 'is',
        //           value: 2,
        //         },
        //       ],
        //     },
        //     {
        //       id: '0_1',
        //       value: '0_1',
        //       groupId: '0',
        //       label: tt('Đã xác nhận'),
        //       data: [
        //         {
        //           id: 'status1',
        //           field: 'deposit_invoices.status',
        //           cond: 'is',
        //           value: 3,
        //         },
        //       ],
        //     },
        //     {
        //       id: '0_2',
        //       value: '0_2',
        //       groupId: '0',
        //       label: tt('Đã hủy'),
        //       data: [
        //         {
        //           id: 'status2',
        //           field: 'deposit_invoices.status',
        //           cond: 'is',
        //           value: 4,
        //         },
        //       ],
        //     },
        //   ],
        // },
        // {
        //   id: '1',
        //   value: '1',
        //   label: tt('Mới tạo'),
        //   data: [
        //     {
        //       id: 'status',
        //       field: 'deposit_invoices.status',
        //       cond: 'is',
        //       value: 2,
        //     },
        //   ],
        // },
        // {
        //   id: '2',
        //   value: '2',
        //   label: tt('Đã xác nhận'),
        //   data: [
        //     {
        //       id: 'status',
        //       field: 'deposit_invoices.status',
        //       cond: 'is',
        //       value: 3,
        //     },
        //   ],
        // },
        // {
        //   id: '3',
        //   value: '3',
        //   label: tt('Đã hủy'),
        //   data: [
        //     {
        //       id: 'status',
        //       field: 'deposit_invoices.status',
        //       cond: 'is',
        //       value: 4,
        //     },
        //   ],
        // },
        // {
        //   id: "3",
        //   type: "divider",
        // },
        // {
        //   id: "4",
        //   type: "group",
        //   title: tt("Thời gian bắt đầu"),
        //   children: [
        //     {
        //       id: "4_1",
        //       value: "4_1",
        //       label: tt("Hôm nay"),
        //       data: [
        //         {
        //           id: "start_date",
        //           field: "roles.start_date",
        //           cond: "between",
        //           value: getRangeTodayUnix(),
        //         },
        //       ],
        //     },
        //   ],
        // },
        // {
        //   id: "5",
        //   type: "group",
        //   title: tt("Thời gian kết thúc"),
        //   children: [
        //     {
        //       id: "5_1",
        //       value: "5_1",
        //       label: tt("Hôm nay"),
        //       data: [
        //         {
        //           id: "end_date",
        //           field: "roles.end_date",
        //           cond: "between",
        //           value: getRangeTodayUnix(),
        //         },
        //       ],
        //     },
        //   ],
        // },
    ].concat(commonTimeAvailableDynamicFilter("deposit_invoices"));

    const handleOnChangeDeSelect = (value, option) => {
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
                <Link to="/cms/driverDepositTransaction">
                    {tt("Danh sách phiếu thu")}
                </Link>
            ),
            key: "product_category_home",
        },
    ].concat(extraBreadcrumbItems);

    const observedDiv = useRef(null);
    const height = useRefDimensions(observedDiv);

    const handleOnPressDownload = () => {
        const dataToSend = {
            term: formatFilterDynamicToTerm(_dynamicFilter, _search),
            filter: {},
            with: [],
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
                generateUrl("api/cmsService/v1/deposit_invoice/exportExcel"),
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
                link.target = "_blank";
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

    const menuStyle = {
        boxShadow: "none",
        textAlign: "center",
    };

    const onChange = (e) => {
        setNotes(e.target.value);
    };

    const handleOk = () => {
        dispatch(
            confirmRequest({
                id: _selectedRows[0].id,
                status: 4,
                notes,
            })
        );
        setIsModalOpen(false);
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
                                        "Tìm theo tên mã ref, tài xế, số điện thoại..."
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
                                    <div>
                                        {/* <Button
                                            type="primary"
                                            style={{ marginRight: "8px" }}
                                            onClick={handleOnPressCreate}
                                            className="mb-1.5"
                                        >
                                            {tt("Tạo")}
                                        </Button> */}
                                        <Dropdown
                                            menu={{
                                                items: initColumns,
                                                selectable: true,
                                                defaultSelectedKeys: initColumns
                                                    .filter(
                                                        (column) =>
                                                            column.show !==
                                                            false
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
                                                },
                                            }}
                                        >
                                            <Tooltip
                                                title={tt(
                                                    "Lựa chọn hiển thị cột"
                                                )}
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
                                            PERMISSIONS_MAP[
                                                "export-deposit-invoice"
                                            ]
                                        ] &&
                                            !hasSelection() && (
                                                <Tooltip
                                                    title={tt("Xuất file")}
                                                >
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
                                    </div>

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
                                {myPermissions[
                                    PERMISSIONS_MAP["update-deposit-invoice"]
                                ] &&
                                    hasSelection() && (
                                        <div>
                                            <Dropdown
                                                menu={{
                                                    items,
                                                    onClick: handleMenuClick,
                                                }}
                                                trigger={["click"]}
                                                dropdownRender={(menu) => (
                                                    <div
                                                        style={{
                                                            backgroundColor:
                                                                "#ffffff",
                                                            borderRadius: 3,
                                                            boxShadow:
                                                                " 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05)",
                                                        }}
                                                    >
                                                        <div className="p-[4px]">
                                                            <div>
                                                                <Button
                                                                    className="w-full"
                                                                    type="text"
                                                                    onClick={
                                                                        handleAccept
                                                                    }
                                                                    disabled={
                                                                        _selectedRows.length >
                                                                        1
                                                                    }
                                                                >
                                                                    {tt(
                                                                        "Xác nhận"
                                                                    )}
                                                                </Button>
                                                            </div>
                                                            <div>
                                                                <Button
                                                                    className="w-full"
                                                                    type="text"
                                                                    onClick={
                                                                        showModal
                                                                    }
                                                                    disabled={
                                                                        _selectedRows.length >
                                                                        1
                                                                    }
                                                                >
                                                                    {tt("Huỷ")}
                                                                </Button>
                                                            </div>
                                                        </div>
                                                        <Divider
                                                            style={{
                                                                margin: 0,
                                                            }}
                                                        />
                                                        {React.cloneElement(
                                                            menu,
                                                            {
                                                                style: menuStyle,
                                                            }
                                                        )}
                                                    </div>
                                                )}
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
            <Modal
                title="Ghi chú"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                zIndex={9999}
            >
                <Form>
                    <Form.Item
                        // validateStatus="error"
                        hasFeedback
                        help="Lưu ý: nếu hủy muốn yêu cầu cần lý do để hủy"
                    >
                        <Input.TextArea allowClear onChange={onChange} />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default CustomList;
