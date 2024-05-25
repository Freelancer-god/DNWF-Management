<?php
/**
 * Created by PhpStorm.
 * User: admin
 * Date: 2020-11-14
 * Time: 21:02
 */
return [
    'base_url' => env('CRM_SERVER', 'localhost:8080'),
    'api_token' => env('CRM_API_TOKEN', 'adsfahjsdgahjsdgqwiu'),
    'method' => [
        'new' => [
            'search_new_categories' => '/api/v1/new_categories/searchWeb',
            'search_news' => '/api/v1/new_datas/searchWeb'
        ],
        'restaurant_types' => [
            'search_restaurant_types' => '/api/v1/restaurant_types/searchWeb'
        ],
        'branch' => [
            'search_branch' => '/api/v1/branches/searchWeb'
        ],
        'menu' => [
            'search_categories' => '/api/v1/menu_product_category/searchWeb',
            'search_products' => '/api/v1/menu_product/searchWeb'
        ],
        'feedback' => [
            'create_web_feedback' => '/api/v1/user_feedbacks/createFeedbackWeb'
        ],
        'email_notification' => [
            "create_email_notification" => '/api/v1/email_notification/createWeb'
        ]
    ]
];
