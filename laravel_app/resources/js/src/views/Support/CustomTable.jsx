import React, { useState, useContext } from "react";
import { Modal, Table, Tag } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PermissionsContext, permission } from "../../store/Permissions";
import {
    changeSelectedRows,
    initUpdateWithoutShowModal,
    changeOrder,
} from "../../store/Support";
import { clog, getListIdInArray, tt } from "../../utils";
import CustomEmptyForTable from "../../components/CustomEmptyForTable";
import "react-quill/dist/quill.snow.css";

import Chat from "./Chat";
import { PERMISSIONS_MAP } from "../../constants";

function CustomTable(props) {
    const { data, selectedRows, usageHeight } = props;
    const dispatch = useDispatch();

    const [currentSelect, setCurrentSelect] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [stopInterval, setStopInterval] = useState(false);
    const myPermissions = useContext(PermissionsContext).permissions;
    const showModal = (item) => {
        setStopInterval(false);
        setCurrentSelect(item);
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setStopInterval(true);
        setIsModalOpen(false);
    };

    const mapType = { 1: "purple", 2: "cyan" };
    const mapStatus = {
        1: "geekblue",
        2: "blue",
        3: "success",
        4: "red",
    };

    const columns = [
        {
            title: tt("Khách hàng"),
            dataIndex: "name",
            sorter: true,
            width: 150,
            render: (value, item) =>
                value ? <div className="truncate">{value}</div> : <Tag />,
        },
        {
            title: tt("SĐT Khách hàng"),
            dataIndex: "phone",
            sorter: true,
            width: 200,
            render: (value, item) => <div className="truncate">{value}</div>,
        },
        {
            title: tt("Tiêu đề"),
            dataIndex: "title",
            width: 200,
            sorter: true,
            render: (value, item) => <div className="truncate">{value}</div>,
        },
        {
            title: tt("Nội dung"),
            dataIndex: "content",
            width: 500,
            // sorter: true,
            render: (value, item) => <div className="truncate">{value}</div>,
        },
        {
            title: tt("Loại"),
            dataIndex: "type",
            width: 100,
            sorter: true,
            render: (value, item) => (
                <Tag color={mapType[value]}>{item.type_name}</Tag>
            ),
        },
        {
            title: tt("Trạng thái"),
            dataIndex: "status",
            width: 100,
            sorter: true,
            render: (value, item) => (
                <Tag color={mapStatus[value]}>{item.status_name}</Tag>
            ),
        },
        ...(myPermissions[PERMISSIONS_MAP["update-support-service"]]
            ? [
                  {
                      title: "",
                      dataIndex: "action",
                      width: 100,
                      render: (value, item) => (
                          <a
                              className="text-blue-500 hover:underline"
                              onClick={() => showModal(item)}
                          >
                              {tt("Trả lời")}
                          </a>
                      ),
                  },
              ]
            : []),
    ];

    // const rowSelection = {
    //     selectedRowKeys: getListIdInArray(selectedRows),
    //     onChange: (selectedRowKeys, selectedRowsParam) => {
    //         dispatch(
    //             changeSelectedRows(
    //                 selectedRowsParam.length <= 0
    //                     ? []
    //                     : [
    //                           selectedRowsParam[
    //                               selectedRowsParam.length === 1
    //                                   ? 0
    //                                   : selectedRowsParam.length - 1
    //                           ],
    //                       ]
    //             )
    //         );
    //     },
    //     // getCheckboxProps: (record) => ({
    //     //     disabled: record?.status === 2,
    //     //   // Column configuration not to be checked
    //     //   name: record.name,
    //     // }),
    // };

    // const handlePressOnItem = (item) => () => {
    //     const dataToSend = { ...item };
    //     clog("dataToSend", dataToSend);
    //     dispatch(initUpdateWithoutShowModal(dataToSend));
    //     navigate(`/cms/supports?view_type=form&id=${item.id}`);
    // };

    const handleOnChangeTable = (pagination, filters, sorter, extra) => {
        if (sorter) {
            let order = "";
            let sort = "";
            const { field } = sorter;
            switch (field) {
                case "name":
                    order = "name";
                    break;
                case "phone":
                    order = "phone";
                    break;
                case "value":
                    order = "value";
                    break;
                case "title":
                    order = "title";
                    break;
                case "type":
                    order = "type";
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
                // onRow={(record, rowIndex) => ({
                //     onClick: handlePressOnItem(record, rowIndex), // click row
                //     // onDoubleClick: handlePressOnItem(record, rowIndex), // double click row
                //     // onContextMenu: (event) => {}, // right button click row
                //     // onMouseEnter: (event) => {}, // mouse enter row
                //     // onMouseLeave: (event) => {}, // mouse leave row
                // })}
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
                width={800}
                destroyOnClose
            >
                {isModalOpen && <Chat item={currentSelect} />}
            </Modal>
        </div>
    );
}
export default CustomTable;
