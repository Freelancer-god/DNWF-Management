<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Barryvdh\DomPDF\Facade\Pdf;

class MemberActivityApiController extends Controller
{
    public function exportMemberActivityPdf()
    {
        // Dữ liệu mẫu cho hội viên
        $member = [
            'name' => 'Nguyen Van A',
            'membership_id' => '123456',
            'activities' => [
                ['date' => '2023-01-10', 'activity' => 'Tham gia buổi họp định kỳ'],
                ['date' => '2023-02-15', 'activity' => 'Tham gia hoạt động từ thiện'],
                ['date' => '2023-03-20', 'activity' => 'Tham gia buổi hội thảo về công nghệ'],
            ]
        ];


        $pdf = Pdf::loadView('pdf.activity_pdf', compact('member'));
        return $pdf->download('member_activity.pdf');
//        return $member;
    }
}
