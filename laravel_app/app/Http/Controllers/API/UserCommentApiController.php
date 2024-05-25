<?php


namespace App\Http\Controllers\API;


use App\Models\EmployeeLog;
use App\Services\Client\UserCommentService;
use Illuminate\Http\Request;

class UserCommentApiController extends ClientAppBaseController
{
    protected $service_base;
    protected $action_type;

    public function __construct(UserCommentService $service_base)
    {
        $this->service_base = $service_base;
        $this->action_type  = EmployeeLog::USER_COMMENT;
    }

    public function search(Request $request){
        return $this->service_base->search($request->all());
    }

    public function sendMessage(Request $request){
        return $this->service_base->sendMessage($request->all());
    }
}
