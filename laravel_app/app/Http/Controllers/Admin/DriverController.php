<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\Client\VehicleBrandService;
use App\Services\Client\VehicleTypeService;

class DriverController extends Controller
{
    protected $service_vehicle_brand;
    protected $service_vehicle_type;
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(
        VehicleBrandService $service_vehicle_brand,
        VehicleTypeService $service_vehicle_type
    )
    {
        $this->middleware('auth');
        $this->middleware(['permission:view-driver, guard:web'], ['only' => ['index', 'index_new', 'index_active']]);
        $this->service_vehicle_brand            = $service_vehicle_brand;
        $this->service_vehicle_type             = $service_vehicle_type;
    }


    public function index()
    {
        $filter = [ 'status' => 1 ];
        $vehicle_brands = $this->service_vehicle_brand->search(['term' => [], 'page' => 1, 'limit' => 9999, 'filter' => $filter, 'order_by' => 'order_sort', 'sort' => 'asc']);
        $vehicle_types = $this->service_vehicle_type->search(['term' => [], 'page' => 1, 'limit' => 9999, 'filter' => $filter, 'order_by' => 'order_sort', 'sort' => 'asc']);
        return view('admin.drivers.index', [
            'vehicle_brands' => $vehicle_brands['data']['data'],
            'vehicle_types' => $vehicle_types['data']['data']
        ]);
    }

    public function index_new()
    {
        return view('admin.drivers.index_new');
    }

    public function index_active()
    {
        return view('admin.drivers.index_active');
    }
}
