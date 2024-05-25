<?php


namespace App\Http\Controllers\API;


use App\Models\EmployeeLog;
use App\Services\Client\TripCardService;
use Illuminate\Http\Request;

class TripCardApiController extends ClientAppBaseController
{
    protected $service_base;
    protected $action_type;

    public function __construct(TripCardService $service_base)
    {
        $this->service_base = $service_base;
        $this->action_type  = EmployeeLog::TRIP_LOG;
    }

    public function reportMonthly(){
        return $this->service_base->reportMonthly();
    }

    public function reportMonthlyTotalTrip(){
        return $this->service_base->reportMonthlyTotalTrip();
    }

    public function reportMonthlyTotalPaid(){
        return $this->service_base->reportMonthlyTotalPaid();
    }

    public function reportTotalPaid(Request $request){
        $inputs = $request->all();
        return $this->service_base->reportTotalPaid($inputs);
    }

    public function reportTotalTrip(Request $request){
        $inputs = $request->all();
        return $this->service_base->reportTotalTrip($inputs);
    }
}
