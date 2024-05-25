<?php


namespace App\Repositories;


use App\Models\Role;
use App\Repositories\Interfaces\RoleRepositoryInterface;

class RoleRepository extends BaseRepository implements RoleRepositoryInterface
{
    public function getModel()
    {
        return Role::class;
    }

    public function syncRole($role) {
        $input_roles = $role;
        unset($input_roles['permissions']);
        unset($input_roles['updated_by']);
        $dat = $this->model->where('id', $role['id'])->first();
        if(!isset($dat)) {
            $dat = $this->model->create($input_roles);
        } else {
            unset($input_roles['id']);
            $dat->update($input_roles);
        }
        return $dat;
    }

    public function syncPermissions(array $ids)
    {
        $this->model->syncPermissions($ids);
    }
}
