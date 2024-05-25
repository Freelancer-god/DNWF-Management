/* eslint-disable no-template-curly-in-string */
/* eslint-disable no-shadow */
/* eslint-disable max-len */

import {
    Form,
    Input,
    InputNumber,
    Radio,
    Select,
    Spin,
    Switch,
    Tooltip,
} from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { clog, formatterNumber, parserNumber, tt } from "../../../utils";
import { spinnerCreate } from "../../../store/DriverDepositTransaction";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import SelectWithSearch from "../../../components/SelectWithSearch/SelectWithSearch";
function Create(props) {
    const { data, onChangeData, form } = props;
    const _spinner = useSelector(spinnerCreate);
    const [_id, setId] = useState(data._id);
    const [_total, setTotal] = useState(data._total);
    const [_driverId, setDriverId] = useState(data._driverId);

    const config = {
        headers: {
            Authorization: `Bearer ${
                document.getElementById("myToken")?.value
            }`,
        },
    };

    const handleChangeTotal = (value) => {
        setTotal(value);
    };

    useEffect(() => {
        if (data) {
            const { _id, _total, _driverId } = data;
            setId(_id);
            setTotal(_total);
            setDriverId(_driverId);
        }
    }, [data]);

    const dataToSend = {
        _total,
        _driverId,
    };

    // useEffect(() => {
    //     // for control
    //     handleOnChangeData(dataToSend);
    // }, [_id, _name, _email, _status]);

    const handleOnChangeData = (dataToSend) => {
        onChangeData(dataToSend);
    };

    useEffect(() => {
        // for form
        form.setFieldValue("_total", _total);
        form.setFieldValue("_driverId", _driverId);
        // for control
        handleOnChangeData(dataToSend);
    }, [_total, _driverId]);

    const validateMessages = {
        required: `${tt("Nhập")} ${"${label}"}`,
    };

    const handleFormatDriverSearchData = (data) => {
        const array = [];
        for (const i of data) {
            array.push({
                id: i.id,
                value: i.id,
                label: `${i.display_name || i.name || i.label} - ${i.phone}`,
            });
        }
        return array;
    };

    const handleOnChangeSelectDriver = (value, item) => {
        setDriverId(value?.id);
    };

    const validateAmount = (_, value) => {
        // Kiểm tra giá trị và trả về một Promise
        return new Promise((resolve, reject) => {
            if (value && parseInt(value, 10) > 50000) {
                resolve();
            } else {
                reject(new Error("Số tiền phải lớn hơn 50,000"));
            }
        });
    };

    return (
        <div>
            <Spin tip={"Đang tải..."} size={"large"} spinning={_spinner}>
                <Form
                    labelCol={{ span: 8 }}
                    layout="horizontal"
                    form={form}
                    validateMessages={validateMessages}
                >
                    <Form.Item
                        shouldUpdate
                        className="mb-2"
                        label={tt("Số tiền")}
                        name="_total"
                        rules={[
                            { required: true },
                            {
                                validator: validateAmount,
                            },
                        ]}
                    >
                        <InputNumber
                            style={{ width: "50%" }}
                            value={_total}
                            formatter={(value) => {
                                return formatterNumber(value);
                            }}
                            parser={(value) => parserNumber(value)}
                            addonAfter="đ"
                            onChange={handleChangeTotal}
                        />
                    </Form.Item>
                    <Form.Item
                        className="mb-2"
                        label={tt("Tài xế")}
                        name="_driverId"
                        rules={[{ required: true }]}
                    >
                        <SelectWithSearch
                            // mode="multiple"
                            placeholder={tt("Chọn")}
                            selected={_driverId}
                            onChangSelect={handleOnChangeSelectDriver}
                            formatFunction={handleFormatDriverSearchData}
                            API="api/cmsService/v1/drivers/search"
                            filter={{ status: 1 }}
                            headers={config}
                        />
                    </Form.Item>
                </Form>
            </Spin>
        </div>
    );
}

export default Create;
