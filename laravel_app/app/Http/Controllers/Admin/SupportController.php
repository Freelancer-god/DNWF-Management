<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;

class SupportController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
        $this->middleware(['permission:view-support-service, guard:web'], ['only' => ['index']]);
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('admin.supports.index');
    }

    public function index_driver()
    {
        return view('admin.supports.index_driver');
    }
}
