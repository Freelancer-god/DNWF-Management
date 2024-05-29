<?php


namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Nicolaslopezj\Searchable\SearchableTrait;

class Sponsor extends Model
{
    use SearchableTrait, HasFactory;

    public $table = 'sponsors';

    protected $fillable = [
        'sponsor_type',
        'method',
        'name',
        'field_of_activity',
        'representative',
        'representative_date_of_birth',
        'representative_phone',
        'zalo',
        'person_in_charge',
        'person_in_charge_phone',
        'zalo_person_in_charge',
        'sponsor_address',
        'website',
        'email',
    ];

    protected $casts = [
        'id'                              => 'integer',
        'sponsor_type'                    => 'string', // enum is stored as a string
        'method'                          => 'string', // enum is stored as a string
        'name'                            => 'string',
        'field_of_activity'               => 'string',
        'representative'                  => 'string',
        'representative_date_of_birth'    => 'date',
        'representative_phone'            => 'string',
        'zalo'                            => 'string',
        'person_in_charge'                => 'string',
        'person_in_charge_phone'          => 'string',
        'zalo_person_in_charge'           => 'string',
        'sponsor_address'                 => 'string',
        'website'                         => 'string',
        'email'                           => 'string',
    ];

    protected $searchable = [
        'columns' => [
            'sponsors.name' => 10,
            'sponsors.sponsor_type' => 10,
            'sponsors.method' => 10,
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
}
