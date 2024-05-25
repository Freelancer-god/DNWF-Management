import React, { useState } from "react";
import { Modal, Table, Tag } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    changeSelectedRows,
    initUpdateWithoutShowModal,
    changeOrder,
} from "../../store/ConfigInfor";
import { clog, getListIdInArray, tt } from "../../utils";
import CustomEmptyForTable from "../../components/CustomEmptyForTable";
import "react-quill/dist/quill.snow.css";

function CustomTable(props) {
    const { data, selectedRows, usageHeight } = props;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [content, setContent] = useState(false);
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
            color: "red",
            text: "Ngưng hoạt dộng",
        },
        1: {
            color: "success",
            text: "Đang hoạt động",
        },
    };

    const columns = [
        {
            title: tt("Tên cấu hình"),
            dataIndex: "name",
            width: 500,
            sorter: true,
            render: (value, item) => <div>{value}</div>,
        },
        {
            title: tt("Giá trị"),
            dataIndex: "value",
            // width: 150,
            sorter: true,
            render: (value, item) => handleRenderContent(value, item),
        },
        {
            title: tt("Trạng thái"),
            dataIndex: "status",
            // width: 150,
            sorter: true,
            render: (value, item) => (
                <Tag color={mapStatus[value].color}>
                    {mapStatus[value].text}
                </Tag>
            ),
        },
    ];

    const handleRenderContent = (value, item) => {
        switch (item.type) {
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
            case 10:
            case 11:
            case 12:
            case 13:
            case 14:
            case 17:
            case 18:
            case 21:
            case 22:
                return (
                    <a
                        className="text-blue-500 hover:underline cursor-pointer"
                        onClick={(e) => showModal(e, value)}
                    >
                        {tt("Xem nội dung")}
                    </a>
                );
            default:
                return value;
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
        navigate(`/cms/configInfor?view_type=form&id=${item.id}`);
    };

    const handleOnChangeTable = (pagination, filters, sorter, extra) => {
        if (sorter) {
            let order = "";
            let sort = "";
            const { field } = sorter;
            switch (field) {
                case "name":
                    order = "name";
                    break;
                case "value":
                    order = "value";
                    break;
                case "status":
                    order = "status";
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
                // rowSelection={{
                //     type: "checkbox",
                //     ...rowSelection,
                // }}
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
