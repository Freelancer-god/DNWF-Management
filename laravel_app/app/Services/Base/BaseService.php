<?php
/**
 * Created by PhpStorm.
 * User: Tuan
 * Date: 12/21/2018
 * Time: 2:24 PM
 */

namespace App\Services\Base;

use App\Utils\SqlUtil;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

abstract class BaseService
{
    protected $repo_base;
    protected $is_app;
    protected $with;

    abstract public function getModelName();
    abstract public function getTableName();

    public function getAll() {
        $this->is_app = false;
        $datas = $this->repo_base->findAll();
        $count = $this->repo_base->countAll();
        return [
            'code' => '200',
            'data' => [
                'data' => $this->formatSelectData($datas),
                'total' => $count
            ]
        ];
    }

    public function store($inputs){
        $this->is_app = isset($inputs['is_app']) ? $inputs['is_app'] : false;
        $validate = $this->checkInputs($inputs, null);
        if($validate['is_failed']) {
            return $validate;
        }
        $input_dat = $validate['inputs'];
        $data = $this->repo_base->create($input_dat);
        return [
            'code' => '200',
            'data' => $this->formatData($data)
        ];
    }

    public function update($id, $inputs){
        $this->is_app = isset($inputs['is_app']) ? $inputs['is_app'] : false;
        /** @var Model $model */
        $data = $this->repo_base->findById($id);
        if (!isset($data)) {
            return ['code' => '004', 'message' => $this->getModelName()];
        }
        $validate = $this->checkInputs($inputs, $id);
        if($validate['is_failed']) {
            return $validate;
        }
        $input_dat = $validate['inputs'];

        $data = $this->repo_base->update($id, $input_dat);
        $data = $this->repo_base->findById($data->id);
        return [
            'code' => '200',
            'data' => $this->formatData($data)
        ];
    }

    public function findById($id) {
        $this->is_app = false;
        /** @var Model $model */
        $data = $this->repo_base->findById($id);

        if (!isset($data)) {
            return ['code' => '004', 'message' => $this->getModelName()];
        }
        return [
            'code' => '200',
            'data' => $this->formatData($data)
        ];
    }

    public function destroy($id){
        $this->is_app = false;
        $data = $this->repo_base->findById($id);

        if (!isset($data)) {
            return ['code' => '004', 'message' => $this->getModelName()];
        }
        $data->delete();

        return [
            'code' => '200',
            'message' => 'Deleted successfully'
        ];
    }

    public function search($inputs)
    {
        $this->is_app = isset($inputs['is_app']) ? $inputs['is_app'] : false;
        $text = null;
        $columns = [];
        $columnsHas = [];
        $term = isset($inputs['term']) ? $inputs['term'] : [];
        $with = isset($inputs['with']) ? $inputs['with'] : $this->with;
        $page = isset($inputs['page']) ? $inputs['page'] : 1;
        $limit = isset($inputs['limit']) ? $inputs['limit'] : 30;
        $orderBy = isset($inputs['order_by']) ? $inputs['order_by'] : 'created_at';
        $sort = isset($inputs['sort']) ? $inputs['sort'] : 'desc';
        $joins = $this->getJoinTable();

        $orderBy = $this->generateOrder($orderBy);
        $select = $this->generateSelect($inputs, $this->getTableName());
        // status
        $columns = $this->generateColumn($inputs['filter'], $columns);
        // generate conditions from term
        $query = $this->generateQuery($term, $columns);
        $columns = $query['columns'];
        $text = $query['search'];

        $datas = $this->repo_base->searchText($text, $columns, $columnsHas, $joins, $page, $limit, $orderBy, $sort, $with, $select);
        $count = $this->repo_base->searchTextCount($text, $columns, $columnsHas, $joins);

        return [
            'code' => '200',
            'data' => [
                'data' => $this->formatSelectData($datas),
                'total' => $count
            ]
        ];
    }

    public function getDictByIds($inputs)
    {
        $this->is_app = isset($inputs['is_app']) ? $inputs['is_app'] : false;
        if(!isset($inputs['ids'])) {
            return ['code' => '003', 'message' => 'ids '];
        }
        $orderBy = isset($inputs['order_by']) ? $inputs['order_by'] :'id';
        $sort = isset($inputs['sort']) ? $inputs['sort'] :'asc';
        $withTrashed = isset($inputs['with_trashed']) ? $inputs['with_trashed'] : false;
        $select = $this->generateSelect($inputs, $this->getTableName());
        $with = isset($inputs['with']) ? $inputs['with'] :[];

        $datas = $this->repo_base->dictByIds($inputs['ids'], $orderBy, $sort, $withTrashed, $select, $with);

        $res = [];
        foreach ($datas as $key=>$data){
            $res[$key] = $this->formatData($data);
        }
        return [
            'code' => '200',
            'data' => $res
        ];
    }

    public function getDictByIdAndConds($inputs)
    {
        $this->is_app = isset($inputs['is_app']) ? $inputs['is_app'] : false;
        if(!isset($inputs['ids'])) {
            return ['code' => '003', 'message' => 'ids '];
        }
        $orderBy = isset($inputs['order_by']) ? $inputs['order_by'] :'id';
        $sort = isset($inputs['sort']) ? $inputs['sort'] :'asc';
        $withTrashed = isset($inputs['with_trashed']) ? $inputs['with_trashed'] : false;
        $select = $this->generateSelect($inputs, $this->getTableName());
        $with = isset($inputs['with']) ? $inputs['with'] :[];
        $conds = isset($inputs['conds']) ? $inputs['conds'] :[];

        $datas = $this->repo_base->dictByIdAndConds($inputs['ids'], $conds, $orderBy, $sort, $withTrashed, $select, $with);
        $res = [];
        foreach ($datas as $key=>$data){
            $res[$key] = $this->formatData($data);
        }
        return [
            'code' => '200',
            'data' => $res
        ];
    }

    public function getDictByObjectIdAndConds($inputs)
    {
        $this->is_app = isset($inputs['is_app']) ? $inputs['is_app'] : false;
        if(!isset($inputs['ids'])) {
            return ['code' => '003', 'message' => 'ids '];
        }
        $objectKey = isset($inputs['object_key']) ? $inputs['object_key'] :'id';
        $orderBy = isset($inputs['order_by']) ? $inputs['order_by'] :'id';
        $sort = isset($inputs['sort']) ? $inputs['sort'] :'asc';
        $withTrashed = isset($inputs['with_trashed']) ? $inputs['with_trashed'] : false;
        $select = $this->generateSelect($inputs, $this->getTableName());
        $with = isset($inputs['with']) ? $inputs['with'] :[];
        $conds = isset($inputs['conds']) ? $inputs['conds'] :[];

        $datas = $this->repo_base->dictByObjectIdAndConds($objectKey, $inputs['ids'], $conds, $orderBy, $sort, $withTrashed, $select, $with);
        $res = [];
        foreach ($datas as $key=>$data){
            $res[$key] = $this->formatData($data);
        }
        return [
            'code' => '200',
            'data' => $res
        ];
    }

    public function getDictByColumns($inputs)
    {
        $this->is_app = isset($inputs['is_app']) ? $inputs['is_app'] : false;
        $columns = isset($inputs['conds']) ? $inputs['conds'] : [];
        $columnKey = isset($inputs['column_key']) ? $inputs['column_key'] :'id';
        $orderBy = isset($inputs['order_by']) ? $inputs['order_by'] :'id';
        $sort = isset($inputs['sort']) ? $inputs['sort'] :'asc';
        $withTrashed = isset($inputs['with_trashed']) ? $inputs['with_trashed'] : false;
        $select = $this->generateSelect($inputs, $this->getTableName());
        $with = isset($inputs['with']) ? $inputs['with'] :[];

        $datas = $this->repo_base->dictByWhere($columns, $columnKey, $orderBy, $sort, $withTrashed, $select, $with);
        $res = [];
        foreach ($datas as $key=>$data){
            $res[$key] = $this->formatData($data);
        }
        return [
            'code' => '200',
            'data' => $res
        ];
    }

    public function generateOrder($orderBy){
        return $orderBy;
    }

    public function generateColumn($inputs, $columns) {
        return $columns;
    }

    public function generateSelect($inputs, $table){
        $select = [$table . '.*'];
        if(isset($inputs['select']) && $inputs['select'] != '*') {
            $select = [];
            $split = explode(',', $inputs['select']);
            foreach($split as $col) {
                array_push($select, $table . '.' . trim($col));
            }
        }
        return $select;
    }

    public function formatSelectData($datas) {
        $res = [];
        foreach($datas as $data) {
            array_push($res, $this->formatData($data));
        }
        return $res;
    }

    public function formatDataCms($data){
        $res = json_decode($data, true);
        if(isset($res['medias'])){
            $res['medias'] = json_decode($res['medias'], true);
        } else {
            $res['medias'] = [];
        }

        return $res;
    }

    public function formatDataApp($data){
        $res = json_decode($data, true);
        if(isset($res['medias'])){
            $res['medias'] = json_decode($res['medias'], true);
        } else {
            $res['medias'] = [];
        }

        return $res;
    }

    public function formatData($data){
        if($this->is_app) {
            return $this->formatDataApp($data);
        }
        return $this->formatDataCms($data);
    }

    public function checkInputs($inputs, $id){
        return [
            'is_failed' => false,
            'inputs' => $inputs
        ];
    }

    public function generateQuery($terms, $columns)
    {
        $sql_util = new SqlUtil();
        $search = null;

        if(is_string($terms) && !empty($terms)){
            $search = trim($terms);
        } else if(is_array($terms) && count($terms) > 0){
            foreach ($terms as $term) {
                if (!is_array($term)) {
                    if(!empty($term)) {
                        $search = trim($term);
                    }
                } else if(count($term) > 0){
                    $conditions = [];
                    foreach ($term as $cond) {
                        if(in_array($cond['field'], $this->getQueryDateField())){
                            $conditions[] = $sql_util->generateDateField($cond);
                        } else if(in_array($cond['field'], $this->getQueryField())){
                            $conditions[] = $sql_util->generateNormalField($cond);
                        }
                    }
                    if(count($conditions) > 0) {
                        $columns[] = '('. implode(' OR ', $conditions) .')';
                    }
                }
            }
        }

        return [
            'columns' => $columns,
            'search' => $search
        ];
    }

    public function getJoinTable() {
        return [];
    }

    public function getQueryDateField() {
        return [
            $this->getTableName() .'.created_at',
            $this->getTableName() .'.updated_at'
        ];
    }

    public function getQueryField() {
        return [
            $this->getTableName() .'.id',
            $this->getTableName() .'.reference'
        ];
    }
}
