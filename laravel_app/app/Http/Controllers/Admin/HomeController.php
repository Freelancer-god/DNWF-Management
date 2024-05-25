<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return redirect('/cms/dashboard');
    //    return view('admin.home');
    }
    public function dashboard()
    {
        // return redirect('/cms/dashboard');
       return view('admin.home');
    }

    public function homeIndex()
    {
        return redirect('admin.cms');
    }

    public function cms()
    {
        return view('auth.login');
    }

    public function home()
    {
        return redirect('cms/home');
    }
}
