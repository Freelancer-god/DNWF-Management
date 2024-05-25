<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\EmployeeLog;
use App\Utils\LogHelper;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Support\Facades\App;
use Illuminate\Validation\ValidationException;
use Response;

class ClientAppBaseController extends Controller
{
    protected $action_type;

    public function callAction($method, $params)
    {
        $ajax = request()->ajax();
        try {
            $data = parent::callAction($method, $params);

            if(is_array($data) && (isset($data['success']) && $data['success'] === true)){
                $this->writeLog($method, $data, request()->all());
            }
            return $data;
        } catch(ValidationException $exception) {
            return $this->handleValidationException($exception, $ajax);
        } catch(AuthenticationException $exception) {
            return $this->handleAuthException($exception, $ajax);
        } catch(\Exception $e){
            return $this->handleException($e, $ajax);
        }
    }

    protected function callActionWithoutTransaction($method, $params) {
        $ajax = request()->ajax();
        try {
            $data = parent::callAction($method, $params);
            if(isset($data['success']) && $data['success'] === true){
                $this->writeLog($method, $data);
            }
            return $data;
        } catch(ValidationException $exception) {
            return $this->handleValidationException($exception, $ajax);
        } catch(AuthenticationException $exception) {
            return $this->handleAuthException($exception, $ajax);
        } catch(\Exception $e){
            return $this->handleException($e, $ajax);
        }
    }

    protected function handleValidationException(ValidationException $exception, $ajax = false)
    {
        $tracking_id = LogHelper::writeLog('issued on ' . $exception->getMessage(), 0);
        if($ajax) {
            return response()->json(array('error' => 'Có lỗi xảy ra trong hệ thống. Vui lòng thử lại sau ('. $tracking_id .')'), 422);
        } else {
            return redirect()->back()->withInput()->withErrors([['error' => 'Có lỗi xảy ra trong hệ thống. Vui lòng thử lại sau']]);
        }
    }

    protected function handleAuthException(AuthenticationException $exception, $ajax = false)
    {
        $tracking_id = LogHelper::writeLog('issued on authorization ' . $exception->getMessage(), 0);
        if($ajax) {
            return response()->json(array('error' => 'Có lỗi xảy ra trong hệ thống. Vui lòng thử lại sau ('. $tracking_id .')'), 403);
        } else {
            App::abort(403);
        }
    }

    protected function handleException(\Exception $exception, $ajax = false)
    {
        $tracking_id = LogHelper::writeLog('issued on exception ' . $exception->getMessage(), 0);
        if($ajax) {
            return response()->json($exception->getMessage(), 200);
        } else {
            $message = $exception->getMessage();
            if(config('constants.debug') === 0){
                $message = 'Có lỗi xảy ra trong hệ thống. Vui lòng thử lại sau ('. $tracking_id .')';
            }
            $res = [
                'success' => false,
                'error' => $message,
                'code' => 999
            ];
            return response()->json($res, 200);
        }
    }

    protected function writeLog($method, $data, $params){
        if(isset($this->action_type)){
            if($this->contains($method, ['store'])){
                EmployeeLog::createLog($data['data'], $this->action_type, EmployeeLog::SAVE, $params);
            } else if($this->contains($method, ['update', 'sendMessage'])){
                EmployeeLog::createLog($data['data'], $this->action_type, EmployeeLog::UPDATE, $params);
            } else if($this->contains($method, ['confirm', 'verify', 'verified', 'cancelTripCms'])) {
                EmployeeLog::createLog($data['data'], $this->action_type, EmployeeLog::CONFIRM, $params);
            } else if($this->contains($method, ['delete', 'destroy'])) {
                EmployeeLog::createDeleteLog($data['message'], $this->action_type, EmployeeLog::DELETE, $params);
            } else if($this->contains($method, ['login'])) {
                EmployeeLog::createLog($data['data'], EmployeeLog::SYSTEM_LOG, EmployeeLog::LOGIN, $params);
            }
        }
    }

    private function contains($str, array $arr)
    {
        foreach($arr as $a) {
            if (str_contains($str, $a)) {
                return true;
            }
        }
        return false;
    }
}
