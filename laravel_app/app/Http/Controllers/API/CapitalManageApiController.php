<?php


namespace App\Http\Controllers\API;


use App\Models\CapitalManage;
use App\Services\CapitalManageService;
use Illuminate\Http\Request;

class CapitalManageApiController extends BaseApiController
{
    protected $service_base;
    protected $action_type;

    public function __construct(
        CapitalManageService $service_base
    ) 
    {
        $this->service_base         = $service_base;
        //?
        //$this->action_type          = EmployeeLog::CLUB_LOG;
    }
}