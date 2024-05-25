import React, { useCallback, useContext, useRef, useState } from "react";
import {
    Breadcrumb,
    Button,
    Divider,
    Dropdown,
    Modal,
    Pagination,
    Select,
    Spin,
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
    changeSelectedRows,
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
    updateStatus,
} from "../../store/CustomerList";
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
import { PAGE_UNLIMIT } from "../../CONSTANT";
import { exportCustomers } from "../../store/CustomerList/API";
import { PERMISSIONS_MAP } from "../../constants";

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
    const myPermissions = useContext(PermissionsContext).permissions;
    clog("_selectedRows", _selectedRows);

    const items = [
        // {
        //   label: tt('Xuất'),
        //   key: '0',
        // },
        // {
        //     label: tt("Xóa"),
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
        navigate("/cms/employee_list?view_type=form");
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
                    title: tt("Xoá khách hàng"),
                    icon: <ExclamationCircleFilled />,
                    content: `${tt("Bạn có chắc chắn muốn xóa khách hàng")} "${
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

    const handleFormatRoleSearchData = (data) => {
        const array = [];
        for (const i of data) {
            array.push({
                id: i.id,
                value: i.id,
                label: i.display_name || i.name || i.label,
            });
        }
        return array;
    };

    const listField = [
        {
            label: tt("Tên khách hàng"),
            value: "passengers.name",
            type: "input",
        },
        {
            label: tt("Số điện thoại"),
            value: "passengers.phone",
            type: "input",
        },
        {
            label: tt("Email"),
            value: "passengers.email",
            type: "input",
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
        // { label: tt("Thời gian bắt đầu"), value: "roles.start_date", type: "date" },
        // { label: tt("Thời gian kết thúc"), value: "roles.end_date", type: "date" },
        {
            label: tt("Trạng thái"),
            value: "passengers.status",
            type: "select",
            selectOption: [
                { label: tt("Ngưng hoạt động"), value: 0 },
                { label: tt("Đang hoạt động"), value: 1 },
            ],
        },
    ].concat(commonFiledDynamicFilter("passengers"));

    const handleOnPressUpdateStatus = (status) => {
        confirm({
            title:
                _selectedRows[0].status === 1
                    ? tt("Xác nhận ngưng hoạt động")
                    : tt("Xác nhận hoạt động"),
            icon: <ExclamationCircleFilled />,
            content:
                _selectedRows[0].status === 1
                    ? `Bạn có chắc chắn muốn ngưng hoạt động "${
                          _selectedRows[0].name || _selectedRows[0].phone
                      }" ?`
                    : `Bạn có chắc chắn muốn hoạt động "${
                          _selectedRows[0].name || _selectedRows[0].phone
                      }" ?`,
            zIndex: 1050,
            onOk() {
                throttleOnPressAction(submitUpdateStatus, status);
            },
            onCancel() {},
        });
    };

    const submitUpdateStatus = (status) => {
        const dataToSend = {
            id: _selectedRows[0].id,
            status,
        };
        dispatch(updateStatus(dataToSend)).then(({ payload }) => {
            if (payload) {
                navigate("/cms/customers?view_type=list");
                dispatch(changeSelectedRows([]));
            }
        });
    };

    const listAvailableFilter = [
        {
            id: "0",
            type: "group",
            title: tt("Trạng thái"),
            children: [
                {
                    id: "1",
                    value: "1",
                    groupId: "0",
                    label: tt("Ngưng hoạt động"),
                    data: [
                        {
                            id: "status",
                            field: "passengers.status",
                            cond: "is",
                            value: 0,
                        },
                    ],
                },
                {
                    id: "2",
                    value: "2",
                    groupId: "0",
                    label: tt("Đang hoạt động"),
                    data: [
                        {
                            id: "status",
                            field: "passengers.status",
                            cond: "is",
                            value: 1,
                        },
                    ],
                },
            ],
        },
        {
            id: "1",
            type: "group",
            title: tt("Lọc tài khoản kiểm thử"),
            children: [
                {
                    id: "1_1",
                    value: "1_1",
                    groupId: "1",
                    label: tt("Không hiển thị tài khoản kiểm thử"),
                    data: [
                        {
                            id: "status",
                            field: "passengers.is_tester",
                            cond: "is",
                            value: 0,
                        },
                    ],
                },
            ],
        },

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
    ].concat(commonTimeAvailableDynamicFilter("passengers"));

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
                <Link to="/cms/employee_list">
                    {tt("Danh sách khách hàng")}
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
            filter: {},
            order: _order?.order,
            sort: _order?.sort,
        };

        const path = await exportCustomers(dataToSend);
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
    };

    const menuStyle = {
        boxShadow: "none",
        textAlign: "center",
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
                                        "Tìm theo tên mã ref, tên khách hàng, số điện thoại..."
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
                                    {myPermissions[
                                        PERMISSIONS_MAP["export-passenger"]
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
                                                    {/* <Can
                                                        appName={"wallets"}
                                                        p={[
                                                            "wallets-admin-shop-confirm",
                                                        ]}
                                                    > */}
                                                    <div className="p-[4px]">
                                                        <div>
                                                            {myPermissions[
                                                                PERMISSIONS_MAP[
                                                                    "update-passenger"
                                                                ]
                                                            ] && (
                                                                <Button
                                                                    className="w-full"
                                                                    type="text"
                                                                    onClick={() =>
                                                                        handleOnPressUpdateStatus(
                                                                            _selectedRows[0]
                                                                                .status ===
                                                                                1
                                                                                ? 0
                                                                                : 1
                                                                        )
                                                                    }
                                                                >
                                                                    {_selectedRows[0]
                                                                        .status ===
                                                                    1
                                                                        ? tt(
                                                                              "Ngưng hoạt động"
                                                                          )
                                                                        : tt(
                                                                              "Hoạt động"
                                                                          )}
                                                                </Button>
                                                            )}
                                                        </div>
                                                    </div>
                                                    {/* </Can> */}
                                                    <Divider
                                                        style={{
                                                            margin: 0,
                                                        }}
                                                    />
                                                    {React.cloneElement(menu, {
                                                        style: menuStyle,
                                                    })}
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
                        />
                    </Spin>
                </div>
            </div>
        </div>
    );
}

export default CustomList;
