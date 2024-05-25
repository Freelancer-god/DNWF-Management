/* eslint-disable no-shadow */
import React, { useContext, useEffect } from "react";
import { Breadcrumb, Button, Form, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { clog, tt } from "../../utils";
import {
    changeSpinnerCreate,
    create,
    deleteMulti,
    getItemByID,
    id,
    initDuplicate,
    update,
    updateItem,
    type,
    changeType,
    status,
    changeStatus,
    title,
    content,
    sendType,
    sendDate,
    changeTitle,
    changeContent,
    changeSendDate,
    changeSendType,
} from "../../store/Notification";
import Create from "./FormCreate/Create";
import { getBreadcrumb } from "../../utils/function";
import { requireAdmin } from "../../store";
import { throttleOnPressAction } from "../../hook/throttlePressAcion";
import { PermissionsContext } from "../../store/Permissions";
import { PERMISSIONS_MAP } from "../../constants";
import { showError } from "../../components/dialogs";
import dayjs from "dayjs";

const { confirm } = Modal;
const mapStatus = {
    nhap: 0,
    chuan_bi_gui: 1,
};
function CustomForm() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const _updateItem = useSelector(updateItem);

    const _id = useSelector(id);
    const _title = useSelector(title);
    const _content = useSelector(content);
    const _type = useSelector(type);
    // const _status = useSelector(status);
    const _sendType = useSelector(sendType);
    const _sendDate = useSelector(sendDate);
    const [form] = Form.useForm();
    const myPermissions = useContext(PermissionsContext).permissions;

    const dispatch = useDispatch();

    const showModal = () => {
        setIsModalOpen(true);
    };

    useEffect(() => {
        clog("searchParams id", searchParams.get("id"));
        const idParam = searchParams.get("id");
        if (idParam && _id === null) {
            dispatch(getItemByID({ id: idParam }));
        }
    }, []);

    const handleOnChildChange = (data) => {
        const { _title, _content, _type, _sendType, _sendDate } = data;
        dispatch(changeTitle(_title));
        dispatch(changeContent(_content));
        dispatch(changeType(_type));
        // dispatch(changeStatus(_status));
        dispatch(changeSendDate(_sendDate));
        dispatch(changeSendType(_sendType));
    };

    const dataToForm = () => ({
        _id,
        _title,
        _content,
        _type,
        _sendType,
        _sendDate,
    });

    const submitSave = () => {
        form.validateFields()
            .then((values) => {
                clog("values", values);
                if (_id) {
                    // update
                    dispatch(update()).then(({ payload }) => {
                        if (payload) {
                            navigate("/cms/notifications?view_type=list");
                        }
                    });
                } else {
                    // new
                    dispatch(create()).then(({ payload }) => {
                        if (payload) {
                            navigate("/cms/notifications?view_type=list");
                        }
                    });
                }
            })
            .catch((errorInfo) => {
                clog("errorInfo", errorInfo);
            });
    };
    clog("_sendDate", _sendDate);
    const handleOnPressSave = (status) => {
        // if (status === mapStatus.chuan_bi_gui && _sendType !== 1) {
        //     const now = new Date();
        //     const sendDate = new Date(_sendDate);
        //     if (sendDate < now) {
        //         showError(tt("Thời gian gửi không được bé hơn hiện tại"));
        //     } else {
        //         dispatch(changeStatus(status));
        //         throttleOnPressAction(submitSave());
        //     }
        // } else {
        //     dispatch(changeStatus(status));
        //     throttleOnPressAction(submitSave());
        // }
        confirm({
            title: tt("Xác nhận"),
            icon: <ExclamationCircleFilled />,
            content: `${
                status === mapStatus.chuan_bi_gui
                    ? tt("Bạn có chắc chắn muốn thông báo")
                    : tt("Bạn có chắc chắn muốn lưu nháp")
            }?`,
            onOk() {
                dispatch(changeStatus(status));
                throttleOnPressAction(submitSave);
            },
            onCancel() {},
        });
    };

    const handleOnPressCancel = () => {
        navigate("/cms/notifications?view_type=list");
    };

    const handleOnPressCreate = () => {
        showModal();
    };

    const items = [
        {
            label: tt("Nhân bản"),
            key: "0",
        },
        // can("championshipvouchers", ["championshipvouchers-voucher-delete"], _permission) && {
        //     label: tt("Xoá"),
        //     key: "1",
        //     //   disabled: _updateItem?.status !== 1,
        // },
    ];

    const submitDelete = () => {
        requireAdmin().then(() => {
            dispatch(changeSpinnerCreate(true));
            dispatch(deleteMulti({ selectedRows: [_updateItem] })).then(
                ({ payload }) => {
                    dispatch(changeSpinnerCreate(false));
                    if (payload) {
                        navigate("/cms/notifications?view_type=list");
                    }
                }
            );
        });
    };

    const handleMenuClick = (e) => {
        switch (e.key) {
            case "0":
                dispatch(initDuplicate());
                navigate("/cms/notifications?view_type=form");
                break;
            case "1":
                confirm({
                    title: tt("Bạn có chắc chắn muốn xoá?"),
                    icon: <ExclamationCircleFilled />,
                    content: `${tt("Xoá")} ${_updateItem?.name}`,
                    onOk() {
                        throttleOnPressAction(submitDelete);
                    },
                    onCancel() {},
                });
                break;
            default:
                break;
        }
    };

    const breadcrumbNameMap = {
        "?view_type=list": tt("Danh sách thông báo"),
        "?view_type=form": tt("Mới"),
        "?view_type=form&id={id}": _updateItem?.title,
    };
    const extraBreadcrumbItems = getBreadcrumb(breadcrumbNameMap);
    const breadcrumbItems = [
        {
            title: (
                <Link to="/cms/notifications">{tt("Danh sách Thông báo")}</Link>
            ),
            key: "config_infor_home",
        },
    ].concat(extraBreadcrumbItems);

    const setTypeConfirm = () =>
        searchParams.get("id") === null ? "create" : "update";

    return (
        <div
            className="custom-container"
            style={{ paddingTop: "10px", paddingBottom: 0 }}
        >
            <div style={{ paddingLeft: "10px", paddingRight: "10px" }}>
                <div style={{ height: "32px" }} className="mb-1.5">
                    <div className="ant-breadcrumb_custom_fontsize">
                        <Breadcrumb items={breadcrumbItems} />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        {myPermissions[
                            PERMISSIONS_MAP["update-notification"]
                        ] ||
                        myPermissions[
                            PERMISSIONS_MAP["create-notification"]
                        ] ? (
                            <>
                                <Button
                                    type="primary"
                                    style={{ marginRight: "8px" }}
                                    className="mb-1.5"
                                    onClick={() =>
                                        handleOnPressSave(
                                            mapStatus.chuan_bi_gui
                                        )
                                    }
                                >
                                    {tt("Thông báo")}
                                </Button>
                                <Button
                                    // type="text"
                                    style={{ marginRight: "8px" }}
                                    className="mb-1.5"
                                    onClick={() =>
                                        handleOnPressSave(mapStatus.nhap)
                                    }
                                >
                                    {tt("Lưu nháp")}
                                </Button>
                            </>
                        ) : (
                            <div></div>
                        )}

                        <Button
                            type="text"
                            style={{ marginRight: "8px" }}
                            className="mb-1.5"
                            onClick={handleOnPressCancel}
                        >
                            {tt("Quay lại")}
                        </Button>
                    </div>
                    {_id && (
                        <div>
                            {/* <Dropdown
                                menu={{
                                    items,
                                    onClick: handleMenuClick,
                                }}
                                trigger={["click"]}
                            >
                                <Button
                                    icon={<i className="fa fa-cog" />}
                                    onClick={(e) => e.preventDefault()}
                                    className="custom-button-ant-span bp375:float-right mb-1.5"
                                >
                                    {tt("Tác vụ")}
                                </Button>
                            </Dropdown> */}
                        </div>
                    )}
                </div>
            </div>

            <div>
                <div className="bg-stripes-purple">
                    <div
                        className="custom-form-sheet-sm"
                        style={{ maxWidth: "1000px", minHeight: "unset" }}
                    >
                        <Create
                            data={dataToForm()}
                            onChangeData={handleOnChildChange}
                            form={form}
                        />
                    </div>
                </div>
            </div>

            {/* <ModalInforPrize
                data={dataToForm()}
                isModalOpen={isModalOpen}
                handleOk={handleOk(setTypeConfirm())}
                handleCancel={handleCancel}
            /> */}
        </div>
    );
}

export default CustomForm;
