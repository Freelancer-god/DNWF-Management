<?php


namespace App\Sample\API;


use App\Http\Controllers\API\BaseApiController;
use App\Services\Base\BaseService;

class SampleApiController extends BaseApiController
{
    protected $service_base;

    public function __construct(
        BaseService $service_base
    )
    {
        $this->service_base         = $service_base;
    }
}
