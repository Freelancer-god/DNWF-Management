/* eslint-disable no-template-curly-in-string */
/* eslint-disable no-shadow */
/* eslint-disable max-len */

import { Form, Input, Select, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { tt } from "../../../utils";
import { spinnerCreate } from "../../../store/ConfigQuestion";
import "react-quill/dist/quill.snow.css";
import { SurveyFormClipboard } from "./PlainClipboard";
import { Quill } from "react-quill";

// Quill.register("modules/clipboard", SurveyFormClipboard, true);

function Create(props) {
    const { data, onChangeData, form } = props;
    const _spinner = useSelector(spinnerCreate);
    const [_id, setId] = useState(data._id);
    const [_title, setTile] = useState(data._title);
    const [_type, setType] = useState(data._type);
    const handleOnChangeTitle = (e) => {
        setTile(e.target.value);
    };

    const mapType = {
        1: "APP KHÁCH HÀNG",
        2: "APP TÀI XẾ",
    };

    useEffect(() => {
        if (data) {
            const { _id, _title, _type } = data;
            setId(_id);
            setTile(_title);
            setType(_type);
        }
    }, [data]);

    useEffect(() => {
        // for form
        form.setFieldValue("_title", _title);
        form.setFieldValue("_type", {
            value: _type,
            label: mapType[_type],
        });
        // for control
        handleOnChangeData(dataToSend);
    }, [_title, _type]);

    const dataToSend = {
        _title,
        _type,
    };

    useEffect(() => {
        // for control
        handleOnChangeData(dataToSend);
    }, [_id, _title, _type]);

    const handleOnChangeData = (dataToSend) => {
        onChangeData(dataToSend);
    };

    const validateMessages = {
        required: `${tt("Nhập")} ${"${label}"}`,
    };

    const handleOnChangeType = (value) => {
        setType(value);
    };

    return (
        <div>
            <Spin tip={"Đang tải..."} size={"large"} spinning={_spinner}>
                <div className="p-6">
                    <Form
                        labelCol={{ span: 4 }}
                        layout="horizontal"
                        form={form}
                        validateMessages={validateMessages}
                        className="w-[800px]"
                    >
                        <Form.Item
                            shouldUpdate
                            className="mb-2"
                            label={tt("Câu hỏi")}
                            name="_title"
                            rules={[{ required: true }]}
                        >
                            <Input.TextArea
                                value={_title}
                                className="w-[600px]"
                                onChange={handleOnChangeTitle}
                            />
                        </Form.Item>
                        <Form.Item
                            shouldUpdate
                            className="mb-2 "
                            label={tt("Loại")}
                            name="_type"
                            rules={[{ required: true }]}
                        >
                            <Select
                                className="h-[40px] rounded w-1/2"
                                // value={_type}
                                // className="w-[10px]"
                                onChange={handleOnChangeType}
                                options={[
                                    {
                                        value: 1,
                                        label: mapType[1],
                                    },
                                    {
                                        value: 2,
                                        label: mapType[2],
                                    },
                                ]}
                            />
                        </Form.Item>
                    </Form>
                </div>
            </Spin>
        </div>
    );
}

export default Create;
