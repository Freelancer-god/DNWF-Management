<?php


namespace App\Services;


use App\Models\Member;
use App\Models\Organization;
use App\Repositories\Interfaces\MemberRepositoryInterface;
use App\Repositories\Interfaces\OrganizationRepositoryInterface;
use App\Services\Base\BaseService;

class MemberService extends BaseService
{
    protected $repo_base;
    protected $repo_organization;
    protected $with;

    public function __construct(
        MemberRepositoryInterface $repo_base,
        OrganizationRepositoryInterface $repo_organization
    ) {
        $this->repo_base                = $repo_base;
        $this->repo_organization        = $repo_organization;
        $this->with                     = [];
    }
    public function getModelName()
    {
        return 'Hội viên';
    }

    public function getTableName()
    {
        return (new Member())->getTable();
    }

    public function store($inputs){
        $validate = $this->checkInputs($inputs, null);
        if($validate['is_failed']) {
            return $validate;
        }
        $input_dat = $validate['inputs'];
        if(!isset($input_dat['status'])){
            $input_dat['status'] = Member::STATUS_ENABLE;
        }
        if(!isset($input_dat['confirm_status'])) {
            $input_dat['confirm_status'] = Member::NOT_CONFIRM;
        }
        $organization = $this->repo_organization->findById($inputs['organization_id']);
        if(!isset($organization)){
            return ['code' => '004', 'message' => 'Tổ chức'];
        }else{
            if($organization->confirm_status === Organization::NOT_CONFIRM){
                return ['code' => '008', 'message' => 'Tổ chức'];
            }
        }
        $input_dat['club_id'] = $organization->club_id;

        $data = $this->repo_base->create($input_dat);

        $reference = $this->generateReference(Member::PREFIX, $data->id);
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

        $organization = $this->repo_organization->findById($inputs['organization_id']);
        if(!isset($organization)){
            return ['code' => '004', 'message' => 'Tổ chức'];
        }else{
            if($organization->confirm_status === Organization::NOT_CONFIRM){
                return ['code' => '008', 'message' => 'Tổ chức'];
            }
        }
        $input_dat['club_id'] = $organization->club_id;

        $data = $this->repo_base->update($id, $input_dat);
        $data = $this->repo_base->findById($data->id);
        return [
            'code' => '200',
            'data' => $this->formatData($data)
        ];
    }

    public function checkInputs($inputs, $id)
    {
        if(!isset($inputs['full_name'])){
            return ['is_failed' => true, 'code' => '003', 'message' =>'tên hội viên'];
        }
        if(!isset($inputs['gender']) ){
            return ['is_failed' => true, 'code' => '003', 'message' => 'giới tính'];
        }
        if(!isset($inputs['birthday']) ){
            return ['is_failed' => true, 'code' => '003', 'message' => 'ngày sinh'];
        }
        if(!isset($inputs['citizen_identify']) ){
            return ['is_failed' => true, 'code' => '003', 'message' =>'số CCCD'];
        }
        if(!isset($inputs['citizen_identify_date']) ){
            return ['is_failed' => true, 'code' => '003', 'message' => 'ngày cấp CCCD'];
        }
        if(!isset($inputs['citizen_identify_place']) ){
            return ['is_failed' => true, 'code' => '003', 'message' => 'nơi cấp CCCD'];
        }
        if(!isset($inputs['phone']) ){
            return ['is_failed' => true, 'code' => '003', 'message' => 'số điện thoại'];
        }
        if(!isset($inputs['position']) ){
            return ['is_failed' => true, 'code' => '003', 'message' => 'chức vụ'];
        }
        if(!isset($inputs['address']) ){
            return ['is_failed' => true, 'code' => '003', 'message' => 'địa chỉ'];
        }
        if(!isset($inputs['academic_level']) ){
            return ['is_failed' => true, 'code' => '003', 'message' => 'trình độ học vấn'];
        }
        if(!isset($inputs['is_partisan']) ){
            return ['is_failed' => true, 'code' => '003', 'message' => 'đảng viên'];
        }
        if(!isset($inputs['profession']) ){
            return ['is_failed' => true, 'code' => '003', 'message' => 'nghề nghiệp'];
        }
        if(!isset($inputs['work_place']) ){
            return ['is_failed' => true, 'code' => '003', 'message' => 'nơi công tác'];
        }

        if(!isset($inputs['organization_id']) ){
            return ['is_failed' => true, 'code' => '003', 'message' => 'tổ chức'];
        }

        if(!isset($inputs['role_in_organization']) ){
            return ['is_failed' => true, 'code' => '003', 'message' => 'vai trò trong tổ chức'];
        }

        if(!isset($inputs['media']) ){
            return ['is_failed' => true, 'code' => '003', 'message' => 'hình ảnh'];
        }

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

        return $res;
    }
}
