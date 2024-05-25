<?php


namespace App\Http\Controllers\API;


use App\Services\Client\AgencyService;
use Illuminate\Http\Request;

class AgencyApiController
{
    protected $service_base;

    public function __construct(AgencyService $service_base)
    {
        $this->service_base = $service_base;
    }

    public function search(Request $request){
        return $this->service_base->search($request->all());
    }
}
