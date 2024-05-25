<?php


namespace App\Repositories\Interfaces;

interface RoleRepositoryInterface extends BaseRepositoryInterface
{
    public function syncRole($role);

    public function syncPermissions(array $ids);
}
