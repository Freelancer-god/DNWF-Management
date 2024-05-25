<?php


namespace App\Http\Controllers\API;

use App\Models\EmployeeLog;
use App\Services\RoleService;

class RoleApiController extends BaseApiController
{
    protected $service_base;
    protected $action_type;

    public function __construct(
        RoleService $service_base
    )
    {
        $this->service_base         = $service_base;
        $this->action_type          = EmployeeLog::ROLE_LOG;
    }
}
