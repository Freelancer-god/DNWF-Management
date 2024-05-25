<?php


namespace App\Http\Controllers\API;


use App\Models\EmployeeLog;
use App\Services\Client\RatingService;
use Illuminate\Http\Request;

class RatingApiController extends ClientAppBaseController
{
    protected $service_base;
    protected $action_type;

    public function __construct(RatingService $service_base)
    {
        $this->service_base = $service_base;
        $this->action_type  = EmployeeLog::DRIVER_RATING_LOG;
    }

    public function search(Request $request){
        return $this->service_base->search($request->all());
    }

    public function exportExcel(Request $request){
        return $this->service_base->exportExcel($request->all());
    }

    public function reportRating(Request $request){
        return $this->service_base->reportRating($request->all());
    }
}
