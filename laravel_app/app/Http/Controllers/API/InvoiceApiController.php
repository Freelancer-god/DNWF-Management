<?php


namespace App\Http\Controllers\API;


use App\Models\EmployeeLog;
use App\Services\Client\InvoiceService;
use Illuminate\Http\Request;

class InvoiceApiController extends ClientAppBaseController
{
    protected $service_base;
    protected $action_type;

    public function __construct(InvoiceService $service_base)
    {
        $this->service_base = $service_base;
        $this->action_type  = EmployeeLog::INVOICE_LOG;
    }

    public function search(Request $request){
        return $this->service_base->search($request->all());
    }

    public function exportExcel(Request $request){
        return $this->service_base->exportExcel($request->all());
    }
}
