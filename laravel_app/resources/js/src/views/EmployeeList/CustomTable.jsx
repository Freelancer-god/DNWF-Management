import React, { useState } from "react";
import { Modal, Table, Tag, Tooltip } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    changeSelectedRows,
    initUpdateWithoutShowModal,
    changeOrder,
} from "../../store/EmployeeList";
import { clog, getListIdInArray, tt } from "../../utils";
import CustomEmptyForTable from "../../components/CustomEmptyForTable";

function CustomTable(props) {
    const { data, selectedRows, usageHeight } = props;
    const dispatch = useDispatch();
    const navigate = useNavigate();

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

    const handlePressOnItem = (item) => () => {
        const dataToSend = { ...item };
        clog("dataToSend", dataToSend);
        dispatch(initUpdateWithoutShowModal(dataToSend));
        navigate(`/cms/employees?view_type=form&id=${item.id}`);
    };

    const handleOnChangeTable = (pagination, filters, sorter, extra) => {
        if (sorter) {
            let order = "";
            let sort = "";
            const { field } = sorter;
            switch (field) {
                case "reference":
                    order = "reference";
                    break;
                case "name":
                    order = "name";
                    break;
                case "username":
                    order = "username";
                    break;
                case "email":
                    order = "email";
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
                // rowSelection={{
                //     type: "checkbox",
                //     ...rowSelection,
                //     hideSelectAll: true,
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
                columns={props.columns}
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
        </div>
    );
}
export default CustomTable;
