<?php


namespace App\Services;


use App\Models\Club;
use App\Repositories\Interfaces\ClubRepositoryInterface;
use App\Services\Base\BaseService;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class ClubService extends BaseService
{
    protected $repo_base;
    protected $with;

    public function __construct(
        ClubRepositoryInterface $repo_base,
    ) {
        $this->repo_base                = $repo_base;
        $this->with                     = [];
    }

    public function getModelName()
    {
        return "Chi hội";
    }

    public function getTableName()
    {
        return "clubs";
    }

    public function store($inputs){
        $validate = $this->checkInputs($inputs, null);
        if($validate['is_failed']) {
            return $validate;
        }
        $input_dat = $validate['inputs'];
        if(!isset($input_dat['status'])){
            $input_dat['status'] = Club::STATUS_ENABLE;
        }
        if(!isset($input_dat['confirm_status'])) {
            $input_dat['confirm_status'] = Club::NOT_CONFIRM;
        }

        if($this->repo_base->existByWhere(['name' => $inputs['name']], null)){
            return ['code' => '005', 'message' => 'Tên chi hội'];
        }

        $data = $this->repo_base->create($input_dat);

        $reference = $this->generateReference(Club::PREFIX, $data->id);
        $data->update([
            "reference" => $reference
        ]);
        $data = $this->repo_base->findById($data->id);


        return [
            'code' => '200',
            'data' => $this->formatData($data)
        ];
    }

    public function update($id, $inputs){
        /** @var Model $model */
        $data = $this->repo_base->findById($id);
        if (!isset($data)) {
            return ['code' => '004', 'message' => $this->getModelName()];
        }
        $validate = $this->checkInputs($inputs, $id);
        if($validate['is_failed']) {
            return $validate;
        }
        $input_dat = $validate['inputs'];

        if($this->repo_base->existByWhere(['name' => $inputs['name']], $data->id)){
            return ['code' => '005', 'message' => 'Tên chi hội'];
        }

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

    public function checkInputs($inputs, $id)
    {
        if(!isset($inputs['name'])){
            return ['is_failed' => true, 'code' => '003', 'message' =>'tên chi hội'];
        }
        if(!isset($inputs['founding_date']) ){
            return ['is_failed' => true, 'code' => '003', 'message' =>'ngày thành lập'];
        }
        if(!isset($inputs['leader_name']) ){
            return ['is_failed' => true, 'code' => '003', 'message' =>'chi hội trưởng'];
        }
        if(!isset($inputs['phone']) ){
            return ['is_failed' => true, 'code' => '003', 'message' => 'số điện thoại'];
        }
        if(!isset($inputs['phone_zalo']) ){
            return ['is_failed' => true, 'code' => '003', 'message' => 'số điện thoại zalo'];
        }
        if(!isset($inputs['media']) ){
            return ['is_failed' => true, 'code' => '003', 'message' => 'hình ảnh'];
        }

        return [
            'is_failed' => false,
            'inputs' => $inputs
        ];
    }
}
