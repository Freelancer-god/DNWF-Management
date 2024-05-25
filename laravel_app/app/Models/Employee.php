<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Laratrust\Contracts\LaratrustUser;
use Laratrust\Traits\HasRolesAndPermissions;
use Nicolaslopezj\Searchable\SearchableTrait;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Passport\HasApiTokens;

class Employee extends Authenticatable implements LaratrustUser
{
    use HasApiTokens, SearchableTrait, HasFactory, SoftDeletes, HasRolesAndPermissions;

    public $table = 'employees';

    const STATUS_UNACTIVE   = 0;
    const STATUS_ACTIVE     = 1;

    const TYPE_NORMAL       = 1;
    const TYPE_SUPER_ADMIN  = 2;

    protected $fillable = [
        'reference',
        'phone',
        'name',
        'username',
        'password',
        'sex',
        'email',
        'birth_date',
        'description',
        'notes',
        'last_login_at',
        'created_at',
        'updated_at',
        'deleted_at',
        'status',
        'type',
        'medias',
        'uuid',
    ];

    protected $casts = [
        'reference'         => 'string',
        'phone'             => 'string',
        'name'              => 'string',
        'username'          => 'string',
        'password'          => 'string',
        'sex'               => 'string',
        'email'             => 'string',
        'birth_date'        => 'string',
        'description'       => 'string',
        'notes'             => 'string',
        'last_login_at'     => 'string',
        'created_at'        => 'string',
        'updated_at'        => 'string',
        'deleted_at'        => 'string',
        'status'            => 'integer',
        'type'              => 'integer',
        'medias'            => 'string',
        'uuid'              => 'string',
    ];

    protected $hidden = [
        'deleted_at'
    ];

    protected $searchable = [
        'columns' => [
            'employees.reference' => 10,
            'employees.phone' => 10,
            'employees.name' => 10,
            'employees.email' => 10
        ]
    ];

    public function searchText(string $term)
    {
        return self::search($term);
    }
}
