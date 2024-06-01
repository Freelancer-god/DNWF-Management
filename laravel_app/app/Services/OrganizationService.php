<?php


namespace App\Services;


use App\Models\Club;
use App\Models\Organization;
use App\Repositories\Interfaces\ClubRepositoryInterface;
use App\Repositories\Interfaces\OrganizationRepositoryInterface;
use App\Services\Base\BaseService;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class OrganizationService extends BaseService
{
    protected $repo_base;
    protected $repo_club;
    protected $with;

    public function __construct(
        OrganizationRepositoryInterface $repo_base,
        ClubRepositoryInterface $repo_club
    )
    {
        $this->repo_base = $repo_base;
        $this->repo_club = $repo_club;
        $this->with = [];
    }

    public function getModelName()
    {
        return 'Tổ chức';
    }

    public function getTableName()
    {
        return (new Organization())->getTable();
    }

    public function store($inputs){
        $validate = $this->checkInputs($inputs, null);
        if($validate['is_failed']) {
            return $validate;
        }
        $input_dat = $validate['inputs'];
        if(!isset($input_dat['status'])){
            $input_dat['status'] = Organization::STATUS_ENABLE;
        }
        if(!isset($input_dat['confirm_status'])) {
            $input_dat['confirm_status'] = Organization::NOT_CONFIRM;
        }

        if($this->repo_base->existByWhere(['name' => $inputs['name']], null)){
            return ['code' => '005', 'message' => 'tên tổ chức'];
        }
        $club = $this->repo_club->findById($inputs['club_id']);
        if(!isset($club)){
            return ['code' => '004', 'message' => 'Chi hội'];
        }else{
            if($club->confirm_status === Club::NOT_CONFIRM){
                return ['code' => '008', 'message' => 'Chi hội'];
            }
        }

        $data = $this->repo_base->create($input_dat);

        $reference = $this->generateReference(Organization::PREFIX, $data->id);
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
            return ['code' => '005', 'message' => 'tên tổ chức'];
        }

        $club = $this->repo_club->findById($inputs['club_id']);
        if(!isset($club)){
            return ['code' => '004', 'message' => 'Chi hội'];
        }else{
            if($club->confirm_status === Club::NOT_CONFIRM){
                return ['code' => '008', 'message' => 'Chi hội'];
            }
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
            return ['is_failed' => true, 'code' => '003', 'message' =>'tên tổ chức'];
        }
        if(!isset($inputs['founding_date']) ){
            return ['is_failed' => true, 'code' => '003', 'message' =>'ngày thành lập'];
        }
        if(!isset($inputs['leader_name']) ){
            return ['is_failed' => true, 'code' => '003', 'message' =>'người chịu trách nhiệm'];
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
        if(!isset($inputs['subject_type']) ){
            return ['is_failed' => true, 'code' => '003', 'message' => 'bộ môn'];
        }
        if(!isset($inputs['club_id']) ){
            return ['is_failed' => true, 'code' => '003', 'message' => 'chi hội'];
        }
        if(!isset($inputs['address']) ){
            return ['is_failed' => true, 'code' => '003', 'message' => 'địa chỉ'];
        }
        $inputs['subject_name'] = config('enums.organization.types')[$inputs['subject_type']];

        return [
            'is_failed' => false,
            'inputs' => $inputs
        ];
    }

    public function formatData($data){
        $res = json_decode($data, true);
        $res['club'] = null;
        if(isset($data->club)){
            $res['club'] = json_decode($data->club, true);
        }
        $res['organization'] = null;
        if(isset($data->organization)){
            $res['organization'] = json_decode($data->organization, true);
        }

        return $res;
    }
}
