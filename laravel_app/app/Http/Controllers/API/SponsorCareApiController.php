<?php


namespace App\Http\Controllers\API;


use App\Models\EmployeeLog;
use App\Services\SponsorCareService;
use Illuminate\Http\Request;

class SponsorCareApiController extends BaseApiController
{
    protected $service_base;
    protected $action_type;

    public function __construct(
        SponsorCareService $service_base
    )
    {
        $this->service_base         = $service_base;
        $this->action_type          = EmployeeLog::SPONSOR_LOG;
    }
    public function getCareBySponsorId($id, Request $request){
        $resp = $this->service_base->getCareBySponsorId($id);
        if($resp['code'] !== '200'){
            return $this->sendError($resp['message'], $resp['code']);
        }
        return $this->sendResponse($resp['data'], '');
    }

    public function updateConfirmStatus($id, Request $request){
        $inputs = $request->all();
        $resp = $this->service_base->updateConfirmStatus($id, $inputs);
        if($resp['code'] !== '200'){
            return $this->sendError($resp['message'], $resp['code']);
        }
        return $this->sendResponse($resp['data'], 'Update success');
    }

}
