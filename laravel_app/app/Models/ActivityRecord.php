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
        'start_date' => 'datetime',
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

    public function club(){
        return $this->belongsTo(Club::class, 'object_id')->where('object_type', 'clubs');
    }

    public function organization(){
        return $this->belongsTo(Organization::class, 'object_id')->where('object_type', 'organizations');
    }

    public function member(){
        return $this->belongsTo(Member::class, 'object_id')->where('object_type', 'members');
    }
}
