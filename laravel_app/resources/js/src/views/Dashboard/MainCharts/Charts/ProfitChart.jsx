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
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';

import dayjs from 'dayjs';
import { tt } from '../../../../utils';
import { DASHBOARD_REFRESH_TIMEOUT, DASHBOARD_REPORT_TIME_TYPES, DASHBOARD_REPORT_TIME_TYPES_MAP } from '../../../../constants';
import { getTotalProfit } from '../../../../store/Dashboard/API';
import { formatMoneyVND } from '../../../../utils/fotmatMoney';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
);
function ProfitChart() {
  const [profitData, setProfitData] = React.useState({ labels: [], datasets: [] });
  const [type, setType] = React.useState(DASHBOARD_REPORT_TIME_TYPES.DAY.label);
  const [loading, setLoading] = React.useState(true);
  const [total, setTotal] = React.useState(0);

  const fetchData = async () => {
    setLoading(true);
    const rs = await getTotalProfit({ type: DASHBOARD_REPORT_TIME_TYPES_MAP[type] });

    if (rs) {
      let labels = [];
      if (type === DASHBOARD_REPORT_TIME_TYPES.DAY.label) {
        labels = rs?.graph_data?.labels ? rs?.graph_data?.labels.map((item) => `${dayjs(item).format('DD/MM')}`) : [];
      }
      if (type === DASHBOARD_REPORT_TIME_TYPES.MONTH.label) {
        labels = rs?.graph_data?.labels ? rs?.graph_data?.labels.map((item) => `${tt('Tháng')} ${item}`) : [];
      }

      setProfitData({
        labels,
        datasets: [
          {
            label: tt('Xe máy'),
            backgroundColor: `rgba(${getStyle('--cui-info-rgb')}, .1)`,
            borderColor: getStyle('--cui-info'),
            pointHoverBackgroundColor: getStyle('--cui-info'),
            borderWidth: 2,
            data: rs?.graph_data?.total_motor || [],
            fill: true,
          },
          {
            label: tt('Xe ô tô 4 chỗ'),
            backgroundColor: 'transparent',
            borderColor: getStyle('--cui-success'),
            pointHoverBackgroundColor: getStyle('--cui-success'),
            borderWidth: 2,
            data: rs?.graph_data?.total_oto_4 || [],
            fill: true,
          },
          {
            label: tt('Xe ô tô 7 chỗ'),
            backgroundColor: 'transparent',
            borderColor: getStyle('--cui-danger'),
            pointHoverBackgroundColor: getStyle('--cui-danger'),
            borderWidth: 2,
            data: rs?.graph_data?.total_oto_7 || [],
            fill: true,
          },
        ],
      });
      setTotal(rs?.total || 0);
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
            <h4 className="text-[rgba(37,43,54,0.95)] font-semibold text-[22px] mb-0">{tt('Doanh thu')}</h4>
            <div
              className="text-[13px]"
              style={{
                color: `${getStyle('--cui-secondary-color')}`,
              }}
            >
              {type === DASHBOARD_REPORT_TIME_TYPES.DAY.label ? `${tt('Tổng doanh thu của tháng này')}: ${formatMoneyVND(total)}`
                : `${tt('Tổng doanh thu của năm nay')}: ${formatMoneyVND(total)}`}
            </div>
          </div>
          <div className=" select-none">
            <Segmented
              options={[DASHBOARD_REPORT_TIME_TYPES.DAY.label,
                DASHBOARD_REPORT_TIME_TYPES.MONTH.label]}
              defaultValue={DASHBOARD_REPORT_TIME_TYPES.DAY.label}
              onChange={handleOnChange}
            />
          </div>
        </div>
        <div>
          <Bar
            style={{ height: '300px', marginTop: '20px' }}
            data={profitData}
            options={{
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false,
                },
              },
              scales: {
                x: {
                  grid: {
                    color: getStyle('--cui-border-color-translucent'),
                    drawOnChartArea: false,
                  },
                  ticks: {
                    color: getStyle('--cui-body-color'),
                  },
                },
                y: {
                  border: {
                    color: getStyle('--cui-border-color-translucent'),
                  },
                  grid: {
                    color: getStyle('--cui-border-color-translucent'),
                  },
                  ticks: {
                    beginAtZero: true,
                    color: getStyle('--cui-body-color'),
                    max: 250,
                    maxTicksLimit: 5,
                    stepSize: Math.ceil(250 / 5),
                  },
                },
              },
              elements: {
                line: {
                  tension: 0.4,
                },
                point: {
                  radius: 0,
                  hitRadius: 10,
                  hoverRadius: 4,
                  hoverBorderWidth: 3,
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default ProfitChart;
