<?php


namespace App\Http\Controllers\API;

use App\Models\EmployeeLog;
use App\Services\ConfigService;
use Illuminate\Http\Request;

class ConfigApiController extends BaseApiController
{
    protected $service_base;
    protected $action_type;

    public function __construct(
        ConfigService $service_base
    )
    {
        $this->service_base         = $service_base;
        $this->action_type          = EmployeeLog::CONFIG_LOG;
    }

    public function findAllApp(){
        $resp = $this->service_base->getAllApp();
        return $this->sendResponse($resp['data'], 'Find all success');
    }

    public function getOneBy(Request $request){
        $resp = $this->service_base->getOneBy($request->all());
        return $this->sendResponse($resp['data'], 'get one by success');
    }

    public function getDictByTypes(Request $request){
        $resp = $this->service_base->getDictByTypes($request->all());
        return $this->sendResponse($resp['data'], 'get dict by types success');
    }
}
