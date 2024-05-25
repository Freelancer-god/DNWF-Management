/* eslint-disable no-param-reassign */
/* eslint-disable no-case-declarations */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-nested-ternary */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import React, { useContext, useEffect, useState } from "react";
import {
    Button,
    Card,
    Descriptions,
    Modal,
    Table,
    Tabs,
    Tag,
    Tooltip,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    ApiTwoTone,
    CheckCircleTwoTone,
    CloseCircleTwoTone,
    ExclamationCircleOutlined,
    FileTwoTone,
    PoweroffOutlined,
    SettingTwoTone,
} from "@ant-design/icons";
import axios from "axios";
import {
    changeSelectedRows,
    initUpdateWithoutShowModal,
    changeOrder,
    getDriverForms,
    driverFormsSelector,
    getData,
} from "../../store/ActiveDriverManager";
import { clog, getListIdInArray, tt } from "../../utils";
import CustomEmptyForTable from "../../components/CustomEmptyForTable";
import DriverProfile from "./DriverPorfolios/DriverProfile";
import VehicleInformation from "./DriverPorfolios/VehicleInformation";
import DriverLicense from "./DriverPorfolios/DriverLicense";
import {
    avatarDefault,
    avatarFemaleDefault,
    avatarMaleDefault,
} from "../../assets";
import VehicleRegistration from "./DriverPorfolios/VehicleRegistration";
import RoadRegistration from "./DriverPorfolios/RoadRegistration";
import {
    getDriverCurrentSubmitedForms,
    resetDocumentForms,
    toggleActivity,
    toggleRecieveDrive,
} from "../../store/ActiveDriverManager/API";
import {
    DRIVER_FORM_STATUS,
    PERMISSIONS_MAP,
    PROFILE_MAP,
    VEHICLE_INFOMATION_TYPE,
} from "../../constants";
import AntdButton from "../../components/AntdButton";
import { COLORS, TABLE_WIDTH_SETTINGS } from "../../CONSTANT";
import { getTableWidth } from "../../utils/tableWidth";
import { PermissionsContext } from "../../store/Permissions";
import { showSuccess } from "../../components/dialogs";
import ModalAddAgency from "./ModalAddAgency/ModalAddAgency";

const portfolios = [
    {
        id: 1,
        name: tt("Thông tin tài xế"),
        type: "tai-xe",
    },
    {
        id: 2,
        name: tt("Thông tin GPLX"),
        type: "giay-phep-lai-xe",
    },
    {
        id: 3,
        name: tt("Thông tin phương tiện"),
        type: "phuong-tien",
    },
];

const portfoliosCar = [
    {
        id: 1,
        name: tt("Thông tin tài xế"),
        type: "tai-xe",
    },
    {
        id: 2,
        name: tt("Thông tin GPLX"),
        type: "giay-phep-lai-xe",
    },
    {
        id: 3,
        name: tt("Thông tin phương tiện"),
        type: "phuong-tien",
    },

    {
        id: 6,
        name: tt("Giấy chứng nhận đăng kiểm"),
        type: "giay-chung-nhan-dang-kiem",
    },
    {
        id: 7,
        name: tt("Tem đăng kiểm"),
        type: "giay-dang-ky-duong-bong",
    },
];
function CustomTable(props) {
    const { data, selectedRows, usageHeight } = props;

    const { userForms, setUserForms } = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [currentSelect, setCurrentSelect] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const myPermissions = useContext(PermissionsContext).permissions;
    const [inforDriver, setInforDriver] = useState([
        {
            key: "2",
            label: "Số điện thoại",
            span: 3,
            children: "0123456789",
        },
        {
            key: "3",
            label: "Quê quán",
            span: 3,
            children: "Đồng Nai, Việt Nam",
        },
        {
            key: "4",
            label: "Email",
            span: 3,
            children: "",
        },
        {
            key: "5",
            label: "Địa chỉ hiện tại",
            span: 3,
            children: "Gò Vấp, TPHCM",
        },
    ]);
    const [inforVehicle, setInforVehicle] = useState([
        {
            key: "2",
            label: "Biển số xe",
            span: 3,
            children: "59B1 -12345 ",
        },
        {
            key: "3",
            label: "Hãng",
            span: 2,
            children: "Honda",
        },
        {
            key: "4",
            label: "Dòng",
            span: 2,
            children: "Air Blade 125",
        },
        {
            key: "5",
            label: "Năm sản xuất",
            span: 2,
            children: "2018",
        },
        {
            key: "5",
            label: "Màu",
            span: 3,
            children: "Đen-đỏ",
        },
        {
            key: "5",
            label: "Năm sản xuất",
            span: 3,
            children: "2018",
        },
    ]);

    /*
    const STATUS_UNACTIVE       = 0;
    const STATUS_ACTIVE         = 1;
    const STATUS_CONFIRM        = 2;
    const STATUS_BAN            = 3;
    */

    const showModal = (event, item) => {
        event.stopPropagation();
        setCurrentSelect(item);
        // console.log(item);
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleOnChangeTable = (pagination, filters, sorter, extra) => {
        if (sorter) {
            let order = "";
            let sort = "";

            const { field } = sorter;
            // case khong can sort default la case duoc phep sort
            order = field;
            switch (field) {
                case "wallet":
                    order = "point";
                    break;
                // case 'title':
                //   order = 'title';
                //   break;
                // case 'total_point':
                //   order = 'total_point';
                //   break;
                // case 'quantity':
                //   order = 'quantity';
                //   break;
                // case 'point':
                //   order = 'point';
                //   break;

                default:
                    order = field;
            }
            sort = sorter.order
                ? sorter.order === "ascend"
                    ? "asc"
                    : "desc"
                : "";

            const dataToSend = { order, sort };
            dispatch(changeOrder(dataToSend));
        }
    };

    return (
        <div
            className="ant_table_custom_padding overflow-x-auto max-h-[100vh] bg-slate-600 whitespace-normal"
            style={{ width: "100%", borderBottom: "1px solid #f0f0f0" }}
        >
            <Table
                rowClassName={(record, index) =>
                    index % 2 === 0 ? "table-row-light" : "table-row-dark"
                }
                // rowSelection={{
                //     type: "checkbox",
                //     ...rowSelection,
                // }}
                expandable={{
                    expandedRowRender: (recordRow, index, indent, expanded) => (
                        <CustomerTabs record={recordRow} />
                    ),
                    expandRowByClick: true,
                }}
                onRow={(record, rowIndex) => ({
                    // onDoubleClick: handlePressOnItem(record, rowIndex),
                    // click row
                    // onDoubleClick: handlePressOnItem(record, rowIndex), // double click row
                    // onContextMenu: (event) => {}, // right button click row
                    // onMouseEnter: (event) => {}, // mouse enter row
                    // onMouseLeave: (event) => {}, // mouse leave row
                })}
                rowKey="id"
                pagination={false}
                columns={props.columns}
                onChange={handleOnChangeTable}
                dataSource={data}
                locale={{
                    emptyText: (
                        <CustomEmptyForTable
                            description={tt("Không có dữ liệu")}
                        />
                    ),
                }}
                // scroll={{
                //     y: `calc(100vh - 90px - ${usageHeight}px)`,
                //     x: 1250,
                //     // y: `calc(100vh - 50px - 33px - ${usageHeight}px)`, (50+33) -> 90 luon cho chan
                // }}
                className="custom-table"
                scroll={{ y: "75vh", x: getTableWidth(props.columns, 1300) }}
            />
        </div>
    );
}

function CustomerTabs({ record }) {
    const [modal, contextHolder] = Modal.useModal();
    const [loading, setLoading] = useState(false);
    const [loadingGear1, setLoadingGear1] = useState(false);
    const [loadingGear2, setLoadingGear2] = useState(false);
    const [loadingGear3, setLoadingGear3] = useState(false);
    const [driverForms, setDriverForms] = useState(null);
    const [vehicleForms, setVehicleForms] = useState(null);
    const [currentTab, setCurrentTab] = useState(0);
    const dispatch = useDispatch();
    const myDriversForms = useSelector(driverFormsSelector);
    const myPermissions = useContext(PermissionsContext).permissions;
    const [cover, setCover] = React.useState(
        record.sex === 0 ? avatarFemaleDefault : avatarMaleDefault
    );

    // axios
    //   .get(record.cover.path, {
    //     responseType: 'arraybuffer',
    //     headers: { Authorization: `Bearer ${document.getElementById('myToken')?.value}` },
    //   })
    //   .then((response) => {
    //   //   const u8 = new Uint8Array(response.data);
    //     const b64encoded = btoa([].reduce.call(new Uint8Array(response.data), (p, c) => p + String.fromCharCode(c), ''));
    //     const mimetype = 'image/jpeg';
    //     setImg(`data:${mimetype};base64,${b64encoded}`);
    //   });

    useEffect(() => {
        if (record?.cover?.path) {
            axios
                .get(record.cover.path, {
                    responseType: "arraybuffer",
                    headers: {
                        Authorization: `Bearer ${
                            document.getElementById("myToken")?.value
                        }`,
                    },
                })
                .then((response) => {
                    //   const u8 = new Uint8Array(response.data);
                    const b64encoded = btoa(
                        [].reduce.call(
                            new Uint8Array(response.data),
                            (p, c) => p + String.fromCharCode(c),
                            ""
                        )
                    );
                    const mimetype = "image/jpeg";
                    setCover(`data:${mimetype};base64,${b64encoded}`);
                });
        }
        dispatch(getDriverForms({ driver_id: record.id }));
    }, [record]);

    useEffect(() => {
        // const fetchData = async () => {
        //   // You can await here
        //   const response = await getDriverCurrentSubmitedForms({ driver_id: record.id });
        //   if (response) {
        //     setDriverForms(response?.driver_forms);
        //     setVehicleForms(response?.vehicle_forms);
        //   }

        //   // ...
        // };
        // fetchData();
        dispatch(getDriverForms({ driver_id: record.id }));
    }, [currentTab]);

    useEffect(() => {
        if (myDriversForms && myDriversForms[record.id]) {
            setDriverForms(myDriversForms[record.id].driver_forms);
            setVehicleForms(myDriversForms[record.id].vehicle_forms);
        } else {
            setDriverForms(null);
            setVehicleForms(null);
        }
    }, [myDriversForms]);

    const handleOnFormUpdate = () => {
        setCurrentTab(currentTab + 1);
    };
    const renderTabs = (recordRow) => {
        const getTabItem = (item, index) => {
            const { name, type } = item;
            const tab = {
                label: name,
                key: `_${index}`,
            };

            switch (type) {
                case "tai-xe":
                    tab.children = (
                        <DriverProfile
                            data={recordRow}
                            submitedForms={driverForms}
                            onUpdate={handleOnFormUpdate}
                            is_active={true}
                        />
                    );
                    let icons = [];
                    if (
                        driverForms &&
                        (driverForms[PROFILE_MAP.CCCD] ||
                            driverForms[PROFILE_MAP.ANH])
                    ) {
                        switch (driverForms[PROFILE_MAP.CCCD].status) {
                            case DRIVER_FORM_STATUS.DENINED:
                                icons.push(
                                    <Tooltip title={tt("Bị từ chối")}>
                                        <CloseCircleTwoTone twoToneColor="#f5222d" />
                                    </Tooltip>
                                );
                                break;
                            case DRIVER_FORM_STATUS.NOT_VERIFIED:
                                icons.push(
                                    <Tooltip title={tt("Chưa xác nhận")}>
                                        <FileTwoTone twoToneColor="#faad14" />
                                    </Tooltip>
                                );
                                break;
                            case DRIVER_FORM_STATUS.VERIFIED:
                                icons.push(
                                    <Tooltip title={tt("Đã xác nhận")}>
                                        <CheckCircleTwoTone twoToneColor="#52c41a" />
                                    </Tooltip>
                                );
                                break;
                            default:
                        }
                        switch (driverForms[PROFILE_MAP.ANH].status) {
                            case DRIVER_FORM_STATUS.DENINED:
                                icons.push(
                                    <Tooltip title={tt("Bị từ chối")}>
                                        <CloseCircleTwoTone twoToneColor="#f5222d" />
                                    </Tooltip>
                                );
                                break;
                            case DRIVER_FORM_STATUS.NOT_VERIFIED:
                                icons.push(
                                    <Tooltip title={tt("Chưa xác nhận")}>
                                        <FileTwoTone twoToneColor="#faad14" />
                                    </Tooltip>
                                );
                                break;
                            case DRIVER_FORM_STATUS.VERIFIED:
                                icons.push(
                                    <Tooltip title={tt("Đã xác nhận")}>
                                        <CheckCircleTwoTone twoToneColor="#52c41a" />
                                    </Tooltip>
                                );
                                break;
                            default:
                        }

                        if (
                            driverForms[PROFILE_MAP.CCCD].status ===
                                DRIVER_FORM_STATUS.DENINED &&
                            driverForms[PROFILE_MAP.ANH].status ===
                                DRIVER_FORM_STATUS.DENINED
                        ) {
                            icons = [
                                <Tooltip title={tt("Bị từ chối")}>
                                    <CloseCircleTwoTone twoToneColor="#f5222d" />
                                </Tooltip>,
                            ];
                        }
                        if (
                            driverForms[PROFILE_MAP.CCCD].status ===
                                DRIVER_FORM_STATUS.NOT_VERIFIED &&
                            driverForms[PROFILE_MAP.ANH].status ===
                                DRIVER_FORM_STATUS.NOT_VERIFIED
                        ) {
                            icons = [
                                <Tooltip title={tt("Chưa xác nhận")}>
                                    <FileTwoTone twoToneColor="#faad14" />
                                </Tooltip>,
                            ];
                        }
                        if (
                            driverForms[PROFILE_MAP.CCCD].status ===
                                DRIVER_FORM_STATUS.VERIFIED &&
                            driverForms[PROFILE_MAP.ANH].status ===
                                DRIVER_FORM_STATUS.VERIFIED
                        ) {
                            icons = [
                                <Tooltip title={tt("Đã xác nhận")}>
                                    <CheckCircleTwoTone twoToneColor="#52c41a" />
                                </Tooltip>,
                            ];
                        }
                    }
                    tab.icon = <div className="tab-icons">{icons}</div>;
                    break;
                case "giay-phep-lai-xe":
                    tab.children = (
                        <DriverLicense
                            data={recordRow}
                            submitedForms={driverForms}
                            onUpdate={handleOnFormUpdate}
                            is_active={true}
                        />
                    );
                    const icons1 = [];
                    if (driverForms && driverForms[PROFILE_MAP.GPLX]) {
                        switch (driverForms[PROFILE_MAP.GPLX].status) {
                            case DRIVER_FORM_STATUS.DENINED:
                                icons1.push(
                                    <Tooltip title={tt("Bị từ chối")}>
                                        <CloseCircleTwoTone twoToneColor="#f5222d" />
                                    </Tooltip>
                                );
                                break;
                            case DRIVER_FORM_STATUS.NOT_VERIFIED:
                                icons1.push(
                                    <Tooltip title={tt("Chưa xác nhận")}>
                                        <FileTwoTone twoToneColor="#faad14" />
                                    </Tooltip>
                                );
                                break;
                            case DRIVER_FORM_STATUS.VERIFIED:
                                icons1.push(
                                    <Tooltip title={tt("Đã xác nhận")}>
                                        <CheckCircleTwoTone twoToneColor="#52c41a" />
                                    </Tooltip>
                                );
                                break;
                            default:
                        }
                    }
                    tab.icon = <div className="tab-icons">{icons1}</div>;
                    break;
                case "phuong-tien":
                    tab.children = (
                        <VehicleInformation
                            submitedForms={vehicleForms}
                            data={recordRow?.vehicle}
                            userId={recordRow.id}
                            onUpdate={handleOnFormUpdate}
                            is_active={true}
                        />
                    );
                    let icons2 = [];
                    if (
                        vehicleForms &&
                        (vehicleForms[VEHICLE_INFOMATION_TYPE.DKX] ||
                            vehicleForms[VEHICLE_INFOMATION_TYPE.HAX])
                    ) {
                        switch (
                            vehicleForms[VEHICLE_INFOMATION_TYPE.DKX].status
                        ) {
                            case DRIVER_FORM_STATUS.DENINED:
                                icons2.push(
                                    <Tooltip title={tt("Bị từ chối")}>
                                        <CloseCircleTwoTone twoToneColor="#f5222d" />
                                    </Tooltip>
                                );
                                break;
                            case DRIVER_FORM_STATUS.NOT_VERIFIED:
                                icons2.push(
                                    <Tooltip title={tt("Chưa xác nhận")}>
                                        <FileTwoTone twoToneColor="#faad14" />
                                    </Tooltip>
                                );
                                break;
                            case DRIVER_FORM_STATUS.VERIFIED:
                                icons2.push(
                                    <Tooltip title={tt("Đã xác nhận")}>
                                        <CheckCircleTwoTone twoToneColor="#52c41a" />
                                    </Tooltip>
                                );
                                break;
                            default:
                        }
                        switch (
                            vehicleForms[VEHICLE_INFOMATION_TYPE.HAX].status
                        ) {
                            case DRIVER_FORM_STATUS.DENINED:
                                icons2.push(
                                    <Tooltip title={tt("Bị từ chối")}>
                                        <CloseCircleTwoTone twoToneColor="#f5222d" />
                                    </Tooltip>
                                );
                                break;
                            case DRIVER_FORM_STATUS.NOT_VERIFIED:
                                icons2.push(
                                    <Tooltip title={tt("Chưa xác nhận")}>
                                        <FileTwoTone twoToneColor="#faad14" />
                                    </Tooltip>
                                );
                                break;
                            case DRIVER_FORM_STATUS.VERIFIED:
                                icons2.push(
                                    <Tooltip title={tt("Đã xác nhận")}>
                                        <CheckCircleTwoTone twoToneColor="#52c41a" />
                                    </Tooltip>
                                );
                                break;
                            default:
                        }

                        switch (
                            vehicleForms[VEHICLE_INFOMATION_TYPE.BHBBTNDS]
                                .status
                        ) {
                            case DRIVER_FORM_STATUS.DENINED:
                                icons2.push(
                                    <Tooltip title={tt("Bị từ chối")}>
                                        <CloseCircleTwoTone twoToneColor="#f5222d" />
                                    </Tooltip>
                                );
                                break;
                            case DRIVER_FORM_STATUS.NOT_VERIFIED:
                                icons2.push(
                                    <Tooltip title={tt("Chưa xác nhận")}>
                                        <FileTwoTone twoToneColor="#faad14" />
                                    </Tooltip>
                                );
                                break;
                            case DRIVER_FORM_STATUS.VERIFIED:
                                icons2.push(
                                    <Tooltip title={tt("Đã xác nhận")}>
                                        <CheckCircleTwoTone twoToneColor="#52c41a" />
                                    </Tooltip>
                                );
                                break;
                            default:
                        }

                        if (
                            vehicleForms[VEHICLE_INFOMATION_TYPE.DKX].status ===
                                DRIVER_FORM_STATUS.DENINED &&
                            vehicleForms[VEHICLE_INFOMATION_TYPE.HAX].status ===
                                DRIVER_FORM_STATUS.DENINED &&
                            vehicleForms[VEHICLE_INFOMATION_TYPE.BHBBTNDS]
                                .status === DRIVER_FORM_STATUS.DENINED
                        ) {
                            icons2 = [
                                <Tooltip title={tt("Bị từ chối")}>
                                    <CloseCircleTwoTone twoToneColor="#f5222d" />
                                </Tooltip>,
                            ];
                        }
                        if (
                            vehicleForms[VEHICLE_INFOMATION_TYPE.DKX].status ===
                                DRIVER_FORM_STATUS.NOT_VERIFIED &&
                            vehicleForms[VEHICLE_INFOMATION_TYPE.HAX].status ===
                                DRIVER_FORM_STATUS.NOT_VERIFIED &&
                            vehicleForms[VEHICLE_INFOMATION_TYPE.BHBBTNDS]
                                .status === DRIVER_FORM_STATUS.NOT_VERIFIED
                        ) {
                            icons2 = [
                                <Tooltip title={tt("Chưa xác nhận")}>
                                    <FileTwoTone twoToneColor="#faad14" />
                                </Tooltip>,
                            ];
                        }
                        if (
                            vehicleForms[VEHICLE_INFOMATION_TYPE.DKX].status ===
                                DRIVER_FORM_STATUS.VERIFIED &&
                            vehicleForms[VEHICLE_INFOMATION_TYPE.HAX].status ===
                                DRIVER_FORM_STATUS.VERIFIED &&
                            vehicleForms[VEHICLE_INFOMATION_TYPE.BHBBTNDS]
                                .status === DRIVER_FORM_STATUS.VERIFIED
                        ) {
                            icons2 = [
                                <Tooltip title={tt("Đã xác nhận")}>
                                    <CheckCircleTwoTone twoToneColor="#52c41a" />
                                </Tooltip>,
                            ];
                        }
                    }
                    tab.icon = <div className="tab-icons">{icons2}</div>;
                    break;
                case "giay-chung-nhan-dang-kiem":
                    tab.children = (
                        <VehicleRegistration
                            submitedForms={vehicleForms}
                            data={recordRow?.vehicle}
                            userId={recordRow.id}
                            onUpdate={handleOnFormUpdate}
                            is_active={true}
                        />
                    );
                    const icons3 = [];
                    if (
                        vehicleForms &&
                        vehicleForms[VEHICLE_INFOMATION_TYPE.GCNDK]
                    ) {
                        switch (
                            vehicleForms[VEHICLE_INFOMATION_TYPE.GCNDK].status
                        ) {
                            case DRIVER_FORM_STATUS.DENINED:
                                icons3.push(
                                    <Tooltip title={tt("Bị từ chối")}>
                                        <CloseCircleTwoTone twoToneColor="#f5222d" />
                                    </Tooltip>
                                );
                                break;
                            case DRIVER_FORM_STATUS.NOT_VERIFIED:
                                icons3.push(
                                    <Tooltip title={tt("Chưa xác nhận")}>
                                        <FileTwoTone twoToneColor="#faad14" />
                                    </Tooltip>
                                );
                                break;
                            case DRIVER_FORM_STATUS.VERIFIED:
                                icons3.push(
                                    <Tooltip title={tt("Đã xác nhận")}>
                                        <CheckCircleTwoTone twoToneColor="#52c41a" />
                                    </Tooltip>
                                );
                                break;
                            default:
                        }
                    }
                    tab.icon = <div className="tab-icons">{icons3}</div>;
                    break;
                case "giay-dang-ky-duong-bong":
                    tab.children = (
                        <RoadRegistration
                            submitedForms={vehicleForms}
                            data={recordRow?.vehicle}
                            userId={recordRow.id}
                            onUpdate={handleOnFormUpdate}
                            is_active={true}
                        />
                    );
                    const icons4 = [];
                    if (
                        vehicleForms &&
                        vehicleForms[VEHICLE_INFOMATION_TYPE.GNPSDDB]
                    ) {
                        switch (
                            vehicleForms[VEHICLE_INFOMATION_TYPE.GNPSDDB].status
                        ) {
                            case DRIVER_FORM_STATUS.DENINED:
                                icons4.push(
                                    <Tooltip title={tt("Bị từ chối")}>
                                        <CloseCircleTwoTone twoToneColor="#f5222d" />
                                    </Tooltip>
                                );
                                break;
                            case DRIVER_FORM_STATUS.NOT_VERIFIED:
                                icons4.push(
                                    <Tooltip title={tt("Chưa xác nhận")}>
                                        <FileTwoTone twoToneColor="#faad14" />
                                    </Tooltip>
                                );
                                break;
                            case DRIVER_FORM_STATUS.VERIFIED:
                                icons4.push(
                                    <Tooltip title={tt("Đã xác nhận")}>
                                        <CheckCircleTwoTone twoToneColor="#52c41a" />
                                    </Tooltip>
                                );
                                break;
                            default:
                        }
                    }
                    tab.icon = <div className="tab-icons">{icons4}</div>;
                    break;
                default:
            }
            return tab;
        };
        return recordRow.driver_type > 1
            ? portfoliosCar.map((item, index) => getTabItem(item, index))
            : portfolios.map((item, index) => getTabItem(item, index));
    };

    const handleToggleRideAcceptance = () => {
        // phai confirm truoc khi thay doi su dung thu vien cua antd design
        modal.confirm({
            title: tt("Xác nhận thao tác"),
            icon: <ExclamationCircleOutlined />,
            content: tt("Bạn chắc chắn muốn thực hiện chứ?"),
            okText: tt("Có"),
            cancelText: tt("Không"),
            onOk: async () => {
                setLoadingGear3(true);

                const rs = await toggleRecieveDrive({
                    driver_id: record.id,
                    status: record.is_active ? 0 : 1,
                });
                setLoadingGear3(false);
                if (rs) {
                    showSuccess(tt("Đã cập nhật thành công"));
                    dispatch(getData());
                }
            },
        });
    };
    const handleToggleActivity = () => {
        // phai confirm truoc khi thay doi su dung thu vien cua antd design
        modal.confirm({
            title: tt("Xác nhận thao tác"),
            icon: <ExclamationCircleOutlined />,
            content: tt("Bạn chắc chắn muốn thực hiện chứ?"),
            okText: tt("Có"),
            cancelText: tt("Không"),
            onOk: async () => {
                setLoadingGear1(true);

                const rs = await toggleActivity({
                    driver_id: record.id,
                    status: record.status !== 0 ? 0 : 1,
                });
                setLoadingGear1(false);
                if (rs) {
                    showSuccess(tt("Đã cập nhật thành công"));
                    dispatch(getData());
                }
            },
        });
    };

    const handleResetDocumentForms = () => {
        // phai confirm truoc khi thay doi su dung thu vien cua antd design
        modal.confirm({
            title: tt("Xác nhận thao tác khởi tạo hồ sơ đăng ký xe"),
            icon: <ExclamationCircleOutlined />,
            content: tt("Bạn chắc chắn muốn thực hiện chứ?"),
            okText: tt("Có"),
            cancelText: tt("Không"),
            onOk: async () => {
                setLoadingGear2(true);
                const rs = await resetDocumentForms({
                    driver_id: record.id,
                });
                setLoadingGear2(false);
                if (rs) {
                    showSuccess(tt("Đã cập nhật thành công"));
                    dispatch(getData());
                }
            },
        });
    };

    const renderToggleRideAcceptance = () => {
        const checkOk = () => {
            // if (driverForms) {
            //   // driverForm la object khong phai la mang. duyet tat ca object cua driverForms
            //   for (const key in driverForms) {
            //     const df = driverForms[key];
            //     // Your code logic here
            //     if (df.status === DRIVER_FORM_STATUS.DENINED
            //       || df.status === DRIVER_FORM_STATUS.EXPIRED
            //       || df.status === DRIVER_FORM_STATUS.NOT_VERIFIED) {
            //       return false; // Nếu có status === 3, trả về false
            //     }
            //   }
            // }
            // if (vehicleForms) {
            //   // driverForm la object khong phai la mang. duyet tat ca object cua driverForms
            //   for (const key in vehicleForms) {
            //     const df = vehicleForms[key];
            //     // Your code logic here
            //     if (df.status === DRIVER_FORM_STATUS.DENINED
            //       || df.status === DRIVER_FORM_STATUS.EXPIRED
            //       || df.status === DRIVER_FORM_STATUS.NOT_VERIFIED) {
            //       return false; // Nếu có status === 3, trả về false
            //     }
            //   }
            // }
            if (
                record.status === 4 ||
                record.status === 6 ||
                record.status === 7
            ) {
                // ho so khac da hoan tat 4 la khong hien thi, 6 chua dong tien, 7 da dong tien chua duyet
                return true;
            }

            return false;
        };

        if (checkOk()) {
            return (
                <Tooltip
                    title={tt(
                        "Xử lý khoá/mở chức năng nhận cuốc xe của tài xế. Tài xế bị ngưng hoạt động sẽ không thể bật chức năng nhận cuốc xe trên app"
                    )}
                >
                    <AntdButton
                        type="primary"
                        ghost={record.is_active}
                        colorPrimary={COLORS.blue}
                        icon={<PoweroffOutlined />}
                        loading={loadingGear3}
                        onClick={handleToggleRideAcceptance}
                    >
                        {record.is_active
                            ? tt("Ngưng hoạt động")
                            : tt("Cho phép hoạt động")}
                    </AntdButton>
                </Tooltip>
            );
        }
        return null;
    };
    const renderStopActivity = () => (
        <Tooltip
            title={tt(
                "Xử lý khoá/mở tài khoản của tài xế. Tài xế bị khoá tài khoản sẽ không thể login vào hệ thống được"
            )}
        >
            <AntdButton
                type="primary"
                ghost={record.status !== 0}
                colorPrimary={record.status === 0 ? COLORS.green : COLORS.red}
                icon={
                    <SettingTwoTone
                        twoToneColor={
                            record.status === 0 ? COLORS.green : COLORS.red
                        }
                    />
                }
                loading={loadingGear1}
                onClick={handleToggleActivity}
            >
                {record.status === 0
                    ? tt("Mở lại tài khoản")
                    : tt("Khoá tài khoản")}
            </AntdButton>
        </Tooltip>
    );
    const renderResetSubmitedDocumentForms = () => (
        <Tooltip
            title={tt(
                "Xử lý huỷ tất cả hồ sơ đăng ký hiện tại của tài xế. Tài xế sẽ phải nộp hồ sơ để được xét duyệt lại từ đầu"
            )}
        >
            <AntdButton
                type="primary"
                ghost
                colorPrimary={COLORS.violet}
                icon={<ApiTwoTone twoToneColor={COLORS.violet} />}
                loading={loadingGear2}
                onClick={handleResetDocumentForms}
            >
                {tt("Khởi tạo hồ sơ đăng ký xe mới")}
            </AntdButton>
        </Tooltip>
    );

    const renderUpdateAgency = () => <ModalAddAgency data={record} />;

    return (
        <div className="flex  whitespace-normal">
            <div className="flex flex-col w-full">
                <div className="flex flex-row ">
                    <div className="flex flex-col items-center min-w-[200px] w-[200px]">
                        <img
                            alt="photos"
                            src={record.cover?.path || ""}
                            onError={({ currentTarget }) => {
                                currentTarget.onerror = null; // prevents looping
                                currentTarget.src = cover;
                            }}
                            className="aspect-[3/4] max-w-[100px] object-cover bg-white rounded-[3px] border-solid border-[1px] border-gray-300"
                        />
                        <h2>{record.name}</h2>
                        {record?.agency_id && (
                            <span>
                                {record?.region_name} - {record?.agency_name}
                            </span>
                        )}
                    </div>
                    <div className="w-full flex flex-col gap-[20px] max-w-[calc(100%-200px)] ">
                        <Tabs
                            defaultActiveKey="1"
                            type="card"
                            size="small"
                            className="w-full"
                            items={renderTabs(record)}
                            onChange={(key) => setCurrentTab(key)}
                        />
                        <div className="h-[1px] bg-[#ccc]" />
                        <div className="flex flex-wrap gap-5">
                            {/* <Button
                                    type="primary"
                                    className="w-[200px] mr-[10px] bg-green-500"
                                >
                                    {tt("Xác nhận")}
                                </Button> */}

                            {myPermissions[
                                PERMISSIONS_MAP["update-driver-active"]
                            ] && renderStopActivity()}
                            {myPermissions[
                                PERMISSIONS_MAP["update-driver-account"]
                            ] && renderResetSubmitedDocumentForms()}
                            {myPermissions[
                                PERMISSIONS_MAP["update-driver-account"]
                            ] && renderToggleRideAcceptance()}
                            {myPermissions[
                                PERMISSIONS_MAP["update-driver-agency"]
                            ] && renderUpdateAgency()}
                        </div>
                    </div>
                </div>
            </div>
            {contextHolder}
        </div>
    );
}

export default CustomTable;
