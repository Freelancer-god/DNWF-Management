<?php


namespace App\Http\Controllers\API;


use App\Services\Client\LocationService;
use Illuminate\Http\Request;

class LocationApiController
{
    protected $service_base;

    public function __construct(LocationService $service_base)
    {
        $this->service_base = $service_base;
    }

    public function getTripTracker(Request $request){
        return $this->service_base->getTripTracker($request->all());
    }
}
