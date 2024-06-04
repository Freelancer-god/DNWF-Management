<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Nicolaslopezj\Searchable\SearchableTrait;

class SponsorCare extends Model
{
    use HasFactory, SearchableTrait;

    protected $table = 'sponsor_care';

    protected $fillable = [
        'job_type',
        'job_content',
        'executor',
        'notes',
        'status',
        'sponsor_id',
    ];

    protected $casts = [
        'id' => 'integer',
        'job_type' => 'string',
        'job_content' => 'string',
        'executor' => 'string',
        'notes' => 'string',
        'status' => 'integer',
        'sponsor_id' => 'integer',
    ];

    protected $searchable = [
        'columns' => [
            'sponsor_care.job_type' => 10,
            'sponsor_care.job_content' => 10,
            'sponsor_care.executor' => 10,
            'sponsor_care.notes' => 5,
        ],
        'joins' => [
            'sponsor' => ['sponsor_care.sponsor_id', 'sponsor.id'],
        ],
    ];

    public function sponsor()
    {
        return $this->belongsTo(Sponsor::class);
    }

    // Method for search
    public function searchText($term)
    {
        return self::search($term);
    }
}
