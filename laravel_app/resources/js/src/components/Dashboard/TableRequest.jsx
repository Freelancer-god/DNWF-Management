import React, { useState } from "react";
import { Table, Tag, Button, Empty, Modal } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Spin from "antd/lib/spin";
import { formatterNumber, tt } from "../../utils";
import { stringToDateUnixTimeStamp, timeAgo } from "../../utils/dateTime";
import ButtonAction from "./TableRequestComp/ButtonAction";
import { Can } from "../../views/Can";
import CustomerProfile from "../../views/CustomerTransaction/UserProfile/CustomerProfile";
import { token } from "../../utils/antdtheme";
import dayjs from "dayjs";

function TableRequest(props) {
  const { data, loading } = props;

  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOnUpdatedButton = (data) => {
    props.onUpdated(data);
  };

  const showModal = (event, item) => {
    event.stopPropagation();
    setIsModalOpen(true);
    setSelectedUser(
      item.transfer_user && item.transfer_user.uid
        ? item.transfer_user.uid
        : null
    );
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const columns = [
    {
      title: tt("Khách hàng yêu cầu"),
      dataIndex: "transfer_user",
      render: (value, item) => (
        <div>
          {/* <p>{item.transfer_user.displayname}</p>
				{item.transfer_user.phone ?? <p>{item.transfer_user.phone}</p>} */}
          <a
            style={{ color: token.colorPrimary, cursor: "pointer" }}
            onClick={(event) => showModal(event, item)}
          >
            <div>
              <span className="mr-1">{item.transfer_user.displayname}</span>
            </div>
            {item.transfer_user.phone ?? (
              <div>
                <span className="mr-1">{item.transfer_user.phone}</span>
              </div>
            )}
          </a>
        </div>
      ),
    },
    {
      title: tt("Mã Ref"),
      dataIndex: "reference",
      width: 100,
      render: (value, item) => <Tag color="orange">{item.reference}</Tag>,
    },
    {
      title: tt("Số điểm yêu cầu"),
      dataIndex: "point",
      width: 180,
      align: "right",
      render: (value, item) => (
        <div className="w-full flex flex-col">
          <div className=" flex flex-row">
            <div className="flex-1 text-left">{tt("Số điểm: ")}</div>
            <div>
              <span>{formatterNumber(value)}</span>
            </div>
          </div>
          {/* <div className=" flex flex-row">
			  <div className="flex-1 text-left">{tt("Phí: ")}</div>
			  <div>
				<span>-{formatterNumber(item.commission)}</span>
			  </div>
			</div> */}
          <div className=" flex flex-row text-[rgba(0,0,0,0.5)] text-[11px]">
            <div className="flex-1 text-left">{tt("Phí: ")}</div>
            <div>
              <span>
                -{formatterNumber(item.commission * item.exchange_rate)} VNĐ
              </span>
            </div>
          </div>
          <div className=" flex flex-row">
            <div className="flex-1 text-left">{tt(" ")}</div>
            <div>
              <span className="text-[rgba(0,0,0,0.5)] text-[11px]">
                = {formatterNumber(item.exchange_point_vnd)} VNĐ
              </span>
            </div>
          </div>

          {/* <div className=" flex flex-row">
			  <div className="flex-1 text-left">{tt(" ")}</div>
			  <div>
				<span className="text-[rgba(0,0,0,0.5)] text-[11px]">
				  ={" "}
				  {formatterNumber(
					value * 1000 - value * 1000 * (item.percent_commission / 100)
				  )}{" "}
				  VNĐ
				</span>
			  </div>
			</div> */}
        </div>
      ),
    },
    {
      title: tt("Thông tin ngân hàng"),
      dataIndex: "point_transfer_receives",
      render: (value, item) => (
        <Tag color="geekblue" className="text-center">
          <div className="min-w-[200px]">
            <div>{item.bank_account_name}</div>
            <div>{item.bank_account}</div>
            <div>{item.bank_name}</div>
          </div>
        </Tag>
      ),
    },
    {
      title: tt("Ngày tạo"),
      dataIndex: "created_at",
      width: 170,
      render: (value, item) => (
        // <div>{timeAgo(stringToDateUnixTimeStamp(value), tt, true)}</div>
        <div className="mr-1">
          {dayjs(stringToDateUnixTimeStamp(value)).format("DD/MM/YYYY HH:mm")}
        </div>
      ),
    },
    {
      title: "",
      dataIndex: "",
      key: "x",
      render: (value, item) => (
        <Can appName={"wallets"} p={["wallets-user-transfer-confirm"]}>
          <ButtonAction
            value={value}
            item={item}
            onUpdated={handleOnUpdatedButton}
          />
        </Can>
      ),
    },
  ];

  return (
    <Spin tip="Loading..." spinning={loading}>
      <div
        className="ant_table_custom_padding"
        style={{ width: "100%", borderBottom: "1px solid #f0f0f0" }}
      >
        <Table
          rowClassName={(record, index) =>
            index % 2 === 0 ? "table-row-light" : "table-row-dark"
          }
          rowKey="id"
          pagination={false}
          columns={columns}
          dataSource={data}
          locale={{
            emptyText: <Empty description={"Không có yêu cầu đổi điểm"} />,
          }}
          // scroll={{
          //   y: 'calc(100vh - 90px - 100px)',
          //   x: 1100,
          //   // y: `calc(100vh - 50px - 33px - ${usageHeight}px)`, (50+33) -> 90 luon cho chan
          // }}
          className="custom-table"
        />
      </div>
      <Modal
        open={isModalOpen}
        title={tt("Thông tin khách hàng")}
        width={350}
        onCancel={handleCancel}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
      >
        <CustomerProfile userId={selectedUser} />
      </Modal>
    </Spin>
  );
}

export default TableRequest;
