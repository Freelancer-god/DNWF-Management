import React from 'react';
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

import { tt } from '../../../utils';
import ProfitChart from './Charts/ProfitChart';
import TripChart from './Charts/TripChart';
import RatingChart from './Charts/RatingChart';

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

function MainCharts({
  color, title, value, chart,
}) {
  return (
    <div className="flex flex-wrap  ">
      <ProfitChart />
      <TripChart />
      <RatingChart />
    </div>
  );
}

// function ChartContainer({
//   color = 'white',
//   children,
//   title = '',
//   subTitle = '',
// }) {
//   return (
//     <div className=" w-full   md:max-w-[50%]  mt-[24px] px-[6px] flex flex-col  ">
//       <div className="flex flex-col min-h-[163px] rounded-[3px] justify-between border-[1px] border-solid border-[#d4d4d4] px-[20px] pb-[20px]" style={{ backgroundColor: 'white' }}>
//         <div className="flex flex-row justify-between mt-[20px]">
//           <div className="flex flex-col">
//             <h4 className="text-[rgba(37,43,54,0.95)] font-semibold text-[22px] mb-0">{title}</h4>
//             <div
//               className="text-[13px]"
//               style={{
//                 color: `${getStyle('--cui-secondary-color')}`,
//               }}
//             >
//               {subTitle}
//             </div>
//           </div>
//           <div className=" select-none">
//             <Segmented options={[tt('Ngày'), tt('Tháng'), tt('Năm')]} defaultValue={tt('Tháng')} />
//           </div>
//         </div>
//         <div>
//           <Bar
//             style={{ height: '300px', marginTop: '20px' }}
//             data={{
//               labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
//               datasets: [
//                 {
//                   label: 'My First dataset',
//                   backgroundColor: `rgba(${getStyle('--cui-info-rgb')}, .1)`,
//                   borderColor: getStyle('--cui-info'),
//                   pointHoverBackgroundColor: getStyle('--cui-info'),
//                   borderWidth: 2,
//                   data: [
//                     random(50, 200),
//                     random(50, 200),
//                     random(50, 200),
//                     random(50, 200),
//                     random(50, 200),
//                     random(50, 200),
//                     random(50, 200),
//                   ],
//                   fill: true,
//                 },
//                 //   {
//                 //     label: 'My Second dataset',
//                 //     backgroundColor: 'transparent',
//                 //     borderColor: getStyle('--cui-success'),
//                 //     pointHoverBackgroundColor: getStyle('--cui-success'),
//                 //     borderWidth: 2,
//                 //     data: [
//                 //       random(50, 200),
//                 //       random(50, 200),
//                 //       random(50, 200),
//                 //       random(50, 200),
//                 //       random(50, 200),
//                 //       random(50, 200),
//                 //       random(50, 200),
//                 //     ],
//                 //   },
//                 //   {
//                 //     label: 'My Third dataset',
//                 //     backgroundColor: 'transparent',
//                 //     borderColor: getStyle('--cui-danger'),
//                 //     pointHoverBackgroundColor: getStyle('--cui-danger'),
//                 //     borderWidth: 1,
//                 //     borderDash: [8, 5],
//                 //     data: [65, 65, 65, 65, 65, 65, 65],
//                 //   },
//               ],
//             }}
//             options={{
//               maintainAspectRatio: false,
//               plugins: {
//                 legend: {
//                   display: false,
//                 },
//               },
//               scales: {
//                 x: {
//                   grid: {
//                     color: getStyle('--cui-border-color-translucent'),
//                     drawOnChartArea: false,
//                   },
//                   ticks: {
//                     color: getStyle('--cui-body-color'),
//                   },
//                 },
//                 y: {
//                   border: {
//                     color: getStyle('--cui-border-color-translucent'),
//                   },
//                   grid: {
//                     color: getStyle('--cui-border-color-translucent'),
//                   },
//                   ticks: {
//                     beginAtZero: true,
//                     color: getStyle('--cui-body-color'),
//                     max: 250,
//                     maxTicksLimit: 5,
//                     stepSize: Math.ceil(250 / 5),
//                   },
//                 },
//               },
//               elements: {
//                 line: {
//                   tension: 0.4,
//                 },
//                 point: {
//                   radius: 0,
//                   hitRadius: 10,
//                   hoverRadius: 4,
//                   hoverBorderWidth: 3,
//                 },
//               },
//             }}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

export default MainCharts;
