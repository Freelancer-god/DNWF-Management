<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Services\ClubService;
use App\Services\MemberService;
use Barryvdh\DomPDF\Facade\Pdf;

class ClubActivityApiController extends Controller
{
    protected $service_base;

    public function __construct(
        ClubService $service_base
    )
    {
        $this->service_base         = $service_base;
    }

    public function exportMemberActivityPdf($id)
    {
        // Dữ liệu mẫu cho hội viên
        $member = $this->service_base->findById($id);
        $member = $member['data'];

        $pdf = Pdf::loadView('pdf.activity_pdf', compact('member'));
        return $pdf->download('member_activity.pdf');
    }
}
