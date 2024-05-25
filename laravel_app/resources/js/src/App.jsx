/* eslint-disable import/extensions */
import React, { useContext, useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import { Link, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { ConfigProvider } from "antd";
import "dayjs/locale/vi";
import locale from "antd/locale/vi_VN";
import { useDispatch, useSelector } from "react-redux";
import AppNav from "./components/AppNav.jsx";
import { clog, tt } from "./utils";
import { token } from "./utils/antdtheme.js";
import { customNameMonthDayDayJS } from "./utils/dateTime";
import RoleManager from "./views/RoleManager/RoleManager";
import DriverManager from "./views/DriverManager/DriverManager.jsx";
import ConfigInfor from "./views/ConfigInfor/ConfigInfor.jsx";
import EmployeeList from "./views/EmployeeList/EmployeeList.jsx";
import CustomerList from "./views/CustomerList/CustomerList.jsx";
import Ratings from "./views/Ratings/Ratings.jsx";
import DriverDepositTransaction from "./views/DriverDepositTransaction/DriverDepositTransaction.jsx";
import TripManager from "./views/TripManager/TripManager.jsx";
import ConfigQuestion from "./views/ConfigQuestion/ConfigQuestion.jsx";
import Support from "./views/Support/Support.jsx";
import Invoices from "./views/Invoice/Invoices";
import ConfigAnswer from "./views/ConfigAnswer/ConfigAnswer.jsx";
import Dashboard from "./views/Dashboard/Dashboard.jsx";
import {
    PermissionsContext,
    getData,
    permission,
} from "./store/Permissions/index.js";
import { PERMISSIONS_MAP, RELOAD_DATA_TIMEOUT } from "./constants.js";
import VehicleManager from "./views/VehicleManager/VehicleManager.jsx";
import Notification from "./views/Notification/Notification.jsx";
import NewDriverManager from "./views/NewDriverManager/NewDriverManager";
import ActiveDriverManager from "./views/ActiveDriverManager/ActiveDriverManager.jsx";
import VehicleInsuranceManager from "./views/VehicleInsuranceManager/VehicleInsuranceManager.jsx";
import SupportDriver from "./views/SupportDriver/SupportDriver";

function App() {
    const dispatch = useDispatch();
    const _permission = useSelector(permission);
    const location = useLocation();

    customNameMonthDayDayJS();

    useEffect(() => {
        dispatch(getData());
        const myInterval = setInterval(() => {
            dispatch(getData());
        }, RELOAD_DATA_TIMEOUT);
        return () => clearInterval(myInterval);
    }, []);

    useEffect(() => {
        // Google Analytics
        // console.log('location', location);
    }, [location]);

    return (
        <ConfigProvider
            theme={{
                token,
            }}
            locale={locale}
        >
            <PermissionsContext.Provider value={{ permissions: _permission }}>
                <Routes>
                    <Route path="/cms/" element={<Layout />}>
                        <Route path="/cms/dashboard" element={<Dashboard />} />
                        <Route path="/cms/roles" element={<RoleManager />} />
                        <Route
                            path="/cms/drivers"
                            element={<DriverManager />}
                        />
                        <Route path="/cms/trips" element={<TripManager />} />
                        <Route
                            path="/cms/configInfor"
                            element={<ConfigInfor />}
                        />
                        <Route
                            path="/cms/configQuestion"
                            element={<ConfigQuestion />}
                        />
                        <Route
                            path="/cms/configAnswer"
                            element={<ConfigAnswer />}
                        />
                        <Route
                            path="/cms/employees"
                            element={<EmployeeList />}
                        />
                        <Route
                            path="/cms/customers"
                            element={<CustomerList />}
                        />
                        <Route path="/cms/ratings" element={<Ratings />} />
                        <Route path="/cms/supports" element={<Support />} />
                        <Route
                            path="/cms/supports_driver"
                            element={<SupportDriver />}
                        />
                        <Route path="/cms/invoices" element={<Invoices />} />
                        <Route
                            path="/cms/vehicles"
                            element={<VehicleManager />}
                        />
                        <Route
                            path="/cms/driverDepositTransaction"
                            element={<DriverDepositTransaction />}
                        />
                        <Route
                            path="/cms/notifications"
                            element={<Notification />}
                        />
                        <Route
                            path="/cms/drivers_new"
                            element={<NewDriverManager />}
                        />
                        <Route
                            path="/cms/drivers_active"
                            element={<ActiveDriverManager />}
                        />
                        <Route
                            path="/cms/vehicles_insurance"
                            element={<VehicleInsuranceManager />}
                        />
                        <Route path="*" element={<NoMatch />} />
                    </Route>
                </Routes>
            </PermissionsContext.Provider>
        </ConfigProvider>
    );
}

function Layout() {
    const myPermissions = useContext(PermissionsContext).permissions;
    const location = useLocation();

    const checkViewPermission = () => {
        switch (location.pathname) {
            case "/cms/roles":
                if (!myPermissions[PERMISSIONS_MAP["view-role"]]) {
                    window.location.href = "/";
                }
                break;
            case "/cms/employees":
                if (!myPermissions[PERMISSIONS_MAP["view-employee"]]) {
                    window.location.href = "/";
                }
                break;
            case "/cms/customers":
                if (!myPermissions[PERMISSIONS_MAP["view-passenger"]]) {
                    window.location.href = "/";
                }
                break;
            case "/cms/invoices":
                if (!myPermissions[PERMISSIONS_MAP["view-invoice"]]) {
                    window.location.href = "/";
                }
                break;
            case "/cms/ratings":
                if (!myPermissions[PERMISSIONS_MAP["view-rating-review"]]) {
                    window.location.href = "/";
                }
                break;
            case "/cms/drivers":
                if (!myPermissions[PERMISSIONS_MAP["view-driver"]]) {
                    window.location.href = "/";
                }
                break;
            case "/cms/drivers_new":
                if (!myPermissions[PERMISSIONS_MAP["view-driver"]]) {
                    window.location.href = "/";
                }
                break;
            case "/cms/drivers_active":
                if (!myPermissions[PERMISSIONS_MAP["view-driver"]]) {
                    window.location.href = "/";
                }
                break;
            case "/cms/trips":
                if (!myPermissions[PERMISSIONS_MAP["view-trip"]]) {
                    window.location.href = "/";
                }
                break;
            case "/cms/driverDepositTransaction":
                if (!myPermissions[PERMISSIONS_MAP["view-deposit-invoice"]]) {
                    window.location.href = "/";
                }
                break;
            case "/cms/supports":
                if (!myPermissions[PERMISSIONS_MAP["view-support-service"]]) {
                    window.location.href = "/";
                }
                break;
            case "/cms/supports_driver":
                if (!myPermissions[PERMISSIONS_MAP["view-support-service"]]) {
                    window.location.href = "/";
                }
                break;
            case "/cms/configInfor":
                if (!myPermissions[PERMISSIONS_MAP["view-config"]]) {
                    window.location.href = "/";
                }
                break;
            case "/cms/configQuestion":
                if (!myPermissions[PERMISSIONS_MAP["view-question"]]) {
                    window.location.href = "/";
                }
                break;
            case "/cms/configAnswer":
                if (!myPermissions[PERMISSIONS_MAP["view-answer"]]) {
                    window.location.href = "/";
                }
                break;
            case "/cms/vehicles":
                if (!myPermissions[PERMISSIONS_MAP["view-vehicle"]]) {
                    window.location.href = "/";
                }
                break;
            case "/cms/vehicles_insurance":
                if (!myPermissions[PERMISSIONS_MAP["view-vehicle"]]) {
                    window.location.href = "/";
                }
                break;
            case "/cms/notifications":
                if (!myPermissions[PERMISSIONS_MAP["view-notification"]]) {
                    window.location.href = "/";
                }
                break;
            // case
            default:
        }
    };

    useEffect(() => {
        checkViewPermission();
        const myInterval = setInterval(() => {
            checkViewPermission();
        }, RELOAD_DATA_TIMEOUT);
        return () => clearInterval(myInterval);
    }, [location]);

    const menuItems = [
        ...(myPermissions[PERMISSIONS_MAP["view-role"]]
            ? [
                  {
                      key: "s1",
                      label: tt("Vai trò"),
                      path: "/cms/roles?view_type=list",
                  },
              ]
            : []),
        ...(myPermissions[PERMISSIONS_MAP["view-employee"]]
            ? [
                  {
                      key: "s2",
                      label: tt("Quản lý đăng nhập"),
                      path: "/cms/employees?view_type=list",
                  },
              ]
            : []),
        ...(myPermissions[PERMISSIONS_MAP["view-config"]] ||
        myPermissions[PERMISSIONS_MAP["view-answer"]] ||
        myPermissions[PERMISSIONS_MAP["view-question"]]
            ? [
                  {
                      key: "4",
                      label: tt("Cấu hình"),
                      subMenu: [
                          ...(myPermissions[PERMISSIONS_MAP["view-config"]]
                              ? [
                                    {
                                        key: "s1",
                                        label: tt("Cấu hình thông tin"),
                                        path: "/cms/configInfor?view_type=list",
                                    },
                                ]
                              : []),
                          ...(myPermissions[PERMISSIONS_MAP["view-question"]]
                              ? [
                                    {
                                        key: "s2",
                                        label: tt("Cấu hình câu hỏi"),
                                        path: "/cms/configQuestion?view_type=list",
                                    },
                                ]
                              : []),
                          ...(myPermissions[PERMISSIONS_MAP["view-answer"]]
                              ? [
                                    {
                                        key: "s3",
                                        label: tt("Cấu hình câu trả lời"),
                                        path: "/cms/configAnswer?view_type=list",
                                    },
                                ]
                              : []),
                      ],
                  },
              ]
            : []),
        ...(myPermissions[PERMISSIONS_MAP["view-passenger"]] ||
        myPermissions[PERMISSIONS_MAP["view-invoice"]] ||
        myPermissions[PERMISSIONS_MAP["view-rating-review"]]
            ? [
                  {
                      key: "1a",
                      label: tt("Khách hàng"),
                      subMenu: [
                          ...(myPermissions[PERMISSIONS_MAP["view-passenger"]]
                              ? [
                                    {
                                        key: "s1",
                                        label: tt("Quản lý khách hàng"),
                                        path: "/cms/customers?view_type=list",
                                    },
                                ]
                              : []),
                          ...(myPermissions[PERMISSIONS_MAP["view-invoice"]]
                              ? [
                                    {
                                        key: "s2",
                                        label: tt("Chứng từ chuyến đi"),
                                        path: "/cms/invoices?view_type=list",
                                    },
                                ]
                              : []),
                          ...(myPermissions[
                              PERMISSIONS_MAP["view-rating-review"]
                          ]
                              ? [
                                    {
                                        key: "s3",
                                        label: tt("Đánh giá của khách hàng"),
                                        path: "/cms/ratings?view_type=list",
                                    },
                                ]
                              : []),
                      ],
                  },
              ]
            : []),
        ...(myPermissions[PERMISSIONS_MAP["view-driver"]]
            ? [
                  {
                      key: "s4",
                      label: tt("Danh sách tải app"),
                      path: "/cms/drivers?view_type=list",
                  },
              ]
            : []),
        ...(myPermissions[PERMISSIONS_MAP["view-driver"]]
            ? [
                  {
                      key: "s3",
                      label: tt("Đăng ký mới"),
                      path: "/cms/drivers_new?view_type=list",
                  },
              ]
            : []),

        ...(myPermissions[PERMISSIONS_MAP["view-deposit-invoice"]]
            ? [
                  {
                      key: "s9",
                      label: tt("Phiếu thu"),
                      path: "/cms/driverDepositTransaction?view_type=list",
                  },
              ]
            : []),
        ...(myPermissions[PERMISSIONS_MAP["view-driver"]]
            ? [
                  {
                      key: "s5",
                      label: tt("Quản lý tài xế"),
                      path: "/cms/drivers_active?view_type=list",
                  },
              ]
            : []),
        ...(myPermissions[PERMISSIONS_MAP["view-vehicle"]]
            ? [
                  {
                      key: "s6",
                      label: tt("Quản lý phương tiện"),
                      path: "/cms/vehicles?view_type=list",
                  },
              ]
            : []),

        ...(myPermissions[PERMISSIONS_MAP["view-vehicle"]]
            ? [
                  {
                      key: "s7",
                      label: tt("Thời hạn bảo hiểm"),
                      path: "/cms/vehicles_insurance?view_type=list",
                  },
              ]
            : []),
        ...(myPermissions[PERMISSIONS_MAP["view-trip"]]
            ? [
                  {
                      key: "s8",
                      label: tt("Quản lý chuyến đi"),
                      path: "/cms/trips?view_type=list",
                  },
              ]
            : []),
        ...(myPermissions[PERMISSIONS_MAP["view-support-service"]]
            ? [
                  {
                      key: "support",
                      label: tt("Phản hồi dịch vụ"),
                      subMenu: [
                          {
                              key: "support_s10",
                              label: tt("Hỗ trợ khách hàng"),
                              path: "/cms/supports?view_type=list",
                          },
                          {
                              key: "support_s11",
                              label: tt("Hỗ trợ tài xế"),
                              path: "/cms/supports_driver?view_type=list",
                          },
                      ],
                  },
              ]
            : []),
        ...(myPermissions[PERMISSIONS_MAP["view-notification"]]
            ? [
                  {
                      key: "s11",
                      label: tt("Thông báo"),
                      path: "/cms/notifications?view_type=list",
                  },
              ]
            : []),
    ];
    return (
        <div style={{ width: "100%", backgroundColor: "white" }}>
            {createPortal(
                <AppNav caption={tt("")} items={menuItems} />,
                document.getElementById("appnavigation")
            )}
            {createPortal(
                <div className="w-24 h-24  rounded-full " />,
                document.getElementById("expanddiv")
            )}
            <div className="overflow-y-auto">
                <Outlet />
            </div>
        </div>
    );
}

function Home() {
    return (
        <div>
            <p>This is the home page.</p>
        </div>
    );
}

function NoMatch() {
    return (
        <div>
            <p>No page found.</p>
        </div>
    );
}

export default App;
