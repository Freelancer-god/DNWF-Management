import React from 'react';
import { Empty } from 'antd';
import { tt } from '../utils';

function CustomEmpty() {
  return (
    <Empty style={{ marginBlock: 0 }} image={Empty.PRESENTED_IMAGE_SIMPLE} description={tt('Không có dữ liệu')} />
  );
}

export default CustomEmpty;
