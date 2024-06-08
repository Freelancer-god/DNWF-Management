<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Nicolaslopezj\Searchable\SearchableTrait;

class Organization extends Model
{
    use HasFactory, SearchableTrait;

    public $table = 'organizations';

    protected $fillable = [
        'reference',
        'name',
        'subject_type',
        'subject_name',
        'founding_date',
        'address',
        'activity_time',
        'leader_name',
        'phone',
        'phone_zalo',
        'media',
        'status',
        'type',
        'confirm_status',
        'confirm_date',
        'confirm_user_id',
        'confirm_user_name',
        'club_id'
    ];

    protected $casts = [
        'id'            => 'integer',
        'reference'     => 'string',
        'name'          => 'string',
        'subject_type'  => 'string',
        'subject_name'  => 'string',
        'address'       => 'string',
        'activity_time'       => 'string',
        'founding_date' => 'datetime',
        'leader_name'   => 'string',
        'phone'         => 'string',
        'phone_zalo'    => 'string',
        'media'         => 'string',
        'club_id'       => 'integer',
        'status'        => 'integer',
        'type'          => 'integer',
        'confirm_status'  => 'integer',
        'confirm_date'  => 'datetime',
        'confirm_user_id'       => 'integer',
        'confirm_user_name'     => 'string'
    ];

    protected $searchable = [
        'columns' => [
            'organizations.name' => 10,
            'organizations.reference' => 10,
        ]
    ];

    //status
    const STATUS_DISABLED = 0;
    const STATUS_ENABLE = 1;

    //confirm_status
    const NOT_CONFIRM = 0;
    const IS_CONFIRM = 1;

    //prefix reference
    const PREFIX = 'TC';

    public function searchText($term)
    {
        return self::search($term);
    }

    public function club(){
        return $this->belongsTo(Club::class, 'club_id');
    }

    public function members(){
        return $this->hasMany(Member::class, 'organization_id');
    }

    public function activity_records(){
        return $this->hasMany(ActivityRecord::class, 'object_id')->where('object_type', 'organizations');
    }
}
