<?php


namespace App\Http\Controllers\API;


use App\Services\MemberService;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;

class MemberApiController extends BaseApiController
{
    protected $service_base;

    public function __construct(
        MemberService $service_base
    )
    {
        $this->service_base         = $service_base;
    }

    public function updateConfirmStatus($id, Request $request){
        $inputs = $request->all();
        $resp = $this->service_base->updateConfirmStatus($id, $inputs);
        if($resp['code'] !== '200'){
            return $this->sendError($resp['message'], $resp['code']);
        }
        return $this->sendResponse($resp['data'], 'Update success');
    }

    public function getActivityRecord($id){
        $resp = $this->service_base->getActivityRecord($id);
        if($resp['code'] !== '200'){
            return $this->sendError($resp['message'], $resp['code']);
        }
        return $this->sendResponse($resp['data'], 'Get activity record success');
    }


}
