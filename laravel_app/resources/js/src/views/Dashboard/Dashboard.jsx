import React, { useContext } from 'react';
import WidgetsDropdown from './WidgetsDropdown/WidgetsDropdown';
import MainCharts from './MainCharts/MainCharts';
import { PermissionsContext } from '../../store/Permissions';
import { PERMISSIONS_MAP } from '../../constants';
import { tt } from '../../utils';

function Dashboard() {
    return (
      <div className="h-screen  mx-auto max-w-7xl ">
        {/* Widgets dropdown */}
        <WidgetsDropdown />
        <MainCharts />
        <div className="h-[200px]" />
      </div>
    );
}

export default Dashboard;
