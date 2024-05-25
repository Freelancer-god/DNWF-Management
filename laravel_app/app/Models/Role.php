<?php

namespace App\Models;

use Laratrust\Models\Role as RoleModel;
use Nicolaslopezj\Searchable\SearchableTrait;

class Role extends RoleModel
{
    use SearchableTrait;
    protected $table = 'roles';
    const TYPE_DISPLAY          = 1;
    const TYPE_ADMIN            = 2;
    const TYPE_SUPER_ADMIN      = 3;

    const STATUS_NOT_ACTIVE     = 0;
    const STATUS_ACTIVE         = 1;

    protected $searchable = [
        'columns' => [
            'roles.name' => 5,
            'roles.display_name' => 5
        ]
    ];

    protected $fillable = [
        'id',
        'name',
        'display_name',
        'description',
        'type',
        'status',
        'created_at',
        'updated_at',
    ];

    protected $casts = [
        'id'                => 'integer',
        'name'              => 'string',
        'display_name'      => 'string',
        'description'       => 'string',
        'type'              => 'integer',
        'status'            => 'integer'
    ];

    public $guarded = [];

    /**
     * @param $term
     *
     * @return mixed
     */
    public function searchText($term)
    {
        return self::search($term);
    }
}
