<?php


namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Services\ExcelExportService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ExportApiController extends Controller
{
    protected $excelExportService;

    public function __construct(ExcelExportService $excelExportService)
    {
        $this->excelExportService = $excelExportService;
    }

    public function exportMembers(Request $request)
    {
        $columns = $request->get('columns', []);
        $headers = $request->get('headers', []);
        $conditions = $request->get('conditions', []);

        $query = DB::table('members');

        // Áp dụng các điều kiện vào query
        foreach ($conditions as $condition) {
            $query->where($condition['field'], $condition['operator'], $condition['value']);
        }

        $data = $query->get()->toArray();
        $data = json_decode(json_encode($data), true); // Chuyển đổi kết quả thành mảng

        $filePath = $this->excelExportService->export($columns, $headers, $data, 'hoi_vien');

        return response()->download($filePath)->deleteFileAfterSend(true);
    }
}
