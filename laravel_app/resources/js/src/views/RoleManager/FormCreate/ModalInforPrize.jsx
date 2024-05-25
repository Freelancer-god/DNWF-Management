import {Modal} from "antd";
import React from "react";
import {tt} from "../../../utils";

function ModalInforPrize({ data, isModalOpen, handleCancel, handleOk }) {

  const mapDate = {
    1: tt("Thứ 2"),
    2: tt("Thứ 3"),
    3: tt("Thứ 4"),
    4: tt("Thứ 5"),
    5: tt("Thứ 6"),
    6: tt("Thứ 7"),
    0: tt("Chủ nhật"),
  };

  const formatDay = (dates) => {
    const copyDates = dates.slice();
    const result = copyDates.sort().map((item) => mapDate[item]);
    return result.join(", ");
  };
  const formatStore = (stores) => {
    const result = stores.map((item) => item.label);
    return result.join(", ");
  };
  return (
    <div>
      <Modal
        title={tt('Thông tin Voucher')}
        open={isModalOpen}
        onCancel={handleCancel}
        onOk={handleOk}
        okText={tt("Xác nhận")}
      >
        {tt("Tên voucher")}: {data._title}
        <br />
        {tt("Thời gian")}:{" "}
        {data._rangeDate && data._rangeDate.length > 0
          ? `${data._rangeDate[0]}  -> ${data._rangeDate[1]}`
          : ""}
        <br />
        <br />
        <span>{tt("Giá trị phát thưởng :")}</span>{" "}
        <strong>
          <span className="text-green-500">{data._prize}</span>
        </strong>
        <br />
        {/*{data._prizeUnder1 ? (*/}
        {/*  <>*/}
        {/*    <span>{tt("Giá trị phát thưởng từ 30p-1h: ")}</span>{" "}*/}
        {/*    <strong>*/}
        {/*      <span className="text-blue-500">{data._prizeUnder1}</span>*/}
        {/*    </strong>*/}
        {/*    <br />*/}
        {/*  </>*/}
        {/*) : (*/}
        {/*  ""*/}
        {/*)}*/}
        {/*{data._prizeBetween1 ? (*/}
        {/*  <>*/}
        {/*    <span>{tt("Giá trị phát thưởng trên 2h:")}</span>{" "}*/}
        {/*    <strong>*/}
        {/*      <span className="text-blue-500">{data._prizeBetween1}</span>*/}
        {/*    </strong>*/}
        {/*    <br />*/}
        {/*  </>*/}
        {/*) : (*/}
        {/*  ""*/}
        {/*)}*/}
        {/*<span className="text-red-500">*/}
        {/*  {tt("* Giá trị phát thưởng mặc định được áp dụng ngoài")}{" "}*/}
        {/*  <strong>{tt("khung giờ phát thưởng đã thiết lập")}</strong>*/}
        {/*</span>*/}
        {/*<br />*/}
        <br />
        {tt("Hoa hồng")}: {data._commission}{" "}
        {data._commissionType === 1 ? "%" : ""}
        <br />
        {tt("Hoa hồng sale")}: {data._commissionSale}{" "}
        {data._commissionSaleType === 1 ? "%" : ""}
        <br />
        {tt("Điều kiện")}:{" "}
        {data._rangeDay.length > 0 ? formatDay(data._rangeDay) : ""}
        <br />
        {tt("CLB tài trợ")}:{" "}
        {data._prizeStores.length > 0 ? formatStore(data._prizeStores) : ""}
      </Modal>
    </div>
  );
}

export default ModalInforPrize;
