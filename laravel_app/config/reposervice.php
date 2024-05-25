<?php
/**
 * Created by PhpStorm.
 * User: Tuan
 * Date: 10/30/2017
 * Time: 5:30 PM
 */

return [
    'paths' => [
        'contract' => 'App/Services/Interfaces',
        'eloquent' => 'App/Services',
        'model' => 'App/Models',
    ],
    'fileNames' => [
        'contract' => '{name}ServicesInterface',
        'eloquent' => '{name}Services',
        'model' => '{name}',
    ],
    'provider' => [
        'path' => 'Services',
        'contract' => 'Interfaces',
        'app' => 'App\Services',
    ],
];