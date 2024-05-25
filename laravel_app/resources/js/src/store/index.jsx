import { configureStore } from "@reduxjs/toolkit";
import permissions from "./Permissions/index";
import roleManager from "./RoleManager/index";
import configInfor from "./ConfigInfor/index";
import driverManager from "./DriverManager/index";
import tripManager from "./TripManager/index";
import vehicleManager from "./VehicleManager/index";
import employeeList from "./EmployeeList/index";
import customerList from "./CustomerList/index";
import driverDepositTransaction from "./DriverDepositTransaction/index";
import ratings from "./Ratings/index";
import configQuestion from "./ConfigQuestion/index";
import configAnswer from "./ConfigAnswer/index";
import support from "./Support/index";
import invoices from "./Invoice/index";
import notification from "./Notification/index";
import newDriverManager from "./NewDriverManager/index";
import activeDriverManager from "./ActiveDriverManager/index";
import vehicleInsuranceManager from "./VehicleInsuranceManager/index";
import supportDriver from "./SupportDriver/index";

export const requireAdmin = () =>
    // tra ve promisse
    new Promise((resolve, reject) => {
        // Your code logic here
        // You can resolve the promise if the condition is met
        // resolve();

        // Or you can reject the promise if the condition is not met
        // reject();

        // Replace the above commented lines with your actual code logic
        resolve();
    });
export const store = configureStore({
    reducer: {
        roleManager,
        driverManager,
        tripManager,
        configInfor,
        permissions,
        employeeList,
        customerList,
        ratings,
        driverDepositTransaction,
        configQuestion,
        configAnswer,
        support,
        invoices,
        vehicleManager,
        notification,
        newDriverManager,
        activeDriverManager,
        vehicleInsuranceManager,
        supportDriver,
    },
});
