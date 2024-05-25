<?php
/**
 * Created by PhpStorm.
 * User: admin
 * Date: 2020-11-14
 * Time: 21:02
 */
return [
    'method' => [
        'user' => [
            'signUp' => '/api/v1/user/signup',
            'login' => '/api/v1/user/login',
            'delete' => '/api/v1/user/2',
        ],
        'book' => [
            'ride' => '/api/v1/track/book-ride',
            'stop' => '/api/v1/track/stop-tracking',
        ],
        'query' => [
            'getNearByDrivers' => '/api/v1/query/getNearByDrivers',
            'getTripTracker' => '/api/v1/track/get-trip-tracker'
        ]
    ],
    'type' => 'customer',
    'default_password' => 'cudidi_123'
];
