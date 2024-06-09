<?php


namespace App\Http\Controllers\API;


use App\Models\EmployeeLog;
use App\Services\OfficialDocumentService;
use Illuminate\Http\Request;

class OfficialDocumentApiController extends BaseApiController
{
    protected $service_base;
    protected $action_type;

    public function __construct(
        OfficialDocumentService      $service_base
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
}
