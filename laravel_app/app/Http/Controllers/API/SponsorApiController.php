<?php


namespace App\Http\Controllers\API;


use App\Models\EmployeeLog;
use App\Services\SponsorService;
use Illuminate\Http\Request;

class SponsorApiController extends BaseApiController
{
    protected $service_base;
    protected $action_type;

    public function __construct(
        SponsorService $service_base
    )
    {
        $this->service_base         = $service_base;
        $this->action_type          = EmployeeLog::SPONSOR_LOG;
    }

}
