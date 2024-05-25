import { Dropdown, Form, Modal } from "antd";
import React, { useState } from "react";
import { clog, tt } from "../../utils";
import ChangePass from "./ChangePass";
import { changePassword } from "../../store/EmployeeList";
import { showSuccess } from "../dialogs";
import { changeMyPass } from "../../store/EmployeeList/API";

function Profile() {
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const items = [
        {
            key: "1",
            label: (
                <a
                    rel="noopener noreferrer"
                    href="javascript:void(); "
                    onClick={() => setIsModalOpen(true)}
                >
                    {tt("Thay đổi mật khẩu")}
                </a>
            ),
        },
        {
            key: "3",
            label: (
                <a rel="noopener noreferrer" href="/logout">
                    {tt("Đăng xuất")}
                </a>
            ),
        },
    ];
    const handleOk = () => {
        form.validateFields()
            .then(async (values) => {
                // const dataToSend = generateDataToSend(values, saveOnly);
                // clog('values', values);

                const rs = await changeMyPass({
                    password: values.new_password,
                    old_password: values.old_password,
                });
                if (rs) {
                    showSuccess(tt("Đã thay đổi mật khẩu thành công"));
                    setIsModalOpen(false);
                    form.resetFields();
                }
            })
            .catch((info) => {
                clog("Validate Failed:", info);
            });
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <div className="flex cursor-pointer">
            <Dropdown
                menu={{
                    items,
                }}
                placement="bottomLeft"
            >
                <img
                    src="/logo.png"
                    alt="cudidi logo"
                    width={38}
                    height={38}
                    className=" bg-purple-300 rounded-full w-[38px] h-[38px] cursor-pointer"
                />
            </Dropdown>
            <Modal
                title={tt("Cập nhật mật khẩu")}
                open={isModalOpen}
                onOk={handleOk}
                // style={{ top: 20 }}
                // width="100vw"
                onCancel={handleCancel}
                // footer={renderModalButtons()}
                destroyOnClose
            >
                {isModalOpen && <ChangePass form={form} />}
            </Modal>
        </div>
    );
}

export default Profile;
