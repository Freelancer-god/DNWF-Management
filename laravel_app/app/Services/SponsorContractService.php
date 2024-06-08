<?php


namespace App\Services;


use App\Models\Sponsor;
use App\Repositories\Interfaces\SponsorContractRepositoryInterface;
use App\Services\Base\BaseService;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class SponsorContractService extends BaseService
{
    protected $repo_base;
    protected $with;

    public function __construct(
        SponsorContractRepositoryInterface $repo_base,
    ) {
        $this->repo_base                = $repo_base;
        $this->with                     = [];
    }

    public function getModelName()
    {
        return "Hợp đồng tài trợ";
    }

    public function getTableName()
    {
        return "sponsor_contract";
    }

    public function store($inputs)
    {
        // Kiểm tra dữ liệu đầu vào
        $validate = $this->checkInputs($inputs, null);
        if ($validate['is_failed']) {
            return $validate; // Trả về thông báo lỗi nếu dữ liệu không hợp lệ
        }
    
        // Chuẩn bị dữ liệu đầu vào
        $input_data = $validate['inputs'];
    
    
        // Tạo hợp đồng mới
        $data = $this->repo_base->create($input_data);
    
        // Trả về thông báo thành công và dữ liệu hợp đồng đã tạo
        return ['code' => '200', 'data' => $this->formatData($data)];
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
        $input_data = $validate['inputs'];

        $data = $this->repo_base->update($id, $input_data);
        $data = $this->repo_base->findById($data->id);
        return [
            'code' => '200',
            'data' => $this->formatData($data)
        ];
    }

    public function getContractsBySponsorId($id) {
        $contracts = $this->repo_base->findWhereBy(['sponsor_id'=>$id]);
        if (!$contracts) {
            return ['code' => '404', 'message' => 'Không tìm thấy hợp đồng'];
        }
        return [
            'code' => '200',
            'data' => $contracts->map(function($contract) {
                return $this->formatData($contract);
            })
        ];
    }

    public function checkInputs($inputs, $id)
    {
        $errors = [];
    
        // Kiểm tra ngày ký kết
        if (!isset($inputs['signing_date']) || empty($inputs['signing_date'])) {
            $errors[] = 'Ngày ký kết không được để trống';
        }
    
        // Kiểm tra số hợp đồng
        if (!isset($inputs['contract_number']) || empty($inputs['contract_number'])) {
            $errors[] = 'Số hợp đồng không được để trống';
        } elseif ($this->repo_base->existByWhere(['contract_number' => $inputs['contract_number']], $id)) {
            $errors[] = 'Số hợp đồng đã tồn tại';
        }
    
        // Kiểm tra mã nhà tài trợ
        if (!isset($inputs['sponsor_id']) || empty($inputs['sponsor_id'])) {
            $errors[] = 'Mã nhà tài trợ không được để trống';
        }
    
        // Kiểm tra phân loại
        if (!isset($inputs['classification']) || empty($inputs['classification'])) {
            $errors[] = 'Phân loại không được để trống';
        }
    
        // Kiểm tra nội dung
        if (!isset($inputs['details']) || empty($inputs['details'])) {
            $errors[] = 'Nội dung không được để trống';
        }
    
        // Kiểm tra giá trị
        if (!isset($inputs['value']) || empty($inputs['value'])) {
            $errors[] = 'Giá trị không được để trống';
        }
    
        // Kiểm tra thời hạn tài trợ
        if (!isset($inputs['sponsorship_duration']) || empty($inputs['sponsorship_duration'])) {
            $errors[] = 'Thời hạn tài trợ không được để trống';
        }
    
        // Nếu có lỗi, trả về thông báo lỗi
        if (!empty($errors)) {
            return ['is_failed' => true, 'code' => '400', 'message' => implode(', ', $errors)];
        }
    
        // Nếu không có lỗi, trả về dữ liệu đầu vào
        return ['is_failed' => false, 'inputs' => $inputs];
    }
    
}
