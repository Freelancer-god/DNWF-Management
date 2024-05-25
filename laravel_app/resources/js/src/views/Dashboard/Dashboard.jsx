import React, { useContext } from 'react';
import WidgetsDropdown from './WidgetsDropdown/WidgetsDropdown';
import MainCharts from './MainCharts/MainCharts';
import { PermissionsContext } from '../../store/Permissions';
import { PERMISSIONS_MAP } from '../../constants';
import { tt } from '../../utils';

function Dashboard() {
  const myPermissions = useContext(PermissionsContext).permissions;
  if (myPermissions[PERMISSIONS_MAP['view-dashboard']]) {
    return (
      <div className="h-screen  mx-auto max-w-7xl ">
        {/* Widgets dropdown */}
        <WidgetsDropdown />
        <MainCharts />
        <div className="h-[200px]" />
      </div>
    );
  }
  return (
    <div className="text-center text-3xl font-bold my-[10%] text-[#333]">{tt('Chào mừng đến trang quản lý')}</div>
  );
}

export default Dashboard;
