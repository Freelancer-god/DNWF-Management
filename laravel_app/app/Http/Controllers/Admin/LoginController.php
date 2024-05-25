<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\EmployeeService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Validator;

class LoginController extends Controller
{
    protected $CMS_ROUTE = '/cms';
    protected $service_base;
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(
        EmployeeService $service_base
    ) {
        $this->service_base = $service_base;
    }

    public function showLogin()
    {
        if (Auth::check()) {
            return Redirect::to($this->CMS_ROUTE);
        }
        $attributes = [
            'data-theme' => 'light'
            //            'data-type' => 'audio',
        ];

        return view('auth.login', [
            'attributes' => $attributes
        ]);
    }

    public function login(Request $request)
    {
        // validate the info, create rules for the inputs
        $rules = array(
            'username'    => 'required', // make sure the email is an actual email
            'password' => 'required|min:6', // password can only be alphanumeric and has to be greater than 3 characters
            //            'g-recaptcha-response' => 'required|captcha'
        );

        // run the validation rules on the inputs from the form
        $validator = Validator::make($request->all(), $rules);

        // if the validator fails, redirect back to the form
        if ($validator->fails()) {
            return Redirect::back()
                ->withErrors($validator) // send back all errors to the login form
                ->withInput($request->except('password')); // send back the input (not the password) so that we can repopulate the form
        } else {
            $res = $this->service_base->login($request->all());
            if ($res['code'] != '200') {
                return Redirect::back()
                    ->withErrors(['message_1' => sprintf($res['message'], '')]) // send back all errors to the login form
                    ->withInput($request->except('password'));
            }
            session()->forget('errors');
//            return Redirect::secure('/cms');
            return Redirect::to('/cms');
        }
    }

    public function doLogout()
    {
        Auth::logout();
        return Redirect::to('login');
    }
}
