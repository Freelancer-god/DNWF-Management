/* eslint-disable no-template-curly-in-string */
/* eslint-disable no-shadow */
/* eslint-disable max-len */

import { Input, Spin, Tree } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TextArea from "antd/es/input/TextArea";
import { clog } from "../../../utils";
import { spinnerCreate } from "../../../store/NewDriverManager";
import {
    khach_hang,
    quan_ly_chuyen_di,
    tai_xe,
    ho_tro,
    system,
    thong_bao,
    phuong_tien,
} from "../permissions";

function Create(props) {
    const { data, onChangeData } = props;
    const _spinner = useSelector(spinnerCreate);
    const [_id, setId] = useState(data._id);

    const [_roleName, setRoleName] = useState(data._roleName);
    const [_roleDescription, setRoleDescription] = useState(
        data._roleDescription
    );

    // Hệ thống
    const [_systemExpandedKeys, setSystemExpandedKeys] = useState(
        data._systemExpandedKeys
    );
    const [_systemAutoExpandParent, setSystemAutoExpandParent] = useState(
        data._systemAutoExpandParent
    );
    const [_systemCheckedKeys, setSystemCheckedKeys] = useState(
        data._systemCheckedKeys
    );
    const [_systemSelectedKeys, setSystemSelectedKeys] = useState(
        data._systemSelectedKeys
    );
    // Tài xế
    const [_driverExpandedKeys, setDriverExpandedKeys] = useState(
        data._driverExpandedKeys
    );
    const [_driverAutoExpandParent, setDriverAutoExpandParent] = useState(
        data._driverAutoExpandParent
    );
    const [_driverCheckedKeys, setDriverCheckedKeys] = useState(
        data._driverCheckedKeys
    );
    const [_driverSelectedKeys, setDriverSelectedKeys] = useState(
        data._driverSelectedKeys
    );
    // Khách hàng
    const [_customerExpandedKeys, setCustomerExpandedKeys] = useState(
        data._customerExpandedKeys
    );
    const [_customerAutoExpandParent, setCustomerAutoExpandParent] = useState(
        data._customerAutoExpandParent
    );
    const [_customerCheckedKeys, setCustomerCheckedKeys] = useState(
        data._customerCheckedKeys
    );
    const [_customerSelectedKeys, setCustomerSelectedKeys] = useState(
        data._customerSelectedKeys
    );
    // Phương tiện
    const [_vehiclesExpandedKeys, setVehiclesExpandedKeys] = useState(
        data._vehiclesExpandedKeys
    );
    const [_vehiclesAutoExpandParent, setVehiclesAutoExpandParent] = useState(
        data._vehiclesAutoExpandParent
    );
    const [_vehiclesCheckedKeys, setVehiclesCheckedKeys] = useState(
        data._vehiclesCheckedKeys
    );
    const [_vehiclesSelectedKeys, setVehiclesSelectedKeys] = useState(
        data._vehiclesSelectedKeys
    );
    // Chuyến đi
    const [_tripExpandedKeys, setTripExpandedKeys] = useState(
        data._tripExpandedKeys
    );
    const [_tripAutoExpandParent, setTripAutoExpandParent] = useState(
        data._tripAutoExpandParent
    );
    const [_tripCheckedKeys, setTripCheckedKeys] = useState(
        data._tripCheckedKeys
    );
    const [_tripSelectedKeys, setTripSelectedKeys] = useState(
        data._tripSelectedKeys
    );
    // Thông báo
    const [_notificationExpandedKeys, setNotificationExpandedKeys] = useState(
        data._notificationExpandedKeys
    );
    const [_notificationAutoExpandParent, setNotificationAutoExpandParent] =
        useState(data._notificationAutoExpandParent);
    const [_notificationCheckedKeys, setNotificationCheckedKeys] = useState(
        data._notificationCheckedKeys
    );
    const [_notificationSelectedKeys, setNotificationSelectedKeys] = useState(
        data._notificationSelectedKeys
    );
    // Hỗ trợ
    const [_supportExpandedKeys, setSupportExpandedKeys] = useState(
        data._supportExpandedKeys
    );
    const [_supportAutoExpandParent, setSupportAutoExpandParent] = useState(
        data._supportAutoExpandParent
    );
    const [_supportCheckedKeys, setSupportCheckedKeys] = useState(
        data._supportCheckedKeys
    );
    const [_supportSelectedKeys, setSupportSelectedKeys] = useState(
        data._supportSelectedKeys
    );

    clog("data", data);

    clog(
        "systemExpandedKeys, _systemAutoExpandParent,_systemCheckedKeys, _systemSelectedKeys",
        _systemExpandedKeys,
        _systemAutoExpandParent,
        _systemCheckedKeys,
        _systemSelectedKeys
    );

    useEffect(() => {
        if (data) {
            const {
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
            setId(_id);
            setRoleName(_roleName);
            setRoleDescription(_roleDescription);

            setSystemExpandedKeys(_systemExpandedKeys);
            setSystemAutoExpandParent(_systemAutoExpandParent);
            setSystemCheckedKeys(_systemCheckedKeys);
            setSystemSelectedKeys(_systemSelectedKeys);

            setDriverExpandedKeys(_driverExpandedKeys);
            setDriverAutoExpandParent(_driverAutoExpandParent);
            setDriverCheckedKeys(_driverCheckedKeys);
            setDriverSelectedKeys(_driverSelectedKeys);

            setCustomerExpandedKeys(_customerExpandedKeys);
            setCustomerAutoExpandParent(_customerAutoExpandParent);
            setCustomerCheckedKeys(_customerCheckedKeys);
            setCustomerSelectedKeys(_customerSelectedKeys);

            setVehiclesExpandedKeys(_vehiclesExpandedKeys);
            setVehiclesAutoExpandParent(_vehiclesAutoExpandParent);
            setVehiclesCheckedKeys(_vehiclesCheckedKeys);
            setVehiclesSelectedKeys(_vehiclesSelectedKeys);

            setTripExpandedKeys(_tripExpandedKeys);
            setTripAutoExpandParent(_tripAutoExpandParent);
            setTripCheckedKeys(_tripCheckedKeys);
            setTripSelectedKeys(_tripSelectedKeys);

            setNotificationExpandedKeys(_notificationExpandedKeys);
            setNotificationAutoExpandParent(_notificationAutoExpandParent);
            setNotificationCheckedKeys(_notificationCheckedKeys);
            setNotificationSelectedKeys(_notificationSelectedKeys);

            setSupportExpandedKeys(_supportExpandedKeys);
            setSupportAutoExpandParent(_supportAutoExpandParent);
            setSupportCheckedKeys(_supportCheckedKeys);
            setSupportSelectedKeys(_supportSelectedKeys);
        }
    }, [data]);

    const handleOnChangeData = (dataToSend) => {
        onChangeData(dataToSend);
    };

    const dataToSend = {
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
    };

    useEffect(() => {
        // for control
        handleOnChangeData(dataToSend);
    }, [
        _id,
        _roleName,
        _roleDescription,

        _systemCheckedKeys,

        _driverCheckedKeys,

        _customerCheckedKeys,

        _vehiclesCheckedKeys,

        _tripCheckedKeys,

        _notificationCheckedKeys,

        _supportCheckedKeys,
    ]);

    const onSystemExpand = (systemExpandedKeys) => {
        clog("onSystemExpand", systemExpandedKeys);
        setSystemExpandedKeys(systemExpandedKeys);
        setSystemAutoExpandParent(false);
    };

    const onSystemCheck = (systemCheckedKeys) => {
        const removeArray = [];
        systemCheckedKeys.map((item) => {
            if (!isNaN(parseInt(item))) {
                removeArray.push(parseInt(item));
            }
        });
        clog("onSystemCheck", removeArray);
        setSystemCheckedKeys(removeArray);
    };

    const onSystemSelect = (systemSelectedKeys, info) => {
        // console.log("onSystemSelect", info);
        setSystemSelectedKeys(systemSelectedKeys);
    };

    const onCustomerExpand = (customerExpandedKeys) => {
        clog("onCustomerExpand", customerExpandedKeys);
        setCustomerExpandedKeys(customerExpandedKeys);
        setCustomerAutoExpandParent(false);
    };

    const onCustomerCheck = (customerCheckedKeys) => {
        const removeArray = [];
        customerCheckedKeys.map((item) => {
            if (!isNaN(parseInt(item))) {
                removeArray.push(parseInt(item));
            }
        });
        clog("onCustomerCheck", removeArray);
        setCustomerCheckedKeys(removeArray);
    };

    const onCustomerSelect = (customerSelectedKeys, info) => {
        // console.log("oncustomerSelect", info);
        setCustomerSelectedKeys(customerSelectedKeys);
    };

    const onDriverExpand = (driverExpandedKeys) => {
        clog("onDriverExpand", driverExpandedKeys);
        setDriverExpandedKeys(driverExpandedKeys);
        setDriverAutoExpandParent(false);
    };

    const onDriverCheck = (driverCheckedKeys) => {
        const removeArray = [];
        driverCheckedKeys.map((item) => {
            if (!isNaN(parseInt(item))) {
                removeArray.push(parseInt(item));
            }
        });
        clog("onDriverCheck", removeArray);
        setDriverCheckedKeys(removeArray);
    };

    const onDriverSelect = (driverSelectedKeys, info) => {
        // console.log("onDriverSelect", info);
        setDriverSelectedKeys(driverSelectedKeys);
    };

    const onVehiclesExpand = (vehiclesExpandedKeys) => {
        clog("onVehiclesExpand", vehiclesExpandedKeys);
        setVehiclesExpandedKeys(vehiclesExpandedKeys);
        setVehiclesAutoExpandParent(false);
    };

    const onVehiclesCheck = (vehiclesCheckedKeys) => {
        const removeArray = [];
        vehiclesCheckedKeys.map((item) => {
            if (!isNaN(parseInt(item))) {
                removeArray.push(parseInt(item));
            }
        });
        clog("onVehiclesCheck", removeArray);
        setVehiclesCheckedKeys(removeArray);
    };

    const onVehiclesSelect = (vehiclesSelectedKeys, info) => {
        // console.log("onVehiclesSelect", info);
        setVehiclesSelectedKeys(vehiclesSelectedKeys);
    };

    const onTripExpand = (tripExpandedKeys) => {
        clog("onTripExpand", tripExpandedKeys);
        setTripExpandedKeys(tripExpandedKeys);
        setTripAutoExpandParent(false);
    };

    const onTripCheck = (tripCheckedKeys) => {
        const removeArray = [];
        tripCheckedKeys.map((item) => {
            if (!isNaN(parseInt(item))) {
                removeArray.push(parseInt(item));
            }
        });
        clog("onTripCheck", removeArray);
        setTripCheckedKeys(removeArray);
    };

    const onTripSelect = (tripSelectedKeys, info) => {
        // console.log("onTripSelect", info);
        setTripSelectedKeys(tripSelectedKeys);
    };

    const onNotificationExpand = (notificationExpandedKeys) => {
        clog("onNotificationExpand", notificationExpandedKeys);
        setNotificationExpandedKeys(notificationExpandedKeys);
        setNotificationAutoExpandParent(false);
    };

    const onNotificationCheck = (notificationCheckedKeys) => {
        const removeArray = [];
        notificationCheckedKeys.map((item) => {
            if (!isNaN(parseInt(item))) {
                removeArray.push(parseInt(item));
            }
        });
        clog("onNotificationCheck", removeArray);
        setNotificationCheckedKeys(removeArray);
    };

    const onNotificationSelect = (notificationSelectedKeys, info) => {
        // console.log("onNotificationSelect", info);
        setNotificationSelectedKeys(notificationSelectedKeys);
    };

    const onSupportExpand = (supportExpandedKeys) => {
        clog("onSupportExpand", supportExpandedKeys);
        setSupportExpandedKeys(supportExpandedKeys);
        setSupportAutoExpandParent(false);
    };

    const onSupportCheck = (supportCheckedKeys) => {
        const removeArray = [];
        supportCheckedKeys.map((item) => {
            if (!isNaN(parseInt(item))) {
                removeArray.push(parseInt(item));
            }
        });
        clog("onSupportCheck", removeArray);
        setSupportCheckedKeys(removeArray);
    };

    const onSupportSelect = (supportSelectedKeys, info) => {
        // console.log("onSupportSelect", info);
        setSupportSelectedKeys(supportSelectedKeys);
    };

    return (
        <div>
            <Spin tip="Đang tải..." size="large" spinning={_spinner}>
                <div className="p-6">
                    {/* INPUTS */}
                    <div className="mb-4">
                        <div>
                            <div
                                className="md:w-1/6"
                                style={{ width: "100px" }}
                            >
                                <label
                                    style={{
                                        width: "100px",
                                        fontSize: "16px",
                                    }}
                                    htmlFor="vai_tro"
                                >
                                    <strong>Vai trò *</strong>
                                </label>
                            </div>
                            <div className="md:w-5/6">
                                <Input
                                    id="vai_tro"
                                    className="w-full border p-2 rounded"
                                    maxLength={50}
                                    value={_roleName}
                                    onChange={(event) =>
                                        setRoleName(event.target.value)
                                    }
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mb-4">
                        <div>
                            <div
                                className="md:w-1/6"
                                style={{ width: "100px" }}
                            >
                                <label
                                    style={{
                                        width: "100px",
                                        fontSize: "16px",
                                    }}
                                    htmlFor="vai_tro"
                                >
                                    <strong>Giá trị</strong>
                                </label>
                            </div>
                            <div className="md:w-5/6">
                                <TextArea
                                    className="w-full border p-2 rounded"
                                    rows={6}
                                    value={_roleDescription}
                                    onChange={(event) =>
                                        setRoleDescription(event.target.value)
                                    }
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mb-4">
                        <div>
                            <div>
                                <label htmlFor="_giai_thich">
                                    <strong>
                                        Những phân quyền được sử dụng trong hệ
                                        thống
                                    </strong>
                                </label>
                            </div>
                        </div>
                    </div>
                    {/* RENDER TREEs */}
                    <div className="mb-4">
                        <div className="flex flex-wrap">
                            <div className="lg:w-1/4 md:w-1/4 sm:w-1/4 w-full">
                                <label
                                    className="text-primary"
                                    style={{ fontSize: "16px" }}
                                >
                                    <strong>Hệ thống</strong>
                                </label>
                                <Tree
                                    defaultExpandAll={false}
                                    checkable
                                    onExpand={onSystemExpand}
                                    expandedKeys={_systemExpandedKeys}
                                    autoExpandParent={_systemAutoExpandParent}
                                    onCheck={onSystemCheck}
                                    checkedKeys={_systemCheckedKeys}
                                    onSelect={onSystemSelect}
                                    selectedKeys={_systemSelectedKeys}
                                    treeData={system}
                                >
                                    {/* {this.renderTreeNodes(system)} */}
                                </Tree>
                            </div>
                            <div className="lg:w-1/4 md:w-1/4 sm:w-1/4 w-full">
                                <label
                                    className="text-primary"
                                    style={{ fontSize: "16px" }}
                                >
                                    <strong>Khách hàng</strong>
                                </label>
                                <Tree
                                    defaultExpandAll={false}
                                    checkable
                                    onExpand={onCustomerExpand}
                                    expandedKeys={_customerExpandedKeys}
                                    autoExpandParent={_customerAutoExpandParent}
                                    onCheck={onCustomerCheck}
                                    checkedKeys={_customerCheckedKeys}
                                    onSelect={onCustomerSelect}
                                    selectedKeys={_customerSelectedKeys}
                                    treeData={khach_hang}
                                >
                                    {/* {this.renderTreeNodes(partners)} */}
                                </Tree>
                            </div>

                            <div className="lg:w-1/4 md:w-1/4 sm:w-1/4 w-full">
                                <label
                                    className="text-primary"
                                    style={{ fontSize: "16px" }}
                                >
                                    <strong>Tài xế</strong>
                                </label>
                                <Tree
                                    defaultExpandAll={false}
                                    checkable
                                    onExpand={onDriverExpand}
                                    expandedKeys={_driverExpandedKeys}
                                    autoExpandParent={_driverAutoExpandParent}
                                    onCheck={onDriverCheck}
                                    checkedKeys={_driverCheckedKeys}
                                    onSelect={onDriverSelect}
                                    selectedKeys={_driverSelectedKeys}
                                    treeData={tai_xe}
                                >
                                    {/* {this.renderTreeNodes(system)} */}
                                </Tree>
                            </div>
                        </div>

                        <div className="flex flex-wrap">
                            <div className="lg:w-1/4 md:w-1/4 sm:w-1/4 w-full">
                                <label
                                    className="text-primary"
                                    style={{ fontSize: "16px" }}
                                >
                                    <strong>Phương tiện</strong>
                                </label>
                                <Tree
                                    defaultExpandAll={false}
                                    checkable
                                    onExpand={onVehiclesExpand}
                                    expandedKeys={_vehiclesExpandedKeys}
                                    autoExpandParent={_vehiclesAutoExpandParent}
                                    onCheck={onVehiclesCheck}
                                    checkedKeys={_vehiclesCheckedKeys}
                                    onSelect={onVehiclesSelect}
                                    selectedKeys={_vehiclesSelectedKeys}
                                    treeData={phuong_tien}
                                >
                                    {/* {this.renderTreeNodes(partners)} */}
                                </Tree>
                            </div>

                            <div className="lg:w-1/4 md:w-1/4 sm:w-1/4 w-full">
                                <label
                                    className="text-primary"
                                    style={{ fontSize: "16px" }}
                                >
                                    <strong>Quản lý chuyến đi</strong>
                                </label>
                                <Tree
                                    defaultExpandAll={false}
                                    checkable
                                    onExpand={onTripExpand}
                                    expandedKeys={_tripExpandedKeys}
                                    autoExpandParent={_tripAutoExpandParent}
                                    onCheck={onTripCheck}
                                    checkedKeys={_tripCheckedKeys}
                                    onSelect={onTripSelect}
                                    selectedKeys={_tripSelectedKeys}
                                    treeData={quan_ly_chuyen_di}
                                >
                                    {/* {this.renderTreeNodes(system)} */}
                                </Tree>
                            </div>

                            <div className="lg:w-1/4 md:w-1/4 col-sm-6 w-full">
                                <label
                                    className="text-primary"
                                    style={{ fontSize: "16px" }}
                                >
                                    <strong>Thông báo</strong>
                                </label>
                                <Tree
                                    defaultExpandAll={false}
                                    checkable
                                    onExpand={onNotificationExpand}
                                    expandedKeys={_notificationExpandedKeys}
                                    autoExpandParent={
                                        _notificationAutoExpandParent
                                    }
                                    onCheck={onNotificationCheck}
                                    checkedKeys={_notificationCheckedKeys}
                                    onSelect={onNotificationSelect}
                                    selectedKeys={_notificationSelectedKeys}
                                    treeData={thong_bao}
                                >
                                    {/* {this.renderTreeNodes(partners)} */}
                                </Tree>
                            </div>
                        </div>

                        <div className="flex flex-wrap">
                            <div className="lg:w-1/4 md:w-1/4 sm:w-1/4 w-full">
                                <label
                                    className="text-primary"
                                    style={{ fontSize: "16px" }}
                                >
                                    <strong>Hỗ trợ</strong>
                                </label>
                                <Tree
                                    defaultExpandAll={false}
                                    checkable
                                    onExpand={onSupportExpand}
                                    expandedKeys={_supportExpandedKeys}
                                    autoExpandParent={_supportAutoExpandParent}
                                    onCheck={onSupportCheck}
                                    checkedKeys={_supportCheckedKeys}
                                    onSelect={onSupportSelect}
                                    selectedKeys={_supportSelectedKeys}
                                    treeData={ho_tro}
                                >
                                    {/* {this.renderTreeNodes(partners)} */}
                                </Tree>
                            </div>
                        </div>
                    </div>
                </div>
            </Spin>
        </div>
    );
}

export default Create;
