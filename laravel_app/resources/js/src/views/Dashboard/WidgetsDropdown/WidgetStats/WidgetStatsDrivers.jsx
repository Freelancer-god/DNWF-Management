/* eslint-disable no-plusplus */
import React, { useEffect } from 'react';
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
import { Line } from 'react-chartjs-2';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import WidgetStats from './WidgetStats';
import { formatNumber, tt } from '../../../../utils';
import { getTotalDrivers, getTotalUsers } from '../../../../store/Dashboard/API';
import { DASHBOARD_REFRESH_TIMEOUT } from '../../../../constants';
import { nFormatter } from '../../../../utils/formatNumber';
import { percentChange } from '../../../../utils/percentChange';

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
function WidgetStatsDrivers() {
  const [userData, setUserData] = React.useState({ labels: [], datasets: [] });
  const [loading, setLoading] = React.useState(true);
  const [total, setTotal] = React.useState(0);
  const [percChange, setPercChange] = React.useState(0);
  const [max, setMax] = React.useState(0);
  const [min, setMin] = React.useState(0);
  const fetchData = async () => {
    setLoading(true);
    const rs = await getTotalDrivers();
    if (rs) {
      const labels = [];
      // Tao nhan cho label la cac gia tri theo thang. Tinh tu dau nam den thang hien tai
      for (let i = 1; i <= new Date().getMonth() + 1; i++) {
        labels.push(`${tt('Tháng')} ${i}`);
      }

      setUserData({
        labels,
        datasets: [
          {
            label: tt('Số tài xế mới'),
            backgroundColor: 'transparent',
            borderColor: 'rgba(255,255,255,.55)',
            pointBackgroundColor: 'rgba(255,255,255,.55)',
            data: rs?.by_month?.datas || [],
          },
        ],
      });
      setTotal(rs?.total_active || 0);

      setMax(Math.max(...rs?.by_month?.datas || [0]));
      setMin(Math.min(...rs?.by_month?.datas || [0]));
      setPercChange(percentChange(rs?.by_month?.datas || [0, 0]).toFixed(1));
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
  }, []);

  return (
    <WidgetStats
      color="rgb(51, 153, 255)"
      title={tt('Tổng số tài xế')}
      loading={loading}
      action={(
        <span className="fs-6 fw-normal">
          test
        </span>
          )}
      value={(
        <>
          <span className="text-[23px] font-semibold">
            {nFormatter(total, 2)}
          </span>

          {' '}
          <span className="fs-6 fw-normal">
            (
            {`${percChange}%`}
            {' '}
            {parseInt(percChange, 16) === 0.0 ? '' : (parseInt(percChange, 16) > 0 ? <ArrowUpOutlined style={{ color: 'green' }} /> : <ArrowDownOutlined style={{ color: 'red' }} />)}
            {/* <CIcon icon={cilArrowBottom} /> */}
            )
          </span>
        </>
          )}
      chart={(
        <Line
            // ref={widgetChartRef1}
          className="mt-3 mx-3"
          style={{ height: '70px' }}
          data={userData}
          options={{
            plugins: {
              legend: {
                display: false,
              },
            },
            maintainAspectRatio: false,
            scales: {
              x: {
                border: {
                  display: false,
                },
                grid: {
                  display: false,
                  drawBorder: false,
                },
                ticks: {
                  display: false,
                },
              },
              y: {
                min: min - 2,
                max: max + 2,
                display: false,
                grid: {
                  display: false,
                },
                ticks: {
                  display: false,
                },
              },
            },
            elements: {
              line: {
                borderWidth: 1,
                tension: 0.4,
              },
              point: {
                radius: 2,
                hitRadius: 10,
                hoverRadius: 4,
              },
            },
          }}
        />
          )}
    />
  );
}

export default WidgetStatsDrivers;
