<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Services\ActivityRecordService;
use Illuminate\Http\Request;

class ActivityRecordApiController extends BaseApiController
{
    protected $service_base;
    protected $action_type;

    public function __construct(
        ActivityRecordService $service_base
    )
    {
        $this->service_base         = $service_base;
    }
}
