<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Nicolaslopezj\Searchable\SearchableTrait;

class OfficialDocument extends Model
{
    use SearchableTrait, HasFactory;

    protected $table = 'official_documents';

    protected $fillable = [
        'document_number',
        'issue_date',
        'issued_by',
        'document_type',
        'status',
        'summary',
        'signed_by',
        'recipient',
        'attachment'
    ];

    protected $casts = [
        'id'                => 'integer',
        'issue_date'        => 'date',
        'document_number'   => 'string',
        'issued_by'         => 'string',
        'document_type'     => 'integer',
        'status'            => 'integer',
        'summary'           => 'string',
        'signed_by'         => 'string',
        'recipient'         => 'string',
        'attachment'        => 'integer'
    ];

    protected $searchable = [
        'columns' => [
            'official_documents.status' => 10,
            'official_documents.document_number'         => 10,
        ],
    ];
}
