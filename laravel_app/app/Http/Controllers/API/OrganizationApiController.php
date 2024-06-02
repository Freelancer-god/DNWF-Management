<?php


namespace App\Http\Controllers\API;


use App\Services\OrganizationService;
use Illuminate\Http\Request;

class OrganizationApiController extends BaseApiController
{
    protected $service_base;

    public function __construct(OrganizationService $service_base)
    {
        $this->service_base = $service_base;
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
