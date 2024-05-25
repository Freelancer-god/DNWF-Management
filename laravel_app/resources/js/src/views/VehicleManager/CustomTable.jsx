/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import React, { useState } from 'react';
import { Table } from 'antd';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  changeSelectedRows,
  initUpdateWithoutShowModal,
  changeOrder,
} from '../../store/VehicleManager';
import { clog, getListIdInArray, tt } from '../../utils';
import CustomEmptyForTable from '../../components/CustomEmptyForTable';
import { getTableWidth } from '../../utils/tableWidth';

function CustomTable(props) {
  const { data, selectedRows, usageHeight } = props;

  const { userForms, setUserForms } = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [currentSelect, setCurrentSelect] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [inforDriver, setInforDriver] = useState([
    {
      key: '2',
      label: 'Số điện thoại',
      span: 3,
      children: '0123456789',
    },
    {
      key: '3',
      label: 'Quê quán',
      span: 3,
      children: 'Đồng Nai, Việt Nam',
    },
    {
      key: '4',
      label: 'Email',
      span: 3,
      children: '',
    },
    {
      key: '5',
      label: 'Địa chỉ hiện tại',
      span: 3,
      children: 'Gò Vấp, TPHCM',
    },
  ]);
  const [inforVehicle, setInforVehicle] = useState([
    {
      key: '2',
      label: 'Biển số xe',
      span: 3,
      children: '59B1 -12345 ',
    },
    {
      key: '3',
      label: 'Hãng',
      span: 2,
      children: 'Honda',
    },
    {
      key: '4',
      label: 'Dòng',
      span: 2,
      children: 'Air Blade 125',
    },
    {
      key: '5',
      label: 'Năm sản xuất',
      span: 2,
      children: '2018',
    },
    {
      key: '5',
      label: 'Màu',
      span: 3,
      children: 'Đen-đỏ',
    },
    {
      key: '5',
      label: 'Năm sản xuất',
      span: 3,
      children: '2018',
    },
  ]);

  /*
    const STATUS_UNACTIVE       = 0;
    const STATUS_ACTIVE         = 1;
    const STATUS_CONFIRM        = 2;
    const STATUS_BAN            = 3;
    */

  const showModal = (event, item) => {
    event.stopPropagation();
    setCurrentSelect(item);
    // console.log(item);
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
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
            ],
        ),
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
    clog('dataToSend', dataToSend);
    dispatch(initUpdateWithoutShowModal(dataToSend));
    navigate(`/cms/drivers?view_type=form&id=${item.id}`);
  };

  const handleOnChangeTable = (pagination, filters, sorter, extra) => {
    if (sorter) {
      let sort = '';
      const { field } = sorter;
      const order = field;
      switch (field) {
        // case 'reference':
        //   order = 'reference';
        //   break;
        // case 'title':
        //   order = 'title';
        //   break;
        // case 'total_point':
        //   order = 'total_point';
        //   break;
        // case 'quantity':
        //   order = 'quantity';
        //   break;
        // case 'point':
        //   order = 'point';
        //   break;
        default:
                // order = ;
      }
      sort = sorter.order
        ? sorter.order === 'ascend'
          ? 'asc'
          : 'desc'
        : '';

      const dataToSend = { order, sort };
      dispatch(changeOrder(dataToSend));
    }
  };

  return (
    <div
      className="ant_table_custom_padding overflow-x-auto max-h-[100vh] bg-slate-600"
      style={{ width: '100%', borderBottom: '1px solid #f0f0f0' }}
    >
      <Table
        rowClassName={(record, index) =>
          (index % 2 === 0 ? 'table-row-light' : 'table-row-dark')}
                // rowSelection={{
                //     type: "checkbox",
                //     ...rowSelection,
                // }}
        expandable={{
          // expandedRowRender: (recordRow, index, indent, expanded) => <CustomerTabs record={recordRow} />,
          expandRowByClick: true,
        }}
        onRow={(record, rowIndex) => ({
          // onDoubleClick: handlePressOnItem(record, rowIndex),
          // click row
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
              description={tt('Không có dữ liệu')}
            />
          ),
        }}
                // scroll={{
                //     y: `calc(100vh - 90px - ${usageHeight}px)`,
                //     x: 1250,
                //     // y: `calc(100vh - 50px - 33px - ${usageHeight}px)`, (50+33) -> 90 luon cho chan
                // }}
        className="custom-table"
        scroll={{ y: '75vh', x: getTableWidth(props.columns, 2600) }}
      />
    </div>
  );
}

export default CustomTable;
