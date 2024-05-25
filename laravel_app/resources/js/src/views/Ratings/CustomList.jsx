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
} from "../../store/Ratings";
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
import { dataRatings } from "./data";
import { PERMISSIONS_MAP } from "../../constants";

const { confirm } = Modal;

function CustomList() {
    const _search = useSelector(search);
    const _data = useSelector(data);
    // const _data = dataRatings;
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
            title: tt("Mã chuyến đi"),
            label: tt("Mã chuyến đi"),
            dataIndex: "trip_reference",
            key: "trip_reference",
            width: 150,
            sorter: true,
            render: (value, item) => (
                <Tag color="orange">{item?.trip_reference}</Tag>
            ),
        },
        {
            title: tt("Điểm bắt đầu"),
            label: tt("Điểm bắt đầu"),
            dataIndex: "trip_start",
            key: "trip_start",
            // width: 150,
            // sorter: true,
            render: (value, item) =>
                item?.trip_location[0]?.address.length >= 30 ? (
                    <Tooltip title={item?.trip_location[0]?.address}>
                        <div className="truncate">
                            {item?.trip_location[0]?.address}
                        </div>
                    </Tooltip>
                ) : (
                    <div className="truncate">
                        {item?.trip_location[0]?.address}
                    </div>
                ),
        },
        {
            title: tt("Điểm kết thúc"),
            label: tt("Điểm kết thúc"),
            dataIndex: "trip_send",
            key: "trip_send",
            // width: 150,
            // sorter: true,
            render: (value, item) =>
                item?.trip_location[1]?.address.length >= 30 ? (
                    <Tooltip title={item?.trip_location[1]?.address}>
                        <div className="truncate">
                            {item?.trip_location[1]?.address}
                        </div>
                    </Tooltip>
                ) : (
                    <div className="truncate">
                        {item?.trip_location[1]?.address}
                    </div>
                ),
        },
        {
            title: tt("Khách hàng"),
            label: tt("Khách hàng"),
            dataIndex: "passenger",
            key: "passenger",
            // width: 150,
            sorter: true,
            render: (value, item) => (
                <div>
                    <div
                        style={{
                            fontSize: "13px",
                        }}
                    >
                        {item?.passenger_phone || ""}
                    </div>
                    <div
                        style={{
                            fontSize: "12px",
                            color: "#888",
                        }}
                    >
                        {item?.passenger_name || ""}
                    </div>
                </div>
            ),
        },
        {
            title: tt("Tài xế"),
            label: tt("Tài xế"),
            dataIndex: "driver",
            key: "driver",
            // width: 150,
            sorter: true,
            render: (value, item) => (
                <div>
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
                </div>
            ),
        },
        {
            title: tt("Đánh giá"),
            label: tt("Đánh giá"),
            dataIndex: "rating",
            key: "rating",
            // width: 150,
            sorter: true,
            render: (value, item) => {
                const customIcons = {
                    1: <FrownOutlined />,
                    2: <FrownOutlined />,
                    3: <MehOutlined />,
                    4: <SmileOutlined />,
                    5: <SmileOutlined />,
                };
                return (
                    <Tooltip title={`${value} sao`}>
                        <div>
                            {item.on_time && (
                                <Tag color="#f50">{tt("Đúng giờ")}</Tag>
                            )}
                            {item.professional && (
                                <Tag color="#2db7f5">{tt("Chuyên nghiệp")}</Tag>
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
                                defaultValue={value}
                                disabled
                                character={({ index }) =>
                                    customIcons[index + 1]
                                }
                            />
                        </div>
                    </Tooltip>
                );
            },
        },

        // {
        //     title: tt("Trạng thái"),
        //     dataIndex: "status",
        //     // width: 150,
        //     sorter: true,
        //     render: (value, item) => (
        //         <Tag color={mapStatus[value].color}>
        //             {mapStatus[value].text}
        //         </Tag>
        //     ),
        // },
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
        navigate("/cms/ratings?view_type=form");
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
            label: tt("Mã chuyến đi"),
            value: "driver_ratings.trip_reference",
            type: "input",
        },
        {
            label: tt("Tên tài xế"),
            value: "driver_ratings.driver_name",
            type: "input",
        },
        {
            label: tt("Số điện thoại tài xế"),
            value: "driver_ratings.driver_phone",
            type: "input",
        },
        {
            label: tt("Tên khách hàng"),
            value: "driver_ratings.passenger_name",
            type: "input",
        },
        {
            label: tt("Số điện thoại khách hàng"),
            value: "driver_ratings.passenger_phone",
            type: "input",
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
            label: tt("Số điểm đánh giá"),
            value: "driver_ratings.rating",
            type: "select",
            selectOption: [
                { label: tt("1 sao"), value: 1 },
                { label: tt("2 sao"), value: 2 },
                { label: tt("3 sao"), value: 3 },
                { label: tt("4 sao"), value: 4 },
                { label: tt("5 sao"), value: 5 },
            ],
        },
    ].concat(commonFiledDynamicFilter("driver_ratings"));

    const listAvailableFilter = [
        {
            id: "1",
            value: "1",
            label: tt("Đúng giờ"),
            data: [
                {
                    id: "status",
                    field: "driver_ratings.on_time",
                    cond: "is",
                    value: 1,
                },
            ],
        },
        {
            id: "2",
            value: "2",
            label: tt("Chuyên nghiệp"),
            data: [
                {
                    id: "status",
                    field: "driver_ratings.professional",
                    cond: "is",
                    value: 1,
                },
            ],
        },
        {
            id: "3",
            value: "3",
            label: tt("Tận tâm"),
            data: [
                {
                    id: "status",
                    field: "driver_ratings.devoted",
                    cond: "is",
                    value: 1,
                },
            ],
        },
        {
            id: "4",
            value: "4",
            label: tt("Sạch sẽ"),
            data: [
                {
                    id: "status",
                    field: "driver_ratings.clean",
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
    ].concat(commonTimeAvailableDynamicFilter("driver_ratings"));

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
            title: <Link to="/cms/ratings">{tt("Danh sách đánh giá")}</Link>,
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
                generateUrl("api/cmsService/v1/rating/exportExcel"),
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
                                        "Tìm theo mã chuyến đi, tài xế, khách hàng..."
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
                                        PERMISSIONS_MAP["export-rating-review"]
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
