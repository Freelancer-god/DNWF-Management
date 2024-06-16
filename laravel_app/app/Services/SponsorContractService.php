<?php


namespace App\Services;


use App\Models\SponsorContract;
use App\Repositories\Interfaces\SponsorContractRepositoryInterface;
use App\Services\Base\BaseService;
use App\Models\Sponsor;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

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

    public function groupByUnit()
    {
        // Query to group sponsor contracts by unit and categorize by sponsor type
        $results = SponsorContract::select('unit', 'sponsor.sponsor_type as sponsor_type', \DB::raw('count(sponsor_contract.id) as total_contracts'), \DB::raw('sum(sponsor_contract.value) as total_value'))
            ->join('sponsor', 'sponsor_contract.sponsor_id', '=', 'sponsor.id')
            ->groupBy('unit', 'sponsor_type')
            ->get();

        // Transform the results into the desired format
        $groupedData = [];
        foreach ($results as $result) {
            $unit = $result->unit;
            $type = $result->sponsor_type == 'individual' ? 'individual' : 'organization';

            if (!isset($groupedData[$unit])) {
                $groupedData[$unit] = [
                    'individual' => [
                        'total_contracts' => 0,
                        'total_value' => 0,
                    ],
                    'organization' => [
                        'total_contracts' => 0,
                        'total_value' => 0,
                    ],
                ];
            }

            $groupedData[$unit][$type]['total_contracts'] += $result->total_contracts;
            $groupedData[$unit][$type]['total_value'] += $result->total_value;
        }

        return  [
            'code' => '200',
            'data' => $groupedData
        ];
    }

    public function getSponsorStatusByUnit($unit)
    {
        $sponsorContracts = SponsorContract::where('unit', $unit)
            ->with('sponsor')
            ->get();

        $groupedData = [];

        foreach ($sponsorContracts as $contract) {
            $key = $contract->introducer . '_' . $contract->sponsor_id . '_' . $contract->unit;

            if (!isset($groupedData[$key])) {
                $groupedData[$key] = [
                    'introducer' => $contract->introducer,
                    'sponsor_name' => $contract->sponsor->name,
                    'sponsor_type' => $contract->sponsor->sponsor_type,
                    'total_value' => 0,
                ];
            }

            $groupedData[$key]['total_value'] += $contract->value;
        }

        // Transform associative array into indexed array for consistent JSON response
        return  [
            'code' => '200',
            'data' => array_values($groupedData)
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

        // Kiểm tra người giới thiệu
        if (!isset($inputs['introducer'])) {
            $errors[] = 'Người giới thiệu không được để trống';
        }

        // Kiểm tra đơn vị tài trợ
        if (!isset($inputs['unit'])) {
            $errors[] = 'Đơn vị tài trợ không được để trống';
        }
    
        // Nếu có lỗi, trả về thông báo lỗi
        if (!empty($errors)) {
            return ['is_failed' => true, 'code' => '003', 'message' => implode(', ', $errors)];
        }
    
        // Nếu không có lỗi, trả về dữ liệu đầu vào
        return ['is_failed' => false, 'inputs' => $inputs];
    }
    
}
