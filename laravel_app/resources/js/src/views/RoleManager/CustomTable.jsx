import React, { useState } from "react";
import { Table, Tag } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    changeSelectedRows,
    initUpdateWithoutShowModal,
    changeOrder,
} from "../../store/RoleManager";
import { clog, getListIdInArray, tt } from "../../utils";
import CustomEmptyForTable from "../../components/CustomEmptyForTable";
import { formatNgayThang } from "../../utils/dateTime";

function CustomTable(props) {
    const { data, selectedRows, usageHeight } = props;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [currentSelect, setCurrentSelect] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = (event, item) => {
        event.stopPropagation();
        setCurrentSelect(item);
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const columns = [
        {
            title: tt("Tên vai trò"),
            dataIndex: "display_name",
            width: 500,
            sorter: true,
            render: (value, item) => <Tag color="orange">{value}</Tag>,
        },
        {
            title: tt("Mô tả"),
            dataIndex: "description",
            // width: 150,
            sorter: true,
            render: (value, item) => value,
        },
        {
            title: tt("Ngày cập nhật"),
            dataIndex: "updated_at",
            label: tt("Ngày cập nhật"),
            key: "created_at",
            // width: 150,
            sorter: true,
            render: (value, item) => formatNgayThang(value, true),
        },
        // {
        //   title: tt("Tên voucher"),
        //   width: 300,
        //   dataIndex: "title",
        //   sorter: true,
        // },
        // {
        //   title: tt("Tổng giải thưởng"),
        //   dataIndex: "total_point",
        //   width: 150,
        //   align: "right",
        //   sorter: true,
        //   render: (value) => (
        //     <div>
        //       <span>{`${formatterNumber(value)}`}</span>
        //     </div>
        //   ),
        // },
        // {
        //   title: tt("Số lượng giải"),
        //   dataIndex: "quantity",
        //   width: 130,
        //   align: "right",
        //   sorter: true,
        //   render: (value) => (
        //     <div>
        //       <span>{`${formatterNumber(value)}`}</span>
        //     </div>
        //   ),
        // },
        // {
        //   title: tt("Giá trị phát thưởng"),
        //   dataIndex: "point",
        //   width: 150,
        //   align: "right",
        //   sorter: true,
        //   render: (value) => (
        //     <div>
        //       <span>{`${formatterNumber(value)}`}</span>
        //     </div>
        //   ),
        // },
        // {
        //   title: tt("Cậu lạc bộ"),
        //   dataIndex: "stores",
        //   align: "center",
        //   width: 150,
        //   render: (value, item) => (
        //     <div>
        //       <div>{item?.voucher_stores.length}</div>
        //       <Button onClick={(event) => showModal(event, item)} type="text">
        //         <span style={{ color: token.colorPrimary, cursor: "pointer" }}>
        //           {tt("Xem chi tiết")}
        //         </span>
        //       </Button>
        //     </div>
        //   ),
        // },
        // {
        //   title: tt("Hoa hồng"),
        //   dataIndex: "commission",
        //   width: 110,
        //   align: "right",
        //   render: (value, item) => (
        //     <div>
        //       <span>
        //         {item.commission_type === 1
        //           ? `${value} %`
        //           : `${formatterNumber(value)}`}
        //       </span>
        //     </div>
        //   ),
        // },
        // {
        //   title: tt("Thời gian"),
        //   dataIndex: "start_date",
        //   align: "left",
        //   width: 150,
        //   render: (value, item) =>
        //     item.start_date && item.end_date ? (
        //       <div>
        //         <div>
        //           <span>
        //             {item.start_date > 0
        //               ? unixTimeStampToStringDate(item.start_date)
        //               : ""}
        //           </span>
        //         </div>
        //         <div>
        //           <span>
        //             {item.end_date > 0
        //               ? unixTimeStampToStringDate(item.end_date)
        //               : ""}
        //           </span>
        //         </div>
        //       </div>
        //     ) : (
        //       <Tag />
        //     ),
        // },
        // {
        //   title: tt("Điều kiện tham dự"),
        //   dataIndex: "is_range",
        //   align: "center",
        //   width: 225,
        //   render: (value, item) => {
        //     const prizeRanges = item.voucher_ranges || null;
        //     const map = {
        //       1: tt("Thứ 2"),
        //       2: tt("Thứ 3"),
        //       3: tt("Thứ 4"),
        //       4: tt("Thứ 5"),
        //       5: tt("Thứ 6"),
        //       6: tt("Thứ 7"),
        //       0: tt("Chủ nhật"),
        //     };

        //     return (
        //       <div>
        //         <span>
        //           {prizeRanges && value === true ? (
        //             <div>
        //               <div className="mt-1 flex flex-wrap w-[225px]">
        //                 {prizeRanges?.range_time.length === 0 ? (
        //                   <Tag className="mb-1" color="#108ee9">
        //                     {tt("Cả ngày")}
        //                   </Tag>
        //                 ) : (
        //                   prizeRanges?.range_time.map((time, index) => (
        //                     <Tag
        //                       className="mb-1"
        //                       key={`range_time_${index}`}
        //                       color="#108ee9"
        //                     >
        //                       {time.join(" - ")}
        //                     </Tag>
        //                   ))
        //                 )}
        //               </div>
        //               <div className="flex flex-wrap w-[225px]">
        //                 {prizeRanges?.range_day &&
        //                 prizeRanges?.range_day.length === 7 ? (
        //                   <Tag className="mb-1" color="#2db7f5">
        //                     {tt("Mọi ngày trong tuần")}
        //                   </Tag>
        //                 ) : (
        //                   prizeRanges?.range_day &&
        //                   prizeRanges?.range_day.map((day) => (
        //                     <Tag
        //                       className="mb-1"
        //                       key={`range_day_${day}`}
        //                       color="#2db7f5"
        //                     >
        //                       {map[day]}
        //                     </Tag>
        //                   ))
        //                 )}
        //               </div>
        //             </div>
        //           ) : (
        //             <Tag>{tt("Không")}</Tag>
        //           )}
        //         </span>
        //       </div>
        //     );
        //   },
        // },
        // {
        //   title: tt("Trạng thái"),
        //   dataIndex: "status",
        //   width: 150,
        //   align: "left",
        //   render: (value) => {
        //     const mapText = {
        //       0: tt("Ngưng hoạt dộng"),
        //       1: tt("Chưa hoạt động"),
        //       2: tt("Đang hoạt động"),
        //     };
        //     const mapColor = {
        //       0: "error",
        //       1: "processing",
        //       2: "success",
        //     };
        //     return (
        //       <div>
        //         <Tag color={mapColor[value]}>{mapText[value]}</Tag>
        //       </div>
        //     );
        //   },
        // },
    ];

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
        navigate(`/cms/roles?view_type=form&id=${item.id}`);
    };

    const handleOnChangeTable = (pagination, filters, sorter, extra) => {
        if (sorter) {
            let order = "";
            let sort = "";
            const { field } = sorter;
            switch (field) {
                case "display_name":
                    order = "display_name";
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
                rowSelection={{
                    type: "checkbox",
                    ...rowSelection,
                    hideSelectAll: true,
                }}
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
        </div>
    );
}
export default CustomTable;
