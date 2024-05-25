/* eslint-disable camelcase */
/* eslint-disable max-len */
import React, { useEffect, useState } from "react";
import {
    Button,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Radio,
    Select,
} from "antd";
import dayjs, { Dayjs } from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import axios from "axios";
import TextArea from "antd/es/input/TextArea";
import { avatarFemaleDefault, avatarMaleDefault } from "../../../assets";
import PhotosViewer from "../../../components/PhotosViewer";
import {
    DRIVER_FORM_STATUS,
    VEHICLE_INFOMATION_TYPE,
} from "../../../constants";
import { tt } from "../../../utils";
import {
    getVehicleBranchList,
    getVehicleModelList,
} from "../../../store/NewDriverManager/API";
import { PHOTO_REVIEW_FRAME_HEIGHT } from "../../../CONSTANT";

dayjs.extend(isSameOrAfter);

const { Option } = Select;
function VehicleInformationForm({ record, form, submitedForms }) {
    const [firstTimeLoad, setFirstimeLoad] = useState(true);
    const [vehicleInfo, setVehicleInfo] = useState(null);
    const [vehiclePhoto, setVehiclePhoto] = useState(null);
    const [vehicleInsure, setVehicleInsure] = useState(null);
    const [resetValue, setResetValue] = useState({});
    const [statusType1, setStatusType1] = useState(null); // thong tin DKX
    const [statusType2, setStatusType2] = useState(null); // HAX 3x4
    const [statusType3, setStatusType3] = useState(null); // thong tin BHTNDS
    const [vehicleBrandList, setVehicleBrandList] = useState([]);
    const [vehicleModelList, setVehicleModelList] = useState([]);
    const [cover, setCover] = React.useState(
        record?.is_owner === 0 ? avatarFemaleDefault : avatarMaleDefault
    );
    useEffect(() => {
        if (submitedForms && submitedForms[VEHICLE_INFOMATION_TYPE.DKX]) {
            setVehicleInfo(submitedForms[VEHICLE_INFOMATION_TYPE.DKX]);
        }
        if (submitedForms && submitedForms[VEHICLE_INFOMATION_TYPE.HAX]) {
            setVehiclePhoto(submitedForms[VEHICLE_INFOMATION_TYPE.HAX]);
        }
        if (submitedForms && submitedForms[VEHICLE_INFOMATION_TYPE.BHBBTNDS]) {
            setVehicleInsure(submitedForms[VEHICLE_INFOMATION_TYPE.BHBBTNDS]);
        }
    }, [submitedForms]);
    useEffect(() => {
        if (!vehicleInfo) return;
        const {
            registration_certificate,
            vehicle_brand_id,
            vehicle_type_id,
            vehicle_brand_model_id,
            model_name,
            color,
            engine_number,
            frame_number,
            license_plates,
            is_owner,
            vehicle_address,
            owner_name,
            model_years,
            brand_name,
            type_name,
            first_registration_date,
        } = vehicleInfo.data;
        const {
            insurance_civil_accident_date,
            insurance_civil_accident_price,
            insurance_vehicle_material_date,
            insurance_vehicle_material_price,
        } = vehicleInsure.data;

        const fieldsValue = {
            registration_certificate,
            insurance_civil_accident_date: insurance_civil_accident_date
                ? new dayjs(insurance_civil_accident_date)
                : null,
            insurance_vehicle_material_date: insurance_vehicle_material_date
                ? new dayjs(insurance_vehicle_material_date)
                : null,
            vehicle_brand_id,
            vehicle_brand_model_id,
            color,
            engine_number,
            frame_number,
            owner_name,
            vehicle_address,
            license_plates,
            vehicle_type_id,
            model_years: model_years ? dayjs(`${model_years}-01-01`) : null,
            brand_name,
            model_name,
            type_name,
            first_registration_date: first_registration_date
                ? dayjs(first_registration_date)
                : null,
            insurance_civil_accident_price,
            insurance_vehicle_material_price,
            is_owner: is_owner !== null ? `${is_owner}` : null,
            // status_type_1: vehicleInfo.status,
            // status_type_2: vehiclePhoto.status,
            // status_type_3: vehicleInsure.status,

            ...(vehicleInfo.status !== DRIVER_FORM_STATUS.NOT_VERIFIED
                ? { status_type_1: vehicleInfo.status }
                : { status_type_1: null }),
            ...(vehiclePhoto.status !== DRIVER_FORM_STATUS.NOT_VERIFIED
                ? { status_type_2: vehiclePhoto.status }
                : { status_type_2: null }),
            ...(vehicleInsure.status !== DRIVER_FORM_STATUS.NOT_VERIFIED
                ? { status_type_3: vehicleInsure.status }
                : { status_type_3: null }),

            note_type_1: vehicleInfo?.notes,
            note_type_2: vehiclePhoto?.notes,
            note_type_3: vehicleInsure?.notes,
        };

        form.setFieldsValue(fieldsValue);
        setResetValue(fieldsValue);

        setVehicleBrandList([{ id: vehicle_brand_id, name: brand_name }]);
        setVehicleModelList([{ id: vehicle_brand_model_id, name: model_name }]);
        // setStatusType1(vehicleInfo.status);
        // setStatusType2(vehiclePhoto.status);
        // setStatusType3(vehicleInsure.status);
    }, [vehicleInfo, vehiclePhoto, vehicleInsure]);

    // useEffect(() => {
    //   setStatusType1(null);
    //   setStatusType2(null);
    //   setStatusType3(null);
    // }, [record]);

    useEffect(() => {
        if (vehicleBrandList.length === 1) {
            const fetchData = async () => {
                const dataToSend = {
                    filter: {
                        type: form.getFieldValue("vehicle_type_id") > 1 ? 2 : 1, // 1 xe may, 2 xe hoi (4, 7 cho)
                    },
                };
                const rs = await getVehicleBranchList(dataToSend);
                if (rs) {
                    setVehicleBrandList(rs);
                }
            };

            // Gọi hàm fetchData
            fetchData();
        }
    }, [vehicleBrandList]);

    useEffect(() => {
        if (vehicleModelList.length === 1 && firstTimeLoad) {
            const fetchData = async () => {
                const dataToSend = {
                    filter: {
                        type: form.getFieldValue("vehicle_type_id") > 1 ? 2 : 1, // 1 xe may, 2 xe hoi (4, 7 cho)
                        vehicle_brand_id:
                            form.getFieldValue("vehicle_brand_id"),
                    },
                };
                const rs = await getVehicleModelList(dataToSend);
                if (rs) {
                    setVehicleModelList(rs);
                }
            };

            // Gọi hàm fetchData
            fetchData();
            setFirstimeLoad(false);
        }
    }, [vehicleModelList]);

    useEffect(() => {
        if (
            !vehiclePhoto ||
            !vehiclePhoto.medias ||
            vehiclePhoto.medias.length === 0
        ) {
            return;
        }
        axios
            .get(vehiclePhoto.medias[0].path, {
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

        // const {
        //   registration_certificate, insurance_civil_accident_date, vehicle_brand_id,
        //   color, engine_number, frame_number, license_plates, is_owner,
        // } = vehicleInfo.data;

        // const fieldsValue = {
        //   registration_certificate,
        //   insurance_civil_accident_date: insurance_civil_accident_date ? new dayjs(insurance_civil_accident_date) : null,
        //   vehicle_brand_id: vehicle_brand_id ? new dayjs(vehicle_brand_id) : null,
        //   color,
        //   engine_number,
        //   frame_number,
        //   license_plates: license_plates ? new dayjs(license_plates) : null,
        //   is_owner: is_owner !== null ? `${is_owner}` : null,
        // };

        // form.setFieldsValue(fieldsValue);
        // setResetValue(fieldsValue);
    }, [vehiclePhoto]);
    // console.log('first', statusType1, statusType2);
    const renderConfirmRadio = () => (
        <>
            <Form.Item
                label={tt("Xác nhận thông tin giấy tờ xe")}
                name="status_type_1" // thông tin giấy tờ xe
                rules={[
                    {
                        required: true,
                        message: tt("Vui lòng xác nhận"),
                    },
                ]}
            >
                <Radio.Group
                    value={null}
                    onChange={(e) => setStatusType1(e.target.value)}
                    // disabled={
                    //     vehicleInfo.status !== DRIVER_FORM_STATUS.NOT_VERIFIED
                    // }
                >
                    <Radio value={DRIVER_FORM_STATUS.VERIFIED}>
                        {tt("Hợp lệ")}
                    </Radio>
                    <Radio value={DRIVER_FORM_STATUS.DENINED}>
                        {tt("Không hợp lệ")}
                    </Radio>
                </Radio.Group>
            </Form.Item>

            {form.getFieldValue("status_type_1") ===
                DRIVER_FORM_STATUS.DENINED && (
                <Form.Item
                    label={tt("Lý do")}
                    name="note_type_1"
                    rules={[
                        {
                            required: true,
                            message: tt("Vui lòng điền lý do"),
                        },
                        ({ getFieldValue }) => ({
                            validator(rule, value) {
                                // if (value?.length > 0 && value?.trim() === '') return Promise.reject(tt('Vui lòng điền thông tin'));
                                if (
                                    value?.length > 0 &&
                                    value?.trim().length < 9
                                ) {
                                    return Promise.reject(
                                        tt(
                                            "Vui lòng điền thông tin độ dài ít nhất là 9 ký tự"
                                        )
                                    );
                                }
                                return Promise.resolve();
                            },
                        }),
                    ]}
                >
                    <TextArea
                        rows={2}
                        maxLength={200}
                        placeholder={tt("Nhập lý do vì sao không hợp lệ")}
                        allowClear
                        // disabled={
                        //     vehicleInfo.status !==
                        //     DRIVER_FORM_STATUS.NOT_VERIFIED
                        // }
                    />
                </Form.Item>
            )}

            <Form.Item
                label={tt("Xác nhận ảnh xe")}
                name="status_type_2" // hinh HAX
                rules={[
                    {
                        required: true,
                        message: tt("Vui lòng xác nhận"),
                    },
                ]}
            >
                <Radio.Group
                    value={null}
                    onChange={(e) => setStatusType2(e.target.value)}
                    // disabled={
                    //     vehiclePhoto.status !== DRIVER_FORM_STATUS.NOT_VERIFIED
                    // }
                >
                    <Radio value={DRIVER_FORM_STATUS.VERIFIED}>
                        {tt("Hợp lệ")}
                    </Radio>
                    <Radio value={DRIVER_FORM_STATUS.DENINED}>
                        {tt("Không hợp lệ")}
                    </Radio>
                </Radio.Group>
            </Form.Item>
            {form.getFieldValue("status_type_2") ===
                DRIVER_FORM_STATUS.DENINED && (
                <Form.Item
                    label={tt("Lý do")}
                    name="note_type_2"
                    rules={[
                        {
                            required: true,
                            message: tt("Vui lòng điền lý do"),
                        },
                        ({ getFieldValue }) => ({
                            validator(rule, value) {
                                // if (value?.length > 0 && value?.trim() === '') return Promise.reject(tt('Vui lòng điền thông tin'));
                                if (
                                    value?.length > 0 &&
                                    value?.trim().length < 9
                                ) {
                                    return Promise.reject(
                                        tt(
                                            "Vui lòng điền thông tin độ dài ít nhất là 9 ký tự"
                                        )
                                    );
                                }
                                return Promise.resolve();
                            },
                        }),
                    ]}
                >
                    <TextArea
                        rows={2}
                        maxLength={200}
                        placeholder={tt("Nhập lý do vì sao không hợp lệ")}
                        allowClear
                        // disabled={
                        //     vehiclePhoto.status !==
                        //     DRIVER_FORM_STATUS.NOT_VERIFIED
                        // }
                    />
                </Form.Item>
            )}

            <Form.Item
                label={tt("Xác nhận thông tin BH xe")}
                name="status_type_3" // thông tin giấy tờ xe
                rules={[
                    {
                        required: true,
                        message: tt("Vui lòng xác nhận"),
                    },
                ]}
            >
                <Radio.Group
                    value={null}
                    onChange={(e) => setStatusType3(e.target.value)}
                    // disabled={
                    //     vehicleInsure.status !== DRIVER_FORM_STATUS.NOT_VERIFIED
                    // }
                >
                    <Radio value={DRIVER_FORM_STATUS.VERIFIED}>
                        {tt("Hợp lệ")}
                    </Radio>
                    <Radio value={DRIVER_FORM_STATUS.DENINED}>
                        {tt("Không hợp lệ")}
                    </Radio>
                </Radio.Group>
            </Form.Item>

            {form.getFieldValue("status_type_3") ===
                DRIVER_FORM_STATUS.DENINED && (
                <Form.Item
                    label={tt("Lý do")}
                    name="note_type_3"
                    rules={[
                        {
                            required: true,
                            message: tt("Vui lòng điền lý do"),
                        },
                        ({ getFieldValue }) => ({
                            validator(rule, value) {
                                // if (value?.length > 0 && value?.trim() === '') return Promise.reject(tt('Vui lòng điền thông tin'));
                                if (
                                    value?.length > 0 &&
                                    value?.trim().length < 9
                                ) {
                                    return Promise.reject(
                                        tt(
                                            "Vui lòng điền thông tin độ dài ít nhất là 9 ký tự"
                                        )
                                    );
                                }
                                return Promise.resolve();
                            },
                        }),
                    ]}
                >
                    <TextArea
                        rows={2}
                        maxLength={200}
                        placeholder={tt("Nhập lý do vì sao không hợp lệ")}
                        allowClear
                        // disabled={
                        //     vehicleInsure.status !==
                        //     DRIVER_FORM_STATUS.NOT_VERIFIED
                        // }
                    />
                </Form.Item>
            )}
        </>
    );

    const handleOnVehicleTypeChange = async (type, record) => {
        form.setFieldsValue({
            brand_name: null,
            vehicle_brand_id: null,

            model_name: null,
            vehicle_brand_model_id: null,

            type_name: record.children,
            vehicle_type_id: type,
        });
        setVehicleBrandList([]);
        setVehicleModelList([]);
        const dataToSend = {
            filter: {
                type: type > 1 ? 2 : 1, // 1 xe may, 2 xe hoi (4, 7 cho)
            },
        };
        const rs = await getVehicleBranchList(dataToSend);
        if (rs) {
            setVehicleBrandList(rs);
        }
    };
    const handleOnVehicleBrandChange = async (vehicle_brand_id, record) => {
        form.setFieldsValue({
            model_name: null,
            vehicle_brand_model_id: null,

            brand_name: record.children,
            vehicle_brand_id,
        });
        setVehicleModelList([]);

        const dataToSend = {
            filter: {
                type: form.getFieldValue("vehicle_type_id") > 1 ? 2 : 1, // 1 xe may, 2 xe hoi (4, 7 cho)
                vehicle_brand_id,
            },
        };
        const rs = await getVehicleModelList(dataToSend);
        if (rs) {
            setVehicleModelList(rs);
        }
    };
    const handleOnVehicleModelChange = async (
        vehicle_brand_model_id,
        record
    ) => {
        form.setFieldsValue({
            model_name: record.children,
            vehicle_brand_model_id,
        });
    };

    const renderDriverInfo = () => (
        <>
            <Form.Item
                label={tt("Loại xe")}
                name="vehicle_type_id"
                rules={[
                    {
                        required:
                            form.getFieldValue("status_type_1") !==
                            DRIVER_FORM_STATUS.DENINED,
                        message: tt("Vui lòng chọn loại xe"),
                    },
                ]}
            >
                <Select
                    placeholder={tt("Chưa cập nhật")}
                    onChange={handleOnVehicleTypeChange}
                    disabled
                >
                    <Option value={1}>{tt("Xe máy")}</Option>
                    <Option value={2}>{tt("Xe 4 chỗ")}</Option>
                    <Option value={3}>{tt("Xe 7 chỗ")}</Option>

                    {/* <Option value="other">Other</Option> */}
                </Select>
            </Form.Item>
            <Form.Item
                label={tt("Số đăng ký")}
                name="registration_certificate"
                rules={[
                    {
                        required:
                            form.getFieldValue("status_type_1") !==
                            DRIVER_FORM_STATUS.DENINED,
                        message: tt("Vui lòng điền số đăng ký"),
                    },
                    ({ getFieldValue }) => ({
                        validator(rule, value) {
                            if (
                                getFieldValue("status_type_1") !==
                                DRIVER_FORM_STATUS.DENINED
                            ) {
                                // if (value?.length > 0 && value?.trim() === '') return Promise.reject(tt('Vui lòng điền thông tin độ dài ít nhất là 2 ký tự'));
                                if (
                                    value?.length > 0 &&
                                    value?.trim().length < 4
                                ) {
                                    return Promise.reject(
                                        tt(
                                            "Vui lòng điền thông tin độ dài ít nhất là 4 ký tự"
                                        )
                                    );
                                }
                            }
                            return Promise.resolve();
                        },
                    }),
                ]}
            >
                <Input
                    maxLength={20}
                    placeholder={tt("Chưa cập nhật")}
                    allowClear
                />
            </Form.Item>

            <Form.Item hidden name="type_name">
                <Input
                    maxLength={50}
                    placeholder={tt("Chưa cập nhật")}
                    allowClear
                />
            </Form.Item>
            <Form.Item
                label={tt("Hãng xe")}
                name="vehicle_brand_id"
                rules={[
                    {
                        required:
                            form.getFieldValue("status_type_1") !==
                            DRIVER_FORM_STATUS.DENINED,
                        message: tt("Vui lòng chọn hãng xe"),
                    },
                ]}
            >
                <Select
                    onChange={handleOnVehicleBrandChange}
                    showSearch
                    placeholder={tt("Chưa cập nhật")}
                    filterOption={(input, option) =>
                        (option?.children ?? "")
                            .toLowerCase()
                            .includes(input.toLowerCase())
                    }
                >
                    {vehicleBrandList?.map((item) => (
                        <Option value={item.id} key={item.id}>
                            {item.name}
                        </Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item hidden name="brand_name">
                <Input
                    maxLength={50}
                    placeholder={tt("Chưa cập nhật")}
                    allowClear
                />
            </Form.Item>
            <Form.Item
                label={tt("Dòng xe")}
                name="vehicle_brand_model_id"
                placeholder={tt("Chưa cập nhật")}
                rules={[
                    {
                        required:
                            form.getFieldValue("status_type_1") !==
                            DRIVER_FORM_STATUS.DENINED,
                        message: tt("Vui lòng chọn dòng xe"),
                    },
                ]}
            >
                <Select
                    showSearch
                    placeholder={tt("Chưa cập nhật")}
                    filterOption={(input, option) =>
                        (option?.children ?? "")
                            .toLowerCase()
                            .includes(input.toLowerCase())
                    }
                    onChange={handleOnVehicleModelChange}
                >
                    {vehicleModelList?.map((item) => (
                        <Option value={item.id} key={item.id}>
                            {item.name}
                        </Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item hidden name="model_name">
                <Input
                    maxLength={50}
                    placeholder={tt("Chưa cập nhật")}
                    allowClear
                />
            </Form.Item>
            <Form.Item
                label={tt("Biển số xe")}
                name="license_plates"
                rules={[
                    {
                        required:
                            form.getFieldValue("status_type_1") !==
                            DRIVER_FORM_STATUS.DENINED,
                        message: tt("Vui lòng điền biển số xe"),
                    },
                    ({ getFieldValue }) => ({
                        validator(rule, value) {
                            if (
                                form.getFieldValue("status_type_1") !==
                                DRIVER_FORM_STATUS.DENINED
                            ) {
                                // if (value?.length > 0 && value?.trim() === '') return Promise.reject(tt('Vui lòng điền thông tin độ dài ít nhất là 2 ký tự'));
                                if (
                                    value?.length > 0 &&
                                    value?.trim().length < 6
                                ) {
                                    return Promise.reject(
                                        tt(
                                            "Vui lòng điền thông tin độ dài ít nhất là 6 ký tự"
                                        )
                                    );
                                }
                            }
                            return Promise.resolve();
                        },
                    }),
                ]}
            >
                <Input
                    maxLength={20}
                    placeholder={tt("Chưa cập nhật")}
                    allowClear
                />
            </Form.Item>
            <Form.Item
                label={tt("Màu xe")}
                name="color"
                rules={[
                    {
                        required:
                            form.getFieldValue("status_type_1") !==
                            DRIVER_FORM_STATUS.DENINED,
                        message: tt("Vui lòng điền màu xe"),
                    },
                    ({ getFieldValue }) => ({
                        validator(rule, value) {
                            if (
                                form.getFieldValue("status_type_1") !==
                                DRIVER_FORM_STATUS.DENINED
                            ) {
                                // if (value?.length > 0 && value?.trim() === '') return Promise.reject(tt('Vui lòng điền thông tin độ dài ít nhất là 2 ký tự'));
                                if (
                                    value?.length > 0 &&
                                    value?.trim().length < 2
                                ) {
                                    return Promise.reject(
                                        tt(
                                            "Vui lòng điền thông tin độ dài ít nhất là 2 ký tự"
                                        )
                                    );
                                }
                            }
                            return Promise.resolve();
                        },
                    }),
                ]}
            >
                <Input
                    maxLength={50}
                    placeholder={tt("Chưa cập nhật")}
                    allowClear
                />
            </Form.Item>

            <Form.Item
                label={tt("Năm sản xuất ")}
                name="model_years"
                rules={
                    [
                        // {
                        //   required: form.getFieldValue('status_type_1') !== DRIVER_FORM_STATUS.DENINED,
                        //   message: tt('Vui lòng chọn Năm sản xuất '),
                        // },
                        // ({ getFieldValue }) => ({
                        //   validator(rule, value) {
                        //     if (value > getFieldValue('insurance_civil_accident_date')) {
                        //       return Promise.reject(tt('Ngày ngày cấp phải trước ngày hết hạn '));
                        //     }
                        //     return Promise.resolve();
                        //   },
                        // }),
                    ]
                }
            >
                <DatePicker
                    style={{ width: "100%" }}
                    placeholder={tt("Chưa cập nhật")}
                    picker="year"
                />
            </Form.Item>
            <Form.Item
                label={tt("Ngày đăng ký lần đầu ")}
                name="first_registration_date"
                rules={
                    [
                        // {
                        //   required: form.getFieldValue('status_type_1') !== DRIVER_FORM_STATUS.DENINED,
                        //   message: tt('Vui lòng chọn Năm sản xuất '),
                        // },
                        // ({ getFieldValue }) => ({
                        //   validator(rule, value) {
                        //     if (value > getFieldValue('insurance_civil_accident_date')) {
                        //       return Promise.reject(tt('Ngày ngày cấp phải trước ngày hết hạn '));
                        //     }
                        //     return Promise.resolve();
                        //   },
                        // }),
                    ]
                }
            >
                <DatePicker
                    style={{ width: "100%" }}
                    placeholder={tt("Chưa cập nhật")}
                    format="DD/MM/YYYY"
                />
            </Form.Item>

            <Form.Item
                label={tt("Số khung")}
                name="frame_number"
                rules={[
                    {
                        required:
                            form.getFieldValue("status_type_1") !==
                            DRIVER_FORM_STATUS.DENINED,
                        message: tt("Vui lòng điền số khung"),
                    },
                    ({ getFieldValue }) => ({
                        validator(rule, value) {
                            if (
                                form.getFieldValue("status_type_1") !==
                                DRIVER_FORM_STATUS.DENINED
                            ) {
                                // if (value?.length > 0 && value?.trim() === '') return Promise.reject(tt('Vui lòng điền thông tin độ dài ít nhất là 2 ký tự'));
                                if (
                                    value?.length > 0 &&
                                    value?.trim().length < 2
                                ) {
                                    return Promise.reject(
                                        tt(
                                            "Vui lòng điền thông tin độ dài ít nhất là 2 ký tự"
                                        )
                                    );
                                }
                            }
                            return Promise.resolve();
                        },
                    }),
                ]}
            >
                <Input
                    maxLength={20}
                    placeholder={tt("Chưa cập nhật")}
                    allowClear
                />
            </Form.Item>

            <Form.Item
                label={tt("Số máy")}
                name="engine_number"
                rules={[
                    {
                        required:
                            form.getFieldValue("status_type_1") !==
                            DRIVER_FORM_STATUS.DENINED,
                        message: tt("Vui lòng điền số máy"),
                    },
                    ({ getFieldValue }) => ({
                        validator(rule, value) {
                            if (
                                form.getFieldValue("status_type_1") !==
                                DRIVER_FORM_STATUS.DENINED
                            ) {
                                // if (value?.length > 0 && value?.trim() === '') return Promise.reject(tt('Vui lòng điền thông tin độ dài ít nhất là 2 ký tự'));
                                if (
                                    value?.length > 0 &&
                                    value?.trim().length < 2
                                ) {
                                    return Promise.reject(
                                        tt(
                                            "Vui lòng điền thông tin độ dài ít nhất là 2 ký tự"
                                        )
                                    );
                                }
                            }
                            return Promise.resolve();
                        },
                    }),
                ]}
            >
                <Input
                    maxLength={20}
                    placeholder={tt("Chưa cập nhật")}
                    allowClear
                />
            </Form.Item>
            <Form.Item
                label={tt("Tên chủ xe")}
                name="owner_name"
                rules={[
                    {
                        required:
                            form.getFieldValue("status_type_1") !==
                            DRIVER_FORM_STATUS.DENINED,
                        message: tt("Vui lòng nhập tên chủ xe"),
                    },
                ]}
            >
                <Input
                    maxLength={30}
                    placeholder={tt("Chưa cập nhật")}
                    allowClear
                />
            </Form.Item>
            <Form.Item
                label={tt("Địa chỉ")}
                name="vehicle_address"
                rules={[
                    {
                        required:
                            form.getFieldValue("status_type_1") !==
                            DRIVER_FORM_STATUS.DENINED,
                        message: tt("Vui lòng nhập địa chỉ"),
                    },
                ]}
            >
                <Input
                    maxLength={200}
                    placeholder={tt("Chưa cập nhật")}
                    allowClear
                />
            </Form.Item>
            <Form.Item
                label={tt("Xe chính chủ")}
                name="is_owner"
                rules={[
                    {
                        required:
                            form.getFieldValue("status_type_1") !==
                            DRIVER_FORM_STATUS.DENINED,
                        message: tt("Vui lòng chọn xe chính chủ"),
                    },
                ]}
            >
                <Select placeholder={tt("Chưa cập nhật")}>
                    <Option value="0">{tt("Xe không chính chủ")}</Option>
                    <Option value="1">{tt("Xe chính chủ")}</Option>
                </Select>
            </Form.Item>
        </>
    );

    const renderDriverBHBB = () => (
        <>
            <Form.Item
                label={tt("Ngày hết hạn BHTNDS  ")}
                name="insurance_civil_accident_date"
                rules={[
                    {
                        required:
                            form.getFieldValue("status_type_3") !==
                            DRIVER_FORM_STATUS.DENINED,
                        message: tt("Vui lòng chọn ngày hết hạn "),
                    },
                    ({ getFieldValue }) => ({
                        validator(rule, value) {
                            if (
                                form.getFieldValue("status_type_3") !==
                                DRIVER_FORM_STATUS.DENINED
                            ) {
                                if (value < dayjs()) {
                                    return Promise.reject(
                                        tt(
                                            "Ngày hết hạn phải sau ngày hiện tại "
                                        )
                                    );
                                }
                            }

                            return Promise.resolve();
                        },
                    }),
                ]}
            >
                <DatePicker
                    style={{ width: "100%" }}
                    placeholder={tt("Chưa cập nhật")}
                    format="DD/MM/YYYY"
                />
            </Form.Item>

            <Form.Item
                label={tt("Giá trị mua BHTNDS")}
                name="insurance_civil_accident_price"
                rules={[
                    {
                        required:
                            form.getFieldValue("status_type_3") !==
                            DRIVER_FORM_STATUS.DENINED,
                        message: tt("Vui lòng điền số tiền mua BHTNDS"),
                    },
                    ({ getFieldValue }) => ({
                        validator(rule, value) {
                            if (
                                value < 50000 &&
                                form.getFieldValue("status_type_3") !==
                                    DRIVER_FORM_STATUS.DENINED
                            ) {
                                return Promise.reject(
                                    tt(
                                        "Số tiền mua BHTNDS phải lơn hơn 50.000 VNĐ"
                                    )
                                );
                            }
                            return Promise.resolve();
                        },
                    }),
                ]}
            >
                <InputNumber addonAfter="VNĐ" min={0} />
            </Form.Item>
        </>
    );

    const renderDriverBHVC = () => (
        <>
            <Form.Item
                label={tt("Ngày hết hạn BHVCX  ")}
                name="insurance_vehicle_material_date"
                rules={[
                    {
                        required: false,
                        message: tt("Vui lòng chọn ngày hết hạn "),
                    },
                    ({ getFieldValue }) => ({
                        validator(rule, value) {
                            if (value && value < dayjs()) {
                                return Promise.reject(
                                    tt("Ngày hết hạn phải sau ngày hiện tại ")
                                );
                            }
                            return Promise.resolve();
                        },
                    }),
                ]}
            >
                <DatePicker
                    style={{ width: "100%" }}
                    placeholder={tt("Chưa cập nhật")}
                    format="DD/MM/YYYY"
                />
            </Form.Item>

            <Form.Item
                label={tt("Giá trị mua BHVCX")}
                name="insurance_vehicle_material_price"
                rules={[
                    {
                        required: false,
                        message: tt("Vui lòng điền số tiền mua BHVCX"),
                    },
                    ({ getFieldValue }) => ({
                        validator(rule, value) {
                            if (value && value < 50000) {
                                return Promise.reject(
                                    tt(
                                        "Số tiền mua BHVCX phải lơn hơn 50.000 VNĐ"
                                    )
                                );
                            }
                            return Promise.resolve();
                        },
                    }),
                ]}
            >
                <InputNumber addonAfter="VNĐ" min={0} />
            </Form.Item>
        </>
    );

    return (
        <div className="flex gap-[10px] mt-[20px]">
            <div className="flex flex-col w-full">
                {/* <div className="flex flex-wrap items-start w-[150px] justify-center">
          <img
            alt="photos"
            src={cover}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = record?.is_owner === 0 ? avatarFemaleDefault : avatarMaleDefault;
            }}
            className="aspect-[3/4] max-w-[100px] object-cover bg-white rounded-[3px] border-solid border-[1px] border-gray-300"
          />

        </div> */}
                <div className="mt-[20px] flex flex-wrap md:flex-nowrap items-start gap-[10px]">
                    <Form
                        initialValues={resetValue}
                        form={form}
                        name="wrap"
                        labelCol={{
                            flex: "150px",
                        }}
                        labelAlign="left"
                        labelWrap
                        wrapperCol={{
                            flex: 1,
                        }}
                        colon
                        style={{
                            maxWidth: 700,
                            minWidth: 500,
                        }}
                    >
                        {vehicleInfo && renderDriverInfo()}

                        {vehicleInsure && renderDriverBHBB()}
                        {vehicleInsure && renderDriverBHVC()}

                        <div className="mt-[50px]" />
                        {vehiclePhoto &&
                            vehicleInfo &&
                            vehicleInsure &&
                            renderConfirmRadio()}
                    </Form>
                    <div className="overflow-hidden relative w-[100%]">
                        {vehicleInfo && (
                            <PhotosViewer
                                photos={vehicleInfo?.medias}
                                height={PHOTO_REVIEW_FRAME_HEIGHT}
                                width={(PHOTO_REVIEW_FRAME_HEIGHT * 16) / 9}
                            />
                        )}
                        {vehiclePhoto && (
                            <PhotosViewer
                                photos={vehiclePhoto?.medias}
                                height={PHOTO_REVIEW_FRAME_HEIGHT}
                                width={(PHOTO_REVIEW_FRAME_HEIGHT * 16) / 9}
                                grouped
                            />
                        )}
                        {vehicleInsure && (
                            <PhotosViewer
                                photos={vehicleInsure?.medias}
                                height={PHOTO_REVIEW_FRAME_HEIGHT}
                                width={(PHOTO_REVIEW_FRAME_HEIGHT * 16) / 9}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VehicleInformationForm;
