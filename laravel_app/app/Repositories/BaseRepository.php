<?php


namespace App\Repositories;


use App\Repositories\Interfaces\BaseRepositoryInterface;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

abstract class BaseRepository implements BaseRepositoryInterface
{
    /**
     * @var \Illuminate\Database\Eloquent\Model
     */
    protected $model;

    /**
     * EloquentRepository constructor.
     */
    public function __construct()
    {
        $this->setModel();
    }
    /**
     * get model
     * @return string
     */
    abstract public function getModel();
    /**
     * Set model
     */
    public function setModel()
    {
        $this->model = app()->make(
            $this->getModel()
        );
    }

    public function create(array $attributes)
    {
        $data = $this->model->create($attributes);
        $data = $data->fresh();
        return $data;
    }

    public function update($id, array $attributes)
    {
        $result = $this->findById($id);
        if ($result) {
            $result->update($attributes);
            return $result;
        }

        return false;
    }

    public function delete($id)
    {
        $result = $this->findById($id);
        if ($result) {
            $result->delete();
            return true;
        }
        return false;
    }

    public function existById($id) {
        $count = $this->model->where($this->model->getKeyName(), $id)->count();
        return $count > 0 ? true : false;
    }

    public function existByIds(array $ids) {
        $count = $this->model->whereIn($this->model->getKeyName(), $ids)->count();
        return $count == count($ids) ? true : false;
    }

    public function existByWhere(array $conds, $id, $withTrashed = false) {
        $query = $this->model->where($conds);
        if(isset($id)){
            $query->where($this->model->getKeyName(), '<>', $id);
        }
        if($withTrashed) {
            $query->withTrashed();
        }
        $count = $query->count();
        return $count > 0 ? true : false;
    }

    public function findById($id, array $with = [],  array $columns = ['*'], $withTrashed = false)
    {
        $query = $this->model->where('id', $id);
        if(count($with) > 0) {
            $query->with($with);
        }
        if($withTrashed){
            $query->withTrashed();
        }
        $datas = $query->limit(1)->get($columns);
        return count($datas) > 0 ? $datas[0] : null;
    }

    public function findByIds(array $ids, array $with = [], array $columns = ['*'], $withTrashed = false,  $orderBy = 'id',  $sort = 'asc')
    {
        $query = $this->model->whereIn('id', $ids);

        if(count($with) > 0) {
            $query->with($with);
        }

        if($withTrashed){
            $query->withTrashed();
        }
        $query->orderBy($orderBy, $sort);
        return $query->get($columns);
    }

    public function deleteByIds(array $ids){
        $this->model->whereIn($this->model->getKeyName(), $ids)->delete();
    }

    public function findOneBy(array $data, array $with = [],  array $columns = ['*'], $withTrashed = false)
    {
        $query = $this->model->where($data);
        if(count($with) > 0) {
            $query->with($with);
        }
        if($withTrashed){
            $query->withTrashed();
        }
        $datas = $query->limit(1)->get($columns);
        return count($datas) > 0 ? $datas[0] : null;
    }

    public function findWhereBy(array $data, array $with = [],  array $columns = ['*'], $withTrashed = false, $orderBy = 'id', $sort = 'asc')
    {
        $query = $this->model->where($data);
        if(count($with) > 0) {
            $query->with($with);
        }
        if($withTrashed){
            $query->withTrashed();
        }
        $query->orderBy($orderBy, $sort);
        return $query->get($columns);
    }

    public function countAll() {
        return $this->model->count();
    }

    public function findAll(array $columns = ['*'], array $with = [], $withTrashed = false,  $orderBy = 'id',  $sort = 'asc') {
        $query = $this->model->orderBy($orderBy, $sort);
        if(count($with) > 0) {
            $query->with($with);
        }
        if($withTrashed){
            $query->withTrashed();
        }
        return $query->get($columns);
    }

    public function updateDBs(array $ids, $inputs){
        DB::table($this->model->getTable())
            ->whereIn('id', $ids)
            ->update($inputs);
    }

    public function findDBAll(array $columns = ['*'], array $with = [],  $orderBy = 'id',  $sort = 'asc') {
        $query = DB::table($this->model->getTable())->orderBy($orderBy, $sort);
        if(count($with) > 0) {
            $query->with($with);
        }
        return $query->get($columns);
    }

    public function findDBOneBy(array $data, array $with = [],  array $columns = ['*']) {
        $query = DB::table($this->model->getTable())->where($data);
        if(count($with) > 0) {
            $query->with($with);
        }
        $datas = $query->limit(1)->get($columns);
        return count($datas) > 0 ? $datas[0] : null;
    }

    public function findDBWhereBy(array $data, array $with = [],  array $columns = ['*'],  $orderBy = 'id',  $sort = 'asc') {
        $query = DB::table($this->model->getTable())->where($data);
        if(count($with) > 0) {
            $query->with($with);
        }
        $query->orderBy($orderBy, $sort);
        return $query->get($columns);
    }

    public function findDBByIds(array $ids, array $with = [], array $columns = ['*'],  $orderBy = 'id',  $sort = 'asc'){
        $query = DB::table($this->model->getTable())->whereIn('id', $ids)->get();
        if(count($with) > 0) {
            $query->with($with);
        }
        $query->orderBy($orderBy, $sort);
        return $query->get($columns);
    }

    public function findDBById($id, array $columns = ['*']){
        $datas = DB::table($this->model->getTable())->where('id', $id)->limit(1)->get($columns);
        return count($datas) > 0 ? $datas[0] : null;
    }

    public function deleteDBByIds(array $ids){
        DB::table($this->model->getTable())->whereIn('id', $ids)->delete();
    }

    public function searchText($text, array $columns, array $columnsHas, array $join, $page = 1, $limit = 30, $order = 'id',  $sort = 'desc', array $with = [], array $selects = [], $withTrashed = false)
    {
        if(count($selects) == 0){
            $selects = [$this->model->getTable() . '.*'];
        }
        if(!empty($text)){
            if($withTrashed) {
                $query = $this->model->withTrashed()->search($text);
            } else {
                $query = $this->model->search($text);
            }

            $query = $this->generateJoin($query, $join);
            $query = $this->generateWith($query, $with);
            $query = $this->generateColumn($query, $columns);
            $query = $this->generateHasColumn($query, $columnsHas);
            $query = $this->generateOrderBy($query, $order, $sort);
//            $query_logs = DB::getQueryLog();
            if($limit != -1){
                return $query->offset(($page - 1) * $limit)
                    ->limit($limit)->distinct()->get($selects);
            }
            return $query->groupBy($selects)->distinct()->get($selects);
        }
        return $this->listByColumn($columns, $columnsHas, $join, $page, $limit, $selects, $order, $sort, $with, $withTrashed);
    }

    public function searchTextCount($text, array $columns, array $columnsHas, array $join, $withTrashed = false)
    {
        if(!empty($text)){
            if($withTrashed) {
                $query = $this->model->withTrashed()->search($text);
            } else {
                $query = $this->model->search($text);
            }
            $query = $this->generateJoin($query, $join);
            $query = $this->generateColumn($query, $columns);
            $query = $this->generateHasColumn($query, $columnsHas);

            return $query->distinct()->count($this->model->getKeyName());
        }
        return $this->countByColumn($columns, $columnsHas, $join, $withTrashed);
    }

    public function listByColumn(array $columns, array $columnsHas, array $join, $page = 1, $limit = 30, array $selects = ['*'], $order = 'id',  $sort = 'desc', array $with = [], $withTrashed = false)
    {
        $query = $this->generateJoin(null, $join);
        $query = $this->generateOrderBy($query, $order, $sort);
        $query = $this->generateWith($query, $with);
        $query = $this->generateColumn($query, $columns);
        $query = $this->generateHasColumn($query, $columnsHas);
        if($withTrashed) { $query->withTrashed(); }

        if($limit != -1){
            return $query->offset(($page - 1) * $limit)->distinct()
                ->limit($limit)->get($selects);
        }
        return $query->distinct()->get($selects);
    }

    public function countByColumn(array $columns, array $columnsHas, array $join, $withTrashed = false)
    {
        $query = $this->generateJoin(null, $join);
        $query = $this->generateColumn($query, $columns);
        $query = $this->generateHasColumn($query, $columnsHas);

        if(!isset($query)){
            if($withTrashed) { return $this->model->distinct()->withTrashed()->count($this->model->getKeyName()); }
            else { return $this->model->distinct()->count($this->model->getKeyName()); }
        }

        if($withTrashed) { $query->withTrashed(); }
        return $query->distinct()->count($this->model->getKeyName());
    }

    public function searchTextGroup($text, array $columns, array $columnsHas, array $join, $page = 1, $limit = 30, $order = 'id',  $sort = 'desc', array $with = [], array $selects = [], array $group_by = [], $withTrashed = false)
    {
        if(count($selects) == 0){
            $selects = [$this->model->getTable() . '.*'];
        }
        if(!empty($text)){
            $query = $this->model->searchText($text);
            $query = $this->generateJoin($query, $join);
            $query = $this->generateWith($query, $with);
            $query = $this->generateColumn($query, $columns);
            $query = $this->generateHasColumn($query, $columnsHas);
            $query = $this->generateOrderBy($query, $order, $sort);
            if($limit != -1){
                return $query->offset(($page - 1) * $limit)
                    ->limit($limit)->distinct()->get($selects);
            }
            return $query->groupBy($group_by)->distinct()->get($selects);
        }
        return $this->listByColumnGroup($columns, $columnsHas, $join, $page, $limit, $selects, $order, $sort, $with, $group_by, $withTrashed);
    }
    /**/
    public function searchTextCountGroup($text, array $columns, array $columnsHas, array $join, array $group_by = [],  $withTrashed = false)
    {
        if(!empty($text)){
            $query = $this->model->searchText($text);
            $query = $this->generateJoin($query, $join);
            $query = $this->generateColumn($query, $columns);
            $query = $this->generateHasColumn($query, $columnsHas);
            return $query->groupBy($group_by)->distinct()->count($this->model->getKeyName());
        }
        return $this->countByColumnGroup($columns, $columnsHas, $join, $group_by, $withTrashed);
    }

    public function listByColumnGroup(array $columns, array $columnsHas, array $join, $page = 1, $limit = 30, array $selects = ['*'], $order = 'id',  $sort = 'desc', array $with = [], array $group = [],  $withTrashed = false)
    {
        $query = $this->generateJoin(null, $join);
        $query = $this->generateOrderBy($query, $order, $sort);
        $query = $this->generateWith($query, $with);
        $query = $this->generateColumn($query, $columns);
        $query = $this->generateHasColumn($query, $columnsHas);
        if($withTrashed) { $query->withTrashed(); }

        if($limit != -1){
            return $query->offset(($page - 1) * $limit)->distinct()
                ->limit($limit)->get($selects);
        }
        return $query->groupBy($group)->distinct()->get($selects);
    }

    public function countByColumnGroup(array $columns, array $columnsHas, array $join, array $group = [],  $withTrashed = false)
    {
        $query = $this->generateJoin(null, $join);
        $query = $this->generateColumn($query, $columns);
        $query = $this->generateHasColumn($query, $columnsHas);

        if(!isset($query)){
            if($withTrashed) { return $this->model->distinct()->withTrashed()->count($this->model->getKeyName()); }
            else { return $this->model->distinct()->count($this->model->getKeyName()); }
        }
        if($withTrashed) { $query->withTrashed(); }
        return $query->groupBy($group)->distinct()->count($this->model->getKeyName());
    }

    public function generateHasColumn($query, $columnsHas) {
        if(isset($columnsHas) && count($columnsHas) > 0){
            foreach($columnsHas as $key=>$col) {
                if(!isset($query)){
                    if (strpos($key, '-') !== false) {
                        $keyArray = explode('-', $key);
                        $query = $this->model->whereHas($keyArray[0], function($query1) use ($col, $keyArray){
                            $query1->whereHas($keyArray[1], function($query2) use ($col) {
                                $query2->where($col);
                            });
                        });
                    } else {
                        $query = $this->model->whereHas($key, function($query1) use ($col){
                            $query1->where($col);
                        });
                    }
                } else {
                    if (strpos($key, '-') !== false) {
                        $keyArray = explode('-', $key);
                        $query = $query->whereHas($keyArray[0], function($query1) use ($col, $keyArray){
                            $query1->whereHas($keyArray[1], function($query2) use ($col) {
                                $query2->where($col);
                            });
                        });
                    } else {
                        $query = $query->whereHas($key, function($query1) use ($col){
                            $query1->where($col);
                        });
                    }
                }
            }
        }
        return $query;
    }

    public function generateColumn($query, $columns) {
        if(isset($columns) && count($columns) > 0){
            if(!isset($query)){
                if(is_array($columns)){
                    foreach($columns as $col){
                        if(!isset($query)){
                            $query = $this->model->whereRaw($col);
                        } else {
                            $query->whereRaw($col);
                        }
                    }
                }
//                $query = $this->model->where($columns);
            } else {
                if(is_array($columns)){
                    foreach($columns as $col){
                        $query->whereRaw($col);
                    }
                }
            }
        }
        return $query;
    }

    public function generateJoin($query, $joins) {
        if(isset($joins) && count($joins) > 0){
            // not set query
            if(!isset($query)){
                foreach($joins as $join){
                    $func = $join['join'];
                    if(!isset($query)){
                        $query = $this->model->$func($join['join_table'], $join['join_column'], $join['join_cond'], $join['main_column']);
                    } else {
                        $query->$func($join['join_table'], $join['join_column'], $join['join_cond'], $join['main_column']);
                    }
                    if(isset($join['where']) && count($join['where']) > 0){
                        foreach($join['where'] as $sql) {
                            $query->whereRaw($sql);
                        }
                    }
                }
            } else {
                foreach($joins as $join){
                    $func = $join['join'];
                    $query->$func($join['join_table'], $join['join_column'], $join['join_cond'], $join['main_column']);

                    if(isset($join['where']) && count($join['where']) > 0){
                        foreach($join['where'] as $sql) {
                            $query->whereRaw($sql);
                        }
                    }
                }
            }
        }
        return $query;
    }

    // update multiples values
    public function updateMultiple(array $values,  $isUpdatedAt = true)
    {
        $table = $this->model->getTable();
        $ids = [];
        $params = [];
        $columnsGroups = [];
        $queryStart = "UPDATE {$table} SET";
        $columnsNames = array_keys(array_values($values)[0]);
        foreach ($columnsNames as $columnName) {
            $cases = [];
            $columnGroup = " ".$columnName ." = CASE id ";
            foreach ($values as $id => $newData){
                $cases[] = "WHEN '{$id}' then ?";
                $params[] = $newData[$columnName];
                $ids[$id] = "0";
            }
            $cases = implode(' ', $cases);
            $columnsGroups[] = $columnGroup. "{$cases} END";
        }
        $ids = '\'' . implode('\',\'', array_keys($ids)) . '\'';
        $columnsGroups = implode(',', $columnsGroups);
        $params[] = Carbon::now();
        if($isUpdatedAt) {
            $queryEnd = ", updated_at = ? WHERE id in ({$ids})";
        } else {
            $queryEnd = " WHERE id in ({$ids})";
        }

        return DB::update($queryStart.$columnsGroups. $queryEnd, $params);
    }

    public function getReferenceByPrefix($prefix, $column, $length,  $withTrashed = false){
        $prefix_length = $length > 3 ? $length : 6;
        if ($record = $this->lastRecord($prefix, $column, $withTrashed)) {
            return $prefix . str_pad(++$record->id, $prefix_length, '0', STR_PAD_LEFT);
        }

        return $prefix .str_pad(1, $prefix_length, '0', STR_PAD_LEFT);
    }

    public function lastRecord($custom, $column, $withTrashed)
    {
        $query = $this->model->select(DB::raw('CONVERT(SUBSTR('. $column .', ' . (strlen($custom) + 2) .'), UNSIGNED INTEGER)  AS id'))
            ->where($column, 'like', $custom . '%');
        if($withTrashed) {
            $query->withTrashed();
        }
        return $query->orderBy('id', 'DESC')->first();
    }

    public function insertDBs(array $inputs) {
        if(count($inputs) > 0) {
            foreach (array_chunk($inputs,1000) as $t)
            {
                DB::table($this->model->getTable())->insert($t);
            }
        }
    }

    public function dictByIds(array $ids, $orderBy = 'id', $sort = 'asc', $withTrashed = false, array $columns = ['*'], array $with = []){
        $dicts = [];
        $datas = $this->findByIds($ids, $with, $columns, $withTrashed, $orderBy, $sort);
        foreach($datas as $data) {
            if(!isset($dicts[$data->id])){
                $dicts[$data->id] = $data;
            }
        }
        return $dicts;
    }

    public function dictByIdAndConds(array $ids, array $conds = [], $orderBy = 'id', $sort = 'asc', $withTrashed = false, array $columns = ['*'], array $with = []) {
        $dicts = [];
        $query = $this->model->whereIn('id', $ids);
        if(count($conds) > 0) {
            $query->where($conds);
        }
        if(count($with) > 0) {
            $query->with($with);
        }
        if($withTrashed){
            $query->withTrashed();
        }
        $query->orderBy($orderBy, $sort);
        $datas = $query->get($columns);

        foreach($datas as $data) {
            if(!isset($dicts[$data->id])){
                $dicts[$data->id] = $data;
            }
        }
        return $dicts;
    }

    public function dictByObjectIdAndConds($objectKey, array $objectIds, array $conds = [], $orderBy = 'id', $sort = 'asc', $withTrashed = false, array $columns = ['*'], array $with = []) {
        $dicts = [];
        $query = $this->model->whereIn($objectKey, $objectIds);
        if(count($conds) > 0) {
            $query->where($conds);
        }
        if(count($with) > 0) {
            $query->with($with);
        }
        if($withTrashed){
            $query->withTrashed();
        }
        $query->orderBy($orderBy, $sort);
        $datas = $query->get($columns);

        foreach($datas as $data) {
            if(!isset($dicts[$data->$objectKey])){
                $dicts[$data->$objectKey] = $data;
            }
        }
        return $dicts;
    }

    public function dictByWhere(array $conds, $columnKey = 'id', $orderBy = 'id', $sort = 'asc', $withTrashed = false, array $columns = ['*'], array $with = []) {
        $dicts = [];
        if(count($conds) > 0) {
            $datas = $this->findWhereBy($conds, $with, $columns, $withTrashed, $orderBy, $sort);
        } else {
            $datas = $this->findAll($columns, $with, $withTrashed, $orderBy, $sort);
        }

        foreach($datas as $data) {
            if(!isset($dicts[$data->$columnKey])){
                $dicts[$data->$columnKey] = $data;
            }
        }
        return $dicts;
    }

    public function findByRaw($conds, $select = ['*'], $isTrashed = false)
    {
        $is_started = true;
        $query = null;
        foreach($conds as $cond) {
            if($is_started) {
                $query = $this->model->whereRaw($cond);
                $is_started = false;
            } else {
                $query->whereRaw($cond);
            }
        }
        if($isTrashed) {
            $query->withTrashed();
        }
        return $query->get($select);
    }

    private function generateOrderBy($query, $order, $sort) {
        if(!isset($query)){
            if(is_array($order)){
                if(isset($order['join'])){
                    $query = $this->model
                        ->join($order['join'][0], $order['join'][1], $order['join'][2], $order['join'][3])
                        ->orderBy($order['orderBy'], $sort);
                } else if(isset($order['leftJoin'])) {
                    $query = $this->model
                        ->leftJoin($order['leftJoin'][0], $order['leftJoin'][1], $order['leftJoin'][2], $order['leftJoin'][3])
                        ->orderBy($order['orderBy'], $sort);
                } else if(isset($order['join_array'])){
                    foreach($order['join_array'] as $key => $join){
                        if($key == 0){
                            $query = $this->model
                                ->join($join[0], $join[1], $join[2], $join[3]);
                        } else {
                            $query->join($join[0], $join[1], $join[2], $join[3]);
                        }
                        $query->orderBy($order['orderBy'], $sort);
                    }
                } else {
                    $is_create = true;
                    foreach($order as $ord) {
                        if($is_create){
                            $query = $this->model->orderBy($ord['orderBy'], $ord['sort']);
                            $is_create = false;
                        } else {
                            $query->orderBy($ord['orderBy'], $ord['sort']);
                        }
                    }
                }

                if(isset($order['whereRaw'])){
                    $query->whereRaw($order['whereRaw']);
                }
            } else {
                if($order == 'rand()'){
                    $query = $this->model->orderByRaw(DB::raw($order));
                } else {
                    $query = $this->model->orderBy($order, $sort);
                }
            }
        } else {
            if(is_array($order)){
                if(isset($order['join'])){
                    $query->join($order['join'][0], $order['join'][1], $order['join'][2], $order['join'][3])
                        ->orderBy($order['orderBy'], $sort);
                } else if(isset($order['join_array'])){
                    foreach($order['join_array'] as $key => $join){
                        $query->join($join[0], $join[1], $join[2], $join[3]);
                    }
                    $query->orderBy($order['orderBy'], $sort);
                } else {
                    foreach($order as $ord) {
                        $query->orderBy($ord['orderBy'], $ord['sort']);
                    }
                }

                if(isset($order['whereRaw'])){
                    $query->whereRaw($order['whereRaw']);
                }
            } else {
                if($order == 'rand()'){
                    $query->orderByRaw(DB::raw($order));
                } else {
                    $query->orderBy($order, $sort);
                }
            }
        }
        return $query;
    }

    private function generateWith($query, $with){
        if(isset($with) && count($with) > 0){
            $query->with($with);
        }
        return $query;
    }
}
