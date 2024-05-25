<?php


namespace App\Repositories;


use App\Models\Permission;
use App\Repositories\Interfaces\PermissionRepositoryInterface;
use Illuminate\Support\Facades\DB;

class PermissionRepository extends BaseRepository implements PermissionRepositoryInterface
{
    public function getModel()
    {
        return Permission::class;
    }

    public function syncPermissions($permissions) {
        $ids = [];
        foreach($permissions as $per) {
            array_push($ids, $per['id']);
        }
        $exists = $this->model->whereIn('id', $ids)->get();
        $map_exists = [];
        foreach($exists as $key) {
            if(!isset($map_exists[$key->id])) {
                $map_exists[$key->id] = $key->id;
            }
        }
        $inserts = [];
        foreach($permissions as $per){
            if(!isset($map_exists[$per['id']])) {
                array_push($inserts, [
                    'id' => $per['id'],
                    'name' => $per['name'],
                    'display_name' => $per['display_name'],
                    'type' => $per['type']
                ]);
            }
        }

        if(count($inserts) > 0) {
            DB::table($this->model->getTable())->insert($inserts);
        }
        return $ids;
    }
}
