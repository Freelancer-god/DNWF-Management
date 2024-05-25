import { Button, Form, Modal } from "antd";
import React, { useCallback, useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { clog, tt } from "../../../utils";
import { formatNgayThang } from "../../../utils/dateTime";

import PhotosViewer from "../../../components/PhotosViewer";
import {
    DRIVER_FORM_STATUS,
    PERMISSIONS_MAP,
    PROFILE_MAP,
} from "../../../constants";
import DriverProfileForm from "./DriverProfileForm";
import { updateDriverForms } from "../../../store/ActiveDriverManager/API";
import { getData } from "../../../store/ActiveDriverManager";
import { showSuccess } from "../../../components/dialogs";
import AntdButton from "../../../components/AntdButton";
import { COLORS } from "../../../CONSTANT";
import { PermissionsContext } from "../../../store/Permissions";

function DriverProfile({ data, submitedForms, onUpdate, is_active = false }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const myPermissions = useContext(PermissionsContext).permissions;
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const showModal = () => {
        window.isEditing = true;
        setIsModalOpen(true);
    };

    const generateDataToSend = (values, saveOnly = false) => {
        const {
            citizen_identify,
            citizen_expire_date,
            citizen_issued_date,
            citizen_name,
            place_of_origin,
            place_of_residence,
            birth_date,
            sex,
            status_type_1,
            status_type_3,
            note_type_1,
            note_type_3,
        } = values;
        const generatedData = {
            driver_id: data.id,
            form_list: [
                {
                    id: submitedForms[PROFILE_MAP.CCCD]
                        ? submitedForms[PROFILE_MAP.CCCD].id
                        : null,
                    data: {
                        citizen_identify,
                        citizen_expire_date: citizen_expire_date
                            ? citizen_expire_date.format("YYYY-MM-DD")
                            : null,
                        citizen_issued_date: citizen_issued_date
                            ? citizen_issued_date.format("YYYY-MM-DD")
                            : null,
                        citizen_name,
                        place_of_origin,
                        place_of_residence,
                        birth_date: birth_date
                            ? birth_date.format("YYYY-MM-DD")
                            : null,
                        sex: sex !== null ? parseInt(sex, 10) : null,
                    },
                    notes: note_type_1,
                },
                {
                    id: submitedForms[PROFILE_MAP.ANH]
                        ? submitedForms[PROFILE_MAP.ANH].id
                        : null,
                    notes: note_type_3,
                },
            ],
        };
        // kiem tra xem co phai la form duyet hay khong status_type_1, status_type_3 phai co moi la form duyet
        if (status_type_1 !== undefined || status_type_3 !== undefined) {
            if (saveOnly) {
                generatedData.form_list[0].status =
                    submitedForms[PROFILE_MAP.CCCD].status;
                generatedData.form_list[1].status =
                    submitedForms[PROFILE_MAP.ANH].status;

                return generatedData;
            } // duyet luon khong luu
            if (status_type_1 === DRIVER_FORM_STATUS.VERIFIED) {
                generatedData.form_list[0].status = DRIVER_FORM_STATUS.VERIFIED;
            } else {
                generatedData.form_list[0].status = DRIVER_FORM_STATUS.DENINED;
            }

            if (status_type_3 === DRIVER_FORM_STATUS.VERIFIED) {
                generatedData.form_list[1].status = DRIVER_FORM_STATUS.VERIFIED;
            } else {
                generatedData.form_list[1].status = DRIVER_FORM_STATUS.DENINED;
            }
            return generatedData;
        } // cap nhat thong tin da duoc duyet
        generatedData.form_list[0].status = DRIVER_FORM_STATUS.VERIFIED;
        generatedData.form_list[1].status = DRIVER_FORM_STATUS.VERIFIED;
        return generatedData;
    };

    const handleOk = ({ saveOnly = false }) => {
        form.validateFields()
            .then(async (values) => {
                const dataToSend = generateDataToSend(values, saveOnly);
                clog("values", values);

                const rs = await updateDriverForms(dataToSend);
                if (rs) {
                    showSuccess(tt("Đã cập nhật hồ sơ"));
                    form.resetFields();
                    dispatch(getData());
                    window.isEditing = false;
                    setIsModalOpen(false);
                    onUpdate();
                }
            })
            .catch((info) => {
                clog("Validate Failed:", info);
            });
    };

    const handleCancel = () => {
        window.isEditing = false;
        setIsModalOpen(false);
    };

    const { form_medias } = data;
    let decodedMedia = null;
    try {
        // decode base64 form_medias chay tren browser
        decodedMedia = JSON.parse(window.atob(form_medias));
    } catch (error) {
        clog(error);
    }

    const onSubmit = useCallback((values) => {
        // do your staff with values
    }, []);

    const closePopup = useCallback(() => {
        form.resetFields();
        handleCancel(false);
    }, [form]);

    // useEffect(() => {
    //   const {
    //     citizen_identify, citizen_expire_date, citizen_issued_date, citizen_name, place_of_origin, place_of_residence, birth_date, sex,
    //   } = data;

    //   form.setFieldsValue({
    //     citizen_identify,
    //     citizen_expire_date: citizen_expire_date ? new dayjs(citizen_expire_date) : null,
    //     citizen_issued_date: citizen_issued_date ? new dayjs(citizen_issued_date) : null,
    //     citizen_name,
    //     place_of_origin,
    //     place_of_residence,
    //     birth_date: birth_date ? new dayjs(birth_date) : null,
    //     sex,
    //   });
    // }, [data]);
    const onReset = () => {
        form.resetFields();
    };

    const renderModalButtons = () => {
        if (submitedForms && submitedForms[PROFILE_MAP.CCCD]) {
            return [
                <Button key="back" onClick={handleCancel}>
                    {tt("Đóng")}
                </Button>,
                <Button htmlType="button" onClick={onReset}>
                    Reset
                </Button>,
                <Button key="submit" type="primary" onClick={handleOk}>
                    {tt("Cập nhật ")}
                </Button>,
            ];
        }
    };

    const renderTabButtons = () => {
        if (submitedForms && submitedForms[PROFILE_MAP.CCCD]) {
            return [
                ...(myPermissions[PERMISSIONS_MAP["confirm-driver-form"]]
                    ? [
                          <AntdButton
                              type="dashed"
                              colorPrimary={COLORS.primary}
                              className="float-right"
                              onClick={showModal}
                          >
                              {is_active
                                  ? tt("Cập nhật hồ sơ")
                                  : tt("Duyệt / Cập nhật hồ sơ")}
                          </AntdButton>,
                      ]
                    : []),
                <div>
                    <div className="text-gray-500 text-[11px] mr-[10px] min-w-[100px]">
                        {tt("Ngày gửi hồ sơ: ")}
                        {submitedForms[PROFILE_MAP.CCCD].created_at
                            ? formatNgayThang(
                                  submitedForms[PROFILE_MAP.CCCD].created_at,
                                  true
                              )
                            : tt("(Chưa cập nhật)")}
                    </div>
                    <div className="text-gray-500 text-[11px] mr-[10px] min-w-[100px]">
                        {tt("Ngày cập nhật hồ sơ: ")}
                        {submitedForms[PROFILE_MAP.CCCD].updated_at
                            ? formatNgayThang(
                                  submitedForms[PROFILE_MAP.CCCD].updated_at,
                                  true
                              )
                            : tt("(Chưa cập nhật)")}
                    </div>
                </div>,
            ];
        }
    };

    return (
        <div>
            <div className="flex flex-wrap gap-[10px]">
                <div className="max-w-[350px] overflow-hidden break-words mr-[5px]">
                    <div className="flex flex-row mb-0 ">
                        <div className="text-gray-500 text-[11px] mr-[10px] min-w-[120px]">
                            {tt("Số điện thoại:")}
                        </div>
                        <div>{data?.phone || tt("(Chưa cập nhật)")}</div>
                    </div>
                    <div className="flex flex-row mb-0 ">
                        <div className="text-gray-500 text-[11px] mr-[10px] min-w-[120px]">
                            {tt("Số CCCD:")}
                        </div>
                        <div>
                            {data?.citizen_identify || tt("(Chưa cập nhật)")}
                        </div>
                    </div>
                    <div className="flex flex-row mb-0 ">
                        <div className="text-gray-500 text-[11px] mr-[10px] min-w-[120px]">
                            {tt("Họ và tên:")}
                        </div>
                        <div>{data?.citizen_name || tt("(Chưa cập nhật)")}</div>
                    </div>
                    <div className="flex flex-row mb-0 ">
                        <div className="text-gray-500 text-[11px] mr-[10px] min-w-[120px]">
                            {tt("Ngày sinh:")}
                        </div>
                        <div>
                            {data?.birth_date
                                ? formatNgayThang(data?.birth_date)
                                : tt("(Chưa cập nhật)")}
                        </div>
                    </div>
                    <div className="flex flex-row mb-0 ">
                        <div className="text-gray-500 text-[11px] mr-[10px] min-w-[120px]">
                            {tt("Giới tính:")}
                        </div>
                        <div>
                            {data?.sex !== null
                                ? data?.sex === 0
                                    ? tt("Nữ")
                                    : tt("Nam")
                                : tt("(Chưa cập nhật)")}
                        </div>
                    </div>
                </div>

                <div className="max-w-[350px] overflow-hidden break-words mr-[5px]">
                    <div className="flex flex-row mb-0 ">
                        <div className="text-gray-500 text-[11px] mr-[10px] min-w-[120px]">
                            {tt(" Ngày cấp CCCD:")}
                        </div>
                        <div>
                            {data?.citizen_issued_date
                                ? formatNgayThang(data?.citizen_issued_date)
                                : tt("(Chưa cập nhật)")}
                        </div>
                    </div>
                    <div className="flex flex-row mb-0 ">
                        <div className="text-gray-500 text-[11px] mr-[10px] min-w-[120px]">
                            {tt("Ngày hết hạn CCCD:")}
                        </div>
                        <div>
                            {data.citizen_expire_date
                                ? formatNgayThang(data?.citizen_expire_date)
                                : tt("(Chưa cập nhật)")}
                        </div>
                    </div>
                    <div className="flex flex-row mb-0 ">
                        <div className="text-gray-500 text-[11px] mr-[10px] min-w-[120px]">
                            {tt("Quê quán:")}
                        </div>
                        <div>
                            {data?.place_of_origin || tt("(Chưa cập nhật)")}
                        </div>
                    </div>
                    <div className="flex flex-row mb-0 ">
                        <div className="text-gray-500 text-[11px] mr-[10px] min-w-[120px]">
                            {tt("Nơi thường trú:")}
                        </div>
                        <div>
                            {data?.place_of_residence || tt("(Chưa cập nhật)")}
                        </div>
                    </div>
                </div>

                <div className="max-w-[500px] overflow-hidden break-words mr-[5px] relative">
                    {decodedMedia && (
                        <PhotosViewer photos={decodedMedia[PROFILE_MAP.CCCD]} />
                    )}
                </div>
            </div>

            {renderTabButtons()}

            <Modal
                title={tt("Cập nhật thông tin tài xế")}
                open={isModalOpen}
                onOk={handleOk}
                style={{ top: 20 }}
                width="100vw"
                onCancel={handleCancel}
                footer={renderModalButtons()}
                forceRender
            >
                {/* {isModalOpen && (
        <DriverProfileForm record={decodedMedia} form={form} submitedForms={submitedForms} />
        )} */}
                {isModalOpen && (
                    <DriverProfileForm
                        record={decodedMedia}
                        form={form}
                        submitedForms={submitedForms}
                    />
                )}
            </Modal>
        </div>
    );
}

export default DriverProfile;
