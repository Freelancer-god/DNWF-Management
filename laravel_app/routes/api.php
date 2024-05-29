<?php

use App\Http\Controllers\API\SponsorApiController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\EmployeeApiController;
use App\Http\Controllers\API\RoleApiController;
use App\Http\Controllers\API\EmployeeReportApiController;
use App\Http\Controllers\API\ClubApiController;

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
            Route::post('/update/{id}', [EmployeeApiController::class, 'update']);
            Route::get('/findById/{id}', [EmployeeApiController::class, 'findById']);
            Route::delete('/destroy/{id}', [EmployeeApiController::class, 'destroy']);
            Route::post('/search', [EmployeeApiController::class, 'search']);
            Route::post('/dict/getDictByIds', [EmployeeApiController::class, 'getDictByIds']);
            Route::post('/dict/getDictByColumns', [EmployeeApiController::class, 'getDictByColumns']);
            Route::post('/exportExcel', [EmployeeReportApiController::class, 'exportExcel']);
        });
    });
    // Vai tro
    Route::group(['prefix' => 'roles'], function () {
        Route::middleware(['auth:api'])->group(function (){
            Route::get('/findAll', [RoleApiController::class, 'findAll']);
            Route::post('/store', [RoleApiController::class, 'store']);
            Route::put('/update/{id}', [RoleApiController::class, 'update']);
            Route::get('/findById/{id}', [RoleApiController::class, 'findById']);
            Route::delete('/destroy/{id}', [RoleApiController::class, 'destroy']);
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
            Route::delete('/destroy/{id}', [ClubApiController::class, 'destroy']);
            Route::post('/search', [ClubApiController::class, 'search']);
            Route::put('/updateConfirmStatus/{id}', [ClubApiController::class, 'updateConfirmStatus']);
        });
    });

    //To chuc
    Route::group(['prefix' => 'organizations'], function () {
        Route::middleware(['auth:api'])->group(function (){
            Route::get('/findAll', [\App\Http\Controllers\API\OrganizationApiController::class, 'findAll']);
            Route::post('/store', [\App\Http\Controllers\API\OrganizationApiController::class, 'store']);
            Route::put('/update/{id}', [\App\Http\Controllers\API\OrganizationApiController::class, 'update']);
            Route::get('/findById/{id}', [\App\Http\Controllers\API\OrganizationApiController::class, 'findById']);
            Route::delete('/destroy/{id}', [\App\Http\Controllers\API\OrganizationApiController::class, 'destroy']);
            Route::post('/search', [\App\Http\Controllers\API\OrganizationApiController::class, 'search']);
            Route::put('/updateConfirmStatus/{id}', [\App\Http\Controllers\API\OrganizationApiController::class, 'updateConfirmStatus']);
        });
    });
    Route::group(['prefix' => 'sponsors'], function () {
        Route::middleware(['auth:api'])->group(function (){
            Route::get('/findAll', [SponsorApiController::class, 'findAll']);
            Route::post('/store', [SponsorApiController::class, 'store']);
            Route::put('/update/{id}', [SponsorApiController::class, 'update']);
            Route::get('/findById/{id}', [SponsorApiController::class, 'findById']);
            Route::delete('/destroy/{id}', [SponsorApiController::class, 'destroy']);
            Route::post('/search', [SponsorApiController::class, 'search']);
            Route::put('/updateConfirmStatus/{id}', [SponsorApiController::class, 'updateConfirmStatus']);
        });
    });



    //Hoi vien
    Route::group(['prefix' => 'members'], function () {
        Route::middleware(['auth:api'])->group(function (){
            Route::get('/findAll', [\App\Http\Controllers\API\MemberApiController::class, 'findAll']);
            Route::post('/store', [\App\Http\Controllers\API\MemberApiController::class, 'store']);
            Route::put('/update/{id}', [\App\Http\Controllers\API\MemberApiController::class, 'update']);
            Route::get('/findById/{id}', [\App\Http\Controllers\API\MemberApiController::class, 'findById']);
            Route::delete('/destroy/{id}', [\App\Http\Controllers\API\MemberApiController::class, 'destroy']);
            Route::post('/search', [\App\Http\Controllers\API\MemberApiController::class, 'search']);
            Route::put('/updateConfirmStatus/{id}', [\App\Http\Controllers\API\MemberApiController::class, 'updateConfirmStatus']);
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
