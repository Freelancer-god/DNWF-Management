<?php


namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Nicolaslopezj\Searchable\SearchableTrait;

class Sponsor extends Model
{
    use SearchableTrait, HasFactory;

    public $table = 'sponsor';

    protected $fillable = [
        'sponsor_type',
        'method',
        'name',
        'field_of_activity',
        'representative',
        'representative_date_of_birth',
        'representative_phone',
        'zalo',
        'person_in_charge',
        'person_in_charge_phone',
        'zalo_person_in_charge',
        'sponsor_address',
        'website',
        'email',
    ];

    protected $casts = [
        'id'                              => 'integer',
        'sponsor_type'                    => 'integer', // enum is stored as a string
        'method'                          => 'integer', // enum is stored as a string
        'name'                            => 'string',
        'field_of_activity'               => 'string',
        'representative'                  => 'string',
        'representative_date_of_birth'    => 'date',
        'representative_phone'            => 'string',
        'zalo'                            => 'string',
        'person_in_charge'                => 'string',
        'person_in_charge_phone'          => 'string',
        'zalo_person_in_charge'           => 'string',
        'sponsor_address'                 => 'string',
        'website'                         => 'string',
        'email'                           => 'string',
    ];

    protected $searchable = [
        'columns' => [
            'sponsor.name' => 10,
            'sponsor.sponsor_type' => 10,
            'sponsor.method' => 10,
        ]
    ];


    public function searchText($term)
    {
        return self::search($term);
    }

    // Mối quan hệ một-nhiều với SponsorContract
    public function sponsorContracts()
    {
        return $this->hasMany(SponsorContract::class);
    }

    // Mối quan hệ một-nhiều với SponsorCare (nếu có)
    public function sponsorCares()
    {
        return $this->hasMany(SponsorCare::class);
    }
    public static function idExists($id)
    {
        // Tạo một instance của class Builder
        $query = static::query();
    
        // Sử dụng phương thức where() trên instance của class Builder để thêm điều kiện
        // Kiểm tra xem có bản ghi nào có ID nhất định không
        return $query->where('id', $id)->exists();
    }
}
