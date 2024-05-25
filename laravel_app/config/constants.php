<?php
return [
    'default_app' => env('APP_NAME', 'Cudidi Passenger'),
    'dev_mode' => env('APP_ENV') !== 'production' ? 1: 0,
    'allwored_origins' => [],
    'debug' => 1,
    'logs' => [
        'debug' => 1,
        'info' => 1,
        'error' => 1
    ],
    'sms' => [
        'limit_count' => 3,
        'valid_in' => 10
    ],
    'version' => [
        'current' => '1.0.0',
        'google_url' => '1.0.0',
        'apple_url' => '1.0.0',
    ],
    'employee_admin' => [1,2]
];
