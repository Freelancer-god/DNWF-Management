<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\EmployeeLog;
use App\Utils\AppBaseResponse;
use App\Utils\LogHelper;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use Response;

class AppBaseController extends Controller
{
    protected $action_type;

    public function sendResponse($result, $message)
    {
        return AppBaseResponse::makeResponse($message, $result);
    }

    public function sendError($error, $code = 404)
    {
        return AppBaseResponse::makeErrorResponse($error, $code);
    }

    public function sendErrorData($data, $error, $code = 404)
    {
        return AppBaseResponse::makeErrorDataResponse($error, $data, $code);
    }

    public function callAction($method, $params)
    {
        if($this->contains($method, ['find', 'search', 'getAll', 'getDict'])) {
            return $this->callActionWithoutTransaction($method, $params);
        }
        return $this->callActionWithTransaction($method, $params);
    }

    protected function callActionWithoutTransaction($method, $params) {
        $ajax = request()->ajax();
        try {
            $data = parent::callAction($method, $params);
            if(isset($data['code']) && $data['code'] === '200'){
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

    protected function callActionWithTransaction($method, $params) {
        $ajax = request()->ajax();
        try {
            DB::beginTransaction();
            $data = parent::callAction($method, $params);
            if(isset($data['code']) && $data['code'] != '200'){
                if(isset($data['is_rollback'])){
                    if($data['is_rollback']){
                        DB::rollBack();
                    }
                } else {
                    DB::rollBack();
                }
            } else {
                $this->writeLog($method, $data, request()->all());
                DB::commit();
            }
            return $data;
        } catch(ValidationException $exception) {
            DB::rollBack();
            return $this->handleValidationException($exception, $ajax);
        } catch(AuthenticationException $exception) {
            DB::rollBack();
            return $this->handleAuthException($exception, $ajax);
        } catch(\Exception $e){
            DB::rollBack();
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
