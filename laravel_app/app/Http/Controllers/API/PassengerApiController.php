<?php


namespace App\Http\Controllers\API;


use App\Models\EmployeeLog;
use App\Services\Client\PassengerService;
use Illuminate\Http\Request;

class PassengerApiController extends ClientAppBaseController
{
    protected $service_base;
    protected $action_type;

    public function __construct(PassengerService $service_base)
    {
        $this->service_base = $service_base;
        $this->action_type  = EmployeeLog::PASSENGER_LOG;
    }

    public function search(Request $request){
        return $this->service_base->search($request->all());
    }

    public function updateStatus(Request $request){
        return $this->service_base->updateStatus($request->all());
    }

    public function exportExcel(Request $request){
        return $this->service_base->exportExcel($request->all());
    }
    public function reportByMonth(){
        return $this->service_base->reportByMonth();
    }

}
