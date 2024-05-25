import React from "react";
import { Table } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changeOrder } from "../../store/Ratings";
import { tt } from "../../utils";
import CustomEmptyForTable from "../../components/CustomEmptyForTable";

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
                case "passenger":
                    order = "passenger_name";
                    break;
                case "driver":
                    order = "driver_name";
                    break;
                case "rating":
                    order = "rating";
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
