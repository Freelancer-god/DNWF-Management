<?php
/**
 * Created by PhpStorm.
 * User: Tuan
 * Date: 5/29/2019
 * Time: 10:17 AM
 */

namespace App\Traits;


use Illuminate\Support\Str;

trait UuidTrait
{
    public static function boot(){
        parent::boot();
        static::creating(function ($model){
            if(!isset($model->{$model->getKeyName()})){
                $model->{$model->getKeyName()} = (string) Str::orderedUuid();
            }
            return true;
        });
    }
}
