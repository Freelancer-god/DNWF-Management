<?php

use App\Http\Controllers\Admin\ConfigAnswerController;
use App\Http\Controllers\Admin\ConfigQuestionController;
use App\Http\Controllers\Admin\ConfigInforController;
use App\Http\Controllers\Admin\DriverDepositTransactionController;
use App\Http\Controllers\Admin\RatingController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\LoginController;
use App\Http\Controllers\Admin\EmployeeController;
use App\Http\Controllers\Admin\HomeController;
use App\Http\Controllers\Admin\RoleController;
use App\Http\Controllers\Admin\PassengerController;
use App\Http\Controllers\Admin\InvoiceController;
use App\Http\Controllers\Admin\DriverController;
use App\Http\Controllers\Admin\VehicleController;
use App\Http\Controllers\Admin\TripController;
use App\Http\Controllers\Admin\NotificationController;
use App\Http\Controllers\PolicyController;
use App\Http\Controllers\Admin\SupportController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

//Route::get('/', function () {
//    return view('welcome');
//});
Route::get('/', [HomeController::class, 'index']);
Route::get('/cms', [HomeController::class, 'index']);

Route::get('/logout', [LoginController::class, 'doLogout']);
Route::get('/login', [LoginController::class, 'showLogin'])->name('login');
Route::get('/', [LoginController::class, 'showLogin']);
Route::post('/login', [LoginController::class, 'login']);

Route::group(['prefix' => 'cms'], function () {
    Route::get('/dashboard', [HomeController::class, 'dashboard'])->name('dashboard');
    // Role
    Route::group(['prefix' => 'roles'], function () {
        Route::get('/', [RoleController::class, 'index'])->name('roles.index');
    });
    // employee_list
    Route::group(['prefix' => 'employees'], function () {
        Route::get('/', [EmployeeController::class, 'index'])->name('employees.index');
    });
});
