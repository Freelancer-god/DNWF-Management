<?php


namespace App\Http\Controllers\API;


use App\Services\FileService;
use Illuminate\Http\Request;

class FileApiController extends BaseApiController
{
    protected $service_base;

    public function __construct(FileService $service_base)
    {
        $this->service_base = $service_base;
    }

    public function uploadFile(Request $request){
        $resp = $this->service_base->uploadFile($request);
        if($resp['code'] !== '200'){
            return $this->sendError($resp['message'], $resp['code']);
        }
        return $this->sendResponse($resp['data'], 'Upload success');
    }

    public function uploadImage(Request $request){
        $resp = $this->service_base->uploadImage($request);
        if($resp['code'] !== '200'){
            return $this->sendError($resp['message'], $resp['code']);
        }
        return $this->sendResponse($resp['data'], 'Upload success');
    }

    public function uploadFiles(Request $request){
        $resp = $this->service_base->uploadFiles($request);
        if($resp['code'] !== '200'){
            return $this->sendError($resp['message'], $resp['code']);
        }
        return $this->sendResponse($resp['data'], 'Upload success');
    }

    public function uploadImages(Request $request){
        $resp = $this->service_base->uploadImages($request);
        if($resp['code'] !== '200'){
            return $this->sendError($resp['message'], $resp['code']);
        }
        return $this->sendResponse($resp['data'], 'Upload success');
    }

    public function delete($id){
        $resp = $this->service_base->delete($id);
        if($resp['code'] !== '200'){
            return $this->sendError($resp['message'], $resp['code']);
        }
        return $this->sendResponse($resp['data'], 'Delete success');
    }
}
