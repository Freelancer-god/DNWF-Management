<?php


namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Nicolaslopezj\Searchable\SearchableTrait;

class Media extends Model
{
    use SearchableTrait, HasFactory;

    protected $table = 'media';

    protected $fillable = [
        'title',
        'content',
        'type',
        'editing_date',
        'editor',
        'channel',
        'publish_date',
        'note',
        'status',
        'attachment',
    ];

    protected $casts = [
        'title' => 'string',
        'content' => 'string',
        'type' => 'string',
        'editing_date' => 'datetime',
        'editor' => 'string',
        'channel' => 'integer',
        'publish_date' => 'datetime',
        'note' => 'string',
        'status' => 'integer',
        'attachment' => 'string',
    ];

    protected $searchable = [
        'columns' => [
            'media.content' => 10,
            'media.title' => 10,
            'media.type' => 10,
        ]
    ];


    public function searchText($term)
    {
        return self::search($term);
    }

}
