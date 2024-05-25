<?php


namespace App\Http\Controllers\API;


use App\Models\EmployeeLog;
use App\Services\Client\QuestionService;
use Illuminate\Http\Request;

class QuestionApiController extends ClientAppBaseController
{
    protected $service_base;
    protected $action_type;

    public function __construct(QuestionService $service_base)
    {
        $this->service_base = $service_base;
        $this->action_type  = EmployeeLog::QUESTION_LOG;
    }

    public function search(Request $request){
        return $this->service_base->search($request->all());
    }
    public function store(Request $request){
        return $this->service_base->store($request->all());
    }
    public function update($id, Request $request){
        return $this->service_base->update($id, $request->all());
    }
    public function findById($id){
        return $this->service_base->findById($id);
    }
    public function destroy($id){
        return $this->service_base->destroy($id);
    }
}
