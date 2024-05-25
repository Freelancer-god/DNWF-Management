<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Nicolaslopezj\Searchable\SearchableTrait;

class Config extends Model
{
    use SearchableTrait;

    public $table = 'configs';

    protected $fillable = [
        'id',
        'name',
        'value',
        'data',
        'type',
        'status',
        'medias',
        'slug',
        'created_at',
        'updated_at'
    ];

    protected $casts = [
        'id'                    => 'integer',
        'name'                  => 'string',
        'value'                 => 'string',
        'data'                  => 'string',
        'type'                  => 'integer',
        'status'                => 'integer',
        'medias'                => 'string',
        'slug'                => 'string',
        'created_at'            => 'string',
        'updated_at'            => 'string'
    ];

    protected $searchable = [
        'columns' => [
            'configs.name' => 10,
        ]
    ];

    public function searchText(string $term)
    {
        return self::search($term);
    }

    const TONG_DAI              = 1;
    const EMAIL_HO_TRO          = 2;
    const THONG_TIN_VE_CUDIDI   = 3;
    const HUY_TAI_KHOAN_KH      = 4;
    const HUY_TAI_KHOAN_TX      = 5;
    const CHINH_SACH_KH         = 6;
    const DIEU_KHOAN_KH         = 7;
    const CHINH_SACH_TX         = 8;

    const NOI_DUNG_LAM_DEP                      = 9;
    const NOI_DUNG_GIAO_DUC                     = 10;
    const NOI_DUNG_Y_TE                         = 11;
    const NOI_DUNG_SUC_KHOE_VA_DU_LICH          = 12;
    const NOI_DUNG_SALON_O_TO                   = 13;
    const NOI_DUNG_THUE_TAI_XE                  = 14;
    const NOI_DUNG_BAO_DUONG_TAI_XE             = 17;
    const NOI_DUNG_BAO_HIEM_TAI_XE              = 18;

    const THONG_TIN_STK_PHIEU_DAT_COC_CUDIDI    = 15;
    const THONG_TIN_NGAN_HANG_PHIEU_DAT_COC_CUDIDI    = 16;

    const LINK_BAO_HIEM_SUC_KHOE                        = 19;
    const LINK_BAO_HIEM_DU_LICH                         = 20;

    const LOGIN_CHINH_SACH_TX                                 = 21;
    const LOGIN_DIEU_KHOAN_TX                                 = 22;

    const THONG_TIN_QUANG_CAO_NGAN_HANG                 = 100;

    //status
    const HOAT_DONG = 1;
    const NGUNG_HOAT_DONG = 0;
    /*
     type => [
         1 => 'Tổng đài',
         2 => 'email ho tro',
         3 => 'Thông tin về cudidi',
         4 => 'Thông tin hủy tài khoản của khách hàng',
         5 => 'Thông tin hủy tài khoản của tài xế',
         6 => 'thong tin chinh sach cua khach hang',
         7 => 'thong tin dieu khoan cua khach hang',
         8 => 'thong tin chinh sach cua tai xe' (version), "data" : {"version": "2.0.1"}
       ]
     * */
}
