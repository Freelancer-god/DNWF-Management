<?php


namespace App\Services;

use App\Models\Role;
use App\Repositories\Interfaces\PermissionRepositoryInterface;
use App\Repositories\Interfaces\RoleRepositoryInterface;
use App\Services\Base\BaseService;
use Carbon\Carbon;
use Illuminate\Support\Str;

class RoleService extends BaseService
{
    protected $repo_base;
    protected $repo_permission;
    protected $with;

    public function __construct(
        RoleRepositoryInterface $repo_base,
        PermissionRepositoryInterface $repo_permission
    ) {
        $this->repo_base                = $repo_base;
        $this->repo_permission          = $repo_permission;
        $this->with                     = ['permissions'];
    }

    public function getModelName()
    {
        return 'vai trò';
    }

    public function getTableName()
    {
        return (new Role())->getTable();
    }

    public function store($inputs)
    {
        $validate = $this->checkInputs($inputs, null);
        if($validate['is_failed']) {
            return $validate;
        }
        $inputs = $validate['inputs'];
        $data = $this->repo_base->create($inputs);
        if(isset($inputs['permission_ids']) && count($inputs['permission_ids']) > 0){
            $data->permissions()->detach();
            $permission_ids = array_filter($inputs['permission_ids'], fn ($value) => !is_null($value));
            $data->permissions()->syncWithoutDetaching($permission_ids);
        }

        $data = $this->repo_base->findById($data->id, $this->with);
//        $data->permissions;
        $data->permission_groups = $this->groupPermission($data);
        return [
            'code' => '200',
            'data' => $this->formatData($data)
        ];
    }

    public function update($id,$inputs)
    {
        $now = (new Carbon())->toDateTimeString();
        $inputs['updated_at'] = $now;
        $validate = $this->checkInputs($inputs, $id);
        if($validate['is_failed']) {
            return $validate;
        }
        $inputs = $validate['inputs'];
        $data = $this->repo_base->update($id, $inputs);
        $data->permissions()->detach();
        if(isset($inputs['permission_ids']) && count($inputs['permission_ids']) > 0){
            $permission_ids = array_filter($inputs['permission_ids'], fn ($value) => !is_null($value));
            $data->permissions()->syncWithoutDetaching($permission_ids);
        }

        $data = $this->repo_base->findById($data->id, $this->with);
//        $data->permissions;
        $data->permission_groups = $this->groupPermission($data);
        return [
            'code' => '200',
            'data' => $this->formatData($data)
        ];
    }

    public function checkInputs($inputs, $id){
        if(!isset($inputs['display_name'])){
            return [ 'is_failed' => true, 'code' => '003', 'message' => 'Tên vai trò' ];
        }
        $inputs['name'] = Str::slug($inputs['display_name'], "-");

        if($this->repo_base->existByWhere(['name' => $inputs['name']], $id)) {
            return [ 'is_failed' => true, 'code' => '005', 'message' => 'Tên vai trò' ];
        }

        return [
            'is_failed' => false,
            'inputs' => $inputs
        ];
    }

    public function search($inputs)
    {
        $text = null;
        $columns = [];
        $columnsHas = [];
        $term = isset($inputs['term']) ? $inputs['term'] : [];
        $with = isset($inputs['with']) ? $inputs['with'] : $this->with;
        $page = isset($inputs['page']) ? $inputs['page'] : 1;
        $limit = isset($inputs['limit']) ? $inputs['limit'] : 30;
        $orderBy = isset($inputs['order_by']) ? $inputs['order_by'] : 'created_at';
        $sort = isset($inputs['sort']) ? $inputs['sort'] : 'desc';

        $orderBy = $this->generateOrder($orderBy);
        $joins = $this->getJoinTable();
        $select = $this->generateSelect($inputs, $this->getTableName());
        // status
        $columns = $this->generateColumn($inputs['filter'], $columns);
        // generate conditions from term
        $query = $this->generateQuery($term, $columns);
        $columns = $query['columns'];
        $text = $query['search'];

        $datas = $this->repo_base->searchText($text, $columns, $columnsHas,$joins, $page, $limit, $orderBy, $sort, $with, $select);
        $count = $this->repo_base->searchTextCount($text, $columns, $columnsHas, $joins);

        $datas = $this->groupPermissions($datas);

        return [
            'code' => '200',
            'data' => [
                'data' => $this->formatSelectData($datas),
                'total' => $count
            ]
        ];
    }

    public function generateColumn($inputs, $columns) {
        if(!isset($inputs['type'])) {
            array_push($columns, "{$this->getTableName()}.type in (1,2)");
        }

        if(isset($inputs['type']) && count($inputs['type']) > 0) {
            array_push($columns, "{$this->getTableName()}.type in (". implode(',', $inputs['type']).")");
        }

        return $columns;
    }

    public function findById($id) {
        /** @var Model $model */
        $data = $this->repo_base->findById($id);

        if (!isset($data)) {
            return ['code' => '004', 'message' => $this->getModelName()];
        }
        $data->permission_groups = $this->groupPermission($data);
        return [
            'code' => '200',
            'data' => $this->formatData($data)
        ];
    }

    private function groupPermissions($roles) {
        $datas = [];
        if(sizeof($roles) > 0){
            foreach($roles as $role){
                if($role->name != 'superadmin'){
                    $role->permission_groups = $this->groupPermission($role);
                    array_push($datas, $role);
                }
            }
        }
        return $datas;
    }

    private function groupPermission($role){
        $group_permission = [];
        foreach(config('enums.permissions.type') as $key=>$pers){
            $data = [];
            foreach($pers as $k=>$per) {
                $list = $this->findGroupType($role->permissions, $k);
                if(count($list) > 0){
                    $data = array_merge($data, $list);
                }
            }
            $group_permission[$key] = $data;
        }
        return $group_permission;
    }

    private function findGroupType($permissions, $type){
        $data = [];
        foreach($permissions as $per){
            if($per->type == $type){
                array_push($data, $per);
            }
        }
        return $data;
    }

    public function getJoinTable() {
        return [];
    }
}
