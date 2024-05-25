import React, { useContext, useState } from "react";
import { Modal, Table, Tag } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    changeSelectedRows,
    initUpdateWithoutShowModal,
    changeOrder,
} from "../../store/Notification";
import { clog, getListIdInArray, tt } from "../../utils";
import CustomEmptyForTable from "../../components/CustomEmptyForTable";
import "react-quill/dist/quill.snow.css";
import { formatNgayThang } from "../../utils/dateTime";
import { PermissionsContext } from "../../store/Permissions";
import {
    DAY_OF_WEEK,
    PERMISSIONS_MAP,
    SEND_NOTIFICATION_TYPE,
} from "../../constants";
import dayjs from "dayjs";
import vi from "dayjs/locale/vi";

dayjs.locale({
    ...vi,
    weekStart: 1,
});
function CustomTable(props) {
    const { data, selectedRows, usageHeight } = props;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [content, setContent] = useState(false);
    const myPermissions = useContext(PermissionsContext).permissions;

    const showModal = (event, value) => {
        event.stopPropagation();
        setContent(value);
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const mapStatus = {
        0: {
            color: null,
            text: tt("Nháp"),
        },
        1: {
            color: "blue",
            text: tt("Đang chạy"),
        },
        2: {
            color: "success",
            text: tt("Đã gửi"),
        },
    };

    const mapType = {
        1: {
            color: "orange",
            text: tt("Tất cả"),
        },
        2: {
            color: "gold",
            text: tt("Khách hàng"),
        },
        3: {
            color: "volcano",
            text: tt("Tài xế"),
        },
    };
    const mapSendType = {
        1: {
            color: "purple",
            text: tt("Gửi một lần"),
        },
        2: {
            color: "geekblue",
            text: tt("Gửi hằng ngày"),
        },
        3: {
            color: "cyan",
            text: tt("Gửi hằng tuần"),
        },
        4: {
            color: "magenta",
            text: tt("Gửi hàng tháng"),
        },
    };

    const columns = [
        {
            title: tt("Tiêu đề"),
            dataIndex: "title",
            width: 200,
            sorter: true,
            render: (value, item) => (
                <div className="whitespace-normal">{value}</div>
            ),
        },
        {
            title: tt("Nội dung"),
            dataIndex: "content",
            width: 500,
            sorter: true,
            render: (value, item) => (
                <div className="whitespace-normal">{value}</div>
            ),
        },
        {
            title: tt("Gửi"),
            dataIndex: "send_date",
            width: 250,
            // sorter: true,
            render: (value, item) =>
                value ? (
                    <div className="whitespace-normal">
                        {textSendType(value, item)}
                    </div>
                ) : (
                    <Tag></Tag>
                ),
        },
        {
            title: tt("Loại"),
            dataIndex: "send_type",
            width: 150,
            sorter: true,
            render: (value, item) => (
                <Tag color={mapSendType[value].color}>
                    {mapSendType[value].text}
                </Tag>
            ),
        },
        {
            title: tt("Gửi cho"),
            dataIndex: "type",
            width: 150,
            sorter: true,
            render: (value, item) => (
                <Tag color={mapType[value].color}>{mapType[value].text}</Tag>
            ),
        },
        {
            title: tt("Trạng thái"),
            dataIndex: "status",
            width: 150,
            sorter: true,
            render: (value, item) => (
                <Tag color={mapStatus[value].color}>
                    {mapStatus[value].text}
                </Tag>
            ),
        },
        {
            title: tt("Cập nhật lần cuối"),
            dataIndex: "updated_at",
            width: 150,
            fixed: "right",
            sorter: true,
            render: (value, item) => formatNgayThang(value, true),
        },
        {
            title: tt("Ngày tạo"),
            dataIndex: "created_at",
            width: 150,
            fixed: "right",
            sorter: true,
            render: (value, item) => formatNgayThang(value, true),
        },
    ];

    const textSendType = (value, item) => {
        switch (item?.send_type) {
            case SEND_NOTIFICATION_TYPE.ONCE:
                return formatNgayThang(value, true);
            case SEND_NOTIFICATION_TYPE.EVERYMONTH:
                const date = dayjs(value).date();
                const hour = dayjs(value).hour();
                const minute = dayjs(value).minute();
                return `Gửi vào lúc ${hour}:${minute} ngày ${date} hằng tháng`;
            case SEND_NOTIFICATION_TYPE.EVERYDAY:
                const hour1 = dayjs(value).hour();
                const minute1 = dayjs(value).minute();
                return `Gửi vào lúc ${hour1}:${minute1} hằng ngày`;
            case SEND_NOTIFICATION_TYPE.EVERYWEEK:
                const hour2 = dayjs(value).hour();
                const minute2 = dayjs(value).minute();
                const day = dayjs(value).day();
                return `Gửi vào lúc ${hour2}:${minute2}  ${DAY_OF_WEEK[
                    day
                ].toLowerCase()} hằng tuần`;
        }
    };

    const rowSelection = {
        selectedRowKeys: getListIdInArray(selectedRows),
        onChange: (selectedRowKeys, selectedRowsParam) => {
            dispatch(
                changeSelectedRows(
                    selectedRowsParam.length <= 0
                        ? []
                        : [
                              selectedRowsParam[
                                  selectedRowsParam.length === 1
                                      ? 0
                                      : selectedRowsParam.length - 1
                              ],
                          ]
                )
            );
        },
        // getCheckboxProps: (record) => ({
        //     disabled: record?.status === 2,
        //   // Column configuration not to be checked
        //   name: record.name,
        // }),
    };

    const handlePressOnItem = (item) => () => {
        const dataToSend = { ...item };
        clog("dataToSend", dataToSend);
        dispatch(initUpdateWithoutShowModal(dataToSend));
        navigate(`/cms/notifications?view_type=form&id=${item.id}`);
    };

    const handleOnChangeTable = (pagination, filters, sorter, extra) => {
        if (sorter) {
            let order = "";
            let sort = "";
            const { field } = sorter;
            switch (field) {
                case "title":
                    order = "title";
                    break;
                case "content":
                    order = "content";
                    break;
                case "send_date":
                    order = "send_date";
                    break;
                case "send_type":
                    order = "send_type";
                    break;
                case "type":
                    order = "type";
                    break;
                case "status":
                    order = "status";
                    break;
                case "updated_at":
                    order = "updated_at";
                    break;
                default:
                    order = "";
            }
            sort = sorter.order
                ? sorter.order === "ascend"
                    ? "asc"
                    : "desc"
                : "";

            const dataToSend = { order, sort };
            dispatch(changeOrder(dataToSend));
        }
    };

    return (
        <div
            className="ant_table_custom_padding"
            style={{ width: "100%", borderBottom: "1px solid #f0f0f0" }}
        >
            <Table
                rowClassName={(record, index) =>
                    index % 2 === 0 ? "table-row-light" : "table-row-dark"
                }
                rowSelection={
                    myPermissions[PERMISSIONS_MAP["delete-notification"]] && {
                        type: "checkbox",
                        ...rowSelection,
                        hideSelectAll: true,
                    }
                }
                onRow={(record, rowIndex) => ({
                    onClick: handlePressOnItem(record, rowIndex), // click row
                    // onDoubleClick: handlePressOnItem(record, rowIndex), // double click row
                    // onContextMenu: (event) => {}, // right button click row
                    // onMouseEnter: (event) => {}, // mouse enter row
                    // onMouseLeave: (event) => {}, // mouse leave row
                })}
                rowKey="id"
                pagination={false}
                columns={columns}
                onChange={handleOnChangeTable}
                dataSource={data}
                locale={{
                    emptyText: (
                        <CustomEmptyForTable
                            description={tt("Không có dữ liệu")}
                        />
                    ),
                }}
                scroll={{
                    y: `calc(100vh - 90px - ${usageHeight}px)`,
                    x: 1250,
                    // y: `calc(100vh - 50px - 33px - ${usageHeight}px)`, (50+33) -> 90 luon cho chan
                }}
                className="custom-table"
            />
            <Modal
                open={isModalOpen}
                onCancel={handleCancel}
                okButtonProps={{ style: { display: "none" } }}
                cancelButtonProps={{ style: { display: "none" } }}
            >
                <div>
                    <div
                        className="ql-editor"
                        dangerouslySetInnerHTML={{ __html: content }}
                    />
                </div>
            </Modal>
        </div>
    );
}
export default CustomTable;
