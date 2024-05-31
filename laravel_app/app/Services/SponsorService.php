<?php


namespace App\Services;


use App\Models\Sponsor;
use App\Repositories\Interfaces\SponsorRepositoryInterface;
use App\Services\Base\BaseService;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class SponsorService extends BaseService
{
    protected $repo_base;
    protected $with;

    public function __construct(
        SponsorRepositoryInterface $repo_base,
    ) {
        $this->repo_base                = $repo_base;
        $this->with                     = [];
    }

    public function getModelName()
    {
        return "Nhà tài trợ";
    }

    public function getTableName()
    {
        return "sponsor";
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

        // Kiểm tra loại nhà tài trợ
        if (!isset($inputs['sponsor_type']) || empty($inputs['sponsor_type'])) {
            $errors[] = 'Loại nhà tài trợ không được để trống';
        }

        // Kiểm tra phương thức tài trợ
        if (!isset($inputs['method']) || empty($inputs['method'])) {
            $errors[] = 'Phương thức tài trợ không được để trống';
        }

        // Kiểm tra tên nhà tài trợ
        if (!isset($inputs['name']) || empty($inputs['name'])) {
            $errors[] = 'Tên nhà tài trợ không được để trống';
        }

        // Kiểm tra người đại diện
        if (!isset($inputs['representative']) || empty($inputs['representative'])) {
            $errors[] = 'Người đại diện không được để trống';
        }

        // Kiểm tra ngày sinh của người đại diện
        if (!isset($inputs['representative_date_of_birth']) || empty($inputs['representative_date_of_birth'])) {
            $errors[] = 'Ngày sinh của người đại diện không được để trống';
        }

        // Kiểm tra số điện thoại của người đại diện
        if (!isset($inputs['representative_phone']) || empty($inputs['representative_phone'])) {
            $errors[] = 'Số điện thoại của người đại diện không được để trống';
        }

        // Kiểm tra người phụ trách
        if (!isset($inputs['person_in_charge']) || empty($inputs['person_in_charge'])) {
            $errors[] = 'Người phụ trách không được để trống';
        }

        // Kiểm tra số điện thoại của người phụ trách
        if (!isset($inputs['person_in_charge_phone']) || empty($inputs['person_in_charge_phone'])) {
            $errors[] = 'Số điện thoại của người phụ trách không được để trống';
        }

        // Kiểm tra địa chỉ nhà tài trợ
        if (!isset($inputs['sponsor_address']) || empty($inputs['sponsor_address'])) {
            $errors[] = 'Địa chỉ nhà tài trợ không được để trống';
        }

        // Kiểm tra email
        if (!isset($inputs['email']) || empty($inputs['email'])) {
            $errors[] = 'Email không được để trống';
        }

        // Nếu có lỗi, trả về thông báo lỗi
        if (!empty($errors)) {
            return ['is_failed' => true, 'message' => implode(', ', $errors)];
        }

        // Nếu không có lỗi, trả về dữ liệu đầu vào cho việc xử lý tiếp theo
        return ['is_failed' => false, 'inputs' => $inputs];
    }
}
