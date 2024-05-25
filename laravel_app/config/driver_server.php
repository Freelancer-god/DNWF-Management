<?php
/**
 * Created by PhpStorm.
 * User: admin
 * Date: 2020-11-14
 * Time: 21:02
 */
return [
    'method' => [
        'drivers' => [
            'loginBy' => '/api/v1/drivers/loginBy',
            'logoutBy' => '/api/v1/drivers/logoutBy',
            'store' => '/api/v1/drivers/store',
            'update' => '/api/v1/drivers/update',
            'search' => '/api/v1/drivers/search',
            'getDictByIdAndConds' => '/api/v1/drivers/getDictByIdAndConds',
            'setReceiveRide' => '/api/v1/drivers/setReceiveRide',
            // report
            'reportByMonth' => '/api/v1/drivers/reportByMonth',
            // export excel
            'exportExcel' => '/api/v1/drivers/exportExcel',
            'exportExcelNew' => '/api/v1/drivers/exportExcelNew',
            // driver verify
            'confirmFormLocal' => '/api/v1/driver_verifies/confirmFormLocal',
            'searchDriverLocal' => '/api/v1/driver_verifies/searchDriverLocal',
            'updateStatus' => '/api/v1/driver_verifies/updateStatus',
            'changeDriverType' => '/api/v1/driver_verifies/changeDriverTypeCms',
        ],
        'driver_forms' => [
            'search' => '/api/v1/driver_forms/search',
            'getDictByIds' => '/api/v1/driver_forms/dict/getDictByIds',
            'getDictByColumns' => '/api/v1/driver_forms/dict/getDictByColumns',
            'verifiedForm' => '/api/v1/driver_forms/verifiedForm',
            'verifiedFormList' => '/api/v1/driver_forms/verifiedFormList',
        ],
        'vehicle_forms' => [
            'search' => '/api/v1/vehicle_forms/search',
            'getDictByIds' => '/api/v1/vehicle_forms/dict/getDictByIds',
            'getDictByColumns' => '/api/v1/vehicle_forms/dict/getDictByColumns',
            'verifiedForm' => '/api/v1/vehicle_forms/verifiedForm',
            'verifiedFormList' => '/api/v1/vehicle_forms/verifiedFormList',
        ],
        'vehicle_brands' => [
            'search' => '/api/v1/vehicle_brands/search',
        ],
        'vehicle_types' => [
            'search' => '/api/v1/vehicle_types/search',
        ],
        'vehicle_brand_models' => [
            'search' => '/api/v1/vehicle_brand_models/search',
        ],
        'deposit_invoices' => [
            'search' => '/api/v1/deposit_invoices/search',
            'store' => '/api/v1/deposit_invoices/store',
            'confirm' => '/api/v1/deposit_invoices/confirm',
            'exportExcel' => '/api/v1/deposit_invoices/exportExcel',
        ],
        'vehicles' => [
            'search' => '/api/v1/vehicles/search',
            'exportExcel' => '/api/v1/vehicles/exportExcel',
            'exportInsuranceExcel' => '/api/v1/vehicles/exportInsuranceExcel',
        ],
        'regions' => [
            'search' => '/api/v1/regions/search'
        ],
        'agencies' => [
            'search' => '/api/v1/agencies/search'
        ],
    ],
];
