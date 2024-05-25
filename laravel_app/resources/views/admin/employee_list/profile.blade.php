@extends('layouts.admin.app')
@section('lang', 'en')
@section('title', 'Thông tin nhân viên')
@section('content')
    <input type="hidden" id="data_editUserProfile" name="data_editEmployeeProfile" value="{{json_encode($user)}}" />
    <div class="container-fluid">
        <div class="row">
            <div class="col-lg-12">
                <div id="dv_employee_profile"></div>
            </div>
        </div>
    </div>
@endsection
