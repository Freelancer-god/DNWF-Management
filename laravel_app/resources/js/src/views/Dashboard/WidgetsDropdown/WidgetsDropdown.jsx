import React from 'react';

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
import WidgetStats from './WidgetStats/WidgetStats';
import { tt } from '../../../utils';
import WidgetStatsUsers from './WidgetStats/WidgetStatsUsers';
import WidgetStatsDrivers from './WidgetStats/WidgetStatsDrivers';
import WidgetStatsTrips from './WidgetStats/WidgetStatsTrips';
import WidgetStatsIncome from './WidgetStats/WidgetStatsIncome';

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

function WidgetsDropdown() {
  return (
    <div className="flex flex-wrap  ">
      <WidgetStatsUsers />
      <WidgetStatsDrivers />
      <WidgetStatsTrips />

      <WidgetStatsIncome />

    </div>
  );
}

export default WidgetsDropdown;
