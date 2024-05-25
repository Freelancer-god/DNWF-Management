import React, { useEffect, useState } from 'react';
import {
  Button, DatePicker, Form, Input, Radio, Select,
} from 'antd';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import axios from 'axios';
import TextArea from 'antd/es/input/TextArea';
import { avatarFemaleDefault, avatarMaleDefault } from '../../../assets';
import PhotosViewer from '../../../components/PhotosViewer';
import { DRIVER_FORM_STATUS, PROFILE_MAP } from '../../../constants';
import { tt } from '../../../utils';

dayjs.extend(isSameOrAfter);

const { Option } = Select;
function DriverProfileForm({ record, form, submitedForms }) {
  const [driverProfile, setDriverProfile] = useState(null);
  const [driverPhoto, setDriverPhoto] = useState(null);
  const [resetValue, setResetValue] = useState({});
  const [statusType1, setStatusType1] = useState(null); // thong tin cccd
  const [statusType3, setStatusType3] = useState(null); // anh 3x4
  const [cover, setCover] = React.useState(record?.sex === 0 ? avatarFemaleDefault : avatarMaleDefault);
  useEffect(() => {
    if (submitedForms && submitedForms[PROFILE_MAP.CCCD]) {
      setDriverProfile(submitedForms[PROFILE_MAP.CCCD]);
    }
    if (submitedForms && submitedForms[PROFILE_MAP.ANH]) {
      setDriverPhoto(submitedForms[PROFILE_MAP.ANH]);
    }
  }, [submitedForms]);
  useEffect(() => {
    if (!driverProfile) return;
    const {
      citizen_identify, citizen_expire_date, citizen_issued_date,
      citizen_name, place_of_origin, place_of_residence, birth_date, sex,
    } = driverProfile.data;

    const fieldsValue = {
      citizen_identify,
      citizen_expire_date: citizen_expire_date ? new dayjs(citizen_expire_date) : null,
      citizen_issued_date: citizen_issued_date ? new dayjs(citizen_issued_date) : null,
      citizen_name,
      place_of_origin,
      place_of_residence,
      birth_date: birth_date ? new dayjs(birth_date) : null,
      sex: sex !== null ? `${sex}` : null,
      status_type_1: driverProfile.status,
      note_type_1: driverProfile?.notes,
      status_type_3: driverPhoto.status,

      note_type_3: driverPhoto?.notes,
    };

    form.setFieldsValue(fieldsValue);
    setResetValue(fieldsValue);
  }, [driverProfile, driverPhoto]);

  useEffect(() => {
    setStatusType1(null);
    setStatusType3(null);
  }, [record]);

  useEffect(() => {
    if (!driverPhoto || !driverPhoto.medias || driverPhoto.medias.length === 0) return;
    axios
      .get(driverPhoto.medias[0].path, {
        responseType: 'arraybuffer',
        headers: { Authorization: `Bearer ${document.getElementById('myToken')?.value}` },
      })
      .then((response) => {
        //   const u8 = new Uint8Array(response.data);
        const b64encoded = btoa([].reduce.call(new Uint8Array(response.data), (p, c) => p + String.fromCharCode(c), ''));
        const mimetype = 'image/jpeg';
        setCover(`data:${mimetype};base64,${b64encoded}`);
      });

    // const {
    //   citizen_identify, citizen_expire_date, citizen_issued_date,
    //   citizen_name, place_of_origin, place_of_residence, birth_date, sex,
    // } = driverProfile.data;

    // const fieldsValue = {
    //   citizen_identify,
    //   citizen_expire_date: citizen_expire_date ? new dayjs(citizen_expire_date) : null,
    //   citizen_issued_date: citizen_issued_date ? new dayjs(citizen_issued_date) : null,
    //   citizen_name,
    //   place_of_origin,
    //   place_of_residence,
    //   birth_date: birth_date ? new dayjs(birth_date) : null,
    //   sex: sex !== null ? `${sex}` : null,
    // };

    // form.setFieldsValue(fieldsValue);
    // setResetValue(fieldsValue);
  }, [driverPhoto]);
  // console.log('first', statusType1, statusType3);
  const renderConfirmRadio = () => (
    <>
      <Form.Item
        label={tt('Xác nhận ảnh')}
        name="status_type_3" // hinh anh
        rules={[
          {
            required: true,
            message: tt('Vui lòng xác nhận'),
          },
        ]}
      >
        <Radio.Group value={null} onChange={(e) => setStatusType3(e.target.value)} disabled={driverPhoto.status !== DRIVER_FORM_STATUS.NOT_VERIFIED}>
          <Radio value={DRIVER_FORM_STATUS.VERIFIED}>{tt('Hợp lệ')}</Radio>
          <Radio value={DRIVER_FORM_STATUS.DENINED}>{tt('Không hợp lệ')}</Radio>
        </Radio.Group>

      </Form.Item>
      {form.getFieldValue('status_type_3') === DRIVER_FORM_STATUS.DENINED && (
      <Form.Item
        label={tt('Lý do')}
        name="note_type_3"
        rules={[
          {
            required: true,
            message: tt('Vui lòng điền lý do'),
          },
        ]}
      >
        <TextArea rows={2} maxLength={200} placeholder={tt('Nhập lý do vì sao không hợp lệ')} allowClear disabled={driverPhoto.status !== DRIVER_FORM_STATUS.NOT_VERIFIED} />
      </Form.Item>
      )}

      <Form.Item
        label={tt('Xác nhận thông tin')}
        name="status_type_1" // can cuoc cong dan
        rules={[
          {
            required: true,
            message: tt('Vui lòng xác nhận'),
          },
        ]}
      >
        <Radio.Group value={null} onChange={(e) => setStatusType1(e.target.value)} disabled={driverProfile.status !== DRIVER_FORM_STATUS.NOT_VERIFIED}>
          <Radio value={DRIVER_FORM_STATUS.VERIFIED}>{tt('Hợp lệ')}</Radio>
          <Radio value={DRIVER_FORM_STATUS.DENINED}>{tt('Không hợp lệ')}</Radio>
        </Radio.Group>

      </Form.Item>

      {form.getFieldValue('status_type_1') === DRIVER_FORM_STATUS.DENINED && (
      <Form.Item
        label={tt('Lý do')}
        name="note_type_1"
        rules={[
          {
            required: true,
            message: tt('Vui lòng điền lý do'),
          },
        ]}
      >
        <TextArea rows={2} maxLength={200} placeholder={tt('Nhập lý do vì sao không hợp lệ')} allowClear disabled={driverProfile.status !== DRIVER_FORM_STATUS.NOT_VERIFIED} />
      </Form.Item>
      )}

    </>
  );

  const renderDriverProfile = () => (
    <>
      <Form.Item
        label={tt('Số CCCD')}
        name="citizen_identify"
        rules={[
          {
            required: form.getFieldValue('status_type_1') !== DRIVER_FORM_STATUS.DENINED,
            message: tt('Vui lòng điền số CCCD'),
          },
        ]}
      >
        <Input maxLength={20} placeholder={tt('Chưa cập nhật')} allowClear />
      </Form.Item>

      <Form.Item
        label={tt('Họ và tên')}
        name="citizen_name"
        rules={[
          {
            required: form.getFieldValue('status_type_1') !== DRIVER_FORM_STATUS.DENINED,
            message: tt('Vui lòng điền họ và tên'),
          },
        ]}
      >
        <Input maxLength={50} placeholder={tt('Chưa cập nhật')} allowClear />
      </Form.Item>

      <Form.Item
        label={tt('Ngày sinh')}
        name="birth_date"
        rules={[
          {
            required: form.getFieldValue('status_type_1') !== DRIVER_FORM_STATUS.DENINED,
            message: tt('Vui lòng chọn ngày sinh'),
          },
        ]}
      >
        <DatePicker
          style={{ width: '100%' }}
          placeholder={tt('Chưa cập nhật')}
          format="DD/MM/YYYY"
          de
          disabledDate={(selectedDate) => {
            // Ngày hiện tại
            const currentDate = dayjs();

            // So sánh bằng cách kiểm tra xem ngày hiện tại
            // có trước ngày cụ thể 18 năm hay không
            return !currentDate.isSameOrAfter(selectedDate.add(18, 'year'));
          }}
        />
      </Form.Item>

      <Form.Item
        label={tt('Giới tính')}
        name="sex"
        rules={[
          {
            required: form.getFieldValue('status_type_1') !== DRIVER_FORM_STATUS.DENINED,
            message: tt('Vui lòng chọn giới tính'),
          },
        ]}
      >
        <Select placeholder={tt('Chưa cập nhật')}>
          <Option value="0">{tt('Nữ')}</Option>
          <Option value="1">{tt('Nam')}</Option>
          {/* <Option value="other">Other</Option> */}
        </Select>
      </Form.Item>

      <Form.Item
        label={tt('Quê quán')}
        name="place_of_origin"
        rules={[
          {
            required: form.getFieldValue('status_type_1') !== DRIVER_FORM_STATUS.DENINED,
            message: tt('Vui lòng điền quê quán'),
          },
        ]}
      >
        <Input maxLength={100} placeholder={tt('Chưa cập nhật')} allowClear />
      </Form.Item>
      <Form.Item
        label={tt('Nơi thường trú')}
        name="place_of_residence"
        rules={[
          {
            required: form.getFieldValue('status_type_1') !== DRIVER_FORM_STATUS.DENINED,
            message: tt('Vui lòng điền nơi thường trú'),
          },
        ]}
      >
        <Input maxLength={100} placeholder={tt('Chưa cập nhật')} allowClear />
      </Form.Item>

      <Form.Item
        label={tt('Ngày cấp ')}
        name="citizen_issued_date"
        rules={[
          {
            required: form.getFieldValue('status_type_1') !== DRIVER_FORM_STATUS.DENINED,
            message: tt('Vui lòng chọn ngày cấp '),
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (getFieldValue('citizen_expire_date') !== null && value > getFieldValue('citizen_expire_date')) {
                return Promise.reject(tt('Ngày ngày cấp phải trước ngày hết hạn '));
              }
              return Promise.resolve();
            },
          }),
        ]}
      >
        <DatePicker
          style={{ width: '100%' }}
          placeholder={tt('Chưa cập nhật')}
          format="DD/MM/YYYY"
        />
      </Form.Item>

      <Form.Item
        label={tt('Ngày hết hạn ')}
        name="citizen_expire_date"
        rules={[
          {
            required: form.getFieldValue('status_type_1') !== DRIVER_FORM_STATUS.DENINED,
            message: tt('Vui lòng chọn ngày hết hạn '),
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (value < getFieldValue('citizen_issued_date')) {
                return Promise.reject(tt('Ngày hết hạn phải sau ngày cấp ')); // The validator should always return a promise on both success and error
              }
              return Promise.resolve();
            },
          }),
        ]}
      >
        <DatePicker
          style={{ width: '100%' }}
          placeholder={tt('Chưa cập nhật')}
          format="DD/MM/YYYY"
        />
      </Form.Item>
    </>
  );

  return (
    <div className="flex gap-[10px] mt-[20px]">
      <div className="flex flex-col">
        <div className="flex flex-wrap items-start w-[150px] justify-center">
          <img
            alt="photos"
            src={cover}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = record?.sex === 0 ? avatarFemaleDefault : avatarMaleDefault;
            }}
            className="aspect-[3/4] max-w-[100px] object-cover bg-white rounded-[3px] border-solid border-[1px] border-gray-300"
          />

        </div>
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
            {driverProfile && renderDriverProfile()}

            <div className="mt-[50px]" />
            { driverPhoto && driverProfile && renderConfirmRadio()}

          </Form>
          <div className="overflow-hidden relative">
            {driverPhoto && (<PhotosViewer photos={driverPhoto?.medias} />)}
            {driverProfile && (<PhotosViewer photos={driverProfile?.medias} />)}
          </div>
        </div>
      </div>

    </div>
  );
}

export default DriverProfileForm;
