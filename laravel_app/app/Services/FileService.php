<?php


namespace App\Services;


use App\Models\File;
use App\Services\Base\BaseService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FileService extends BaseService
{

    public function getModelName()
    {
        return 'File';
    }

    public function getTableName()
    {
        return (new File())->getTable();
    }

    public function uploadImages(Request $request)
    {
        $request->validate([
            'images.*' => 'required|image|mimes:jpeg,png,jpg,gif|max:20480',
        ]);

        $images = $request->file('images');
        $folder = $request->get('fileable_type');

        $uploadedImages  = [];
        foreach ($images as $image) {
            $fileModel = $this->createFile($image, $folder, File::TYPE_MEDIA);

            $uploadedImages[] = $fileModel;
        }
        return [
            'code' => '200',
            'data' => $this->formatSelectData($uploadedImages)
        ];
    }

    public function uploadImage($request)
    {
        try {
            $request->validate([
                'image.*' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            ]);
        }catch (\Exception $e) {
            return [
                'code' => '090',
                'messgae' => 'Không phải file tài liệu'
            ];
        }

        $image = $request->file('image');
        $folder = $request->get('fileable_type');

        $fileModel = $this->createFile($image, $folder, File::TYPE_MEDIA);
        return [
            'code' => '200',
            'data' => $this->formatData($fileModel)
        ];
    }

    public function uploadFile($request)
    {
        try {
            $request->validate([
                'file' => 'required|mimes:pdf,doc,docx,txt,jpeg,png,jpg|max:10240', // max:10240 means max 10MB
            ]);
        }catch (\Exception $e){
            return [
                'code' => '090',
                'messgae' => 'Không phải file tài liệu'
            ];
        }


        $file = $request->file('file');
        $folder = $request->get('fileable_type');

        $fileModel = $this->createFile($file, $folder, File::TYPE_FILE);
        return [
            'code' => '200',
            'data' => $this->formatData($fileModel)
        ];
    }

    public function uploadFiles(Request $request)
    {
        $request->validate([
            'files' => 'required|mimes:pdf,doc,docx,txt,jpeg,png,jpg|max:102400', // max:10240 means max 100MB
        ]);

        $files = $request->file('files');
        $folder = $request->get('fileable_type');

        $uploadedFiles  = [];
        foreach ($files as $file) {
           $fileModel = $this->createFile($file, $folder, File::TYPE_FILE);

           $uploadedFiles[] = $fileModel;
        }
//        return $this->formatSelectData($uploadedImages);
        return [
            'code' => '200',
            'data' => $this->formatSelectData($uploadedFiles)
        ];
    }

    public function formatData($data)
    {
        $res = json_decode($data, true);
        $res['file_path'] = '/storage/' . $data->file_path;
        return $res;
    }


    public function createFile($image, $folder, $type){
        $imageName = time().'_'.$image->getClientOriginalName();
        $imagePath = $image->storeAs($folder, $imageName, 'public');
        $fileName = time().'.'.$image->extension();

        $fileModel = new File();
        $fileModel->file_name = $fileName;
        $fileModel->file_path = $imagePath;
        $fileModel->type = $type;
        $fileModel->file_type = $image->extension();
        $fileModel->save();

        return $fileModel;
    }

    public function delete($fileId){
        $file = File::where('id', $fileId)->first();

        if (!$file) {
            return response()->json(['error' => 'File not found'], 404);
        }

        Storage::disk('public')->delete($file->file_path);
        $file->delete();

        return [
            'code' => '200',
            'data' => $this->formatData($file)
        ];
    }
}
