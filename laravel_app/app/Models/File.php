<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class File extends Model
{
    use HasFactory;

    protected $table = 'files';

    protected $fillable = [
        'file_name',
        'file_path',
        'file_type',
        'type',
        'status',
        'fileable_id',
        'fileable_type'
    ];

    protected $casts = [
        'file_name' => 'string',
        'file_path' => 'string',
        'file_type' => 'string' ,
        'type' => 'integer',
        'status' => 'integer',
        'fileable_id' => 'string',
        'fileable_type' => 'string'
    ];

    //type
    const TYPE_MEDIA = 1;
    const TYPE_FILE = 2;
}
