<?php
/**
 * Created by PhpStorm.
 * User: admin
 * Date: 2020-11-14
 * Time: 21:02
 */
return [
    'method' => [
        'notification_devices' => [
            'loginBy' => '/api/v1/notification_devices/loginBy',
            'logoutBy' => '/api/v1/notification_devices/logoutBy',
            'store' => '/api/v1/notification_devices/store',
            'update' => '/api/v1/notification_devices/update',
            'search' => '/api/v1/notification_devices/search',
            'getDictByIdAndConds' => '/api/v1/notification_devices/getDictByIdAndConds',
        ],
        'supports' => [
            'updateStatus' => '/api/v1/supports/updateStatusCms',
            'findById' => '/api/v1/supports/findById',
            'search' => '/api/v1/supports/search',
            // export excel
            'exportExcel' => '/api/v1/supports/exportExcel',
        ],
        'user_comments' => [
            'search' => '/api/v1/user_comments/search',
            'sendMessage' => '/api/notificationService/v1/user_comments/sendMessage',
        ],
        'questions' => [
            'search' => '/api/v1/questions/search',
            'store' => '/api/v1/questions/store',
            'update' => '/api/v1/questions/update',
            'destroy' => '/api/v1/questions/destroy',
            'findById' => '/api/v1/questions/findById',
        ],
        'answers' => [
            'search' => '/api/v1/answers/search',
            'store' => '/api/v1/answers/store',
            'update' => '/api/v1/answers/update',
            'destroy' => '/api/v1/answers/destroy',
            'findById' => '/api/v1/answers/findById',
        ],
        'notifications' => [
            'search' => '/api/v1/notifications/search',
            'store' => '/api/v1/notifications/store',
            'update' => '/api/v1/notifications/update',
            'destroy' => '/api/v1/notifications/destroy',
            'findById' => '/api/v1/notifications/findById',
        ]
    ],
    'deviceable_type' => 'passengers'
];
