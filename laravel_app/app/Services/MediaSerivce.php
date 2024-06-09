<?php


namespace App\Services;



use App\Repositories\Interfaces\MediaRepositoryInterface;
use App\Services\Base\BaseService;
use Illuminate\Database\Eloquent\Model;
use App\Models\File;
class MediaSerivce extends BaseService
{
    protected $repo_base;
    protected $with;

    public function __construct(
        MediaRepositoryInterface         $repo_base,

    ) {
        $this->repo_base                = $repo_base;
        $this->with                     = [];
    }

    public function getModelName()
    {
        return " Quản lí truyền thông";
    }

    public function getTableName()
    {
        return "media";
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
            'data' => $request->all()
        ];
    }

    public function updateMedia($request){
        // $data = $this->repo_base->findById($id);
        // if (!isset($data)) {
        //     return ['code' => '004', 'message' => $this->getModelName()];
        // }
        // $validate = $this->checkInputs($request->all(), $id);
        // if($validate['is_failed']) {
        //     return $validate;
        // }
        // $input_dat = $validate['inputs'];

        // $data = $this->repo_base->update($id, $input_dat);
        // $data = $this->repo_base->findById($data->id);
        return [
            'code' => '200',
            'data' => $request->all()
        ];
    }
    public function checkInputs($inputs,$id) {
        $errors = [];

        // Kiểm tra và ánh xạ dữ liệu vào các trường tương ứng của bảng
        if (!isset($inputs['title']) || empty($inputs['title'])) {
            $errors[] = 'Tiêu đề bài viết là bắt buộc';
        }
    
        if (!isset($inputs['content']) || empty($inputs['content'])) {
            $errors[] = 'Nội dung là bắt buộc';
        }
    
        if (!isset($inputs['type']) || empty($inputs['type'])) {
            $errors[] = 'Loại truyền thông là bắt buộc';
        }
    
        if (!isset($inputs['editing_date']) || empty($inputs['editing_date'])) {
            $errors[] = 'Ngày biên tập là bắt buộc';
        } else {
            $inputs['editing_date'] = date('Y-m-d H:i:s', strtotime($inputs['editing_date']));
        }
    
        if (!isset($inputs['editor']) || empty($inputs['editor'])) {
            $errors[] = 'Người thực hiện là bắt buộc';
        }
    
        if (!isset($inputs['channel']) || empty($inputs['channel'])) {
            $errors[] = 'Kênh truyền thông là bắt buộc';
        }
    
        if (!isset($inputs['publish_date']) || empty($inputs['publish_date'])) {
            $errors[] = 'Ngày đăng là bắt buộc';
        } else {
            $inputs['publish_date'] = date('Y-m-d H:i:s', strtotime($inputs['publish_date']));
        }
    
    
        if (!isset($inputs['status']) || empty($inputs['status'])) {
            $errors[] = 'Tình trạng là bắt buộc';
        }
    
        // Nếu có lỗi, trả về thông báo lỗi
        if (!empty($errors)) {
            return ['is_failed' => true, 'code' => '003', 'message' => implode(', ', $errors)];
        }
    
    
        // Nếu không có lỗi, trả về dữ liệu đầu vào cho việc xử lý tiếp theo
        return ['is_failed' => false, 'inputs' => $inputs];
    }
}
