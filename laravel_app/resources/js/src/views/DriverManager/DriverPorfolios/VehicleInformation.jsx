/* eslint-disable camelcase */
/* eslint-disable max-len */
import { Button, Form, Modal } from "antd";
import React, { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";
import { clog, tt } from "../../../utils";
import PhotosViewer from "../../../components/PhotosViewer";
import {
    DRIVER_FORM_STATUS,
    PERMISSIONS_MAP,
    PROFILE_MAP,
    VEHICLE_INFOMATION_TYPE,
    VEHICLE_MAP,
} from "../../../constants";
import {
    updateDriverForms,
    updateVehicleForms,
} from "../../../store/DriverManager/API";
import { showSuccess } from "../../../components/dialogs";
import { getData } from "../../../store/DriverManager";
import VehicleInformationForm from "./VehicleInformationForm";
import AntdButton from "../../../components/AntdButton";
import { COLORS } from "../../../CONSTANT";
import { formatNgayThang } from "../../../utils/dateTime";
import { PermissionsContext } from "../../../store/Permissions";

function VehicleInformation({ data, userId, submitedForms, onUpdate }) {
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
            registration_certificate,
            insurance_civil_accident_date,
            vehicle_brand_id,
            vehicle_type_id,
            model_name,
            vehicle_address,
            owner_name,
            color,
            engine_number,
            frame_number,
            license_plates,
            is_owner,
            model_name_id,
            model_years,
            type_name,
            vehicle_brand_model_id,
            status_type_1,
            status_type_2,
            status_type_3,
            note_type_1,
            note_type_2,
            note_type_3,
            insurance_civil_accident_price,
            first_registration_date,
            insurance_vehicle_material_date,
            insurance_vehicle_material_price,
            brand_name,
        } = values;
        const generatedData = {
            driver_id: userId,
            form_list: [
                {
                    id: submitedForms[VEHICLE_INFOMATION_TYPE.DKX]
                        ? submitedForms[VEHICLE_INFOMATION_TYPE.DKX].id
                        : null,
                    data: {
                        color,
                        engine_number,
                        frame_number,
                        is_owner,
                        first_registration_date: first_registration_date
                            ? first_registration_date.format("YYYY-MM-DD")
                            : null,
                        license_plates,
                        model_name,
                        model_years: model_years
                            ? model_years.get("year")
                            : null,
                        registration_certificate,
                        type_name,
                        brand_name,
                        vehicle_address,
                        owner_name,
                        model_name_id,
                        vehicle_brand_id,
                        vehicle_type_id,
                        vehicle_brand_model_id,
                    },
                },
                {
                    id: submitedForms[VEHICLE_INFOMATION_TYPE.HAX]
                        ? submitedForms[VEHICLE_INFOMATION_TYPE.HAX].id
                        : null,
                },
                {
                    id: submitedForms[VEHICLE_INFOMATION_TYPE.BHBBTNDS]
                        ? submitedForms[VEHICLE_INFOMATION_TYPE.BHBBTNDS].id
                        : null,
                    data: {
                        insurance_civil_accident_date:
                            insurance_civil_accident_date
                                ? insurance_civil_accident_date.format(
                                      "YYYY-MM-DD"
                                  )
                                : null,
                        insurance_civil_accident_price,
                        insurance_vehicle_material_date:
                            insurance_vehicle_material_date
                                ? insurance_vehicle_material_date.format(
                                      "YYYY-MM-DD"
                                  )
                                : null,
                        insurance_vehicle_material_price,
                    },
                },
            ],
        };
        // kiem tra xem co phai la form duyet hay khong status_type_1, status_type_3 phai co moi la form duyet
        if (
            status_type_1 !== undefined ||
            status_type_2 !== undefined ||
            status_type_3 !== undefined
        ) {
            if (saveOnly) {
                generatedData.form_list[0].status =
                    submitedForms[VEHICLE_INFOMATION_TYPE.DKX].status;
                generatedData.form_list[1].status =
                    submitedForms[VEHICLE_INFOMATION_TYPE.HAX].status;
                generatedData.form_list[2].status =
                    submitedForms[VEHICLE_INFOMATION_TYPE.BHBBTNDS].status;
                return generatedData;
            } // duyet luon khong luu
            if (status_type_1 === DRIVER_FORM_STATUS.VERIFIED) {
                generatedData.form_list[0].status = DRIVER_FORM_STATUS.VERIFIED;
            } else {
                generatedData.form_list[0].status = DRIVER_FORM_STATUS.DENINED;
                generatedData.form_list[0].notes = note_type_1;
            }
            if (status_type_2 === DRIVER_FORM_STATUS.VERIFIED) {
                generatedData.form_list[1].status = DRIVER_FORM_STATUS.VERIFIED;
            } else {
                generatedData.form_list[1].status = DRIVER_FORM_STATUS.DENINED;
                generatedData.form_list[1].notes = note_type_2;
            }

            if (status_type_3 === DRIVER_FORM_STATUS.VERIFIED) {
                generatedData.form_list[2].status = DRIVER_FORM_STATUS.VERIFIED;
            } else {
                generatedData.form_list[2].status = DRIVER_FORM_STATUS.DENINED;
                generatedData.form_list[2].notes = note_type_3;
            }
            return generatedData;
        } // cap nhat thong tin da duoc duyet
        generatedData.form_list[0].status = DRIVER_FORM_STATUS.VERIFIED;
        generatedData.form_list[1].status = DRIVER_FORM_STATUS.VERIFIED;
        generatedData.form_list[2].status = DRIVER_FORM_STATUS.VERIFIED;
        return generatedData;
    };

    const handleCancel = () => {
        window.isEditing = false;
        setIsModalOpen(false);
    };

    let decodedMedia = null;
    try {
        // decode base64 form_medias chay tren browser
        decodedMedia = JSON.parse(window.atob(data.form_medias));
    } catch (error) {
        clog(error);
    }

    const onReset = () => {
        form.resetFields();
    };

    const handleOk = ({ saveOnly = false }) => {
        form.validateFields()
            .then(async (values) => {
                const dataToSend = generateDataToSend(values, saveOnly);
                clog("values", values);

                const rs = await updateVehicleForms(dataToSend);
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

    const renderModalButtons = () => {
        if (submitedForms && submitedForms[VEHICLE_INFOMATION_TYPE.DKX]) {
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
            // if (submitedForms[VEHICLE_INFOMATION_TYPE.DKX].status === DRIVER_FORM_STATUS.VERIFIED
            //   && submitedForms[VEHICLE_INFOMATION_TYPE.HAX].status === DRIVER_FORM_STATUS.VERIFIED) {
            //   return [
            //     <Button key="back" onClick={handleCancel}>
            //       {tt('Đóng')}
            //     </Button>,
            //     <Button htmlType="button" onClick={onReset}>
            //       Reset
            //     </Button>,
            //     <Button key="submit" type="primary" onClick={handleOk}>
            //       {tt('Cập nhật')}
            //     </Button>,

            //   ];
            // }
            // if (submitedForms[VEHICLE_INFOMATION_TYPE.DKX].status === DRIVER_FORM_STATUS.NOT_VERIFIED
            //   || submitedForms[VEHICLE_INFOMATION_TYPE.BHBBTNDS].status === DRIVER_FORM_STATUS.NOT_VERIFIED
            //   || submitedForms[VEHICLE_INFOMATION_TYPE.HAX].status === DRIVER_FORM_STATUS.NOT_VERIFIED) {
            //   return [
            //     <Button key="back" onClick={handleCancel}>
            //       {tt('Đóng')}
            //     </Button>,
            //     <Button htmlType="button" onClick={onReset}>
            //       Reset
            //     </Button>,
            //     <Button key="submit" type="primary" onClick={handleOk}>
            //       {tt('Cập nhật / Duyệt')}
            //     </Button>,
            //   ];
            // }

            // if ((submitedForms[VEHICLE_INFOMATION_TYPE.DKX].status === DRIVER_FORM_STATUS.DENINED
            //     && submitedForms[VEHICLE_INFOMATION_TYPE.HAX].status === DRIVER_FORM_STATUS.DENINED)) {
            //   return [
            //     <Button key="back" onClick={handleCancel}>
            //       {tt('Đóng')}
            //     </Button>,
            //   ];
            // }
            // if ((submitedForms[VEHICLE_INFOMATION_TYPE.DKX].status === DRIVER_FORM_STATUS.VERIFIED
            //   && submitedForms[VEHICLE_INFOMATION_TYPE.HAX].status === DRIVER_FORM_STATUS.DENINED)
            //   || (submitedForms[VEHICLE_INFOMATION_TYPE.DKX].status === DRIVER_FORM_STATUS.DENINED
            //     && submitedForms[VEHICLE_INFOMATION_TYPE.HAX].status === DRIVER_FORM_STATUS.VERIFIED)

            // ) {
            //   return [
            //     <Button key="back" onClick={handleCancel}>
            //       {tt('Đóng')}
            //     </Button>,
            //     <Button htmlType="button" onClick={onReset}>
            //       Reset
            //     </Button>,
            //     <Button key="submit" type="primary" onClick={handleOk}>
            //       {tt('Cập nhật')}
            //     </Button>,
            //   ];
            // }
        }
    };

    const renderTabButtons = () => {
        if (submitedForms && submitedForms[VEHICLE_INFOMATION_TYPE.DKX]) {
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
                        {submitedForms[VEHICLE_INFOMATION_TYPE.DKX].created_at
                            ? formatNgayThang(
                                  submitedForms[VEHICLE_INFOMATION_TYPE.DKX]
                                      .created_at,
                                  true
                              )
                            : tt("(Chưa cập nhật)")}
                    </div>
                    <div className="text-gray-500 text-[11px] mr-[10px] min-w-[100px]">
                        {tt("Ngày cập nhật hồ sơ: ")}
                        {submitedForms[VEHICLE_INFOMATION_TYPE.DKX].updated_at
                            ? formatNgayThang(
                                  submitedForms[VEHICLE_INFOMATION_TYPE.DKX]
                                      .updated_at,
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
            <div className="flex flex-wrap gap-[10px]">
                <div className="max-w-[350px] overflow-hidden break-words mr-[10px]">
                    <div className="flex flex-row mb-0 ">
                        <div className="text-gray-500 text-[11px] mr-[10px] min-w-[130px]">
                            {tt("Loại xe:")}
                        </div>
                        <div>
                            {data?.vehicle_type_id
                                ? VEHICLE_MAP[data.vehicle_type_id]
                                : tt("(Chưa cập nhật)")}
                        </div>
                    </div>
                    <div className="flex flex-row mb-0 ">
                        <div className="text-gray-500 text-[11px] mr-[10px] min-w-[130px]">
                            {tt("Biển số:")}
                        </div>
                        <div>
                            {data?.license_plates || tt("(Chưa cập nhật)")}
                        </div>
                    </div>
                    <div className="flex flex-row mb-0 ">
                        <div className="text-gray-500 text-[11px] mr-[10px] min-w-[130px]">
                            {tt("Số đăng ký:")}
                        </div>
                        <div>
                            {data?.registration_certificate ||
                                tt("(Chưa cập nhật)")}
                        </div>
                    </div>
                    <div className="flex flex-row mb-0 ">
                        <div className="text-gray-500 text-[11px] mr-[10px] min-w-[130px]">
                            {tt("Xe chính chủ")}
                        </div>
                        <div>
                            {data?.is_owner === null
                                ? tt("(Chưa cập nhật)")
                                : data?.is_owner === 0
                                ? tt("Xe không chính chủ")
                                : tt("Xe chính chủ")}
                        </div>
                    </div>
                </div>
                <div className="max-w-[350px] overflow-hidden break-words mr-[10px]">
                    <div className="flex flex-row mb-0 ">
                        <div className="text-gray-500 text-[11px] mr-[10px] min-w-[130px]">
                            {tt("Hãng xe:")}
                        </div>
                        <div>{data?.brand_name || tt("(Chưa cập nhật)")}</div>
                    </div>
                    <div className="flex flex-row mb-0 ">
                        <div className="text-gray-500 text-[11px] mr-[10px] min-w-[130px]">
                            {tt(" Dòng xe:")}
                        </div>
                        <div>{data?.model_name || tt("(Chưa cập nhật)")}</div>
                    </div>
                    <div className="flex flex-row mb-0 ">
                        <div className="text-gray-500 text-[11px] mr-[10px] min-w-[130px]">
                            {tt("Màu:")}
                        </div>
                        <div>{data?.color || tt("(Chưa cập nhật)")}</div>
                    </div>
                    <div className="flex flex-row mb-0 ">
                        <div className="text-gray-500 text-[11px] mr-[10px] min-w-[130px]">
                            {tt("NSX:")}
                        </div>
                        <div>{data?.model_years || tt("(Chưa cập nhật)")}</div>
                    </div>
                </div>
                <div className="max-w-[350px] overflow-hidden break-words mr-[10px]">
                    <div className="flex flex-row mb-0 ">
                        <div className="text-gray-500 text-[11px] mr-[10px] min-w-[130px]">
                            {tt("Số khung:")}
                        </div>
                        <div>{data?.frame_number || tt("(Chưa cập nhật)")}</div>
                    </div>
                    <div className="flex flex-row mb-0 ">
                        <div className="text-gray-500 text-[11px] mr-[10px] min-w-[130px]">
                            {tt("Số máy:")}
                        </div>
                        <div>
                            {data?.engine_number || tt("(Chưa cập nhật)")}
                        </div>
                    </div>
                </div>
                <div className="max-w-[350px] overflow-hidden break-words mr-[10px]">
                    <div className="flex flex-row mb-0 ">
                        <div className="text-gray-500 text-[11px] mr-[10px] min-w-[130px]">
                            {tt("Ngày hết hạn BHBB TNDS:")}
                        </div>
                        {data?.insurance_civil_accident_date
                            ? formatNgayThang(
                                  data?.insurance_civil_accident_date
                              )
                            : tt("(Chưa cập nhật)")}
                    </div>
                    <div className="flex flex-row mb-0 ">
                        <div className="text-gray-500 text-[11px] mr-[10px] min-w-[130px]">
                            {tt("Giá trị BHBB TNDS:")}
                        </div>
                        {data?.insurance_civil_accident_price ||
                            tt("(Chưa cập nhật)")}
                    </div>
                </div>
                <div className="max-w-[350px] overflow-hidden break-words mr-[10px]">
                    <div className="flex flex-row mb-0 ">
                        <div className="text-gray-500 text-[11px] mr-[10px] min-w-[130px]">
                            {tt("Ngày hết hạn BH vật chất:")}
                        </div>
                        {data?.insurance_vehicle_material_date
                            ? formatNgayThang(
                                  data?.insurance_vehicle_material_date
                              )
                            : tt("(Chưa cập nhật)")}
                    </div>
                    <div className="flex flex-row mb-0 ">
                        <div className="text-gray-500 text-[11px] mr-[10px] min-w-[130px]">
                            {tt("Giá trị BH vật chất:")}
                        </div>
                        {data?.insurance_vehicle_material_price ||
                            tt("(Chưa cập nhật)")}
                    </div>
                </div>
                {decodedMedia && (
                    <>
                        <div className="max-w-[500px] overflow-hidden break-words mr-[5px] relative">
                            {decodedMedia && (
                                <PhotosViewer
                                    photos={
                                        decodedMedia[
                                            VEHICLE_INFOMATION_TYPE.BHBBTNDS
                                        ]
                                    }
                                />
                            )}
                        </div>

                        {/* {data?.vehicle_type_id > 1
          && decodedMedia && (<PhotosViewer photos={decodedMedia[VEHICLE_INFOMATION_TYPE.GCNDK]} />)}
          {data?.vehicle_type_id > 1
          && decodedMedia && (<PhotosViewer photos={decodedMedia[VEHICLE_INFOMATION_TYPE.GNPSDDB]} />)} */}
                        <div className="max-w-[500px] overflow-hidden break-words mr-[5px] relative">
                            {decodedMedia && (
                                <PhotosViewer
                                    photos={
                                        decodedMedia[
                                            VEHICLE_INFOMATION_TYPE.DKX
                                        ]
                                    }
                                />
                            )}
                        </div>
                        <div className="max-w-[500px] overflow-hidden break-words mr-[5px] relative">
                            {decodedMedia && (
                                <PhotosViewer
                                    photos={
                                        decodedMedia[
                                            VEHICLE_INFOMATION_TYPE.HAX
                                        ]
                                    }
                                />
                            )}
                        </div>
                    </>
                )}
            </div>
            {renderTabButtons()}

            <Modal
                title={tt("Cập nhật thông tin phương tiện")}
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
                    <VehicleInformationForm
                        record={decodedMedia}
                        form={form}
                        submitedForms={submitedForms}
                    />
                )}
            </Modal>
        </>
    );
}
export default VehicleInformation;
