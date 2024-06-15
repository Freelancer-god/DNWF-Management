<?php


namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Nicolaslopezj\Searchable\SearchableTrait;

class Club extends Model
{
    use SearchableTrait, HasFactory;

    public $table = 'clubs';

    protected $fillable = [
        'reference',
        'name',
        'founding_date',
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
        'affiliated_unit'
    ];

    protected $casts = [
        'id'            => 'integer',
        'reference'     => 'string',
        'name'          => 'string',
        'founding_date' => 'datetime',
        'leader_name'   => 'string',
        'phone'         => 'string',
        'phone_zalo'    => 'string',
        'media'         => 'string',
        'status'        => 'integer',
        'type'          => 'integer',
        'confirm_status'  => 'integer',
        'confirm_date'  => 'datetime',
        'confirm_user_id'       => 'integer',
        'confirm_user_name'     => 'string',
        'affiliated_unit' => 'integer'
    ];

    protected $searchable = [
        'columns' => [
            'clubs.name' => 10,
            'clubs.reference' => 10,
        ]
    ];

    //status
    const STATUS_DISABLED = 0;
    const STATUS_ENABLE = 1;

    //confirm_status
    const NOT_CONFIRM = 0;
    const IS_CONFIRM = 1;

    //prefix reference
    const PREFIX = 'CH';

    public function searchText($term)
    {
        return self::search($term);
    }

    public function organizations(){
        return $this->hasMany(Organization::class, 'club_id');
    }

    public function members(){
        return $this->hasMany(Member::class, 'club_id');
    }

    public function activity_records(){
        return $this->hasMany(ActivityRecord::class, 'object_id')->where('object_type', 'clubs');
    }
}
