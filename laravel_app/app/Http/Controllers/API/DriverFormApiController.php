<?php


namespace App\Http\Controllers\API;


use App\Models\EmployeeLog;
use App\Services\Client\DriverFormService;
use Illuminate\Http\Request;

class DriverFormApiController extends ClientAppBaseController
{
    protected $service_base;
    protected $action_type;

    public function __construct(DriverFormService $service_base)
    {
        $this->service_base = $service_base;
        $this->action_type = EmployeeLog::DRIVER_FORM_LOG;
    }

    public function search(Request $request){
        return $this->service_base->search($request->all());
    }

    public function verifiedForm(Request $request){
        return $this->service_base->verifiedForm($request->all());
    }

    public function verifiedFormList(Request $request){
        return $this->service_base->verifiedFormList($request->all());
    }
}
