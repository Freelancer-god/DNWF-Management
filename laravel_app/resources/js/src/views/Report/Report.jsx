import React from 'react';
import { Breadcrumb } from 'antd';
import { tt } from '../../utils';

function Report() {
  const breadcrumbItem = [
    {
      title: tt('Báo cáo'),
    },
  ];

  return (
    <div style={{ width: '100%' }}>
      <div style={{ padding: '10px' }}>
        <div className="bp450:grid bp450:grid-cols-2 bp450:gap-4 mb-1.5" style={{ height: '32px' }}>
          <div>
            <div className="ant-breadcrumb_custom_fontsize">
              <Breadcrumb items={breadcrumbItem} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Report;
