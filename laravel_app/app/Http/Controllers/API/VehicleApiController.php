<?php


namespace App\Http\Controllers\API;


use App\Services\Client\VehicleService;
use Illuminate\Http\Request;

class VehicleApiController
{
    protected $service_base;

    public function __construct(VehicleService $service_base)
    {
        $this->service_base = $service_base;
    }

    public function search(Request $request){
        return $this->service_base->search($request->all());
    }

    public function exportExcel(Request $request){
        return $this->service_base->exportExcel($request->all());
    }

    public function exportInsuranceExcel(Request $request){
        return $this->service_base->exportInsuranceExcel($request->all());
    }

}
