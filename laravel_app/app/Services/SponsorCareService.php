<?php


namespace App\Services;



use App\Repositories\Interfaces\SponsorCareRepositoryInterface;
use App\Services\Base\BaseService;
use App\Models\SponsorCare;
use App\Models\Sponsor;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class SponsorCareService extends BaseService
{
    protected $repo_base;
    protected $with;

    public function __construct(
        SponsorCareRepositoryInterface $repo_base,
    ) {
        $this->repo_base                = $repo_base;
        $this->with                     = [];
    }

    public function getModelName()
    {
        return " Chăm sóc nhà tài trợ";
    }

    public function getTableName()
    {
        return "sponsor_care";
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

        $data = $this->repo_base->update($id, $input_dat);
        $data = $this->repo_base->findById($data->id);
        return [
            'code' => '200',
            'data' => $this->formatData($data)
        ];
    }

    public function checkInputs($inputs, $id)
    {
        $errors = [];

        // Kiểm tra loại công việc
        if (!isset($inputs['job_type']) || empty($inputs['job_type'])) {
            $errors[] = 'Loại công việc không được để trống';
        }

        // Kiểm tra nội dung công việc
        if (!isset($inputs['job_content']) || empty($inputs['job_content'])) {
            $errors[] = 'Nội dung công việc không được để trống';
        }

        // Kiểm tra người thực hiện
        if (!isset($inputs['executor']) || empty($inputs['executor'])) {
            $errors[] = 'Người thực hiện không được để trống';
        }

        // Kiểm tra trạng thái
        if (!isset($inputs['status']) || empty($inputs['status'])) {
            $errors[] = 'Trạng thái không được để trống';
        }

        // Kiểm tra mã nhà tài trợ
        if (!isset($inputs['sponsor_id']) || empty($inputs['sponsor_id'])) {
            $errors[] = 'Mã nhà tài trợ không được để trống';
        }elseif (!!Sponsor::idExists($id)) {
            $errors[] = 'Mã nhà tài trợ không hợp lệ';
        }

        // Nếu có lỗi, trả về thông báo lỗi
        if (!empty($errors)) {
            return ['is_failed' => true, 'message' => implode(', ', $errors)];
        }

        // Nếu không có lỗi, trả về dữ liệu đầu vào cho việc xử lý tiếp theo
        return ['is_failed' => false, 'inputs' => $inputs];
    }
}
