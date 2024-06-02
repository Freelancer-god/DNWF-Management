<?php


namespace App\Repositories;


use App\Models\CapitalManage;
use App\Repositories\Interfaces\CapitalManageRepositoryInterface;

class CapitalManageRepository extends BaseRepository implements CapitalManageRepositoryInterface
{

    public function getModel()
    {
        return CapitalManage::class;
    }
}