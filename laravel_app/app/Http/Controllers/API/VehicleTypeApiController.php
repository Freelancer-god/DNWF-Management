<?php


namespace App\Http\Controllers\API;


use App\Services\Client\VehicleTypeService;
use Illuminate\Http\Request;

class VehicleTypeApiController
{
    protected $service_base;

    public function __construct(VehicleTypeService $service_base)
    {
        $this->service_base = $service_base;
    }

    public function search(Request $request){
        return $this->service_base->search($request->all());
    }
}
