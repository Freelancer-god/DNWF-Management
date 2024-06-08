<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Services\ClubService;
use App\Services\MemberService;
use App\Services\OrganizationService;
use Barryvdh\DomPDF\Facade\Pdf;

class OrganizationActivityApiController extends Controller
{
    protected $service_base;

    public function __construct(
        OrganizationService $service_base
    )
    {
        $this->service_base         = $service_base;
    }

    public function exportActivityPdf($id)
    {
        // Dữ liệu mẫu cho hội viên
        $member = $this->service_base->findById($id);
        $member = $member['data'];

        $pdf = Pdf::loadView('pdf.activity_pdf', compact('member'));
        return $pdf->download('_activity.pdf');
    }
}
