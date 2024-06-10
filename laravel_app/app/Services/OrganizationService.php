<?php


namespace App\Services;


use App\Models\Club;
use App\Models\File;
use App\Models\Organization;
use App\Repositories\Interfaces\ActivityRecordRepositoryInterface;
use App\Repositories\Interfaces\ClubRepositoryInterface;
use App\Repositories\Interfaces\FileRepositoryInterface;
use App\Repositories\Interfaces\OrganizationRepositoryInterface;
use App\Services\Base\BaseService;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class OrganizationService extends BaseService
{
    protected $repo_base;
    protected $repo_club;
    protected $repo_file;
    protected $repo_activity_record;
    protected $with;

    public function __construct(
        OrganizationRepositoryInterface $repo_base,
        ClubRepositoryInterface $repo_club,
        FileRepositoryInterface $repo_file,
        ActivityRecordRepositoryInterface $repo_activity_record
    )
    {
        $this->repo_base = $repo_base;
        $this->repo_club = $repo_club;
        $this->repo_file = $repo_file;
        $this->repo_activity_record = $repo_activity_record;
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

//        $data = $this->updateMedia($data, $inputs['media_id']);
//        if($data['is_failed']){
//            return $data;
//        }
//        $data = $data['data'];

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

//        $data = $this->updateMedia($data, $inputs['media_id']);
//        if($data['is_failed']){
//            return $data;
//        }
//        $data = $data['data'];

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
//        if(!isset($inputs['media_id']) ){
//            return ['is_failed' => true, 'code' => '003', 'message' => 'hình ảnh'];
//        }
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

        $res['activity_records']= [];
        if(isset($data->activity_records)){
            $res['activity_records'] = json_decode($data->activity_records, true);
        }

        return $res;
    }

    public function updateMedia($data, $media_id)
    {
        $media = $this->repo_file->findOneBy([
            'id' => $media_id,
            'type' => File::TYPE_MEDIA
        ]);
        if (!isset($media)) {
            return [
                'is_failed' => true,
                'code' => '008',
                'message' => 'Hình ảnh'
            ];
        }
        $data_media = [
            'id' => $media_id,
            'path' => 'storage/' . $media->file_path
        ];
        $data->update([
            'media' => json_encode($data_media)
        ]);
        $media->update([
            'fileable_id' => $data->id,
            'fileable_type' => 'members'
        ]);
        return [
            'is_failed' => false,
            'data' => $data
        ];
    }

    public function getActivityRecord($id){
        $activity_records = $this->repo_activity_record->findWhereBy([
            'object_type' => $this->getTableName(),
            'object_id' => $id
        ]);

        return [
            'code' => '200',
            'data' => $this->formatSelectDataActivityRecord($activity_records)
        ];
    }

    public function formatSelectDataActivityRecord($datas) {
        $res = [];
        foreach($datas as $data) {
            array_push($res, $this->formatDataActivityRecord($data));
        }
        return $res;
    }

    public function formatDataActivityRecord($data){
        $res = json_decode($data, true);
        if(isset($res['media'])){
            $res['media'] = json_decode($res['media'], true);
        } else {
            $res['media'] = [];
        }

        return $res;
    }
}
