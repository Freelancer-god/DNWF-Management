import React from 'react';
import { LoadingOutlined, MoreOutlined } from '@ant-design/icons';

function WidgetStats({
  color, title, value, chart, loading = false,
}) {
  return (
    <div className=" w-full ss:max-w-[50%] sm:max-w-[33.33%] md:max-w-[25%]  mt-[24px] px-[6px]  ">
      <div className="flex flex-col min-h-[163px] rounded-[6px] justify-between" style={{ backgroundColor: color }}>
        <div className="flex flex-row justify-between pt-[16px] px-[16px] text-white items-start   ">
          <div className="flex flex-col">
            <div>{value}</div>
            <div className="text-white">
              {title}
            </div>
          </div>
          { loading && <LoadingOutlined />}
          {/* <MoreOutlined className=" font-bold text-[18px] text-[white]" /> */}

        </div>
        <div>
          {chart && chart}
        </div>
      </div>

    </div>
  );
}

export default WidgetStats;
