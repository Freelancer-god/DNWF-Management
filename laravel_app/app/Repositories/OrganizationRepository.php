<?php


namespace App\Repositories;


use App\Models\Organization;
use App\Repositories\Interfaces\OrganizationRepositoryInterface;

class OrganizationRepository extends BaseRepository implements OrganizationRepositoryInterface
{
    public function getModel()
    {
        return Organization::class;
    }
}
