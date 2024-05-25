import React from 'react';
import { Form, Tag, Tooltip } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { tt } from '../../../utils';
import { TRIP_STATUS_MAP_W_COLOR, VEHICLE_MAP_W_COLOR } from '../../../constants';
import { formatMoneyVND } from '../../../utils/fotmatMoney';

function CancelForm({ trip, form }) {
  const {
    trip_location, reference, trip_vehicle_types, total_distance, total_duration, total_paid,
    driver_reference, driver_name, driver_phone, passenger_reference, passenger_name, passenger_phone, status,
  } = trip;
  return (
    <div className="flex flex-col mt-[20px]">

      <div className=" whitespace-normal">
        <div title={reference}>
          <span className=" font-semibold">{tt('Mã chuyến: ')}</span>
          <span className="text-[#7d7d7d]">{`${reference}`}</span>
        </div>
        <div title={trip_location[0].address}>
          <span className=" font-semibold">{tt('Từ: ')}</span>
          <span className="text-[#7d7d7d]">{`${trip_location[0].address}`}</span>
        </div>
        <div title={trip_location[1].address}>
          <span className=" font-semibold">{tt('Đến: ')}</span>
          <span className="text-[#7d7d7d]">{`${trip_location[1].address}`}</span>
        </div>

        <div title={trip_vehicle_types && trip_vehicle_types.length === 1 ? VEHICLE_MAP_W_COLOR[trip_vehicle_types[0].vehicle_type_id].text : tt('Chưa cập nhật')}>
          <span className=" font-semibold">{tt('Loại xe: ')}</span>
          <span className="text-[#7d7d7d]">{`${trip_vehicle_types && trip_vehicle_types.length === 1 ? VEHICLE_MAP_W_COLOR[trip_vehicle_types[0].vehicle_type_id].text : tt('Chưa cập nhật')}`}</span>
        </div>
        <div>
          <span className=" font-semibold">{tt('Quãng đường: ')}</span>
          <span className="text-[#7d7d7d]">{total_distance ? `${parseFloat(total_distance) / 1000} km` : <Tag />}</span>
        </div>
        <div>
          <span className=" font-semibold">{tt('Thời gian: ')}</span>
          <span className="text-[#7d7d7d]">{total_duration ? `${Math.floor(parseFloat(total_duration) / 60)} phút` : <Tag />}</span>
        </div>
        <div>
          <span className=" font-semibold">{tt('Giá: ')}</span>
          <span className="text-[#7d7d7d]">{total_paid ? `${formatMoneyVND(total_paid)}` : <Tag />}</span>
        </div>
        <div>
          <span className=" font-semibold">{tt('Mã tài xế: ')}</span>
          <span className="text-[#7d7d7d]">{driver_reference ? `${driver_reference}` : <Tag />}</span>
        </div>
        <div>
          <span className=" font-semibold">{tt('Tên tài xế: ')}</span>
          <span className="text-[#7d7d7d]">{driver_name ? `${driver_name}` : <Tag />}</span>
        </div>
        <div>
          <span className=" font-semibold">{tt('SĐT tài xế: ')}</span>
          <span className="text-[#7d7d7d]">{driver_phone ? `${driver_phone}` : <Tag />}</span>
        </div>
        <div>
          <span className=" font-semibold">{tt('Mã hành khách: ')}</span>
          <span className="text-[#7d7d7d]">{passenger_reference ? `${passenger_reference}` : <Tag />}</span>
        </div>
        <div>
          <span className=" font-semibold">{tt('Tên hành khách: ')}</span>
          <span className="text-[#7d7d7d]">{passenger_name ? `${passenger_name}` : <Tag />}</span>
        </div>
        <div>
          <span className=" font-semibold">{tt('SĐT hành khách: ')}</span>
          <span className="text-[#7d7d7d]">{passenger_phone ? `${passenger_phone}` : <Tag />}</span>
        </div>
        <div>
          <span className=" font-semibold">{tt('Trạng thái: ')}</span>

          <Tooltip title={TRIP_STATUS_MAP_W_COLOR[status].description}>
            <Tag color={TRIP_STATUS_MAP_W_COLOR[status].color}>
              {TRIP_STATUS_MAP_W_COLOR[status].text}
            </Tag>
          </Tooltip>

        </div>
        <Form
          form={form}
          name="wrap"
          labelCol={{
            flex: '60px',
          }}
          labelAlign="left"
          labelWrap
          wrapperCol={{
            flex: 1,
          }}
          colon
          style={{
            maxWidth: 700,
            minWidth: 500,
            marginTop: 20,
          }}
        >
          <Form.Item
            label={<span className=" font-semibold">{tt('Lý do')}</span>}
            name="notes"
            rules={[
              {
                required: true,
                message: tt('Vui lòng điền lý do'),
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  // if (value?.length > 1 && value?.trim() === '') return Promise.reject(tt('Vui lòng điền thông tin độ dài ít nhất là 2 ký tự'));
                  if (value?.length > 0 && value?.trim().length < 9) return Promise.reject(tt('Vui lòng điền thông tin độ dài ít nhất là 9 ký tự'));
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <TextArea rows={3} maxLength={300} placeholder={tt('Nhập lý do vì sao huỷ')} allowClear />
          </Form.Item>
        </Form>

      </div>
    </div>
  );
}

export default CancelForm;
