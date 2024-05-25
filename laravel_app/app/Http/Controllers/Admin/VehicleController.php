<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;

class VehicleController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
        $this->middleware(['permission:view-vehicle, guard:web'], ['only' => ['index', 'index_insurance']]);
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('admin.vehicles.index');
    }

    public function index_insurance()
    {
        return view('admin.vehicles.index_insurance');
    }
}
