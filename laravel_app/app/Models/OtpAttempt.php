<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Nicolaslopezj\Searchable\SearchableTrait;

class OtpAttempt extends Model
{
    use HasFactory, SearchableTrait;

    public $table = 'otp_attemps';
    // type
    const REGISTER          = 1;
    const FORGET_PASSWORD   = 2;
    const CHANGE_PHONE      = 3;
    // status
    const NOT_USE   = 0;
    const USE       = 1;
    const CANCEL    = 10;

    protected $fillable = [
        'phone',
        'name',
        'password',
        'otp',
        'is_confirm',
        'type',
        'status',
        'valid_in',
        'attempts',
        'device_id'
    ];

    protected $casts = [
        'phone'                     => 'string',
        'name'                      => 'string',
        'password'                  => 'string',
        'otp'                       => 'string',
        'is_confirm'                => 'boolean',
        'type'                      => 'integer',
        'status'                    => 'integer',
        'valid_in'                  => 'integer',
        'attempts'                  => 'integer',
        'device_id'                 => 'string'
    ];

    protected $searchable = [
        'columns' => [
            'otp_attemps.phone' => 10,
            'otp_attemps.otp' => 10
        ]
    ];

    public function searchText(string $term)
    {
        return self::search($term);
    }
}
