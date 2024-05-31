<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Nicolaslopezj\Searchable\SearchableTrait;

class SponsorContract extends Model
{
    use SearchableTrait, HasFactory;

    protected $table = 'sponsor_contract';

    protected $fillable = [
        'signing_date',
        'contract_number',
        'sponsor_id',
        'classification',
        'details',
        'value',
        'sponsorship_duration',
    ];

    protected $casts = [
        'id'                      => 'integer',
        'signing_date'            => 'date',
        'contract_number'         => 'string',
        'sponsor_id'              => 'integer',
        'classification'          => 'string', // enum stored as a string
        'details'                 => 'string',
        'value'                   => 'decimal:2',
        'sponsorship_duration'    => 'string',
    ];

    protected $searchable = [
        'columns' => [
            'sponsor_contract.contract_number' => 10,
            'sponsor_contract.details'         => 10,
        ],
        'joins' => [
            'sponsor' => ['sponsor_contract.sponsor_id', 'sponsor.id'],
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
