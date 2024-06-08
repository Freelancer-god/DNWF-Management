<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Nicolaslopezj\Searchable\SearchableTrait;

class ActivityRecord extends Model
{
    use HasFactory, SearchableTrait;

    protected $table = 'activity_records';

    protected $fillable = [
        'name',
        'description',
        'start_date',
        'end_date',
        'result',
        'media',
        'object_id',
        'object_type',
        'status',
        'type'
    ];

    protected $casts = [
        'id' => 'integer',
        'name' => 'string',
        'description' => 'string',
        'start_date' => 'datetimg',
        'end_date' => 'datetime',
        'result' => 'string',
        'media' => 'string',
        'object_id' => 'integer',
        'object_type' => 'string',
        'status' => 'integer',
        'type' => 'integer'
    ];

    protected $searchable = [
        'columns' => [
            'activity_records.name' => 10,
        ]
    ];


}
