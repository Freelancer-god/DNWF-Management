<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\EmployeeService;

class EmployeeController extends Controller
{
//    protected $service_base;
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(
//        EmployeeService $service_base
    )
    {
        $this->middleware('auth');
        $this->middleware(['permission:view-employee, guard:web'], ['only' => ['index']]);
//        $this->service_base = $service_base;
    }


    public function index()
    {
        return view('admin.employee_list.index');
    }

//    public function profile($id) {
//        $user = null;
//        $data = $this->service_base->findById($id);
//        if($data['code'] == '200'){
//            $user = $data['data'];
//        }
//        return view('admin.employees.profile', compact('user'));
//    }
}
