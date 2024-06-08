<?php


namespace App\Http\Controllers\API;


use App\Models\EmployeeLog;
use App\Services\SponsorContractService;
use Illuminate\Http\Request;

class SponsorContractApiController extends BaseApiController
{
    protected $service_base;
    protected $action_type;

    public function __construct(
        SponsorContractService $service_base
    )
    {
        $this->service_base         = $service_base;
        $this->action_type          = EmployeeLog::SPONSOR_LOG;
    }
    public function getContractsBySponsorId($id, Request $request){
        $resp = $this->service_base->getContractsBySponsorId($id);
        if($resp['code'] !== '200'){
            return $this->sendError($resp['message'], $resp['code']);
        }
        return $this->sendResponse($resp['data'], '');
    }

}
