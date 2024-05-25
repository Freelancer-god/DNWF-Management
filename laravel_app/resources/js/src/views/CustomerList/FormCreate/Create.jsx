/* eslint-disable no-template-curly-in-string */
/* eslint-disable no-shadow */
/* eslint-disable max-len */

import {
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Spin,
  Switch,
  Tooltip,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ReactQuill from 'react-quill';
import { clog, tt } from '../../../utils';
import { spinnerCreate } from '../../../store/CustomerList';
import 'react-quill/dist/quill.snow.css';
import SelectWithSearch from '../../../components/SelectWithSearch/SelectWithSearch';

function Create(props) {
  const { data, onChangeData, form } = props;
  const _spinner = useSelector(spinnerCreate);
  const [_id, setId] = useState(data._id);
  const [_name, setName] = useState(data._name);
  const [_email, setEmail] = useState(data._email);
  const [_username, setUsername] = useState(data._username);
  const [_status, setStatus] = useState(data._status);
  const [_roleId, setRoleId] = useState(data._roleId);
  const [_role, setRole] = useState(data._role);
  const [password, setPassword] = useState('');

  //   const handleOnChangeValue = (e) => setValue(e.target.value);

  const handleOnChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleOnchangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleOnChangeStatus = (checked) => {
    setStatus(checked ? 1 : 0);
  };

  useEffect(() => {
    if (data) {
      const {
        _id, _name, _email, _username, _status, _roleId,
      } = data;
      setId(_id);
      setName(_name);
      setEmail(_email);
      setStatus(_status);
      setUsername(_username);
      setRoleId(_roleId);
    }
  }, [data]);

  const dataToSend = {
    _name,
    _email,
    _status,
    _username,
    _roleId,
    password: password || null,
  };

  // useEffect(() => {
  //     // for control
  //     handleOnChangeData(dataToSend);
  // }, [_id, _name, _email, _status]);

  const handleOnChangeData = (dataToSend) => {
    onChangeData(dataToSend);
  };

  useEffect(() => {
    // for form
    form.setFieldValue('_name', _name);
    form.setFieldValue('_email', _email);
    form.setFieldValue('_status', _status);
    form.setFieldValue('_username', _username);
    form.setFieldValue('password', password);
    form.setFieldValue('_roleId', _roleId);
    // for control
    handleOnChangeData(dataToSend);
  }, [_name, _email, _status, _username, password, _roleId]);

  const validateMessages = {
    required: `${tt('Nhập')} ${'${label}'}`,
  };

  const handleOnChangePassword = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    // Kiểm tra xem giá trị nhập lại mật khẩu có trùng khớp với mật khẩu không
    form.validateFields(['_passwordConfirm']);
  };

  // Custom validator để kiểm tra trùng khớp
  const validatePasswordConfirm = (_, value) => {
    if (value && value !== password) {
      return Promise.reject(
        new Error('Mật khẩu nhập lại không trùng khớp'),
      );
    }
    return Promise.resolve();
  };

  const handleFormatRoleSearchData = (data) => {
    const array = [];
    for (const i of data) {
      array.push({
        id: i.id,
        value: i.id,
        label: i.display_name || i.name || i.label,
      });
    }
    return array;
  };

  const handleOnChangeSelectRole = (value) => {
    setRoleId(value);
  };

  return (
    <div>
      <Spin tip="Đang tải..." size="large" spinning={_spinner}>
        <Form
          labelCol={{ span: 8 }}
          layout="horizontal"
          form={form}
          validateMessages={validateMessages}
        >
          <Form.Item
            shouldUpdate
            className="mb-2"
            label={tt('Tên khách hàng')}
            name="_name"
            rules={[{ required: true }]}
          >
            <Input
              id="name"
                            // className="w-full p-2 rounded"
              maxLength={50}
              value={_name}
              onChange={handleChangeName}
            />
          </Form.Item>
          <Form.Item
            shouldUpdate
            className="mb-2"
            label={tt('Tên đăng nhập')}
            name="_username"
            rules={[{ required: true }]}
          >
            <Input
              id="username"
                            // className="w-full p-2 rounded"
              maxLength={50}
              value={_username}
              onChange={handleOnchangeUsername}
            />
          </Form.Item>
          <Form.Item
            shouldUpdate
            className="mb-2"
            label={tt('Email')}
            name="_email"
            rules={[
              { required: true },
              {
                type: 'email',
                message: 'Email không hợp lệ',
              },
            ]}
          >
            <Input
              id="email"
                            // className="w-full p-2 rounded"
              maxLength={50}
              value={_email}
              onChange={handleOnChangeEmail}
            />
          </Form.Item>
          <Form.Item
            className="mb-2"
            label={tt('Vai trò')}
            name="_roleId"
            rules={[{ required: true }]}
          >
            <SelectWithSearch
                            // mode="multiple"
              placeholder={tt('Chọn')}
              selected={_role}
              onChangSelect={handleOnChangeSelectRole}
              formatFunction={handleFormatRoleSearchData}
              API="api/v1/roles/search"
              filter={{ status: 1 }}
            />
          </Form.Item>
          <Form.Item
            shouldUpdate
            className="mb-2"
            label={tt('Mật khẩu')}
            name="password"
            rules={[
              // {
              //     required: true,
              //     message: "Vui lòng nhập mật khẩu",
              // },
              {
                min: 6,
                message: 'Mật khẩu phải ít nhất 6 ký tự',
              },
            ]}
          >
            <Input
              id="password"
              type="password"
                            // className="w-full p-2 rounded"
              maxLength={50}
              onChange={handleOnChangePassword}
            />
          </Form.Item>
          <Form.Item
            shouldUpdate
            className="mb-2"
            label={tt('Nhập lại mật khẩu')}
            name="_passwordConfirm"
            rules={[
              // {
              //     required: true,
              //     message: "Vui lòng nhập lại mật khẩu",
              // },
              { validator: validatePasswordConfirm },
            ]}
          >
            <Input
              id="passwordConfirm"
              type="password"
                            // className="w-full p-2 rounded"
              maxLength={50}
            />
          </Form.Item>

          <Form.Item
            shouldUpdate
            className="mb-2"
            label={tt('Trạng thái')}
            name="_status"
            rules={[{ required: true }]}
          >
            <Switch
              checkedChildren={tt('Hoạt động')}
              unCheckedChildren={tt('Ngưng hoạt động')}
              checked={_status === 1}
              value={_status === 1}
              onChange={handleOnChangeStatus}
            />
          </Form.Item>
        </Form>
      </Spin>
    </div>
  );
}

export default Create;
