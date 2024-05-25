<?php


namespace App\Http\Controllers\API;

use App\Services\EmployeeService;
use Illuminate\Http\Request;

class EmployeeReportApiController
{
    protected $service_base;

    public function __construct(
        EmployeeService $service_base
    )
    {
        $this->service_base         = $service_base;
    }

    public function exportExcel(Request $request){
        $inputs = $request->all();
        return $this->service_base->exportExcel($inputs);
    }
}
