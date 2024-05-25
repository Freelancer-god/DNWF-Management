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
} from "../../store/NewDriverManager";
import CustomTable from "./CustomTable";
import CustomFilter from "../../components/Filter/CustomFilter";
import { clog, formatFilterDynamicToTerm, tt } from "../../utils";
import { getBreadcrumb } from "../../utils/function";
import { useRefDimensions } from "../../hook/useRefDimensions";
import {
    commonFiledDynamicFilter,
    commonTimeAvailableDynamicFilter,
} from "../../components/Filter/FilterDynamic/function";
import { requireAdmin } from "../../store";
import { throttleOnPressAction } from "../../hook/throttlePressAcion";
import { PermissionsContext, permission } from "../../store/Permissions";
import { showSuccess } from "../../components/dialogs";
import { formatNgayThang } from "../../utils/dateTime";
import { PAGE_UNLIMIT } from "../../CONSTANT";
import { exportExcelNew } from "../../store/NewDriverManager/API";
import {
    DRIVER_STATUS_MAP,
    ENABLE_WALLET,
    PERMISSIONS_MAP,
    REGION_MAP,
    statusOptions,
} from "../../constants";
import { formatMoneyVND } from "../../utils/fotmatMoney";
import {
    removeAllDynamicFilterItem as removeAllDynamicFilterItemInvoice,
    addDynamicFilterItem as addDynamicFilterItemInvoice,
} from "../../store/DriverDepositTransaction";

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
            title: tt("Mã ref"),
            label: tt("Mã ref"),
            key: "reference",
            dataIndex: "reference",
            width: 120,
            sorter: true,
            fixed: "left",
            render: (value, item) => <Tag color="orange">{value}</Tag>,
        },
        {
            title: tt("Tên tài xế"),
            label: tt("Tên tài xế"),
            key: "citizen_name",
            dataIndex: "citizen_name",
            // width: 150,
            sorter: true,
            render: (value, item) =>
                value ? (
                    item.is_tester ? (
                        <Tooltip title={tt("Tài khoản kiểm thử")}>
                            <div className=" whitespace-normal text-blue-500">
                                {value}
                            </div>
                        </Tooltip>
                    ) : (
                        <div className=" whitespace-normal">{value}</div>
                    )
                ) : (
                    <Tag />
                ),
        },
        {
            title: tt("Số điện thoại"),
            label: tt("Số điện thoại"),
            key: "phone",
            dataIndex: "phone",
            width: 125,
            sorter: true,
            render: (value, item) => value || <Tag />,
        },
        {
            title: tt("Số CCCD"),
            label: tt("Số CCCD"),
            key: "citizen_identify",
            dataIndex: "citizen_identify",
            width: 150,
            sorter: true,
            show: true,
            render: (value, item) => value || <Tag />,
        },
        {
            title: tt("Ngày sinh"),
            label: tt("Ngày sinh"),
            key: "birth_date",
            dataIndex: "birth_date",
            width: 120,
            sorter: true,
            show: true,
            render: (value, item) =>
                value !== null ? formatNgayThang(value) : <Tag />,
        },
        {
            title: tt("Giới tính"),
            label: tt("Giới tính"),
            key: "sex",
            dataIndex: "sex",
            width: 130,
            sorter: true,
            render: (value, item) =>
                value !== null ? value === 1 ? tt("Nam") : tt("Nữ") : <Tag />,
        },

        {
            title: tt("Ngày cấp CCCD"),
            label: tt("Ngày cấp CCCD"),
            key: "citizen_issued_date",
            dataIndex: "citizen_issued_date",
            width: 150,
            sorter: true,
            show: true,
            render: (value, item) =>
                value !== null ? formatNgayThang(value) : <Tag />,
        },
        {
            title: tt("Ngày hết hạn CCCD"),
            label: tt("Ngày hết hạn CCCD"),
            key: "citizen_expire_date",
            dataIndex: "citizen_expire_date",
            width: 150,
            sorter: true,
            show: true,
            render: (value, item) =>
                value !== null ? formatNgayThang(value) : <Tag />,
        },
        {
            title: tt("Đại lý"),
            label: tt("Đại lý"),
            key: "agency_name",
            dataIndex: "agency_name",
            // width: 150,
            sorter: true,
            show: true,
            render: (value, item) =>
                value ? (
                    <div className="whitespace-normal">
                        <span>{value}</span>
                    </div>
                ) : (
                    <Tag />
                ),
        },
        {
            title: tt("Quê quán"),
            label: tt("Quê quán"),
            key: "place_of_origin",
            dataIndex: "place_of_origin",
            // width: 150,
            sorter: true,
            show: true,
            render: (value, item) =>
                value ? (
                    <div className=" whitespace-normal">{value}</div>
                ) : (
                    <Tag />
                ),
        },

        {
            title: tt("Nơi thường trú"),
            label: tt("Nơi thường trú"),
            key: "place_of_residence",
            dataIndex: "place_of_residence",
            // width: 150,
            sorter: true,
            show: true,
            render: (value, item) =>
                value ? (
                    <div className=" whitespace-normal">{value}</div>
                ) : (
                    <Tag />
                ),
        },
        ...(ENABLE_WALLET
            ? [
                  {
                      title: tt("Ví tạm ứng"),
                      label: tt("Ví tạm ứng"),
                      key: "wallet",
                      dataIndex: "wallet",
                      width: 120,
                      sorter: true,
                      show: true,
                      render: (wallet, item) =>
                          wallet ? (
                              <Tooltip title={tt("Xem phiếu thu")}>
                                  <a
                                      onClick={(e) => {
                                          e.stopPropagation();
                                          if (item?.phone) {
                                              dispatch(
                                                  removeAllDynamicFilterItemInvoice()
                                              );
                                              dispatch(
                                                  addDynamicFilterItemInvoice({
                                                      id: "1",
                                                      value: "1",
                                                      label: `${tt(
                                                          "Số điện thoại tài xế"
                                                      )} ${tt("là")} ${
                                                          item?.phone
                                                      }`,
                                                      data: [
                                                          {
                                                              id: "phone",
                                                              field: "deposit_invoices.driver_phone",
                                                              cond: "is",
                                                              value: item?.phone,
                                                          },
                                                      ],
                                                  })
                                              );
                                              navigate(
                                                  "/cms/driverDepositTransaction?view_type=list"
                                              );
                                          }
                                      }}
                                  >
                                      {formatMoneyVND(wallet.point)}
                                  </a>
                              </Tooltip>
                          ) : (
                              <Tag />
                          ),
                  },
              ]
            : []),
        {
            title: tt("Cập nhật lần cuối"),
            label: tt("Cập nhật lần cuối"),
            key: "updated_at",
            dataIndex: "updated_at",
            width: 160,
            sorter: true,
            show: true,
            render: (updated_at, item) =>
                updated_at ? (
                    <div className=" whitespace-normal">
                        {formatNgayThang(updated_at, true)}
                    </div>
                ) : (
                    <Tag />
                ),
        },

        {
            title: tt("Trạng thái"),
            label: tt("Trạng thái"),
            key: "status",
            dataIndex: "status",
            width: 160,
            sorter: true,
            fixed: "right",
            render: (value, item) =>
                (
                    <>
                        <Tooltip title={DRIVER_STATUS_MAP[value].description}>
                            <Tag color={DRIVER_STATUS_MAP[value].color}>
                                {DRIVER_STATUS_MAP[value].text}
                            </Tag>
                        </Tooltip>

                        {item.is_receive_ride === true && (
                            <>
                                <br />
                                <Tooltip
                                    title={tt(
                                        "Tài xế đang bật chức năng nhận cuốc xe trên ứng dụng tài xế"
                                    )}
                                >
                                    <Tag color="#87d068" className="mt-[5px]">
                                        {tt("Đang nhận cuốc xe")}
                                    </Tag>
                                </Tooltip>
                            </>
                        )}
                    </>
                ) || <Tag />,
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
        {
            id: "is_receive_ride",
            label: tt("Trạng thái nhận cuốc xe"),
            value: "drivers.is_receive_ride",
            type: "select",
            selectOption: [
                { label: tt("Đang nhận cuốc xe"), value: 1 },
                { label: tt("Không nhận cuốc xe"), value: 0 },
            ],
        },
        {
            id: "reference",
            label: tt("Mã ref"),
            value: "drivers.reference",
            type: "input",
        },
        {
            id: "citizen_name",
            label: tt("Tên CCCD"),
            value: "drivers.citizen_name",
            type: "input",
        },
        {
            id: "phone",
            label: tt("SĐT"),
            value: "drivers.phone",
            type: "input",
        },
        {
            id: "citizen_identify",
            label: tt("Số CCCD"),
            value: "drivers.citizen_identify",
            type: "input",
        },
        {
            id: "birth_date",
            label: tt("Ngày sinh"),
            value: "drivers.birth_date",
            type: "date",
        },
        {
            id: "sex",
            label: tt("Giới tính"),
            value: "drivers.sex",
            type: "select",
            selectOption: [
                { label: tt("Nam"), value: 1 },
                { label: tt("Nữ"), value: 0 },
            ],
        },
        {
            id: "citizen_issued_date",
            label: tt("Ngày cấp CCCD"),
            value: "drivers.citizen_issued_date",
            type: "date",
        },
        {
            id: "citizen_expire_date",
            label: tt("Ngày hết hạn CCCD"),
            value: "drivers.citizen_expire_date",
            type: "date",
        },
        {
            id: "place_of_origin",
            label: tt("Quê quán CCCD"),
            value: "drivers.place_of_origin",
            type: "input",
        },
        {
            id: "place_of_residence",
            label: tt("Nơi thường trú CCCD"),
            value: "drivers.place_of_residence",
            type: "input",
        },
        {
            id: "status",
            label: tt("Trạng thái"),
            value: "drivers.status",
            type: "select",
            selectOption: statusOptions(),
        },

        {
            id: "driver_name",
            label: tt("Họ tên GPLX"),
            value: "drivers.driver_name",
            type: "input",
        },
        {
            id: "driver_license",
            label: tt("Số GPLX"),
            value: "drivers.driver_license",
            type: "input",
        },
        {
            id: "driver_class",
            label: tt("Hạng GPLX"),
            value: "drivers.driver_class",
            type: "select",
            selectOption: [
                { label: tt("A1"), value: "A1" },
                { label: tt("A2"), value: "A2" },
                { label: tt("B2"), value: "B2" },
                { label: tt("C"), value: "C" },
                { label: tt("D"), value: "D" },
                { label: tt("E"), value: "E" },
                { label: tt("F"), value: "F" },
            ],
        },
        {
            label: tt("Địa chỉ nơi cư trú GPLX"),
            value: "drivers.driver_of_residence",
            type: "input",
        },

        {
            id: "is_active",
            label: tt("Được phép nhận cuốc xe"),
            value: "drivers.is_active",
            type: "select",
            selectOption: [
                { label: tt("Có"), value: 1 },
                { label: tt("Không"), value: 0 },
            ],
        },

        {
            id: "vehicle_type_id",
            label: tt("Loại xe"),
            value: "vehicles.vehicle_type_id",
            type: "select",
            selectOption: [
                { label: tt("Xe máy"), value: 1 },
                { label: tt("Xe ô tô 4 chỗ"), value: 2 },
                { label: tt("Xe ô tô 7 chỗ"), value: 3 },
            ],
        },

        {
            id: "license_plates",
            label: tt("Biển số"),
            value: "vehicles.license_plates",
            type: "input",
        },
        {
            id: "registration_certificate",
            label: tt("Số đăng ký"),
            value: "vehicles.registration_certificate",
            type: "input",
        },
        {
            id: "is_owner",
            label: tt("Xe chính chủ"),
            value: "vehicles.is_owner",
            type: "select",
            selectOption: [
                { label: tt("Có"), value: 1 },
                { label: tt("Không"), value: 0 },
            ],
        },

        // {
        //     id: "vehicle_brand_id",
        //     label: tt("Hãng xe"),
        //     value: "vehicles.vehicle_brand_id",
        //     type: "selectAndSearch",
        //     api: "api/cmsService/v1/vehicle_brands/search",
        //     filter: {  },
        //     formatData: (data) => {
        //         const array = [];
        //         for (const i of data) {
        //             array.push({
        //                 id: i.id,
        //                 value: i.id,
        //                 label: i.display_name || i.name || i.label,
        //             });
        //         }
        //         return array;
        //     },
        // },

        {
            id: "vehicle_brand_id",
            label: tt("Hãng xe"),
            value: "vehicles.brand_name",
            type: "input",
        },

        {
            label: tt("Ví tạm ứng"),
            value: "driver_wallets.point",
            type: "number",
        },

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
        {
            label: tt("Đại lý"),
            value: "drivers.agency_id",
            type: "selectAndSearch",
            api: "api/cmsService/v1/agencies/search",
            filter: { status: 1 },
            // formatData: handleFormatRoleSearchData,
        },
    ].concat(commonFiledDynamicFilter("drivers"));

    const listAvailableFilter = [
        {
            id: "0",
            type: "group",
            title: tt("Trạng thái"),
            children: [
                {
                    id: "0_6",
                    value: "0_6",
                    groupId: "0",
                    label: DRIVER_STATUS_MAP[2].text,
                    data: [
                        {
                            id: "status3",
                            field: "drivers.status",
                            cond: "is",
                            value: 2,
                        },
                    ],
                },
                {
                    id: "0_3",
                    value: "0_3",
                    groupId: "0",
                    label: DRIVER_STATUS_MAP[3].text,
                    data: [
                        {
                            id: "status4",
                            field: "drivers.status",
                            cond: "is",
                            value: 3,
                        },
                    ],
                },
                {
                    id: "0_4",
                    value: "0_4",
                    groupId: "0",
                    label: DRIVER_STATUS_MAP[4].text,
                    data: [
                        {
                            id: "status5",
                            field: "drivers.status",
                            cond: "is",
                            value: 4,
                        },
                    ],
                },
                // {
                //     id: "0_5",
                //     value: "0_5",
                //     groupId: "0",
                //     label: DRIVER_STATUS_MAP[5].text,
                //     data: [
                //         {
                //             id: "status6",
                //             field: "drivers.status",
                //             cond: "is",
                //             value: 5,
                //         },
                //     ],
                // },
                {
                    id: "0_8",
                    value: "0_8",
                    groupId: "0",
                    label: DRIVER_STATUS_MAP[6].text,
                    data: [
                        {
                            id: "status6",
                            field: "drivers.status",
                            cond: "is",
                            value: 6,
                        },
                    ],
                },
                {
                    id: "0_9",
                    value: "0_9",
                    groupId: "0",
                    label: DRIVER_STATUS_MAP[7].text,
                    data: [
                        {
                            id: "status7",
                            field: "drivers.status",
                            cond: "is",
                            value: 7,
                        },
                    ],
                },
            ],
        },
        {
            id: "4",
            type: "group",
            title: tt("Lọc tài khoản kiểm thử"),
            children: [
                {
                    id: "4_1",
                    value: "4_1",
                    groupId: "1",
                    label: tt("Không hiển thị tài khoản kiểm thử"),
                    data: [
                        {
                            id: "status",
                            field: "drivers.is_tester",
                            cond: "is",
                            value: 0,
                        },
                    ],
                },
            ],
        },

        // {
        //   id: '1',
        //   value: '1',
        //   label: DRIVER_STATUS_MAP[0].text,
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
                            field: "drivers.region_id",
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
                            field: "drivers.region_id",
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
                            field: "drivers.region_id",
                            cond: "is",
                            value: 3,
                        },
                    ],
                },
            ],
        },
    ].concat(commonTimeAvailableDynamicFilter("drivers"));

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
            title: <Link to="/cms/drivers_new">{tt("Đăng ký mới")}</Link>,
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
            filter: { status: [2, 3, 4, 6, 7] },
            type: 1,
            order: _order?.order,
            sort: _order?.sort,
        };

        const path = await exportExcelNew(dataToSend);
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
                                        "Tìm theo tên, mã, sđt, địa chỉ..."
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
                                        PERMISSIONS_MAP["export-driver"]
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
                                            showSizeChanger={false}
                                            pageSize={_limit}
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
