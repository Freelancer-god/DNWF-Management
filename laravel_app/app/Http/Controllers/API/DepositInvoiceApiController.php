<?php


namespace App\Http\Controllers\API;


use App\Models\EmployeeLog;
use App\Services\Client\DepositInvoiceService;
use Illuminate\Http\Request;

class DepositInvoiceApiController extends ClientAppBaseController
{
    protected $service_base;
    protected $action_type;

    public function __construct(DepositInvoiceService $service_base)
    {
        $this->service_base = $service_base;
        $this->action_type = EmployeeLog::DEPOSIT_INVOICE_LOG;
    }

    public function search(Request $request){
        return $this->service_base->search($request->all());
    }

    public function store(Request $request){
        return $this->service_base->store($request->all());
    }

    public function confirm(Request $request){
        return $this->service_base->confirm($request->all());
    }

    public function exportExcel(Request $request){
        return $this->service_base->exportExcel($request->all());
    }
}
