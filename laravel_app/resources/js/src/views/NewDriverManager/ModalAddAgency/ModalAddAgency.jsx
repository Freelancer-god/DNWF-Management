import { Form, Modal, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { clog, tt } from "../../../utils";
import SelectWithSearch from "../../../components/SelectWithSearch/SelectWithSearch";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { showError, showSuccess } from "../../../components/dialogs";
import { generateUrl } from "../../../utils/function";
import { useDispatch } from "react-redux";
import AntdButton from "../../../components/AntdButton";
import { ControlOutlined } from "@ant-design/icons";
import { COLORS } from "../../../CONSTANT";
import { getData } from "../../../store/NewDriverManager";

function ModalAddAgency({ data }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedAgency, setSelectedAgency] = useState(
        data?.agency_id
            ? {
                  id: data?.agency_id,
                  label: data?.agency_name,
              }
            : null
    );
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        form.setFieldValue("_agency", selectedAgency);
    }, [selectedAgency]);

    clog("form.getFieldValue('_agency');", form.getFieldValue("_agency"));

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = async () => {
        setLoading(true);
        if (selectedAgency) {
            const response = await handleFetchUpdate({
                driver_id: data.id,
                agency_id: selectedAgency.id,
            });
            if (response) {
                showSuccess(tt("Cập nhật thành công"));
                navigate("/cms/drivers_new?view_type=list");
                setIsModalOpen(false);
                dispatch(getData());
            }
            setLoading(false);
        } else {
            showError(tt("Vui lòng chọn đại lý"));
            setLoading(false);
        }
    };

    const handleFetchUpdate = async (dataToSend) => {
        return axios
            .post(
                generateUrl(`api/cmsService/v1/drivers/updateAgency`),
                dataToSend,
                config
            )
            .then((res) => res.data)
            .then((data) => {
                if (data.success === false) {
                    showError(data.error);
                    return null;
                }
                return data.data;
            })
            .catch((error) => {
                showError(
                    tt("Không thể thực hiện ngay lúc này, vui lòng thử lại sau")
                );
                return null;
            });
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const config = {
        headers: {
            Authorization: `Bearer ${
                document.getElementById("myToken")?.value
            }`,
        },
    };

    const handleOnChangeSelectAgency = (value) => {
        setSelectedAgency(value);
    };

    const handleFormatAgencySearchData = (data) => {
        const array = [];
        for (const i of data) {
            array.push({
                id: i.id,
                value: i.id,
                label: `${i.name}`,
            });
        }
        return array;
    };
    clog("loading", loading);
    return (
        <>
            <Tooltip title={tt("Xử lý cập nhật khu vực, đại lý cho tài xế")}>
                <AntdButton
                    type="primary"
                    ghost
                    colorPrimary={COLORS.blue}
                    icon={<ControlOutlined twoToneColor={COLORS.blue} />}
                    // loading={loadingGear2}
                    onClick={showModal}
                >
                    {tt("Cập nhật đại lý")}
                </AntdButton>
            </Tooltip>
            <Modal
                title={tt("Cập nhật đại lý")}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                {/* <Form labelCol={{ span: 5 }} layout="horizontal">
                    <Form.Item
                        className="mb-2"
                        label={tt("Đại lý")}
                        name="_agency"
                        rules={[{ required: true }]}
                    > */}
                <SelectWithSearch
                    // mode="multiple"
                    selected={selectedAgency}
                    placeholder={tt("Vui lòng chọn đại lý")}
                    onChangSelect={handleOnChangeSelectAgency}
                    formatFunction={handleFormatAgencySearchData}
                    API="api/cmsService/v1/agencies/search"
                    filter={{}}
                    headers={config}
                    loading={loading}
                    disabled={loading}
                />
                {/* </Form.Item>
                </Form> */}
            </Modal>
        </>
    );
}

export default ModalAddAgency;
