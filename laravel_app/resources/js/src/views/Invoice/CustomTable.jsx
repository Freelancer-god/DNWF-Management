import React from "react";
import { Table } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changeOrder } from "../../store/Invoice";
import { tt } from "../../utils";
import CustomEmptyForTable from "../../components/CustomEmptyForTable";
import { getTableWidth } from "../../utils/tableWidth";

function CustomTable(props) {
    const { data, selectedRows, usageHeight } = props;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleOnChangeTable = (pagination, filters, sorter, extra) => {
        if (sorter) {
            let order = "";
            let sort = "";
            const { field } = sorter;
            switch (field) {
                case "trip_reference":
                    order = "trip_reference";
                    break;
                case "passenger_reference":
                    order = "passenger_reference";
                    break;
                case "passenger_name":
                    order = "passenger_name";
                    break;
                case "passenger_phone":
                    order = "passenger_phone";
                    break;
                case "driver_name":
                    order = "driver_name";
                    break;
                case "driver_reference":
                    order = "driver_reference";
                    break;
                case "driver_phone":
                    order = "driver_phone";
                    break;
                case "reference":
                    order = "reference";
                    break;
                case "total_payment":
                    order = "total_payment";
                    break;
                case "total_distance":
                    order = "total_distance";
                    break;
                case "total_duration":
                    order = "total_duration";
                    break;
                case "payment_type":
                    order = "payment_type";
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
                scroll={{ y: "75vh", x: getTableWidth(props.columns, 1800) }}
                className="custom-table"
            />
        </div>
    );
}
export default CustomTable;
