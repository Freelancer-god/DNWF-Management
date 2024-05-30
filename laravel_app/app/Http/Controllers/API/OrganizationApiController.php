<?php


namespace App\Http\Controllers\API;


use App\Services\OrganizationService;

class OrganizationApiController extends BaseApiController
{
    protected $service_base;

    public function __construct(OrganizationService $service_base)
    {
        $this->service_base = $service_base;
    }
}
