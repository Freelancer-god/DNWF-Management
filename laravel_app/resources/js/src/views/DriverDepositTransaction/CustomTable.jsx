import React from 'react';
import { Table } from 'antd';
import { useDispatch } from 'react-redux';
import {
  changeSelectedRows,
  changeOrder,
} from '../../store/DriverDepositTransaction';
import { getListIdInArray, tt } from '../../utils';
import CustomEmptyForTable from '../../components/CustomEmptyForTable';

function CustomTable(props) {
  const { data, selectedRows, usageHeight } = props;
  const dispatch = useDispatch();

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
    getCheckboxProps: (record) => ({
      disabled: record?.status === 3 || record?.status === 4,
      // Column configuration not to be checked
      name: record.name,
    }),
  };

  // const handleOnChangeTable = (pagination, filters, sorter, extra) => {
  //   if (sorter) {
  //     let order = '';
  //     let sort = '';
  //     const { field } = sorter;
  //     switch (field) {
  //       case 'reference':
  //         order = 'reference';
  //         break;
  //       case 'driver_name':
  //         order = 'driver_name';
  //         break;
  //       case 'total_paid':
  //         order = 'total_paid';
  //         break;
  //       case 'driver_reference':
  //         order = 'driver_reference';
  //         break;
  //       case 'total_paid':
  //         order = 'total_paid';
  //         break;
  //       case 'status':
  //         order = 'status';
  //         break;
  //       case 'created_at':
  //         order = 'created_at';
  //         break;
  //       case 'confirmed_name':
  //         order = 'confirmed_name';
  //         break;
  //       default:
  //         order = '';
  //     }
  //     sort = sorter.order
  //       ? sorter.order === 'ascend'
  //         ? 'asc'
  //         : 'desc'
  //       : '';

  //     const dataToSend = { order, sort };
  //     dispatch(changeOrder(dataToSend));
  //   }
  // };

  const handleOnChangeTable = (pagination, filters, sorter, extra) => {
    if (sorter) {
      let order = '';
      let sort = '';

      const { field } = sorter;
      // case khong can sort default la case duoc phep sort
      order = field;
      // switch (field) {
      //   case 'wallet':
      //     order = 'point';
      //     break;
      //     // case 'title':
      //     //   order = 'title';
      //     //   break;
      //     // case 'total_point':
      //     //   order = 'total_point';
      //     //   break;
      //     // case 'quantity':
      //     //   order = 'quantity';
      //     //   break;
      //     // case 'point':
      //     //   order = 'point';
      //     //   break;

      //   default:
      //     order = field;
      // }
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
      className="ant_table_custom_padding"
      style={{ width: '100%', borderBottom: '1px solid #f0f0f0' }}
    >
      <Table
        rowClassName={(record, index) =>
          (index % 2 === 0 ? 'table-row-light' : 'table-row-dark')}
        rowSelection={{
          type: 'checkbox',
          ...rowSelection,
          hideSelectAll: true,
        }}
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
              description={tt('Không có dữ liệu')}
            />
          ),
        }}
        scroll={{
          y: `calc(100vh - 90px - ${usageHeight}px)`,
          x: 1650,
          // y: `calc(100vh - 50px - 33px - ${usageHeight}px)`, (50+33) -> 90 luon cho chan
        }}
        className="custom-table"
      />
    </div>
  );
}
export default CustomTable;
