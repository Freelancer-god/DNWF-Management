<?php


namespace App\Services;


use App\Models\ActivityRecord;
use App\Models\File;
use App\Repositories\Interfaces\ActivityRecordRepositoryInterface;
use App\Repositories\Interfaces\FileRepositoryInterface;
use App\Services\Base\BaseService;

class ActivityRecordService extends BaseService
{
    protected $repo_base;
    protected $repo_file;
    protected $with;

    public function __construct(ActivityRecordRepositoryInterface $repo_base,
                                FileRepositoryInterface $repo_file)
    {
        $this->repo_base = $repo_base;
        $this->repo_file = $repo_file;
        $this->with = [];
    }

    public function getModelName()
    {
        return 'Quá trình hoạt động';
    }

    public function getTableName()
    {
        return (new ActivityRecord())->getTable();
    }

    public function store($inputs){
        $validate = $this->checkInputs($inputs, null);
        if($validate['is_failed']) {
            return $validate;
        }
        $input_dat = $validate['inputs'];

        $data = $this->repo_base->create($input_dat);

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

        $data = $this->repo_base->update($id, $input_dat);

        if(isset($inputs['media_id'])){
            $data = $this->updateMedia($data, $inputs['media_id']);
            if($data['is_failed']){
                return $data;
            }
            $data = $data['data'];
        }

        $data = $this->repo_base->findById($data->id);
        return [
            'code' => '200',
            'data' => $this->formatData($data)
        ];
    }

    public function checkInputs($inputs, $id)
    {
        if(!isset($inputs['name'])){
            return ['is_failed' => true, 'code' => '003', 'message' =>'tên hoạt động'];
        }
        if(!isset($inputs['start_date'])){
            return ['is_failed' => true, 'code' => '003', 'message' =>'ngày bắt đầu'];
        }
        if(!isset($inputs['end_date'])){
            return ['is_failed' => true, 'code' => '003', 'message' =>'ngày kết thúc'];
        }
        if(!isset($inputs['result'])){
            return ['is_failed' => true, 'code' => '003', 'message' =>'kết quả'];
        }
        if(!isset($inputs['media_id'])){
            return ['is_failed' => true, 'code' => '003', 'message' =>'hình ảnh'];
        }

        if(!isset($inputs['object_id'])){
            return ['is_failed' => true, 'code' => '003', 'message' =>'object_id'];
        }
        if(!isset($inputs['object_type'])){
            return ['is_failed' => true, 'code' => '003', 'message' =>'loại'];
        }

        return [
          'is_failed' => false,
          'inputs' => $inputs
        ];
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
}
