import { Form, Input } from 'antd';
import React from 'react';
import { tt } from '../../utils';

function ChangePass({ form }) {
  return (
    <Form
      form={form}
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        remember: true,
      }}
      autoComplete="off"
      className="mt-[50px]"
    >

      <Form.Item
        label={tt('Mật khẩu cũ')}
        name="old_password"
        rules={[
          {
            required: true,
            message: tt('Nhập mật khẩu cũ'),
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        label={tt('Mật khẩu mới')}
        name="new_password"
        rules={[
          {
            required: true,
            message: tt('Nhập mật khẩu mới'),
          },
          ({ getFieldValue }) => ({
            validator(rule, new_password) {
              if (new_password.trim().length < 6) {
                return Promise.reject(
                  tt('Mật khẩu phải có độ dài lớn hơn hoặc bằng 6'),
                );
              }

              return Promise.resolve();
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        label={tt('Nhập lai mật khẩu')}
        name="new_password_reinput"
        rules={[
          {
            required: true,
            message: tt('Nhập mật lại khẩu mới'),
          },
          ({ getFieldValue }) => ({
            validator(rule, new_password_reinput) {
              if (
                getFieldValue(
                  'new_password',
                ) !== new_password_reinput
              ) {
                return Promise.reject(
                  tt('Nhập lại mật khẩu không trùng khớp'),
                );
              }
              return Promise.resolve();
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

    </Form>
  );
}

export default ChangePass;
