<?php


namespace App\Http\Controllers\API;


use App\Models\EmployeeLog;
use App\Services\MediaSerivce;
use Illuminate\Http\Request;

class MediaApiController extends BaseApiController
{
    protected $service_base;

    public function __construct(
        MediaSerivce      $service_base
    )
    {
        $this->service_base         = $service_base;
    }
    public function create(Request $request){
        $inputs = $request;
        $resp = $this->service_base->store($request);
        if($resp['code'] !== '200'){
            return $this->sendError($resp['message'], $resp['code']);
        }
        return $this->sendResponse($resp['data'], 'Store success');
    }

    public function updateMedia($id, Request $request){
        // $resp = $this->service_base->updateMedia($request);
        $resp= $request->all;
        return $request;
        // if($resp['code'] !== '200'){
        //     return $this->sendError($resp['message'], $resp['code']);
        // }
        // return $this->sendResponse($resp['data'], 'Update success tesst');
    }
}