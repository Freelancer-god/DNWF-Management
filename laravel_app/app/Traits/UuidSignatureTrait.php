<?php
/**
 * Created by PhpStorm.
 * User: Tuan
 * Date: 5/29/2019
 * Time: 10:17 AM
 */

namespace App\Traits;


use Illuminate\Support\Str;

trait UuidSignatureTrait
{
    public static function boot(){
        parent::boot();

        static::creating(function ($model){
            if(!isset($model->{$model->getKeyName()})){
                $model->{$model->getKeyName()} = (string) Str::orderedUuid();
            }
            return true;
        });
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
