<?php

namespace App\Models;

use Laratrust\Models\Permission as PermissionModel;

class Permission extends PermissionModel
{
    protected $table = 'permissions';

    protected $fillable = [
        'id',
        'name',
        'display_name',
        'type',
        'status'
    ];

    protected $casts = [
        'id'                => 'integer',
        'name'              => 'string',
        'display_name'      => 'string',
        'type'              => 'integer',
        'status'            => 'integer'
    ];

    public $guarded = [];
}
