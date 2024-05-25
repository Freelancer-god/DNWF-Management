import React, { useContext } from 'react';
import { PermissionsContext } from '../store/Permissions';

const checkPermissions = (appKey, can, p) => {
  if (appKey && can && p) {
    const app = p[appKey];
    if (app && app.data) {
      return app.data.some((item) => can.includes(item.uid));
    }
    return false;
  }
  return false;
};

export function Can({ appName, p, children }) {
  const { permissions } = useContext(PermissionsContext);

  if (checkPermissions(appName, p, permissions)) {
    return <>{children}</>;
  }
  return null;
  // <>
  //   <div className="flex flex-col items-center justify-center h-screen">
  //     <div className="bg-gray-100 p-[20px] rounded-lg shadow-md text-center">
  //       <h1 className="text-red-500 text-[48px]">403 - Forbidden</h1>
  //       <p className="text-xl text-center mb-[]">
  //         Sorry, you don't have permission to access this page.
  //       </p>
  //       <p className="text-base text-center text-gray-500">
  //         Please contact the administrator for assistance.
  //       </p>
  //     </div>
  //   </div>
  // </>
}

export function can(appName, p, permissions) {
  return checkPermissions(appName, p, permissions);
}
