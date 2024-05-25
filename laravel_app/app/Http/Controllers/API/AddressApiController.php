<?php


namespace App\Http\Controllers\API;


use App\Services\Client\AddressService;
use Illuminate\Http\Request;

class AddressApiController extends ClientAppBaseController
{
    protected $service_base;

    public function __construct(AddressService $service_base)
    {
        $this->service_base = $service_base;
    }

    public function search(Request $request){
        return $this->service_base->search($request->all());
    }
}
