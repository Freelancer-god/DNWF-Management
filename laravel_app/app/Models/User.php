<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Traits\UuidTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Nicolaslopezj\Searchable\SearchableTrait;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, SearchableTrait, UuidTrait;

    public $table = 'users';
    public $timestamps = false;
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'id'            => 'string',
        'name'          => 'string',
        'email'         => 'string',
        'password'      => 'hashed',
        'email_verified_at' => 'datetime',
    ];

    protected $searchable = [
        'columns' => [
            'users.name' => 10,
            'users.email' => 10,
        ]
    ];

    public function searchText(string $term)
    {
        return self::search($term);
    }
}
