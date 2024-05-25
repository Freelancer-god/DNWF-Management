<?php


namespace App\Http\Controllers\API;


use App\Services\Client\VehicleBrandService;
use Illuminate\Http\Request;

class VehicleBrandApiController
{
    protected $service_base;

    public function __construct(VehicleBrandService $service_base)
    {
        $this->service_base = $service_base;
    }

    public function search(Request $request){
        return $this->service_base->search($request->all());
    }
}
