<?php


namespace App\Http\Controllers\API;

use App\Models\EmployeeLog;
use App\Services\EmployeeService;
use Illuminate\Http\Request;

class EmployeeApiController extends BaseApiController
{
    protected $service_base;
    protected $action_type;

    public function __construct(
        EmployeeService $service_base
    )
    {
        $this->service_base         = $service_base;
        $this->action_type          = EmployeeLog::EMPLOYEE_LOG;
    }

    public function loginWithPassword(Request $request){
        $inputs = $request->all();
        $resp = $this->service_base->loginWithPassword($inputs);
        if($resp['code'] !== '200'){
            return $this->sendError($resp['message'], $resp['code']);
        }
        return $this->sendResponse($resp['data'], 'Login with pasword success');
    }

    public function loginWithToken(Request $request){
        $inputs = $request->all();
        $resp = $this->service_base->loginWithToken($inputs);
        if($resp['code'] !== '200'){
            return $this->sendError($resp['message'], $resp['code']);
        }
        return $this->sendResponse($resp['data'], 'Login with token success');
    }

    public function changePassword(Request $request){
        $inputs = $request->all();
        $resp = $this->service_base->changePassword($inputs);
        if($resp['code'] !== '200'){
            return $this->sendError($resp['message'], $resp['code']);
        }
        return $this->sendResponse($resp['data'], 'Change password success');
    }

    public function logout(Request $request){
        $inputs = $request->all();
        $resp = $this->service_base->logout($inputs);
        if($resp['code'] !== '200'){
            return $this->sendError($resp['message'], $resp['code']);
        }
        return $this->sendResponse($resp['message'], 'logout success');
    }

    public function checkVersion(Request $request){
        $inputs = $request->all();
        $resp = $this->service_base->checkVersion($inputs);
        if($resp['code'] !== '200'){
            $data = isset($resp['data']) ? $resp['data'] : null;
            return $this->sendErrorData($data, $resp['message'], $resp['code']);
        }
        return $this->sendResponse($resp['message'], 'Check version success');
    }

    public function getPermission() {
        $resp = $this->service_base->getPermission();
        return $this->sendResponse($resp['data'], 'Change password success');
    }
}
