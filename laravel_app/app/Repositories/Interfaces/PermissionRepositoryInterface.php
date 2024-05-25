<?php


namespace App\Repositories\Interfaces;

interface PermissionRepositoryInterface extends BaseRepositoryInterface
{
    public function syncPermissions($permissions);
}
