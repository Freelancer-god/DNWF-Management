/* eslint-disable no-template-curly-in-string */
/* eslint-disable no-shadow */
/* eslint-disable max-len */

import { Input, Spin, Tree } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TextArea from "antd/es/input/TextArea";
import { clog } from "../../../utils";
import { spinnerCreate } from "../../../store/ActiveDriverManager";
import {
    system,
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
            } = data;
            setId(_id);
            setRoleName(_roleName);
            setRoleDescription(_roleDescription);

            setSystemExpandedKeys(_systemExpandedKeys);
            setSystemAutoExpandParent(_systemAutoExpandParent);
            setSystemCheckedKeys(_systemCheckedKeys);
            setSystemSelectedKeys(_systemSelectedKeys);

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
    };

    useEffect(() => {
        // for control
        handleOnChangeData(dataToSend);
    }, [
        _id,
        _roleName,
        _roleDescription,

        _systemCheckedKeys,
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

                        </div>
                    </div>
                </div>
            </Spin>
        </div>
    );
}

export default Create;
