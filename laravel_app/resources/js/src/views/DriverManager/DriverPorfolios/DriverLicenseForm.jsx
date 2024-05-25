import React, { useEffect, useState } from "react";
import { Button, DatePicker, Form, Input, Radio, Select } from "antd";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import axios from "axios";
import TextArea from "antd/es/input/TextArea";
import { avatarFemaleDefault, avatarMaleDefault } from "../../../assets";
import PhotosViewer from "../../../components/PhotosViewer";
import { DRIVER_FORM_STATUS, PROFILE_MAP } from "../../../constants";
import { tt } from "../../../utils";
import { PHOTO_REVIEW_FRAME_HEIGHT } from "../../../CONSTANT";

dayjs.extend(isSameOrAfter);

const { Option } = Select;
function DriverLicenseForm({ record, form, submitedForms }) {
    const [driverLicense, setDriverLicense] = useState(null);
    const [driverPhoto, setDriverPhoto] = useState(null);
    const [resetValue, setResetValue] = useState({});
    const [statusType2, setStatusType2] = useState(null); // thong tin GPLX
    const [statusType3, setStatusType3] = useState(null); // anh 3x4
    const [cover, setCover] = React.useState(
        record?.sex === 0 ? avatarFemaleDefault : avatarMaleDefault
    );
    useEffect(() => {
        if (submitedForms && submitedForms[PROFILE_MAP.GPLX]) {
            setDriverLicense(submitedForms[PROFILE_MAP.GPLX]);
        }
        if (submitedForms && submitedForms[PROFILE_MAP.ANH]) {
            setDriverPhoto(submitedForms[PROFILE_MAP.ANH]);
        }
    }, [submitedForms]);
    useEffect(() => {
        if (!driverLicense) return;
        const {
            driver_license,
            driver_expire_date,
            driver_issued_date,
            driver_class,
            driver_name,
            driver_of_residence,
            birth_date,
            sex,
        } = driverLicense.data;

        const fieldsValue = {
            driver_license,
            driver_expire_date: driver_expire_date
                ? new dayjs(driver_expire_date)
                : null,
            driver_issued_date: driver_issued_date
                ? new dayjs(driver_issued_date)
                : null,
            driver_name,
            driver_class,
            driver_of_residence,
            birth_date: birth_date ? new dayjs(birth_date) : null,
            sex: sex !== null ? `${sex}` : null,

            // status_type_2: driverLicense.status,

            note_type_2: driverLicense?.notes,
            ...(driverLicense.status !== DRIVER_FORM_STATUS.NOT_VERIFIED
                ? { status_type_2: driverLicense.status }
                : { status_type_2: null }),
        };

        form.setFieldsValue(fieldsValue);
        setResetValue(fieldsValue);
    }, [driverLicense]);

    // useEffect(() => {
    //   setStatusType2(null);
    //   setStatusType3(null);
    // }, [record]);

    useEffect(() => {
        if (
            !driverLicense ||
            !driverPhoto.medias ||
            driverPhoto.medias.length === 0
        ) {
            return;
        }
        setCover(driverPhoto.medias[0].path);
        // axios
        //   .get(driverPhoto.medias[0].path, {
        //     responseType: 'arraybuffer',
        //     headers: {
        //       Authorization: `Bearer ${
        //         document.getElementById('myToken')?.value
        //       }`,
        //     },
        //   })
        //   .then((response) => {
        //     //   const u8 = new Uint8Array(response.data);
        //     const b64encoded = btoa(
        //       [].reduce.call(
        //         new Uint8Array(response.data),
        //         (p, c) => p + String.fromCharCode(c),
        //         '',
        //       ),
        //     );
        //     const mimetype = 'image/jpeg';
        //     setCover(`data:${mimetype};base64,${b64encoded}`);
        //   });

        // const {
        //   driver_license, driver_expire_date, driver_issued_date,
        //   driver_name, driver_of_residence, birth_date, sex,
        // } = driverLicense.data;

        // const fieldsValue = {
        //   driver_license,
        //   driver_expire_date: driver_expire_date ? new dayjs(driver_expire_date) : null,
        //   driver_issued_date: driver_issued_date ? new dayjs(driver_issued_date) : null,
        //   driver_name,
        // ,
        //   driver_of_residence,
        //   birth_date: birth_date ? new dayjs(birth_date) : null,
        //   sex: sex !== null ? `${sex}` : null,
        // };

        // form.setFieldsValue(fieldsValue);
        // setResetValue(fieldsValue);
    }, [driverPhoto]);

    const renderConfirmRadio = () => (
        <>
            <Form.Item
                label={tt("Xác nhận thông tin")}
                name="status_type_2" // can cuoc cong dan
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
                    disabled={
                        driverLicense.status !== DRIVER_FORM_STATUS.NOT_VERIFIED
                    }
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
                                // if (value?.length > 1 && value?.trim() === '') return Promise.reject(tt('Vui lòng điền thông tin độ dài ít nhất là 2 ký tự'));
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
                        disabled={
                            driverLicense.status !==
                            DRIVER_FORM_STATUS.NOT_VERIFIED
                        }
                    />
                </Form.Item>
            )}
        </>
    );

    return (
        <div className="flex gap-[10px] mt-[20px]">
            <div className="flex flex-col w-full">
                <div className="flex flex-wrap items-start w-[150px] justify-center">
                    <img
                        alt="photos"
                        src={cover}
                        onError={({ currentTarget }) => {
                            currentTarget.onerror = null; // prevents looping
                            currentTarget.src =
                                record?.sex === 0
                                    ? avatarFemaleDefault
                                    : avatarMaleDefault;
                        }}
                        className="aspect-[3/4] max-w-[100px] object-cover bg-white rounded-[3px] border-solid border-[1px] border-gray-300"
                    />
                </div>
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
                        <Form.Item
                            label={tt("Số GPLX")}
                            name="driver_license"
                            rules={[
                                {
                                    required:
                                        form.getFieldValue("status_type_2") !==
                                        DRIVER_FORM_STATUS.DENINED,
                                    message: tt("Vui lòng điền số GPLX"),
                                },
                                ({ getFieldValue }) => ({
                                    validator(rule, value) {
                                        if (
                                            form.getFieldValue(
                                                "status_type_2"
                                            ) !== DRIVER_FORM_STATUS.DENINED
                                        ) {
                                            // if (value?.length > 1 && value?.trim() === '') return Promise.reject(tt('Vui lòng điền thông tin độ dài ít nhất là 2 ký tự'));
                                            if (
                                                value?.length > 0 &&
                                                value?.trim().length < 5
                                            ) {
                                                return Promise.reject(
                                                    tt(
                                                        "Vui lòng điền thông tin độ dài ít nhất là 5 ký tự"
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
                            label={tt("Họ và tên")}
                            name="driver_name"
                            rules={[
                                {
                                    required:
                                        form.getFieldValue("status_type_2") !==
                                        DRIVER_FORM_STATUS.DENINED,
                                    message: tt("Vui lòng điền họ và tên"),
                                },
                                ({ getFieldValue }) => ({
                                    validator(rule, value) {
                                        if (
                                            form.getFieldValue(
                                                "status_type_2"
                                            ) !== DRIVER_FORM_STATUS.DENINED
                                        ) {
                                            // if (value?.length > 1 && value?.trim() === '') return Promise.reject(tt('Vui lòng điền thông tin độ dài ít nhất là 2 ký tự'));
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
                            label={tt("Hạng")}
                            name="driver_class"
                            rules={[
                                {
                                    required:
                                        form.getFieldValue("status_type_2") !==
                                        DRIVER_FORM_STATUS.DENINED,
                                    message: tt("Vui lòng chọn hạng xe"),
                                },
                            ]}
                        >
                            <Select placeholder={tt("Chưa cập nhật")}>
                                <Option value="A1">{tt("A1")}</Option>
                                <Option value="A2">{tt("A2")}</Option>
                                <Option value="A3">{tt("A3")}</Option>
                                <Option value="A4">{tt("A4")}</Option>
                                <Option value="B2">{tt("B2")}</Option>
                                <Option value="C">{tt("C")}</Option>
                                <Option value="D">{tt("D")}</Option>
                                <Option value="E">{tt("E")}</Option>
                                <Option value="F">{tt("F")}</Option>
                            </Select>
                        </Form.Item>

                        {/* <Form.Item
              label={tt('Ngày sinh')}
              name="birth_date"
              rules={[
                {
                  required: form.getFieldValue('status_type_2') !== DRIVER_FORM_STATUS.DENINED,
                  message: tt('Vui lòng chọn ngày sinh'),
                },
              ]}
            >
              <DatePicker
                style={{ width: '100%' }}
                placeholder={tt('Chưa cập nhật')}
                format="DD/MM/YYYY"
                de
                disabledDate={(selectedDate) => {
                  // Ngày hiện tại
                  const currentDate = dayjs();

                  // So sánh bằng cách kiểm tra xem ngày hiện tại
                  // có trước ngày cụ thể 18 năm hay không
                  return !currentDate.isSameOrAfter(selectedDate.add(18, 'year'));
                }}
              />
            </Form.Item> */}

                        {/* <Form.Item
              label={tt('Giới tính')}
              name="sex"
              rules={[
                {
                  required: form.getFieldValue('status_type_2') !== DRIVER_FORM_STATUS.DENINED,
                  message: tt('Vui lòng chọn giới tính'),
                },
              ]}
            >
              <Select placeholder={tt('Chưa cập nhật')}>
                <Option value="0">{tt('Nữ')}</Option>
                <Option value="1">{tt('Nam')}</Option>

              </Select>
            </Form.Item> */}

                        {/* <Form.Item
              label={tt('Quê quán')}
              name"
              rules={[
                {
                  required: form.getFieldValue('status_type_2') !== DRIVER_FORM_STATUS.DENINED,
                  message: tt('Vui lòng điền quê quán'),
                },
              ]}
            >
              <Input maxLength={100} placeholder={tt('Chưa cập nhật')} allowClear />
            </Form.Item> */}
                        <Form.Item
                            label={tt("Nơi cư trú")}
                            name="driver_of_residence"
                            rules={[
                                {
                                    required:
                                        form.getFieldValue("status_type_2") !==
                                        DRIVER_FORM_STATUS.DENINED,
                                    message: tt("Vui lòng điền nơi cư trú"),
                                },
                                ({ getFieldValue }) => ({
                                    validator(rule, value) {
                                        if (
                                            form.getFieldValue(
                                                "status_type_2"
                                            ) !== DRIVER_FORM_STATUS.DENINED
                                        ) {
                                            // if (value?.length > 1 && value?.trim() === '') return Promise.reject(tt('Vui lòng điền thông tin độ dài ít nhất là 2 ký tự'));
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
                                maxLength={100}
                                placeholder={tt("Chưa cập nhật")}
                                allowClear
                            />
                        </Form.Item>

                        <Form.Item
                            label={tt("Ngày cấp ")}
                            name="driver_issued_date"
                            rules={[
                                {
                                    required:
                                        form.getFieldValue("status_type_2") !==
                                        DRIVER_FORM_STATUS.DENINED,
                                    message: tt("Vui lòng chọn ngày cấp "),
                                },
                                ({ getFieldValue }) => ({
                                    validator(rule, value) {
                                        if (
                                            getFieldValue(
                                                "driver_expire_date"
                                            ) !== null &&
                                            value >
                                                getFieldValue(
                                                    "driver_expire_date"
                                                )
                                        ) {
                                            return Promise.reject(
                                                tt(
                                                    "Ngày ngày cấp phải trước ngày hết hạn "
                                                )
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
                            label={tt("Ngày hết hạn ")}
                            name="driver_expire_date"
                            rules={[
                                // {
                                //   required: form.getFieldValue('status_type_2') !== DRIVER_FORM_STATUS.DENINED,
                                //   message: tt('Vui lòng chọn ngày hết hạn '),
                                // },
                                ({ getFieldValue }) => ({
                                    validator(rule, value) {
                                        if (
                                            value !== null &&
                                            value <
                                                getFieldValue(
                                                    "driver_issued_date"
                                                )
                                        ) {
                                            return Promise.reject(
                                                tt(
                                                    "Ngày hết hạn phải sau ngày cấp "
                                                )
                                            ); // The validator should always return a promise on both success and error
                                        }
                                        return Promise.resolve();
                                    },
                                }),
                            ]}
                        >
                            <DatePicker
                                style={{ width: "100%" }}
                                placeholder={tt("Để trống là vô thời hạn")}
                                format="DD/MM/YYYY"
                            />
                        </Form.Item>
                        <div className="mt-[50px]" />
                        {driverLicense && renderConfirmRadio()}
                    </Form>
                    <div className="overflow-hidden relative w-[100%]">
                        {driverPhoto && (
                            <PhotosViewer
                                photos={driverPhoto?.medias}
                                height={PHOTO_REVIEW_FRAME_HEIGHT}
                                width={(PHOTO_REVIEW_FRAME_HEIGHT * 16) / 9}
                                isPublic
                            />
                        )}
                        {driverLicense && (
                            <PhotosViewer
                                photos={driverLicense?.medias}
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

export default DriverLicenseForm;
