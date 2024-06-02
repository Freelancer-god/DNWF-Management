<?php


namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Nicolaslopezj\Searchable\SearchableTrait;

class CapitalManage extends Model
{
    use SearchableTrait, HasFactory;

    public $table = 'capital';

    protected $fillable = [
        'code',
        'name',
        'date',
        'reason',
        'account',
        'amount',
        'spending_type',
        'pic_path',
    ];

    protected $casts = [
        'code'     => 'string',
        'name'     => 'string',
        'reason'   => 'string',
        'sign_date'     => 'datetime',
        'account'  => 'string',
        'amount'   => 'string',
        'spending_type' =>'boolean',
        'pic_path' => 'string'
    ];

    protected $searchable = [
        'columns' => [
            'capital.name' => 10,
        ]
    ];

    public function searchText($term)
    {
        return self::search($term);
    }

    public function organizations(){
        return $this->hasMany(Organization::class, 'capital_id');
    }
}
