<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Nicolaslopezj\Searchable\SearchableTrait;

class Member extends Model
{
    use HasFactory, SearchableTrait;

    public $table = 'members';

    protected $fillable = [
        'reference',
        'full_name',
        'gender',
        'birthday',
        'phone',
        'citizen_identify',
        'citizen_identify_date',
        'citizen_identify_place',
        'position',
        'address',
        'academic_level',
        'is_partisan',
        'profession',
        'work_place',
        'organization_id',
        'club_id',
        'joining_date',
        'status',
        'type',
        'media',
        'role_in_organization',
        'confirm_status',
        'confirm_date',
        'confirm_user_id',
        'confirm_user_name',
    ];

    protected $casts = [
        'id' => 'integer',
        'reference'=> 'string',
        'full_name'=> 'string',
        'gender' => 'integer',
        'birthday' => 'datetime',
        'phone' => 'string',
        'citizen_identify' => 'string',
        'citizen_identify_date' => 'datetime',
        'citizen_identify_place' => 'string',
        'position' => 'string',
        'address' => 'string',
        'academic_level' => 'string',
        'is_partisan' => 'boolean',
        'profession' => 'string',
        'work_place' => 'string',
        'organization_id' => 'integer',
        'club_id' => 'integer',
        'joining_date' => 'datetime',
        'status' => 'integer',
        'type' => 'integer',
        'media' => 'string',
        'role_in_organization' => 'string',
        'confirm_status' => 'integer',
        'confirm_date' => 'datetime',
        'confirm_user_id' => 'integer',
        'confirm_user_name' => 'string',
    ];

    protected $searchable = [
        'columns' => [
            'members.name' => 10,
            'member.reference' => 10,
        ]
    ];

    //status
    const STATUS_DISABLED = 0;
    const STATUS_ENABLE = 1;

    //confirm_status
    const NOT_CONFIRM = 0;
    const IS_CONFIRM = 1;

    //prefix reference
    const PREFIX = 'HV';

    public function searchText($term)
    {
        return self::search($term);
    }

    public function club(){
        return $this->belongsTo(Club::class, 'club_id');
    }

    public function organization(){
        return $this->belongsTo(Organization::class, 'organization_id');
    }
}
