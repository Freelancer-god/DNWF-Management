<?php


namespace App\Http\Controllers\API;


use App\Services\MemberService;

class MemberApiController extends BaseApiController
{
    protected $service_base;

    public function __construct(
        MemberService $service_base
    )
    {
        $this->service_base         = $service_base;
    }
}
