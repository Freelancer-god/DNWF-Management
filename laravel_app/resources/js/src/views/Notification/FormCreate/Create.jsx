/* eslint-disable no-template-curly-in-string */
/* eslint-disable no-shadow */
/* eslint-disable max-len */

import { DatePicker, Form, Input, Select, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { clog, tt } from "../../../utils";
import { spinnerCreate } from "../../../store/Notification";
import "react-quill/dist/quill.snow.css";
import dayjs from "dayjs";
import { SEND_NOTIFICATION_TYPE } from "../../../constants";
import SelectDateComp from "../SelectComp/SelectDateComp";
import SelectTimeComp from "../SelectComp/SelectTimeComp";
import SelectDayOfWeekComp from "../SelectComp/SelectDayOfWeekComp";

function Create(props) {
    const { data, onChangeData, form } = props;
    const _spinner = useSelector(spinnerCreate);
    const [_id, setId] = useState(data._id);
    const [_title, setTile] = useState(data._title);
    const [_content, setContent] = useState(data._content);
    const [_type, setType] = useState(data._type);
    const [_sendType, setSendType] = useState(data._sendType);
    const [_status, setStatus] = useState(data._status);
    const [_sendDate, setSendDate] = useState(data._sendDate);

    const options = [
        {
            value: 1,
            label: "Gửi một lần",
        },
        {
            value: 2,
            label: "Gửi mỗi ngày",
        },
        {
            value: 3,
            label: "Gửi mỗi tuần",
        },
        {
            value: 4,
            label: "Gửi mỗi tháng",
        },
    ];

    const optionsUserSend = [
        {
            value: 1,
            label: "Gửi tất cả",
        },
        {
            value: 2,
            label: "Gửi cho khách hàng",
        },
        {
            value: 3,
            label: "Gửi cho tài xế",
        },
        // {
        //     value: 4,
        //     label: "Gửi cho tài xế test",
        // },
        // {
        //     value: 5,
        //     label: "Gửi cho khách hàng test",
        // },
    ];

    const onChangeType = (value) => {
        setType(value);
    };

    const onChangeSendType = (value) => {
        setSendType(value);
    };

    const handleOnChangeValue = (e) => setContent(e.target.value);

    const handleOnChangeTitle = (e) => {
        setTile(e.target.value);
    };

    const handleOnChangeStatus = (checked) => {
        setStatus(checked ? 1 : 0);
    };

    useEffect(() => {
        if (data) {
            const {
                _id,
                _title,
                _content,
                _type,
                // _status,
                _sendType,
                _sendDate,
            } = data;
            setId(_id);
            setTile(_title);
            setContent(_content);
            setType(_type);
            // setStatus(_status);
            setSendDate(_sendDate);
            setSendType(_sendType);
        }
    }, [data]);

    const dataToSend = {
        _title,
        _content,
        _type,
        _status,
        _sendDate,
        _sendType,
    };

    useEffect(() => {
        // for form

        form.setFieldValue("_title", _title);
        form.setFieldValue("_content", _content);
        form.setFieldValue("_type", _type);
        // form.setFieldValue("_status", _status);
        form.setFieldValue("_sendType", _sendType);
        form.setFieldValue(
            "_sendDate",
            _sendDate ? dayjs(_sendDate, { format: "DD/MM/YYYY HH:mm" }) : null
        );
        // for control
        handleOnChangeData(dataToSend);
    }, [_id, _title, _content, _type, _sendType, _sendDate]);

    const handleOnChangeData = (dataToSend) => {
        onChangeData(dataToSend);
    };

    const validateMessages = {
        required: `${tt("Nhập")} ${"${label}"}`,
    };

    const onChangeDate = (date, dateString) => {
        setSendDate(date);
    };

    const handleOnChangeDate = (value) => {
        // const sendDate = dayjs(_sendDate, { format: `DD/MM/YYYY HH:mm` });
        setSendDate(value);
    };

    const renderSelectSendDate = () => {
        switch (_sendType) {
            case SEND_NOTIFICATION_TYPE.ONCE:
                return (
                    <Form.Item
                        shouldUpdate
                        // className="mb-2"
                        label={tt("Ngày gửi")}
                        name="_sendDate"
                        // rules={[{ required: true }]}
                        extra=" Lưu ý: không nhập sẽ lấy thời gian hiện tại"
                    >
                        <DatePicker
                            format="DD/MM/YYYY HH:mm"
                            showTime
                            className="h-[40px] rounded w-1/2"
                            disabled={_status === 2}
                            onChange={onChangeDate}
                            // disabledDate={(current) => {
                            //     clog("current.valueOf()", Date.now() );
                            //     return (
                            //         current && current.valueOf() < Date.now()
                            //     );
                            // }}
                            placeholder={tt("Không chọn sẽ gửi ngay")}
                        />
                    </Form.Item>
                );
            case SEND_NOTIFICATION_TYPE.EVERYMONTH:
                return (
                    <Form.Item
                        shouldUpdate
                        // className="mb-2"
                        label={tt("Ngày giờ gửi")}
                        name="_sendDate"
                        // extra=" Lưu ý: không nhập sẽ lấy thời gian hiện tại"
                    >
                        <SelectDateComp
                            value={dayjs(_sendDate)}
                            className="h-[40px] rounded w-1/2"
                            onChange={handleOnChangeDate}
                        />
                    </Form.Item>
                );
            case SEND_NOTIFICATION_TYPE.EVERYDAY:
                return (
                    <Form.Item
                        shouldUpdate
                        // className="mb-2"
                        label={tt("Giờ gửi")}
                        name="_sendDate"
                        // extra=" Lưu ý: không nhập sẽ lấy thời gian hiện tại"
                    >
                        <SelectTimeComp
                            value={dayjs(_sendDate)}
                            className="h-[40px] rounded w-1/2"
                            onChange={handleOnChangeDate}
                        />
                    </Form.Item>
                );
            case SEND_NOTIFICATION_TYPE.EVERYWEEK:
                return (
                    <Form.Item
                        shouldUpdate
                        // className="mb-2"
                        label={tt("Thứ")}
                        name="_sendDate"
                        // extra=" Lưu ý: không nhập sẽ lấy thời gian hiện tại"
                    >
                        <SelectDayOfWeekComp
                            value={dayjs(_sendDate)}
                            className="h-[40px] rounded w-1/2"
                            onChange={handleOnChangeDate}
                        />
                    </Form.Item>
                );
        }
    };

    return (
        <div>
            <Spin tip={"Đang tải..."} size={"large"} spinning={_spinner}>
                <Form
                    labelCol={{ span: 5 }}
                    layout="horizontal"
                    form={form}
                    validateMessages={validateMessages}
                    className="w-[800px]"
                >
                    <Form.Item
                        shouldUpdate
                        className="mb-2"
                        label={tt("Tiêu đề")}
                        name="_title"
                        rules={[{ required: true }]}
                    >
                        <Input
                            className="h-[40px]"
                            value={_title}
                            onChange={handleOnChangeTitle}
                        />
                    </Form.Item>
                    <Form.Item
                        shouldUpdate
                        className="mb-2"
                        label={tt("Loại gửi cho")}
                        name="_type"
                        rules={[{ required: true }]}
                    >
                        <Select
                            className=" h-[40px] rounded"
                            showSearch
                            placeholder={tt("Loại gửi cho")}
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                (option?.label ?? "").includes(input)
                            }
                            filterSort={(optionA, optionB) =>
                                (optionA?.label ?? "")
                                    .toLowerCase()
                                    .localeCompare(
                                        (optionB?.label ?? "").toLowerCase()
                                    )
                            }
                            options={optionsUserSend}
                            onChange={onChangeType}
                        />
                    </Form.Item>
                    <Form.Item
                        shouldUpdate
                        className="mb-2"
                        label={tt("Loại gửi")}
                        name="_sendType"
                        rules={[{ required: true }]}
                    >
                        <Select
                            className="h-[40px] rounded w-1/2"
                            showSearch
                            placeholder={tt("Loại gửi")}
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                (option?.label ?? "").includes(input)
                            }
                            // filterSort={(optionA, optionB) =>
                            //     (optionA?.label ?? "")
                            //         .toLowerCase()
                            //         .localeCompare(
                            //             (optionB?.label ?? "").toLowerCase()
                            //         )
                            // }
                            options={options}
                            onChange={onChangeSendType}
                        />
                    </Form.Item>
                    {renderSelectSendDate()}
                    {/* <Form.Item className="mb-2 ml-[100px]">
                        <span className="text-[red]">
                            Lưu ý: không nhập sẽ lấy thời gian hiện tại
                        </span>
                    </Form.Item> */}
                    <Form.Item
                        shouldUpdate
                        // className="mb-2"
                        label={tt("Nội dung")}
                        name="_content"
                        rules={[{ required: true }]}
                    >
                        <Input.TextArea
                            value={_content}
                            className="h-[300px]"
                            theme={"snow"} // pass false to use minimal theme
                            onChange={handleOnChangeValue}
                            style={{
                                resize: "none",
                                height: "200px",
                            }}
                        />
                    </Form.Item>
                </Form>
            </Spin>
        </div>
    );
}

export default Create;
