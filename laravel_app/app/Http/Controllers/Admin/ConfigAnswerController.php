<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;

class ConfigAnswerController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
        $this->middleware(['permission:view-answer, guard:web'], ['only' => ['index']]);
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('admin.config_answer.index');
    }
}
