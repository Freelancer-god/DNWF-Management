<?php


namespace App\Http\Controllers\API;


use App\Services\Client\VehicleBrandModelService;
use Illuminate\Http\Request;

class VehicleBrandModelApiController
{
    protected $service_base;

    public function __construct(VehicleBrandModelService $service_base)
    {
        $this->service_base = $service_base;
    }

    public function search(Request $request){
        return $this->service_base->search($request->all());
    }
}
