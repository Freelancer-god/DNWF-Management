<?php

use App\Http\Controllers\API\SponsorApiController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\EmployeeApiController;
use App\Http\Controllers\API\RoleApiController;
use App\Http\Controllers\API\EmployeeReportApiController;
use App\Http\Controllers\API\ClubApiController;
use App\Http\Controllers\API\SponsorContractApiController;
use App\Http\Controllers\API\SponsorCareApiController;

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

Route::group(['prefix' => 'v1'], function () {
    // User quan ly
    Route::group(['prefix' => 'employees'], function () {
        Route::middleware(['auth:api'])->group(function (){
            Route::get('/findAll', [EmployeeApiController::class, 'findAll']);
            Route::post('/store', [EmployeeApiController::class, 'store']);
            Route::put('/update/{id}', [EmployeeApiController::class, 'update']);
            Route::get('/findById/{id}', [EmployeeApiController::class, 'findById']);
            Route::delete('/delete/{id}', [EmployeeApiController::class, 'destroy']);
            Route::post('/search', [EmployeeApiController::class, 'search']);
            Route::post('/dict/getDictByIds', [EmployeeApiController::class, 'getDictByIds']);
            Route::post('/dict/getDictByColumns', [EmployeeApiController::class, 'getDictByColumns']);
            Route::get('/getPermission', [EmployeeApiController::class, 'getPermission']);
        });
    });
    // Vai tro
    Route::group(['prefix' => 'roles'], function () {
        Route::middleware(['auth:api'])->group(function (){
            Route::get('/findAll', [RoleApiController::class, 'findAll']);
            Route::post('/store', [RoleApiController::class, 'store']);
            Route::put('/update/{id}', [RoleApiController::class, 'update']);
            Route::get('/findById/{id}', [RoleApiController::class, 'findById']);
            Route::delete('/delete/{id}', [RoleApiController::class, 'destroy']);
            Route::post('/search', [RoleApiController::class, 'search']);
            Route::post('/dict/getDictByIds', [RoleApiController::class, 'getDictByIds']);
            Route::post('/dict/getDictByColumns', [RoleApiController::class, 'getDictByColumns']);
        });
    });

    //Chi hoi
    Route::group(['prefix' => 'clubs'], function () {
        Route::middleware(['auth:api'])->group(function (){
            Route::get('/findAll', [ClubApiController::class, 'findAll']);
            Route::post('/store', [ClubApiController::class, 'store']);
            Route::put('/update/{id}', [ClubApiController::class, 'update']);
            Route::get('/findById/{id}', [ClubApiController::class, 'findById']);
            Route::delete('/delete/{id}', [ClubApiController::class, 'destroy']);
            Route::post('/search', [ClubApiController::class, 'search']);
            Route::put('/updateConfirmStatus/{id}', [ClubApiController::class, 'updateConfirmStatus']);
            Route::get('/getActivityRecord/{id}', [\App\Http\Controllers\API\ClubApiController::class, 'getActivityRecord']);
            Route::get('/export-activity/{id}', [\App\Http\Controllers\API\ClubActivityApiController::class, 'exportActivityPdf']);
        });
    });

    //To chuc
    Route::group(['prefix' => 'organizations'], function () {
        Route::middleware(['auth:api'])->group(function (){
            Route::get('/findAll', [\App\Http\Controllers\API\OrganizationApiController::class, 'findAll']);
            Route::post('/store', [\App\Http\Controllers\API\OrganizationApiController::class, 'store']);
            Route::put('/update/{id}', [\App\Http\Controllers\API\OrganizationApiController::class, 'update']);
            Route::get('/findById/{id}', [\App\Http\Controllers\API\OrganizationApiController::class, 'findById']);
            Route::delete('/delete/{id}', [\App\Http\Controllers\API\OrganizationApiController::class, 'destroy']);
            Route::post('/search', [\App\Http\Controllers\API\OrganizationApiController::class, 'search']);
            Route::put('/updateConfirmStatus/{id}', [\App\Http\Controllers\API\OrganizationApiController::class, 'updateConfirmStatus']);
            Route::get('/getActivityRecord/{id}', [\App\Http\Controllers\API\OrganizationApiController::class, 'getActivityRecord']);
            Route::get('/export-member-activity/{id}', [\App\Http\Controllers\API\OrganizationActivityApiController::class, 'exportActivityPdf']);
        });
    });
    Route::group(['prefix' => 'sponsors'], function () {
        Route::middleware(['auth:api'])->group(function (){
            Route::get('/findAll', [SponsorApiController::class, 'findAll']);
            Route::post('/store', [SponsorApiController::class, 'store']);
            Route::put('/update/{id}', [SponsorApiController::class, 'update']);
            Route::get('/findById/{id}', [SponsorApiController::class, 'findById']);
            Route::delete('/delete/{id}', [SponsorApiController::class, 'destroy']);
            Route::post('/search', [SponsorApiController::class, 'search']);
            Route::get('/care/findAll', [SponsorCareApiController::class, 'findAll']);
            Route::post('/care/store', [SponsorCareApiController::class, 'store']);
            Route::put('/care/update/{id}', [SponsorCareApiController::class, 'update']);
            Route::get('/care/findById/{id}', [SponsorCareApiController::class, 'findById']);
            Route::delete('/care/delete/{id}', [SponsorCareApiController::class, 'destroy']);
            Route::get('/care/findBySponsor/{id}', [SponsorCareApiController::class, 'getCareBySponsorId']);
            Route::put('/care/updateConfirmStatus/{id}', [SponsorCareApiController::class, 'updateConfirmStatus']);
            Route::get('/contract/findAll', [SponsorContractApiController::class, 'findAll']);
            Route::post('/contract/store', [SponsorContractApiController::class, 'store']);
            Route::put('/contract/update/{id}', [SponsorContractApiController::class, 'update']);
            Route::get('/contract/findById/{id}', [SponsorContractApiController::class, 'findById']);
            Route::delete('/contract/delete/{id}', [SponsorContractApiController::class, 'destroy']);
            Route::get('/contract/findBySponsor/{id}', [SponsorContractApiController::class, 'getContractsBySponsorId']);

        });
    });



    //Hoi vien
    Route::group(['prefix' => 'members'], function () {
        Route::middleware(['auth:api'])->group(function (){
            Route::get('/findAll', [\App\Http\Controllers\API\MemberApiController::class, 'findAll']);
            Route::post('/store', [\App\Http\Controllers\API\MemberApiController::class, 'store']);
            Route::put('/update/{id}', [\App\Http\Controllers\API\MemberApiController::class, 'update']);
            Route::get('/findById/{id}', [\App\Http\Controllers\API\MemberApiController::class, 'findById']);
            Route::delete('/delete/{id}', [\App\Http\Controllers\API\MemberApiController::class, 'destroy']);
            Route::post('/search', [\App\Http\Controllers\API\MemberApiController::class, 'search']);
            Route::put('/updateConfirmStatus/{id}', [\App\Http\Controllers\API\MemberApiController::class, 'updateConfirmStatus']);
            Route::get('/getActivityRecord/{id}', [\App\Http\Controllers\API\MemberApiController::class, 'getActivityRecord']);
            Route::get('/export-activity/{id}', [\App\Http\Controllers\API\MemberActivityApiController::class, 'exportActivityPdf']);

        });
    });

    //Qua trinh sinh hoat
    Route::group(['prefix' => 'activity_records'], function () {
        Route::middleware(['auth:api'])->group(function (){
            Route::get('/findAll', [\App\Http\Controllers\API\ActivityRecordApiController::class, 'findAll']);
            Route::post('/store', [\App\Http\Controllers\API\ActivityRecordApiController::class, 'store']);
            Route::put('/update/{id}', [\App\Http\Controllers\API\ActivityRecordApiController::class, 'update']);
            Route::get('/findById/{id}', [\App\Http\Controllers\API\ActivityRecordApiController::class, 'findById']);
            Route::delete('/delete/{id}', [\App\Http\Controllers\API\ActivityRecordApiController::class, 'destroy']);
            Route::post('/search', [\App\Http\Controllers\API\ActivityRecordApiController::class, 'search']);
            Route::put('/updateConfirmStatus/{id}', [\App\Http\Controllers\API\ActivityRecordApiController::class, 'updateConfirmStatus']);
        });
    });

    //file va hinh anh
    Route::group(['prefix' => 'files'], function () {
        Route::middleware(['auth:api'])->group(function (){
            Route::post('/uploadImage', [\App\Http\Controllers\API\FileApiController::class, 'uploadImage']);
            Route::post('/uploadFile', [\App\Http\Controllers\API\FileApiController::class, 'uploadFile']);
            Route::delete('/delete/{id}', [\App\Http\Controllers\API\FileApiController::class, 'delete']);
        });
    });

    Route::group(['prefix' => 'excel'], function () {
        Route::middleware(['auth:api'])->group(function (){
            Route::post('/exportMembers', [\App\Http\Controllers\API\ExportApiController::class, 'exportMembers']);
        });
    });


    //auth
    Route::post('/login', [EmployeeApiController::class, 'loginWithPassword']);
    Route::middleware(['auth:api'])->group(function (){
        Route::get('/loginWithToken', [EmployeeApiController::class, 'loginWithToken']);
        Route::post('/changePassword', [EmployeeApiController::class, 'changePassword']);
        Route::get('/logout', [EmployeeApiController::class, 'logout']);
    });
    Route::get('/hello', function () {
        return response()->json(['message' => 'Hello World 8']);
    });

});
