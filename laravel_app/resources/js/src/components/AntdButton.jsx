import { Button, ConfigProvider } from 'antd';
import React from 'react';

function AntdButton({ colorPrimary = '#00b96b', ...props }) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary,
        },
      }}
    >
      <Button {...props}>
        {props.children}
      </Button>
    </ConfigProvider>
  );
}

export default AntdButton;
