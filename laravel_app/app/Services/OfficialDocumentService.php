<?php


namespace App\Services;



use App\Repositories\Interfaces\OfficialDocumentRepositoryInterface;
use App\Repositories\Interfaces\FileRepositoryInterface;
use App\Services\Base\BaseService;
use Illuminate\Database\Eloquent\Model;
use App\Models\File;
class OfficialDocumentService extends BaseService
{
    protected $repo_base;
    protected $with;

    public function __construct(
        OfficialDocumentRepositoryInterface $repo_base,
        FileRepositoryInterface         $repo_file

    ) {
        $this->repo_base                = $repo_base;
        $this->repo_file                = $repo_file;
        $this->with                     = [];
    }

    public function getModelName()
    {
        return " Quản lí văn thư";
    }

    public function getTableName()
    {
        return "official_documents";
    }

    public function store($request){
        $fileId = null;
        $validate = $this->checkInputs($request->all(), null);
        if($validate['is_failed']) {
            return $validate;
        }
        if ($request->hasFile('file')) {
            try {
                $request->validate([
                    'file' => 'required|mimes:pdf,doc,docx,txt,jpeg,png,jpg|max:10240', // max:10240 means max 10MB
                ]);
            } catch (\Exception $e) {
                return [
                    'code' => '090',
                    'messgae' => 'Không phải file tài liệu'
                ];
            }

            // // upload file
            $file = $request->file('file');
            $folder = $request->get('fileable_type');
            $imageName = time() . '_' . $file->getClientOriginalName();
            $imagePath = $file->storeAs($folder, $imageName, 'public');
            $fileName = time() . '.' . $file->extension();

            $fileModel = new File();
            $fileModel->file_name = $fileName;
            $fileModel->file_path = $imagePath;
            $fileModel->type = File::TYPE_FILE;
            $fileModel->file_type = $file->extension();
            $fileModel->save();

            // Lấy ID của file vừa lưu
            $fileId = $fileModel->id;
        }

        // Thêm ID của file vào trường attachment
        $input_data = $validate['inputs'];
        $input_data['attachment'] = $fileId;
        $data = $this->repo_base->create($input_data);

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
            'data' => $data
        ];
    }
    public function checkInputs($inputs,$id) {

        $errors = [];

        // Kiểm tra và ánh xạ dữ liệu vào các trường tương ứng của bảng
        if (!isset($inputs['document_number']) || empty($inputs['document_number'])) {
            $errors[] = 'Số hiệu văn bản là bắt buộc';
        }
    
        if (!isset($inputs['issue_date']) || empty($inputs['issue_date'])) {
            $errors[] = 'Ngày ban hành là bắt buộc';
        } else {
            $inputs['issue_date'] = date('Y-m-d', strtotime($inputs['issue_date']));
        }
    
        if (!isset($inputs['issued_by']) || empty($inputs['issued_by'])) {
            $errors[] = 'Nơi ban hành là bắt buộc';
        }
    
        if (!isset($inputs['document_type'])) {
            $errors[] = 'Loại văn bản là bắt buộc';
        }
    
        if (!isset($inputs['status'])) {
            $errors[] = 'Trạng thái là bắt buộc';
        }

        if (!isset($inputs['summary']) || empty($inputs['summary'])) {
            $errors[] = 'Trích yếu văn bản là bắt buộc';
        }
    
        if (!isset($inputs['signed_by']) || empty($inputs['signed_by'])) {
            $errors[] = 'Người ký là bắt buộc';
        }
    
        if (!isset($inputs['recipient']) || empty($inputs['recipient'])) {
            $errors[] = 'Nơi nhận là bắt buộc';
        }
    
        // Nếu có lỗi, trả về thông báo lỗi
        if (!empty($errors)) {
            return ['is_failed' => true, 'message' => implode(', ', $errors)];
        }
    
    
        // Nếu không có lỗi, trả về dữ liệu đầu vào cho việc xử lý tiếp theo
        return ['is_failed' => false, 'inputs' => $inputs];
    }
}
