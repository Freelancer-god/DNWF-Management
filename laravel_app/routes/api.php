<?php

use App\Http\Controllers\API\ConfigApiController;
use App\Http\Controllers\API\DriverApiController;
use App\Http\Controllers\API\MediaApiController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\OtpAttemptApiController;
use App\Http\Controllers\API\EmployeeApiController;
use App\Http\Controllers\API\RoleApiController;
use App\Http\Controllers\API\DriverFormApiController;
use App\Http\Controllers\API\VehicleFormApiController;
use App\Http\Controllers\API\VehicleBrandApiController;
use App\Http\Controllers\API\VehicleTypeApiController;
use App\Http\Controllers\API\VehicleBrandModelApiController;
use App\Http\Controllers\API\PassengerApiController;
use App\Http\Controllers\API\AddressApiController;
use App\Http\Controllers\API\EmployeeReportApiController;
use App\Http\Controllers\API\TripApiController;
use App\Http\Controllers\API\RatingApiController;
use App\Http\Controllers\API\DepositInvoiceApiController;
use App\Http\Controllers\API\LocationApiController;
use App\Http\Controllers\API\SupportApiController;
use App\Http\Controllers\API\UserCommentApiController;
use App\Http\Controllers\API\InvoiceApiController;
use App\Http\Controllers\API\QuestionApiController;
use App\Http\Controllers\API\AnswerApiController;
use App\Http\Controllers\API\TripCardApiController;
use App\Http\Controllers\API\VehicleApiController;
use App\Http\Controllers\API\NotificationApiController;
use App\Http\Controllers\API\AgencyApiController;
use App\Http\Controllers\API\RegionApiController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

//Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//    return $request->user();
//});
/*
 * sample route
Route::group(['prefix' => 'base'], function(){
    Route::get('/findAll', [BaseApiController::class, 'findAll']);
    Route::post('/store', [BaseApiController::class, 'store']);
    Route::post('/update/{id}', [BaseApiController::class, 'update']);
    Route::get('/findById/{id}', [BaseApiController::class, 'findById']);
    Route::delete('/destroy/{id}', [BaseApiController::class, 'destroy']);
    Route::post('/search', [BaseApiController::class, 'search']);
    Route::post('/dict/getDictByIds', [BaseApiController::class, 'getDictByIds']);
    Route::post('/dict/getDictByColumns', [BaseApiController::class, 'getDictByColumns']);
});
*/
// local call
Route::group(['prefix' => 'v1'], function () {
    // passenger api
    Route::group(['prefix' => 'employees', ['middleware' => ['auth:api']]], function(){
        Route::get('/findAll', [EmployeeApiController::class, 'findAll']);
        Route::post('/store', [EmployeeApiController::class, 'store']);
        Route::post('/update/{id}', [EmployeeApiController::class, 'update']);
        Route::get('/findById/{id}', [EmployeeApiController::class, 'findById']);
        Route::delete('/destroy/{id}', [EmployeeApiController::class, 'destroy']);
        Route::post('/search', [EmployeeApiController::class, 'search']);
        Route::post('/dict/getDictByIds', [EmployeeApiController::class, 'getDictByIds']);
        Route::post('/dict/getDictByColumns', [EmployeeApiController::class, 'getDictByColumns']);
        Route::post('/exportExcel', [EmployeeReportApiController::class, 'exportExcel']);
    });
    // roles api
    Route::group(['prefix' => 'roles', ['middleware' => ['auth:api']]], function(){
        Route::get('/findAll', [RoleApiController::class, 'findAll']);
        Route::post('/store', [RoleApiController::class, 'store']);
        Route::post('/update/{id}', [RoleApiController::class, 'update']);
        Route::get('/findById/{id}', [RoleApiController::class, 'findById']);
        Route::delete('/destroy/{id}', [RoleApiController::class, 'destroy']);
        Route::post('/search', [RoleApiController::class, 'search']);
        Route::post('/dict/getDictByIds', [RoleApiController::class, 'getDictByIds']);
        Route::post('/dict/getDictByColumns', [RoleApiController::class, 'getDictByColumns']);
    });

});
// external call
Route::group(['prefix' => 'v1'], function () {
    Route::group(['prefix' => 'roles'], function() {
        Route::group(['middleware' => ['auth:api']], function() {
            Route::get('/findAll', [RoleApiController::class, 'findAll'])->middleware('permission:view-role');
            Route::post('/store', [RoleApiController::class, 'store'])->middleware('permission:create-role');
            Route::post('/update/{id}', [RoleApiController::class, 'update'])->middleware('permission:update-role');
            Route::get('/findById/{id}', [RoleApiController::class, 'findById'])->middleware('permission:view-role');
            Route::delete('/destroy/{id}', [RoleApiController::class, 'destroy'])->middleware('permission:delete-role');
            Route::post('/search', [RoleApiController::class, 'search'])->middleware('permission:view-role');
        });
    });

    Route::group(['prefix' => 'employees'], function(){
        // use for login
        Route::post('/loginWithPassword', [EmployeeApiController::class, 'loginWithPassword']);
        Route::post('/checkVersion', [EmployeeApiController::class, 'checkVersion']);

        Route::group(['middleware' => ['auth:api']], function(){
            Route::post('/loginWithToken', [EmployeeApiController::class, 'loginWithToken']);
            Route::post('/changePassword', [EmployeeApiController::class, 'changePassword']);
            Route::post('/logout', [EmployeeApiController::class, 'logout']);
        });
    });

    Route::group(['prefix' => 'employees'], function(){
        Route::group(['middleware' => ['auth:api']], function(){
            Route::post('/search', [EmployeeApiController::class, 'search'])->middleware('permission:view-employee');
            Route::get('/findById/{id}', [EmployeeApiController::class, 'findById'])->middleware('permission:view-employee');
            Route::post('/store', [EmployeeApiController::class, 'store'])->middleware('permission:create-employee');
            Route::post('/update/{id}', [EmployeeApiController::class, 'update'])->middleware('permission:update-employee');
            Route::delete('/destroy/{id}', [EmployeeApiController::class, 'destroy'])->middleware('permission:delete-employee');

            Route::get('/getPermission', [EmployeeApiController::class, 'getPermission']);

            Route::post('/exportExcel', [EmployeeReportApiController::class, 'exportExcel'])->middleware('permission:export-employee');
        });
    });
});
