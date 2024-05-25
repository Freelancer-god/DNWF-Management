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
import { Bar, Line } from 'react-chartjs-2';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import WidgetStats from './WidgetStats';
import { formatNumber, tt } from '../../../../utils';
import {
  getTotalDrivers, getTotalIncome, getTotalTrips, getTotalUsers,
} from '../../../../store/Dashboard/API';
import { DASHBOARD_REFRESH_TIMEOUT } from '../../../../constants';
import { nFormatter } from '../../../../utils/formatNumber';
import { percentChange } from '../../../../utils/percentChange';
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
function WidgetStatsIncome() {
  const [incomeData, setIncomeData] = React.useState({ labels: [], datasets: [] });
  const [loading, setLoading] = React.useState(true);
  const [total, setTotal] = React.useState(0);
  const [percChange, setPercChange] = React.useState(0);
  const [max, setMax] = React.useState(0);
  const [min, setMin] = React.useState(0);
  const fetchData = async () => {
    setLoading(true);
    const rs = await getTotalIncome();
    if (rs) {
      const labels = rs?.graph_data?.labels ? rs?.graph_data?.labels.map((item) => `${dayjs(item).format('DD/MM/YYYY')}`) : [];

      setIncomeData({
        labels,
        datasets: [
          {
            label: tt('Doanh thu ngày'),
            backgroundColor: 'rgba(255,255,255,.2)',
            borderColor: 'rgba(255,255,255,.55)',
            barPercentage: 0.6,
            data: rs?.graph_data?.total_paids || [],
          },
        ],
      });

      setTotal(rs?.total || 0);

      setMax(Math.max(...rs?.graph_data?.total_paids || [0]));
      setMin(Math.min(...rs?.graph_data?.total_paids || [0]));
      setPercChange(percentChange([(rs?.total_previous || 0),
        (rs?.total || 0)]).toFixed(1));
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
      color="rgb(229, 83, 83)"
      title={tt('Tổng doanh thu trong tháng')}
      loading={loading}
      action={(
        <span className="fs-6 fw-normal">
          test
        </span>
          )}
      value={(
        <>
          <span className="text-[23px] font-semibold">
            {formatMoneyVND(total)}
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
        <Bar
          className="mt-3 mx-3"
          style={{ height: '70px' }}
          data={incomeData}
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
                  display: false,
                  drawTicks: false,
                },
                ticks: {
                  display: false,
                },
              },
              y: {
                border: {
                  display: false,
                },
                grid: {
                  display: false,
                  drawBorder: false,
                  drawTicks: false,
                },
                ticks: {
                  display: false,
                },
              },
            },
          }}
        />
          )}
    />
  );
}

export default WidgetStatsIncome;
