import React, { useEffect, useState } from "react";
import { Spin, Table } from "antd";
import axios from "axios";
import { generateUrl } from "../../../utils/function";
import { clog } from "../../../utils";

const AddressTable = ({ user }) => {
    const [data, setData] = useState([]);
    const [spinner, setSpinner] = useState(false);
    clog("data", data);
    const handleFetchDataAddress = () => {
        setSpinner(true);
        const config = {
            headers: {
                Authorization: `Bearer ${
                    document.getElementById("myToken")?.value
                }`,
            },
        };
        const dataToSend = {
            term: "",
            with: [],
            page: 1,
            limit: 50,
            filter: {
                addressable_type: "passengers",
                addressable_id: user.id,
            },
            order_by: "created_at",
            sort: "asc",
        };
        return axios
            .post(
                generateUrl("api/cmsService/v1/address/search"),
                dataToSend,
                config
            )
            .then((res) => res.data)
            .then((data) => {
                if (data.success === false) {
                    setSpinner(false);
                    return showError(data.error);
                }
                setSpinner(false);
                setData(data.data.data);
            })
            .catch((error) => {
                setSpinner(false);
                showError(
                    tt("Không thể thực hiện ngay lúc này, vui lòng thử lại sau")
                );
            });
    };

    useEffect(() => {
        handleFetchDataAddress();
    }, [user]);

    const columns = [
        {
            title: "Tên địa chỉ",
            dataIndex: "name",
            width: 200,
            render: (value) => value,
        },
        {
            title: "Địa chỉ",
            dataIndex: "address",
            render: (value) => <div className="whitespace-normal">{value}</div>,
        },
    ];

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            clog(
                `selectedRowKeys: ${selectedRowKeys}`,
                "selectedRows: ",
                selectedRows
            );
        },
        getCheckboxProps: (record) => ({
            disabled: record.name === "Disabled User",
            // Column configuration not to be checked
            name: record.name,
        }),
    };

    return (
        <div>
            <Spin spinning={spinner}>
                <Table
                    size="large"
                    columns={columns}
                    dataSource={data}
                    pagination={false}
                />
            </Spin>
        </div>
    );
};
export default AddressTable;
