<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Services\MemberService;
use Barryvdh\DomPDF\Facade\Pdf;

class MemberActivityApiController extends Controller
{
    protected $service_base;

    public function __construct(
        MemberService $service_base
    )
    {
        $this->service_base         = $service_base;
    }

    public function exportActivityPdf($id)
    {
        // Dữ liệu mẫu cho hội viên
        $this->service_base->with = ['activity_records'];
        $member = $this->service_base->findById($id);
        $member = $member['data'];

        $pdf = Pdf::loadView('pdf.activity_pdf', compact('member'));
        return $pdf->download('member_activity.pdf');
    }
}
