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
        'job_content' => 'text',
        'executor' => 'string',
        'notes' => 'text',
        'status' => 'string',
        'sponsor_id' => 'integer',
    ];

    protected $searchable = [
        'columns' => [
            'sponsor_care.job_type' => 10,
            'sponsor_care.job_content' => 10,
            'sponsor_care.executor' => 10,
            'sponsor_care.notes' => 5,
            // You can add more columns for searching if needed
        ],
        'joins' => [
            // If you need to search by sponsor's name
            'sponsor' => ['sponsor_care.sponsor_id', 'sponsor.id'],
        ],
    ];

    // Define the relationship to the Sponsor model
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
