<?php
/**
 * Created by PhpStorm.
 * User: admin
 * Date: 2020-11-14
 * Time: 21:02
 */
return [
    'method' => [
        'trip' => [
            'search' => '/api/v1/trip/search',
            'exportExcel' => '/api/v1/trip/exportExcel',
            'cancelTripCms' => '/api/tripService/v1/trip/cancelTripCms'
        ],
        'rating' => [
            'search' => '/api/v1/rating/search',
            'exportExcel' => '/api/v1/rating/exportExcel',
            'reportRating' => '/api/v1/rating/reportRating'
        ],
        'invoices' => [
            'search' => '/api/v1/invoices/search',
            'exportExcel' => '/api/v1/invoices/exportExcel'
        ],
        'trip_cards' => [
            'reportMonthly' => '/api/v1/trip_cards/reportMonthly',
            'reportMonthlyTotalTrip' => '/api/v1/trip_cards/reportMonthlyTotalTrip',
            'reportMonthlyTotalPaid' => '/api/v1/trip_cards/reportMonthlyTotalPaid',
            'reportTotalPaid' => '/api/v1/trip_cards/reportTotalPaid',
            'reportTotalTrip' => '/api/v1/trip_cards/reportTotalTrip',
        ]
    ],
];
