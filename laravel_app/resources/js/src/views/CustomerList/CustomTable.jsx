import React, { useState } from "react";
import { Modal, Table, Tag, Tooltip } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    changeSelectedRows,
    initUpdateWithoutShowModal,
    changeOrder,
} from "../../store/CustomerList";
import { clog, getListIdInArray, tt } from "../../utils";
import CustomEmptyForTable from "../../components/CustomEmptyForTable";
import AddressTable from "./ModalAddress/AddressTable";
import { formatNgayThang } from "../../utils/dateTime";

function CustomTable(props) {
    const { data, selectedRows, usageHeight } = props;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentSelect, setCurrentSelect] = useState(null);
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

    const [colorMap, setColorMap] = useState({});
    const getRandomColor = (id) => {
        const availableColors = [
            "magenta",
            "red",
            "volcano",
            "orange",
            "gold",
            "lime",
            "green",
            "cyan",
            "blue",
            "geekblue",
            "purple",
        ];

        if (!colorMap[id]) {
            // Lấy một màu ngẫu nhiên từ danh sách và gán cho item.id
            const randomColor =
                availableColors[
                    Math.floor(Math.random() * availableColors.length)
                ];
            setColorMap({ ...colorMap, [id]: randomColor });
        }

        return colorMap[id];
    };

    const mapStatus = {
        0: {
            color: "red",
            text: "Ngưng hoạt động",
        },
        1: {
            color: "success",
            text: "Đang hoạt động",
        },
    };

    const columns = [
        {
            title: tt("Mã ref"),
            dataIndex: "reference",
            width: 120,
            sorter: true,
            render: (value, item) => <Tag color="orange">{value}</Tag>,
        },

        {
            title: tt("Số điện thoại"),
            dataIndex: "phone",
            // width: 150,
            sorter: true,
            render: (value, item) =>
                value ? (
                    item.is_tester ? (
                        <Tooltip title={tt("Tài khoản kiểm thử")}>
                            <div className=" whitespace-normal text-blue-500">
                                {value}
                            </div>
                        </Tooltip>
                    ) : (
                        <div className=" whitespace-normal">{value}</div>
                    )
                ) : (
                    <Tag />
                ),
        },
        {
            title: tt("Tên khách hàng"),
            dataIndex: "name",
            // width: 500,
            sorter: true,
            render: (value, item) => value || <Tag />,
        },
        {
            title: tt("Email"),
            dataIndex: "email",
            // width: 150,
            sorter: true,
            render: (value, item) => value || <Tag />,
        },
        {
            title: tt("Giới tính"),
            dataIndex: "sex",
            // width: 150,
            sorter: true,
            render: (value, item) => value || <Tag />,
        },
        {
            title: tt("Ngày sinh"),
            dataIndex: "birth_date",
            // width: 150,
            sorter: true,
            render: (value, item) => value || <Tag />,
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
        {
            title: tt("Cập nhật lần cuối"),
            dataIndex: "updated_at",
            width: 170,
            sorter: true,
            render: (value, item) => <div>{formatNgayThang(value, true)}</div>,
        },
        {
            title: tt(""),
            dataIndex: "address",
            // width: 150,
            render: (value, item) => (
                <a
                    className="text-blue-500 hover:underline"
                    onClick={(e) => showModal(e, item)}
                >
                    {tt("Xem địa chỉ đã lưu")}
                </a>
            ),
        },
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

    // const handlePressOnItem = (item) => () => {
    //     const dataToSend = { ...item };
    //     clog("dataToSend", dataToSend);
    //     dispatch(initUpdateWithoutShowModal(dataToSend));
    //     navigate(`/cms/employee_list?view_type=form&id=${item.id}`);
    // };

    const handleOnChangeTable = (pagination, filters, sorter, extra) => {
        if (sorter) {
            let order = "";
            let sort = "";
            const { field } = sorter;
            switch (field) {
                case "reference":
                    order = "reference";
                    break;
                case "phone":
                    order = "phone";
                    break;
                case "name":
                    order = "name";
                    break;
                case "email":
                    order = "email";
                    break;
                case "sex":
                    order = "sex";
                    break;
                case "birth_date":
                    order = "birth_date";
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
                rowSelection={{
                    type: "checkbox",
                    ...rowSelection,
                    hideSelectAll: true,
                }}
                onRow={(record, rowIndex) => ({
                    // onClick: handlePressOnItem(record, rowIndex), // click row
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
                size="large"
                open={isModalOpen}
                onCancel={handleCancel}
                okButtonProps={{ style: { display: "none" } }}
                cancelButtonProps={{ style: { display: "none" } }}
                width={800}
            >
                <AddressTable user={currentSelect} />
            </Modal>
        </div>
    );
}
export default CustomTable;
