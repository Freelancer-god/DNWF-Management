import React, { useEffect } from 'react';
import { MoreOutlined } from '@ant-design/icons';
import { Segmented } from 'antd';
import { random } from 'lodash';
import { getStyle } from '@coreui/utils';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Pie, Line } from 'react-chartjs-2';

import dayjs from 'dayjs';
import { tt } from '../../../../utils';
import { DASHBOARD_REFRESH_TIMEOUT, DASHBOARD_REPORT_TIME_TYPES, DASHBOARD_REPORT_TIME_TYPES_MAP } from '../../../../constants';
import { getTotalRatingReport } from '../../../../store/Dashboard/API';

ChartJS.register(
  CategoryScale,
  LinearScale,
  ArcElement,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
);
function RatingChart() {
  const [ratingData, setRatingData] = React.useState({ labels: [], datasets: [] });
  const [type, setType] = React.useState(DASHBOARD_REPORT_TIME_TYPES.MONTH.label);
  const [loading, setLoading] = React.useState(true);
  const [total, setTotal] = React.useState(0);

  const fetchData = async () => {
    setLoading(true);
    const rs = await getTotalRatingReport({ type: DASHBOARD_REPORT_TIME_TYPES_MAP[type] });

    if (rs) {
      const labels = [tt('Đánh giá tích cực'), tt('Đánh giá tiêu cực')];
      setRatingData({
        labels,
        datasets: [
          {
            data: rs?.graph_data?.data || [],
            backgroundColor: [`${getStyle('--cui-success')}`, `${getStyle('--cui-danger')}`],
            hoverBackgroundColor: [`${getStyle('--cui-success')}`, `${getStyle('--cui-danger')}`],
          },

        ],
      });
      setTotal((rs?.graph_data?.data || []).reduce((a, b) => a + b));
    }
    setLoading(false);
  };
  useEffect(() => {
    // goi api de lay thong tin report

    // Gọi hàm fetchData
    fetchData();

    // set interval cho no 30s reload mot lan
    const myInterval = setInterval(fetchData, DASHBOARD_REFRESH_TIMEOUT);

    return () => {
      clearInterval(myInterval);
    };
  }, [type]);
  const handleOnChange = (value) => {
    setType(value);
  };

  return (
    <div className=" w-full   md:max-w-[50%]  mt-[24px] px-[6px] flex flex-col  ">
      <div className="flex flex-col min-h-[163px] rounded-[3px] justify-between border-[1px] border-solid border-[#d4d4d4] px-[20px] pb-[20px]" style={{ backgroundColor: 'white' }}>
        <div className="flex flex-row justify-between mt-[20px]">
          <div className="flex flex-col">
            <h4 className="text-[rgba(37,43,54,0.95)] font-semibold text-[22px] mb-0">{tt('Đánh giá tài xế')}</h4>
            <div
              className="text-[13px]"
              style={{
                color: `${getStyle('--cui-secondary-color')}`,
              }}
            >
              {type === DASHBOARD_REPORT_TIME_TYPES.DAY.label && `${tt('Tổng số đánh giá ngày hôm nay')}: ${total}`}
              {type === DASHBOARD_REPORT_TIME_TYPES.MONTH.label && `${tt('Tổng số đánh giá tháng này')}: ${total}`}
              {type === DASHBOARD_REPORT_TIME_TYPES.YEAR.label && `${tt('Tổng số đánh giá năm nay')}: ${total}`}
            </div>
          </div>
          <div className=" select-none">
            <Segmented
              options={[DASHBOARD_REPORT_TIME_TYPES.DAY.label,
                DASHBOARD_REPORT_TIME_TYPES.MONTH.label, DASHBOARD_REPORT_TIME_TYPES.YEAR.label]}
              defaultValue={DASHBOARD_REPORT_TIME_TYPES.MONTH.label}
              onChange={handleOnChange}
            />
          </div>
        </div>
        <div>
          <Pie
            style={{ height: '150px', marginTop: '20px' }}
            data={ratingData}
          />
        </div>
      </div>
    </div>
  );
}

export default RatingChart;
