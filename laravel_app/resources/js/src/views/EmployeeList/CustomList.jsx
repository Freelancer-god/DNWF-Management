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
} from "../../store/EmployeeList";
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
import { showError } from "../../components/dialogs";
import { PERMISSIONS_MAP } from "../../constants";
import { formatNgayThang } from "../../utils/dateTime";

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
    const [colorMap, setColorMap] = useState({});
    const myPermissions = useContext(PermissionsContext).permissions;
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
        0: {
            color: "red",
            text: "Ngưng hoạt dộng",
        },
        1: {
            color: "success",
            text: "Đang hoạt động",
        },
    };

    const initColumns = [
        {
            title: tt("Mã ref"),
            dataIndex: "reference",
            label: tt("Mã ref"),
            key: "reference",
            width: 120,
            sorter: true,
            render: (value, item) => <Tag color="orange">{value}</Tag>,
        },
        {
            title: tt("Tên nhân viên"),
            dataIndex: "name",
            label: tt("Tên nhân viên"),
            key: "name",
            width: 300,
            sorter: true,
            render: (value, item) => <div>{value}</div>,
        },
        {
            title: tt("Tên đăng nhập"),
            dataIndex: "username",
            label: tt("Tên đăng nhập"),
            key: "username",
            // width: 150,
            sorter: true,
            render: (value, item) => value,
        },
        {
            title: tt("Email"),
            dataIndex: "email",
            label: tt("Email"),
            key: "email",
            // width: 150,
            sorter: true,
            render: (value, item) => <div className="truncate">{value}</div>,
        },
        {
            title: tt("Vai trò"),
            dataIndex: "role",
            label: tt("Vai trò"),
            key: "role",
            // width: 150,
            sorter: true,
            render: (value, item) =>
                item.role ? (
                    <Tag color={availableColors[item.role.id]}>
                        {item.role.name}
                    </Tag>
                ) : (
                    <Tag />
                ),
        },
        {
            title: tt("Trạng thái"),
            dataIndex: "status",
            label: tt("Trạng thái"),
            key: "status",
            // width: 150,
            sorter: true,
            render: (value, item) => (
                <Tag color={mapStatus[value].color}>
                    {mapStatus[value].text}
                </Tag>
            ),
        },
        {
            title: tt("Ngày cập nhật"),
            dataIndex: "updated_at",
            label: tt("Ngày cập nhật"),
            key: "updated_at",
            // width: 150,
            sorter: true,
            render: (value, item) => formatNgayThang(value, true),
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
        navigate("/cms/employees?view_type=form");
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
                    title: tt("Xoá nhân viên"),
                    icon: <ExclamationCircleFilled />,
                    content: `${tt("Bạn có chắc chắn muốn xóa nhân viên")} "${
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
            label: tt("Tên nhân viên"),
            value: "employees.name",
            type: "input",
        },
        {
            label: tt("Tên đăng nhập"),
            value: "employees.username",
            type: "input",
        },
        {
            label: tt("Email"),
            value: "employees.email",
            type: "input",
        },
        {
            label: tt("Vai trò"),
            value: "role_user.role_id",
            type: "selectAndSearch",
            api: "api/v1/roles/search",
            filter: { status: 1 },
            formatData: handleFormatRoleSearchData,
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
            value: "employees.status",
            type: "select",
            selectOption: [
                { label: tt("Ngưng hoạt động"), value: 0 },
                { label: tt("Đang hoạt động"), value: 1 },
            ],
        },
    ].concat(commonFiledDynamicFilter("employees"));

    const listAvailableFilter = [
        {
            id: "1",
            value: "1",
            label: tt("Ngưng hoạt động"),
            data: [
                {
                    id: "status",
                    field: "employees.status",
                    cond: "is",
                    value: 0,
                },
            ],
        },
        {
            id: "2",
            value: "2",
            label: tt("Đang hoạt động"),
            data: [
                {
                    id: "status",
                    field: "employees.status",
                    cond: "is",
                    value: 1,
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
    ].concat(commonTimeAvailableDynamicFilter("employees"));

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
            title: <Link to="/cms/employees">{tt("Danh sách nhân viên")}</Link>,
            key: "product_category_home",
        },
    ].concat(extraBreadcrumbItems);

    const observedDiv = useRef(null);
    const height = useRefDimensions(observedDiv);

    const handleOnPressDownload = () => {
        const dataToSend = {
            term: formatFilterDynamicToTerm(_dynamicFilter, _search),
            filter: {
                status: [],
                store_id: "all",
            },
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
                generateUrl("api/cmsService/v1/employees/exportExcel"),
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
                                        "Tìm theo mã ref, tên nhân viên, email..."
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
                                        {myPermissions[
                                            PERMISSIONS_MAP["create-employee"]
                                        ] && (
                                            <Button
                                                type="primary"
                                                style={{ marginRight: "8px" }}
                                                onClick={handleOnPressCreate}
                                                className="mb-1.5"
                                            >
                                                {tt("Tạo")}
                                            </Button>
                                        )}

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
                                    </div>
                                    {myPermissions[
                                        PERMISSIONS_MAP["export-employee"]
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
                                {/* {hasSelection() && (
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
                                )} */}
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
