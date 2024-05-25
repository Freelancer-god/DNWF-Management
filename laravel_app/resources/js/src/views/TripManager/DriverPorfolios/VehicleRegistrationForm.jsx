/* eslint-disable camelcase */
/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import {
  Button, DatePicker, Form, Input, InputNumber, Radio, Select,
} from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import axios from 'axios';
import TextArea from 'antd/es/input/TextArea';
import { avatarFemaleDefault, avatarMaleDefault } from '../../../assets';
import PhotosViewer from '../../../components/PhotosViewer';
import { DRIVER_FORM_STATUS, VEHICLE_INFOMATION_TYPE } from '../../../constants';
import { clog, tt } from '../../../utils';
import { getVehicleBranchList, getVehicleModelList } from '../../../store/DriverManager/API';

dayjs.extend(isSameOrAfter);

const { Option } = Select;
function VehicleRegistrationForm({ record, form, submitedForms }) {
  const [vehicleRegistration, setVehicleRegistration] = useState(null);
  // const [vehiclePhoto, setVehiclePhoto] = useState(null);
  // const [vehicleInsure, setVehicleInsure] = useState(null);
  const [resetValue, setResetValue] = useState({});
  // const [statusType1, setStatusType1] = useState(null); // thong tin DKX
  // const [statusType2, setStatusType2] = useState(null); // HAX 3x4
  const [statusType4, setStatusType4] = useState(null); // thong tin BHTNDS
  // const [vehicleBrandList, setVehicleBrandList] = useState([]);
  // const [vehicleModelList, setVehicleModelList] = useState([]);
  // const [cover, setCover] = React.useState(record?.is_owner === 0 ? avatarFemaleDefault : avatarMaleDefault);
  useEffect(() => {
    if (submitedForms && submitedForms[VEHICLE_INFOMATION_TYPE.GCNDK]) {
      setVehicleRegistration(submitedForms[VEHICLE_INFOMATION_TYPE.GCNDK]);
    }
    // if (submitedForms && submitedForms[VEHICLE_INFOMATION_TYPE.HAX]) {
    //   setVehiclePhoto(submitedForms[VEHICLE_INFOMATION_TYPE.HAX]);
    // }
    // if (submitedForms && submitedForms[VEHICLE_INFOMATION_TYPE.BHBBTNDS]) {
    //   setVehicleInsure(submitedForms[VEHICLE_INFOMATION_TYPE.BHBBTNDS]);
    // }
  }, [submitedForms]);
  useEffect(() => {
    if (!vehicleRegistration) return;
    // const {
    //   registration_certificate, vehicle_brand_id, vehicle_type_id, vehicle_brand_model_id, model_name,
    //   color, engine_number, frame_number, license_plates, is_owner, model_years, brand_name, type_name,
    // } = vehicleRegistration.data;
    // const {
    //   insurance_civil_accident_date, insurance_civil_accident_price,
    // } = vehicleInsure.data;

    const fieldsValue = {

      status_type_4: vehicleRegistration.status,

      note_type_4: vehicleRegistration?.notes,
    };

    form.setFieldsValue(fieldsValue);
    setResetValue(fieldsValue);
  }, [vehicleRegistration]);
  clog('vehicleRegistration', form.getFieldsValue());

  const renderConfirmRadio = () => (
    <>

      <Form.Item
        label={tt('Xác nhận thông tin')}
        name="status_type_4" // thông tin giấy tờ xe
        rules={[
          {
            required: true,
            message: tt('Vui lòng xác nhận'),
          },
        ]}
      >
        <Radio.Group value={null} disabled={vehicleRegistration.status !== DRIVER_FORM_STATUS.NOT_VERIFIED} onChange={(e) => setStatusType4(e.target.value)}>
          <Radio value={DRIVER_FORM_STATUS.VERIFIED}>{tt('Hợp lệ')}</Radio>
          <Radio value={DRIVER_FORM_STATUS.DENINED}>{tt('Không hợp lệ')}</Radio>
        </Radio.Group>

      </Form.Item>

      {form.getFieldValue('status_type_4') === DRIVER_FORM_STATUS.DENINED && (
        <Form.Item
          label={tt('Lý do')}
          name="note_type_4"
          rules={[
            {
              required: true,
              message: tt('Vui lòng điền lý do'),
            },
          ]}
        >
          <TextArea rows={2} maxLength={200} placeholder={tt('Nhập lý do vì sao không hợp lệ')} allowClear disabled={vehicleRegistration.status !== DRIVER_FORM_STATUS.NOT_VERIFIED} />
        </Form.Item>
      )}

    </>
  );

  return (
    <div className="flex gap-[10px] mt-[20px]">
      <div className="flex flex-col">
        {/* <div className="flex flex-wrap items-start w-[150px] justify-center">
          <img
            alt="photos"
            src={cover}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = record?.is_owner === 0 ? avatarFemaleDefault : avatarMaleDefault;
            }}
            className="aspect-[3/4] max-w-[100px] object-cover bg-white rounded-[3px] border-solid border-[1px] border-gray-300"
          />

        </div> */}
        <div className="mt-[20px] flex flex-wrap md:flex-nowrap items-start gap-[10px]">
          <Form
            initialValues={resetValue}
            form={form}
            name="wrap"
            labelCol={{
              flex: '150px',
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
            }}
          >

            <div className="mt-[50px]" />
            { vehicleRegistration && renderConfirmRadio()}

          </Form>
          <div className="overflow-hidden relative">
            {vehicleRegistration && (<PhotosViewer photos={vehicleRegistration?.medias} />)}

          </div>
        </div>
      </div>

    </div>
  );
}

export default VehicleRegistrationForm;
