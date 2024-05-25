<?php


namespace App\Http\Controllers\API;


use App\Services\Client\RegionService;
use Illuminate\Http\Request;

class RegionApiController
{
    protected $service_base;

    public function __construct(RegionService $service_base)
    {
        $this->service_base = $service_base;
    }

    public function search(Request $request){
        return $this->service_base->search($request->all());
    }
}
