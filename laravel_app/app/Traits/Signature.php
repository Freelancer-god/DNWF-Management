<?php
/**
 * Created by PhpStorm.
 * User: Tuan
 * Date: 5/14/2019
 * Time: 4:18 PM
 */
namespace App\Traits;

trait Signature
{
    protected static function boot()
    {
        parent::boot();

        // create a event to happen on updating
        static::updating(function ($model) {
            $user = auth()->guard('employee')->user();
            $model->updated_by = isset($user) ?$user->name : null;
        });

        // create a event to happen on deleting
        static::deleting(function($model)  {
            $user = auth()->guard('employee')->user();
            $model->updated_by = isset($user) ?$user->name : null;
        });
    }
}