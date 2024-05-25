<?php


namespace App\Http\Controllers\API;


use App\Services\Client\MediaService;
use Illuminate\Http\Request;

class MediaApiController
{
    protected $service_base;

    public function __construct(MediaService $service_base)
    {
        $this->service_base = $service_base;
    }

    public function replaceMedia(Request $request){
        return $this->service_base->replaceMedia($request);
    }

    public function rotateMedia(Request $request){
        return $this->service_base->rotateMedia($request);
    }
}
