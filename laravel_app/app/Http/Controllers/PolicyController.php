<?php

namespace App\Http\Controllers;

use App\Services\ConfigService;

class PolicyController extends Controller
{
    protected $service_configs;

    public function __construct(
        ConfigService $service_configs
    ) {
        $this->service_configs              = $service_configs;
    }

    public function index($slug)
    {
        $config = $this->service_configs->findOneBy([ 'slug' => $slug ]);
        return view('policy.index', [
            'config' => $config
        ]);
    }
}
