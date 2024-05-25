import React, { useCallback, useRef, useState } from "react";
import {
    Breadcrumb,
    Button,
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
} from "../../store/Support";
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
import { permission } from "../../store/Permissions";
import { showError, showSuccess } from "../../components/dialogs";
import { exportExcelSupportCustomers } from "../../store/Support/API";

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
        navigate("/cms/supports?view_type=form");
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
                    title: tt("Xoá cấu hình"),
                    icon: <ExclamationCircleFilled />,
                    content: `${tt("Bạn có chắc chắn muốn xóa cấu hình")} "${
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
        { label: tt("Tiều đề"), value: "supports.title", type: "input" },
        {
            label: tt("Tên khách hàng"),
            value: "supports.name",
            type: "input",
        },
        {
            label: tt("SĐT khách hàng"),
            value: "supports.phone",
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
            label: tt("Trạng thái"),
            value: "supports.status",
            type: "select",
            selectOption: [
                { label: tt("Mới tạo"), value: 1 },
                { label: tt("QTV đã trả lời"), value: 2 },
                { label: tt("KH/TX đã trả lời"), value: 3 },
                { label: tt("Hoàn tất"), value: 4 },
            ],
        },
    ].concat(commonFiledDynamicFilter("supports"));

    const listAvailableFilter = [
        {
            id: "1",
            value: "1",
            label: tt("Chờ phản hồi"),
            data: [
                {
                    id: "status",
                    field: "supports.status",
                    cond: "is",
                    value: 1,
                },
                {
                    id: "status",
                    field: "supports.status",
                    cond: "is",
                    value: 3,
                },
            ],
        },
        {
            id: "2",
            value: "2",
            label: tt("QTV đã trả lời"),
            data: [
                {
                    id: "status",
                    field: "supports.status",
                    cond: "is",
                    value: 2,
                },
            ],
        },
        {
            id: "3",
            value: "3",
            label: tt("Hoàn tất"),
            data: [
                {
                    id: "status",
                    field: "supports.status",
                    cond: "is",
                    value: 4,
                },
            ],
        },
        // {
        //     id: "4",
        //     value: "4",
        //     label: tt("Đã hủy"),
        //     data: [
        //         {
        //             id: "status",
        //             field: "supports.status",
        //             cond: "is",
        //             value: 4,
        //         },
        //     ],
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
    ].concat(commonTimeAvailableDynamicFilter("supports"));

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
            title: <Link to="/cms/supports">{tt("Hỗ trợ khách hàng")}</Link>,
            key: "product_category_home",
        },
    ].concat(extraBreadcrumbItems);

    const observedDiv = useRef(null);
    const height = useRefDimensions(observedDiv);

    const handleOnPressDownload = async () => {
        const dataToSend = {
            term: formatFilterDynamicToTerm(_dynamicFilter, _search),
            filter: {
                type: 1,
            },
            order: _order?.order,
            sort: _order?.sort,
        };
        const path = await exportExcelSupportCustomers(dataToSend);
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
                                        "Tìm theo tiêu đề, nội dung..."
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
                                    {!hasSelection() && (
                                        <Tooltip title={tt("Xuất file")}>
                                            <Button
                                                icon={
                                                    <i className="fa fa-download" />
                                                }
                                                onClick={handleOnPressDownload}
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
                        />
                    </Spin>
                </div>
            </div>
        </div>
    );
}

export default CustomList;
