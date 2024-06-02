<?php


namespace App\Services;


use App\Models\CapitalManage;
use App\Repositories\Interfaces\CapitalManageRepositoryInterface;
use App\Services\Base\BaseService;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class CapitalManageService extends BaseService
{
    protected $repo_base;
    protected $with;

    public function __construct(
        CapitalManageRepositoryInterface $repo_base
    ) {
        $this->repo_base                = $repo_base;
        $this->with                     = [];
    }

    public function getModelName()
    {
        return "Quản lý tài chính";
    }

    public function getTableName()
    {
        return (new CapitalManage())->getTable();
    }

    public function store($inputs){

        $validate = $this->checkInputs($inputs, null);
        if($validate['is_failed']) {
            return $validate;
        }

        $input_dat = $validate['inputs'];
        



        $data = $this->repo_base->create($input_dat);
        $data = $this->repo_base->findById($data->id);


        return [
            'code' => '200',
            'data' => $this->formatData($data)
        ];
    }

    public function update($id, $inputs){
        $data = $this->repo_base->findById($id);
        if (!isset($data)) {
            return ['code' => '004', 'message' => $this->getModelName()];
        }
        $validate = $this->checkInputs($inputs, $id);
        if($validate['is_failed']) {
            return $validate;
        }
        $input_dat = $validate['inputs'];

        
        $data = $this->repo_base->update($id, $input_dat);
        $data = $this->repo_base->findById($data->id);
        return [
            'code' => '200',
            'data' => $this->formatData($data)
        ];
    }

    public function updateConfirmStatus($id, $inputs){
        if(!isset($inputs['confirm_status'])){
            return ['is_failed' => true, 'code' => '003', 'message' =>'trạng thái phê duyệt'];
        }

        $data = $this->repo_base->findById($id);
        if (!isset($data)) {
            return ['code' => '004', 'message' => $this->getModelName()];
        }
        $user = Auth::user();

        $data->update([
            'confirm_status' => $inputs['confirm_status'],
            'confirm_user_id' => $user->id,
            'confirm_user_name' => $user->name,
            'confirm_date' => Carbon::now()->toDateTimeString()
        ]);

        $data = $this->repo_base->findById($id);
        return [
            'code' => '200',
            'data' => $this->formatData($data)
        ];
    }

    public function generateColumn($inputs, $columns) {
        if(isset($inputs['type']) && count($inputs['type']) > 0) {
            array_push($columns, "{$this->getTableName()}.type in (". implode(',', $inputs['type']).")");
        }
        return $columns;
    }

    public function checkInputs($inputs, $id)
    {
        if(!isset($inputs['code'])){
            return ['is_failed' => true, 'code' => '003', 'message' =>'mã thu chi không tồn tại'];
        }
        if(!isset($inputs['name']) ){
            return ['is_failed' => true, 'code' => '003', 'message' =>'tên người chi'];
        }
        if(!isset($inputs['reason']) ){
            return ['is_failed' => true, 'code' => '003', 'message' =>'lý do'];
        }
        // if(!isset($inputs['sign_date']) ){
        //     return ['is_failed' => true, 'code' => '003', 'message' => 'ngày ký'];
        // }
        if(!isset($inputs['spending_type']) ){
            return ['is_failed' => true, 'code' => '003', 'message' => 'loại thu chi'];
        }
        if(!isset($inputs['account']) ){
            return ['is_failed' => true, 'code' => '003', 'message' => 'tài khoản'];
        }
        if(!isset($inputs['amount']) ){
            return ['is_failed' => true, 'code' => '003', 'message' => 'số tiền'];
        }
        if(!isset($inputs['pic_path']) ){
            return ['is_failed' => true, 'code' => '003', 'message' => 'hình ảnh'];
        }

        return [
            'is_failed' => false,
            'inputs' => $inputs
        ];
    }

    public function formatData($data){
        $res = json_decode($data, true);
        $res['capital'] = [];
        if(isset($data->capital) && count($data->capital) > 0){
            $res['capital'] = json_decode($data->capital, true);
        }

        return $res;
    }
}
