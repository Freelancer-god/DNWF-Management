<?php


namespace App\Http\Controllers\API;


use App\Models\EmployeeLog;
use App\Services\Client\DriverService;
use Illuminate\Http\Request;

class DriverApiController extends ClientAppBaseController
{
    protected $service_base;
    protected $action_type;

    public function __construct(DriverService $service_base)
    {
        $this->service_base = $service_base;
        $this->action_type = EmployeeLog::DRIVER_LOG;
    }

    public function search(Request $request){
        return $this->service_base->search($request->all());
    }

    public function searchDriver(Request $request){
        return $this->service_base->searchDriver($request->all());
    }

    public function confirmForm(Request $request){
        return $this->service_base->confirmForm($request->all());
    }

    public function setReceiveRide(Request $request){
        return $this->service_base->setReceiveRide($request->all());
    }

    public function updateStatus(Request $request){
        return $this->service_base->updateStatus($request->all());
    }

    public function changeDriverType(Request $request){
        return $this->service_base->changeDriverType($request->all());
    }

    public function exportExcel(Request $request){
        return $this->service_base->exportExcel($request->all());
    }

    public function exportExcelNew(Request $request){
        return $this->service_base->exportExcelNew($request->all());
    }

    public function reportByMonth(){
        return $this->service_base->reportByMonth();
    }

    public function updateAgency(Request $request){
        return $this->service_base->updateAgency($request->all());
    }
}
