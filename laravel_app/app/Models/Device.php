<?php

namespace App\Models;

use App\Traits\UuidTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Nicolaslopezj\Searchable\SearchableTrait;

class Device extends Model
{
    use HasFactory, UuidTrait, SearchableTrait;

    public $table = 'devices';
    public $timestamps = false;

    protected $fillable = [
        'id',
        'deviceable_id',
        'deviceable_type',
        'push_token',
        'platform',
        'device_info',
        'created_at',
        'updated_at'
    ];

    protected $casts = [
        'id'                    => 'string',
        'deviceable_id'         => 'string',
        'deviceable_type'       => 'string',
        'push_token'            => 'string',
        'platform'              => 'string',
        'device_info'           => 'string',
        'created_at'            => 'string',
        'updated_at'            => 'string'
    ];

    protected $searchable = [
        'columns' => [
            'devices.platform' => 10,
        ]
    ];

    public function searchText(string $term)
    {
        return self::search($term);
    }

    public function deviceable(){
        return $this->morphTo();
    }
}
