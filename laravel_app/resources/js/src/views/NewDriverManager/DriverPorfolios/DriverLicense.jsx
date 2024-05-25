import { Button, Form, Modal } from "antd";
import React, { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { clog, tt } from "../../../utils";
import DriverLicenseForm from "./DriverLicenseForm";
import { formatNgayThang } from "../../../utils/dateTime";

import PhotosViewer from "../../../components/PhotosViewer";
import {
    DRIVER_FORM_STATUS,
    PERMISSIONS_MAP,
    PROFILE_MAP,
} from "../../../constants";
import { updateDriverForms } from "../../../store/NewDriverManager/API";
import { showSuccess } from "../../../components/dialogs";
import { getData } from "../../../store/NewDriverManager";
import DriverProfileForm from "./DriverProfileForm";
import AntdButton from "../../../components/AntdButton";
import { COLORS } from "../../../CONSTANT";
import { PermissionsContext } from "../../../store/Permissions";

function DriverLicense({ data, submitedForms, onUpdate }) {
    const myPermissions = useContext(PermissionsContext).permissions;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const showModal = () => {
        window.isEditing = true;
        setIsModalOpen(true);
    };

    const generateDataToSend = (values, saveOnly = false) => {
        const {
            driver_license,
            driver_expire_date,
            driver_issued_date,
            driver_name,
            driver_of_residence,
            birth_date,
            driver_class,
            sex,
            status_type_2,
            status_type_3,
            note_type_2,
            note_type_3,
        } = values;
        const generatedData = {
            driver_id: data.id,
            form_list: [
                {
                    id: submitedForms[PROFILE_MAP.GPLX]
                        ? submitedForms[PROFILE_MAP.GPLX].id
                        : null,
                    data: {
                        driver_license,
                        driver_expire_date: driver_expire_date
                            ? driver_expire_date.format("YYYY-MM-DD")
                            : null,
                        driver_issued_date: driver_issued_date
                            ? driver_issued_date.format("YYYY-MM-DD")
                            : null,
                        driver_name,
                        driver_class,
                        driver_of_residence,

                        // birth_date: birth_date ? birth_date.format('YYYY-MM-DD') : null,
                        // sex: sex !== null ? parseInt(sex, 10) : null,
                    },
                    notes: note_type_2,
                },
            ],
        };
        // kiem tra xem co phai la form duyet hay khong status_type_2, status_type_3 phai co moi la form duyet
        if (status_type_2 !== undefined) {
            if (saveOnly) {
                generatedData.form_list[0].status =
                    submitedForms[PROFILE_MAP.GPLX].status;
                return generatedData;
            } // duyet luon khong luu
            if (status_type_2 === DRIVER_FORM_STATUS.VERIFIED) {
                generatedData.form_list[0].status = DRIVER_FORM_STATUS.VERIFIED;
            } else {
                generatedData.form_list[0].status = DRIVER_FORM_STATUS.DENINED;
            }

            return generatedData;
        } // cap nhat thong tin da duoc duyet
        generatedData.form_list[0].status = DRIVER_FORM_STATUS.VERIFIED;
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
    const [isShowModal, setIsShowModal] = useState(false);
    const onReset = () => {
        form.resetFields();
    };
    const renderModalButtons = () => {
        if (submitedForms && submitedForms[PROFILE_MAP.GPLX]) {
            return [
                <Button key="back" onClick={handleCancel}>
                    {tt("Đóng")}
                </Button>,
                <Button htmlType="button" onClick={onReset}>
                    Reset
                </Button>,
                <Button key="submit" type="primary" onClick={handleOk}>
                    {tt("Cập nhật / Duyệt")}
                </Button>,
            ];
        }
    };

    const renderTabButtons = () => {
        if (submitedForms && submitedForms[PROFILE_MAP.GPLX]) {
            return [
                ...(myPermissions[PERMISSIONS_MAP["confirm-driver-form"]]
                    ? [
                          <AntdButton
                              type="dashed"
                              colorPrimary={COLORS.primary}
                              className="float-right"
                              onClick={showModal}
                          >
                              {tt("Duyệt / Cập nhật hồ sơ")}
                          </AntdButton>,
                      ]
                    : []),
                <div>
                    <div className="text-gray-500 text-[11px] mr-[10px] min-w-[100px]">
                        {tt("Ngày gửi hồ sơ: ")}
                        {submitedForms[PROFILE_MAP.GPLX].created_at
                            ? formatNgayThang(
                                  submitedForms[PROFILE_MAP.GPLX].created_at,
                                  true
                              )
                            : tt("(Chưa cập nhật)")}
                    </div>
                    <div className="text-gray-500 text-[11px] mr-[10px] min-w-[100px]">
                        {tt("Ngày cập nhật hồ sơ: ")}
                        {submitedForms[PROFILE_MAP.GPLX].updated_at
                            ? formatNgayThang(
                                  submitedForms[PROFILE_MAP.GPLX].updated_at,
                                  true
                              )
                            : tt("(Chưa cập nhật)")}
                    </div>
                </div>,
            ];
        }
    };

    return (
        <>
            <div className="flex flex-wrap gap-[20px]">
                <div className="max-w-[300px] overflow-hidden break-words mr-[5px]">
                    <div className="flex flex-row mb-0 ">
                        <div className="text-gray-500 text-[11px] mr-[10px] min-w-[100px]">
                            {tt("Số GPLX:")}
                        </div>
                        <div>
                            {data.driver_license || tt("(Chưa cập nhật)")}
                        </div>
                    </div>
                    <div className="flex flex-row mb-0 ">
                        <div className="text-gray-500 text-[11px] mr-[10px] min-w-[100px]">
                            {tt("Họ và tên:")}
                        </div>
                        <div>{data.driver_name || tt("(Chưa cập nhật)")}</div>
                    </div>
                    <div className="flex flex-row mb-0 ">
                        <div className="text-gray-500 text-[11px] mr-[10px] min-w-[100px]">
                            {tt("Nơi cư trú:")}
                        </div>
                        <div>
                            {data.driver_of_residence || tt("(Chưa cập nhật)")}
                        </div>
                    </div>
                    <div className="flex flex-row mb-0 ">
                        <div className="text-gray-500 text-[11px] mr-[10px] min-w-[100px]">
                            {tt("Hạng GPLX:")}
                        </div>
                        {data.driver_class || tt("(Chưa cập nhật)")}
                    </div>
                    <div className="flex flex-row mb-0 ">
                        <div className="text-gray-500 text-[11px] mr-[10px] min-w-[100px]">
                            {tt("Ngày cấp:")}
                        </div>
                        {data.driver_issued_date
                            ? formatNgayThang(data.driver_issued_date)
                            : tt("(Chưa cập nhật)")}
                    </div>
                    <div className="flex flex-row mb-0 ">
                        <div className="text-gray-500 text-[11px] mr-[10px] min-w-[100px]">
                            {tt("Ngày hết hạn:")}
                        </div>
                        {data.driver_expire_date === null
                            ? tt("Không thời hạn hoặc chưa cập nhật")
                            : formatNgayThang(data.driver_expire_date)}
                    </div>
                </div>
                <div className="max-w-[500px] overflow-hidden break-words mr-[5px] relative">
                    {decodedMedia && (
                        <PhotosViewer photos={decodedMedia[PROFILE_MAP.GPLX]} />
                    )}
                </div>
            </div>

            {renderTabButtons()}

            <Modal
                title={tt("Cập nhật thông tin giấy phép lái xe")}
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
                    <DriverLicenseForm
                        record={decodedMedia}
                        form={form}
                        submitedForms={submitedForms}
                    />
                )}
            </Modal>
        </>
    );
}

export default DriverLicense;
