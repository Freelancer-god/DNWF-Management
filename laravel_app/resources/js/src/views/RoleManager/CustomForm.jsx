/* eslint-disable no-shadow */
import React, { useContext, useEffect, useState } from "react";
import { Breadcrumb, Button, Dropdown, Form, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { clog, tt } from "../../utils";
import {
    changeSpinnerCreate,
    changeRoleDescription,
    changeRoleName,
    create,
    deleteMulti,
    getItemByID,
    id,
    initDuplicate,
    update,
    updateItem,
    roleName,
    roleDescription,
    systemExpandedKeys,
    systemAutoExpandParent,
    systemCheckedKeys,
    systemSelectedKeys,
    driverExpandedKeys,
    driverAutoExpandParent,
    driverCheckedKeys,
    driverSelectedKeys,
    customerExpandedKeys,
    customerAutoExpandParent,
    customerCheckedKeys,
    customerSelectedKeys,
    vehiclesExpandedKeys,
    vehiclesAutoExpandParent,
    vehiclesCheckedKeys,
    vehiclesSelectedKeys,
    tripExpandedKeys,
    tripAutoExpandParent,
    tripCheckedKeys,
    tripSelectedKeys,
    notificationExpandedKeys,
    notificationCheckedKeys,
    notificationSelectedKeys,
    notificationAutoExpandParent,
    supportExpandedKeys,
    supportAutoExpandParent,
    supportCheckedKeys,
    supportSelectedKeys,
    configExpandedKeys,
    configAutoExpandParent,
    configCheckedKeys,
    configSelectedKeys,
    changeSystemAutoExpandParent,
    changeSystemCheckedKeys,
    changeSystemExpandedKeys,
    changeSystemSelectedKeys,
    changeCustomerAutoExpandParent,
    changeCustomerCheckedKeys,
    changeCustomerExpandedKeys,
    changeCustomerSelectedKeys,
    changeDriverAutoExpandParent,
    changeDriverCheckedKeys,
    changeDriverExpandedKeys,
    changeDriverSelectedKeys,
    changeVehiclesAutoExpandParent,
    changeVehiclesCheckedKeys,
    changeVehiclesExpandedKeys,
    changeVehiclesSelectedKeys,
    changeTripAutoExpandParent,
    changeTripCheckedKeys,
    changeTripExpandedKeys,
    changeTripSelectedKeys,
    changeNotificationAutoExpandParent,
    changeNotificationCheckedKeys,
    changeNotificationExpandedKeys,
    changeNotificationSelectedKeys,
    changeSupportAutoExpandParent,
    changeSupportCheckedKeys,
    changeSupportExpandedKeys,
    changeSupportSelectedKeys,
    changeConfigAutoExpandParent,
    changeConfigCheckedKeys,
    changeConfigExpandedKeys,
    changeConfigSelectedKeys,
} from "../../store/RoleManager";
import Create from "./FormCreate/Create";
import { getBreadcrumb } from "../../utils/function";
import { requireAdmin } from "../../store";
import { throttleOnPressAction } from "../../hook/throttlePressAcion";
import { PermissionsContext } from "../../store/Permissions";
import { PERMISSIONS_MAP } from "../../constants";

const { confirm } = Modal;

function CustomForm() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const _updateItem = useSelector(updateItem);

    const _id = useSelector(id);
    const _roleName = useSelector(roleName);
    const _roleDescription = useSelector(roleDescription);

    const _systemExpandedKeys = useSelector(systemExpandedKeys);
    const _systemAutoExpandParent = useSelector(systemAutoExpandParent);
    const _systemCheckedKeys = useSelector(systemCheckedKeys);
    const _systemSelectedKeys = useSelector(systemSelectedKeys);

    const _driverExpandedKeys = useSelector(driverExpandedKeys);
    const _driverAutoExpandParent = useSelector(driverAutoExpandParent);
    const _driverCheckedKeys = useSelector(driverCheckedKeys);
    const _driverSelectedKeys = useSelector(driverSelectedKeys);

    const _customerExpandedKeys = useSelector(customerExpandedKeys);
    const _customerAutoExpandParent = useSelector(customerAutoExpandParent);
    const _customerCheckedKeys = useSelector(customerCheckedKeys);
    const _customerSelectedKeys = useSelector(customerSelectedKeys);

    const _configExpandedKeys = useSelector(configExpandedKeys);
    const _configAutoExpandParent = useSelector(configAutoExpandParent);
    const _configCheckedKeys = useSelector(configCheckedKeys);
    const _configSelectedKeys = useSelector(configSelectedKeys);

    const _vehiclesExpandedKeys = useSelector(vehiclesExpandedKeys);
    const _vehiclesAutoExpandParent = useSelector(vehiclesAutoExpandParent);
    const _vehiclesCheckedKeys = useSelector(vehiclesCheckedKeys);
    const _vehiclesSelectedKeys = useSelector(vehiclesSelectedKeys);

    const _tripExpandedKeys = useSelector(tripExpandedKeys);
    const _tripAutoExpandParent = useSelector(tripAutoExpandParent);
    const _tripCheckedKeys = useSelector(tripCheckedKeys);
    const _tripSelectedKeys = useSelector(tripSelectedKeys);

    const _notificationExpandedKeys = useSelector(notificationExpandedKeys);
    const _notificationAutoExpandParent = useSelector(
        notificationAutoExpandParent
    );
    const _notificationCheckedKeys = useSelector(notificationCheckedKeys);
    const _notificationSelectedKeys = useSelector(notificationSelectedKeys);

    const _supportExpandedKeys = useSelector(supportExpandedKeys);
    const _supportAutoExpandParent = useSelector(supportAutoExpandParent);
    const _supportCheckedKeys = useSelector(supportCheckedKeys);
    const _supportSelectedKeys = useSelector(supportSelectedKeys);

    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const myPermissions = useContext(PermissionsContext).permissions;

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = (type) => () => {
        throttleOnPressAction(submitSave);
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        clog("searchParams id", searchParams.get("id"));
        const idParam = searchParams.get("id");
        if (idParam && _id === null) {
            dispatch(getItemByID({ id: idParam }));
        }
    }, []);

    const handleOnChildChange = (data) => {
        clog("dataToSend", data);
        const {
            _roleName,
            _roleDescription,

            _systemExpandedKeys,
            _systemAutoExpandParent,
            _systemCheckedKeys,
            _systemSelectedKeys,

            _driverExpandedKeys,
            _driverAutoExpandParent,
            _driverCheckedKeys,
            _driverSelectedKeys,

            _customerExpandedKeys,
            _customerAutoExpandParent,
            _customerCheckedKeys,
            _customerSelectedKeys,

            _configExpandedKeys,
            _configAutoExpandParent,
            _configCheckedKeys,
            _configSelectedKeys,

            _vehiclesExpandedKeys,
            _vehiclesAutoExpandParent,
            _vehiclesCheckedKeys,
            _vehiclesSelectedKeys,

            _tripExpandedKeys,
            _tripAutoExpandParent,
            _tripCheckedKeys,
            _tripSelectedKeys,

            _notificationExpandedKeys,
            _notificationAutoExpandParent,
            _notificationCheckedKeys,
            _notificationSelectedKeys,

            _supportExpandedKeys,
            _supportAutoExpandParent,
            _supportCheckedKeys,
            _supportSelectedKeys,
        } = data;
        dispatch(changeRoleName(_roleName));
        dispatch(changeRoleDescription(_roleDescription));

        dispatch(changeSystemAutoExpandParent(_systemAutoExpandParent));
        dispatch(changeSystemCheckedKeys(_systemCheckedKeys));
        dispatch(changeSystemExpandedKeys(_systemExpandedKeys));
        dispatch(changeSystemSelectedKeys(_systemSelectedKeys));

        dispatch(changeCustomerAutoExpandParent(_customerAutoExpandParent));
        dispatch(changeCustomerCheckedKeys(_customerCheckedKeys));
        dispatch(changeCustomerExpandedKeys(_customerExpandedKeys));
        dispatch(changeCustomerSelectedKeys(_customerSelectedKeys));

        dispatch(changeConfigAutoExpandParent(_configAutoExpandParent));
        dispatch(changeConfigCheckedKeys(_configCheckedKeys));
        dispatch(changeConfigExpandedKeys(_configExpandedKeys));
        dispatch(changeConfigSelectedKeys(_configSelectedKeys));

        dispatch(changeDriverAutoExpandParent(_driverAutoExpandParent));
        dispatch(changeDriverCheckedKeys(_driverCheckedKeys));
        dispatch(changeDriverExpandedKeys(_driverExpandedKeys));
        dispatch(changeDriverSelectedKeys(_driverSelectedKeys));

        dispatch(changeVehiclesAutoExpandParent(_vehiclesAutoExpandParent));
        dispatch(changeVehiclesCheckedKeys(_vehiclesCheckedKeys));
        dispatch(changeVehiclesExpandedKeys(_vehiclesExpandedKeys));
        dispatch(changeVehiclesSelectedKeys(_vehiclesSelectedKeys));

        dispatch(changeTripAutoExpandParent(_tripAutoExpandParent));
        dispatch(changeTripCheckedKeys(_tripCheckedKeys));
        dispatch(changeTripExpandedKeys(_tripExpandedKeys));
        dispatch(changeTripSelectedKeys(_tripSelectedKeys));

        dispatch(
            changeNotificationAutoExpandParent(_notificationAutoExpandParent)
        );
        dispatch(changeNotificationCheckedKeys(_notificationCheckedKeys));
        dispatch(changeNotificationExpandedKeys(_notificationExpandedKeys));
        dispatch(changeNotificationSelectedKeys(_notificationSelectedKeys));

        dispatch(changeSupportAutoExpandParent(_supportAutoExpandParent));
        dispatch(changeSupportCheckedKeys(_supportCheckedKeys));
        dispatch(changeSupportExpandedKeys(_supportExpandedKeys));
        dispatch(changeSupportSelectedKeys(_supportSelectedKeys));
        // dispatch(changeRoleDescription(_roleDescription));
    };

    const dataToForm = () => ({
        _id,
        _roleName,
        _roleDescription,

        _systemExpandedKeys,
        _systemAutoExpandParent,
        _systemCheckedKeys,
        _systemSelectedKeys,

        _driverExpandedKeys,
        _driverAutoExpandParent,
        _driverCheckedKeys,
        _driverSelectedKeys,

        _customerExpandedKeys,
        _customerAutoExpandParent,
        _customerCheckedKeys,
        _customerSelectedKeys,

        _configExpandedKeys,
        _configAutoExpandParent,
        _configCheckedKeys,
        _configSelectedKeys,

        _vehiclesExpandedKeys,
        _vehiclesAutoExpandParent,
        _vehiclesCheckedKeys,
        _vehiclesSelectedKeys,

        _tripExpandedKeys,
        _tripAutoExpandParent,
        _tripCheckedKeys,
        _tripSelectedKeys,

        _notificationExpandedKeys,
        _notificationAutoExpandParent,
        _notificationCheckedKeys,
        _notificationSelectedKeys,

        _supportExpandedKeys,
        _supportAutoExpandParent,
        _supportCheckedKeys,
        _supportSelectedKeys,
        // _totalPrize,
        // _quantity,
        // _prize,
        // // _prizeUnder1,
        // // _prizeBetween1,
        // _commissionType,
        // _commission,
        // _commissionSaleType,
        // _commissionSale,
        // _rangeDate,
        // _prizeStores,
        // _isRange,
        // _rangeDay,
        // _rangeTime,
        // _cover,
    });

    const submitSave = () => {
        if (_id) {
            // update
            dispatch(update()).then(({ payload }) => {
                if (payload) {
                    navigate("/cms/roles?view_type=list");
                }
            });
        } else {
            // new
            dispatch(create()).then(({ payload }) => {
                if (payload) {
                    navigate("/cms/roles?view_type=list");
                }
            });
        }
    };

    const handleOnPressSave = () => {
        clog("Cập nhật");
        throttleOnPressAction(submitSave);
    };

    const handleOnPressCancel = () => {
        navigate("/cms/roles?view_type=list");
    };

    const handleOnPressCreate = () => {
        showModal();
    };

    const items = [
        {
            label: tt("Nhân bản"),
            key: "0",
        },
        // can("championshipvouchers", ["championshipvouchers-voucher-delete"], _permission) && {
        //     label: tt("Xoá"),
        //     key: "1",
        //     //   disabled: _updateItem?.status !== 1,
        // },
    ];

    const submitDelete = () => {
        requireAdmin().then(() => {
            dispatch(changeSpinnerCreate(true));
            dispatch(deleteMulti({ selectedRows: [_updateItem] })).then(
                ({ payload }) => {
                    dispatch(changeSpinnerCreate(false));
                    if (payload) {
                        navigate("/cms/roles?view_type=list");
                    }
                }
            );
        });
    };

    const handleMenuClick = (e) => {
        switch (e.key) {
            case "0":
                dispatch(initDuplicate());
                navigate("/cms/roles?view_type=form");
                break;
            case "1":
                confirm({
                    title: tt("Bạn có chắc chắn muốn xoá?"),
                    icon: <ExclamationCircleFilled />,
                    content: `${tt("Xoá")} ${_updateItem?.display_name}`,
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

    const breadcrumbNameMap = {
        "?view_type=list": tt("Danh sách vai trò"),
        "?view_type=form": tt("Mới"),
        "?view_type=form&id={id}": _updateItem?.display_name,
    };
    const extraBreadcrumbItems = getBreadcrumb(breadcrumbNameMap);
    const breadcrumbItems = [
        {
            title: <Link to="/cms/roles">{tt("Danh sách Vai trò")}</Link>,
            key: "role_home",
        },
    ].concat(extraBreadcrumbItems);

    const setTypeConfirm = () =>
        searchParams.get("id") === null ? "create" : "update";

    return (
        <div
            className="custom-container"
            style={{ paddingTop: "10px", paddingBottom: 0 }}
        >
            <div style={{ paddingLeft: "10px", paddingRight: "10px" }}>
                <div style={{ height: "32px" }} className="mb-1.5">
                    <div className="ant-breadcrumb_custom_fontsize">
                        <Breadcrumb items={breadcrumbItems} />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        {myPermissions[PERMISSIONS_MAP["update-role"]] && (
                            <Button
                                type="primary"
                                style={{ marginRight: "8px" }}
                                className="mb-1.5"
                                onClick={handleOnPressSave}
                            >
                                {tt(_id ? "Cập nhật" : "Lưu")}
                            </Button>
                        )}

                        <Button
                            type="text"
                            style={{ marginRight: "8px" }}
                            className="mb-1.5"
                            onClick={handleOnPressCancel}
                        >
                            {tt("Quay lại")}
                        </Button>
                        {/* {_id && ( */}
                        {/*	<Can appName={'championshipvouchers'} p={['championshipvouchers-voucher-create']}> */}
                        {/*		<Button */}
                        {/*			style={{ marginRight: '8px' }} */}
                        {/*			className="mb-1.5" */}
                        {/*			onClick={handleOnPressCreate} */}
                        {/*		> */}
                        {/*			{tt('Tạo')} */}
                        {/*		</Button> */}
                        {/*	</Can> */}
                        {/* )} */}
                    </div>
                    {_id && (
                        <div>
                            {/* <Dropdown
                menu={{
                  items,
                  onClick: handleMenuClick,
                }}
                trigger={['click']}
              >
                <Button
                  icon={<i className="fa fa-cog" />}
                  onClick={(e) => e.preventDefault()}
                  className="custom-button-ant-span bp375:float-right mb-1.5"
                >
                  {tt('Tác vụ')}
                </Button>
              </Dropdown> */}
                        </div>
                    )}
                </div>
            </div>

            <div className="h-[calc(100vh-136px)] overflow-auto">
                <div className="bg-stripes-purple">
                    <div
                        className="custom-form-sheet-sm"
                        style={{ maxWidth: "1000px", minHeight: "unset" }}
                    >
                        <Create
                            data={dataToForm()}
                            onChangeData={handleOnChildChange}
                        />
                    </div>
                </div>
            </div>

            {/* <ModalInforPrize
                data={dataToForm()}
                isModalOpen={isModalOpen}
                handleOk={handleOk(setTypeConfirm())}
                handleCancel={handleCancel}
            /> */}
        </div>
    );
}

export default CustomForm;
