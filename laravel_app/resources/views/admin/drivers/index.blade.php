@extends('layouts.admin.app')
@section('lang', 'en')
@section('title', 'Tài xế chưa hoàn thành hồ sơ')
@section('content')
    <input type="hidden" id="vehicle_brands" name="vehicle_brands" value="{{ json_encode($vehicle_brands, JSON_UNESCAPED_UNICODE) }}">
    <input type="hidden" id="vehicle_types" name="vehicle_types" value="{{ json_encode($vehicle_types, JSON_UNESCAPED_UNICODE) }}">

    <div class="container-fluid">
       <div class="row">
          <div class="col-lg-12">
             <div id="dv_driver_index"></div>
          </div>
       </div>
    </div>
@endsection
