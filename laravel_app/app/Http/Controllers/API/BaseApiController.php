<?php


namespace App\Http\Controllers\API;


use Illuminate\Http\Request;

abstract class BaseApiController extends AppBaseController
{
    protected $service_base;

    public function findAll(){
        $resp = $this->service_base->getAll();
        return $this->sendResponse($resp['data'], 'Find all success');
    }

    public function store(Request $request){
        $inputs = $request->all();
        $resp = $this->service_base->store($inputs);
        if($resp['code'] !== '200'){
            return $this->sendError($resp['message'], $resp['code']);
        }
        return $this->sendResponse($resp['data'], 'Store success');
    }

    public function update($id, Request $request){
        $inputs = $request->all();
        $resp = $this->service_base->update($id, $inputs);
        if($resp['code'] !== '200'){
            return $this->sendError($resp['message'], $resp['code']);
        }
        return $this->sendResponse($resp['data'], 'Update success');
    }

    public function findById($id){
        $resp = $this->service_base->findById($id);
        if($resp['code'] !== '200'){
            return $this->sendError($resp['message'], $resp['code']);
        }
        return $this->sendResponse($resp['data'], 'Find by id success');
    }

    public function destroy($id){
        $resp = $this->service_base->destroy($id);
        if($resp['code'] !== '200'){
            return $this->sendError($resp['message'], $resp['code']);
        }
        return $this->sendResponse($resp['message'], 'Delete success');
    }

    public function search(Request $request){
        $inputs = $request->all();
        $resp = $this->service_base->search($inputs);
        if($resp['code'] !== '200'){
            return $this->sendError($resp['message'], $resp['code']);
        }
        return $this->sendResponse($resp['data'], 'Search success');
    }

    public function getDictByIds(Request $request){
        $inputs = $request->all();
        $resp = $this->service_base->getDictByIds($inputs);
        if($resp['code'] !== '200'){
            return $this->sendError($resp['message'], $resp['code']);
        }
        return $this->sendResponse($resp['data'], 'Get dict by id success');
    }

    public function getDictByColumns(Request $request){
        $inputs = $request->all();
        $resp = $this->service_base->getDictByColumns($inputs);
        if($resp['code'] !== '200'){
            return $this->sendError($resp['message'], $resp['code']);
        }
        return $this->sendResponse($resp['data'], 'Get dict by columns success');
    }
}
