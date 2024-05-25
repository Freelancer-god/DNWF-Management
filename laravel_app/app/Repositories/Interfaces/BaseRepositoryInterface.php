<?php
namespace App\Repositories\Interfaces;

interface BaseRepositoryInterface
{
    /**
     * Create
     * @param array $attributes
     * @return mixed
     */
    public function create(array $attributes);

    /**
     * Update
     * @param $id
     * @param array $attributes
     * @return mixed
     */
    public function update($id, array $attributes);

    /**
     * Delete
     * @param $id
     * @return mixed
     */
    public function delete($id);

    /**
     * exist By Id
     * @param $id
     * @return bool
     */
    public function existById($id);

    /**
     * exist By Ids
     * @param $id
     * @return bool
     */
    public function existByIds(array $ids);

    /**
     * exist By Where
     * @param array $conds
     * @param $id
     * @param bool $withTrashed
     * @return bool
     */
    public function existByWhere(array $conds, $id, $withTrashed = false);

    /**
     * find By Id
     * @param $id
     * @param array $with
     * @param array $columns
     * @param bool $withTrashed
     * @return mixed
     */
    public function findById($id, array $with = [],  array $columns = ['*'], $withTrashed = false);

    /**
     * find By Ids
     * @param $id
     * @param array $with
     * @param array $columns
     * @param bool $withTrashed
     * @param string $orderBy
     * @param string $sort
     * @return mixed
     */
    public function findByIds(array $ids, array $with = [], array $columns = ['*'], $withTrashed = false, $orderBy = 'id', $sort = 'asc');

    /**
     * Delete
     * @param $ids
     * @return mixed
     */
    public function deleteByIds(array $ids);

    /**
     * find One By
     * @param array $data
     * @param array $with
     * @param array $columns
     * @param bool $withTrashed
     * @return mixed
     */
    public function findOneBy(array $data, array $with = [],  array $columns = ['*'], $withTrashed = false);

    /**
     * find Where By
     * @param array $data
     * @param array $with
     * @param array $columns
     * @param bool $withTrashed
     * @return mixed
     */
    public function findWhereBy(array $data, array $with = [],  array $columns = ['*'], $withTrashed = false, $orderBy = 'id', $sort = 'asc');

    /**
     * count All
     * @return mixed
     */
    public function countAll();

    /**
     * find All
     * @param array $columns
     * @param array $with
     * @param bool $withTrashed
     * @param string $orderBy
     * @param string $sort
     * @return mixed
     */
    public function findAll(array $columns = ['*'], array $with = [], $withTrashed = false, $orderBy = 'id', $sort = 'asc');

    /**
     * update DBs
     * @param array $ids
     * @param array $inputs
     * @return mixed
     */
    public function updateDBs(array $ids, $inputs);

    /**
     * find DB All
     * @param array $columns
     * @param array $with
     * @param string $orderBy
     * @param string $sort
     * @return mixed
     */
    public function findDBAll(array $columns = ['*'], array $with = [], $orderBy = 'id', $sort = 'asc');

    /**
     * find DB One By
     * @param array $data
     * @param array $with
     * @param array $columns
     * @return mixed
     */
    public function findDBOneBy(array $data, array $with = [],  array $columns = ['*']);

    /**
     * find DB Where By
     * @param array $data
     * @param array $with
     * @param array $columns
     * @param string $orderBy
     * @param string $sort
     * @return mixed
     */
    public function findDBWhereBy(array $data, array $with = [],  array $columns = ['*'], $orderBy = 'id', $sort = 'asc');

    /**
     * find DB By Ids
     * @param array $ids
     * @param array $with
     * @param array $columns
     * @param string $orderBy
     * @param string $sort
     * @return mixed
     */
    public function findDBByIds(array $ids, array $with = [], array $columns = ['*'], $orderBy = 'id', $sort = 'asc');

    /**
     * find DB By Id
     * @param $id
     * @param array $columns
     * @return mixed
     */
    public function findDBById($id, array $columns = ['*']);

    /**
     * delete DB By Ids
     * @param array $ids
     * @return mixed
     */
    public function deleteDBByIds(array $ids);

    /**
     * search Text
     * @param string $text
     * @param array $columns
     * @param array $columnsHas
     * @param int $page
     * @param int $limit
     * @param string $order
     * @param string $sort
     * @param array $with
     * @param array $selects
     * @param bool $withTrashed
     * @return mixed
     */
    public function searchText($text, array $columns, array $columnsHas, array $join, $page = 1, $limit = 30, $order = 'id', $sort = 'desc', array $with = [], array $selects = [], $withTrashed = false);

    /**
     * search Text Count
     * @param string $text
     * @param array $columns
     * @param array $columnsHas
     * @param bool $withTrashed
     * @return mixed
     */
    public function searchTextCount($text, array $columns, array $columnsHas, array $join, $withTrashed = false);

    /**
     * list By Column
     * @param array $columns
     * @param array $columnsHas
     * @param int $page
     * @param int $limit
     * @param array $selects
     * @param string $order
     * @param string $sort
     * @param array $with
     * @param bool $withTrashed
     * @return mixed
     */
    public function listByColumn(array $columns, array $columnsHas, array $join, $page = 1, $limit = 30, array $selects = ['*'], $order = 'id', $sort = 'desc', array $with = [], $withTrashed = false);

    /**
     * count By Column
     * @param array $columns
     * @param array $columnsHas
     * @param bool $withTrashed
     * @return mixed
     */
    public function countByColumn(array $columns, array $columnsHas, array $join, $withTrashed = false);

    /**
     * search Text Group
     * @param string $text
     * @param array $columns
     * @param array $columnsHas
     * @param int $page
     * @param int $limit
     * @param string $order
     * @param string $sort
     * @param array $with
     * @param array $selects
     * @param array $group_by
     * @param bool $withTrashed
     * @return mixed
     */
    public function searchTextGroup($text, array $columns, array $columnsHas, array $join, $page = 1, $limit = 30, $order = 'id', $sort = 'desc', array $with = [], array $selects = [], array $group_by = [], $withTrashed = false);

    /**
     * search Text Count Group
     * @param string $text
     * @param array $columns
     * @param array $columnsHas
     * @param array $group_by
     * @param bool $withTrashed
     * @return mixed
     */
    public function searchTextCountGroup($text, array $columns, array $columnsHas, array $join, array $group_by = [], $withTrashed = false);

    /**
     * list By Column Group
     * @param array $columns
     * @param array $columnsHas
     * @param int $page
     * @param int $limit
     * @param array $selects
     * @param string $order
     * @param string $sort
     * @param array $with
     * @param array $group_by
     * @param bool $withTrashed
     * @return mixed
     */
    public function listByColumnGroup(array $columns, array $columnsHas, array $join, $page = 1, $limit = 30, array $selects = ['*'], $order = 'id', $sort = 'desc', array $with = [], array $group = [], $withTrashed = false);

    /**
     * search Text Count Group
     * @param array $columns
     * @param array $columnsHas
     * @param array $group_by
     * @param bool $withTrashed
     * @return mixed
     */
    public function countByColumnGroup(array $columns, array $columnsHas, array $join, array $group = [], $withTrashed = false);

    /**
     * generate Has Column (serve for search)
     * @param $query
     * @param $columnsHas
     * @return mixed
     */
    public function generateHasColumn($query, $columnsHas);

    /**
     * generate Column (serve for search)
     * @param $query
     * @param $columnsHas
     * @return mixed
     */
    public function generateColumn($query, $columns);

    /**
     * update Multiple
     * @param array $values
     * @param bool $isUpdatedAt
     * @return mixed
     */
    public function updateMultiple(array $values, $isUpdatedAt = true);

    /**
     * get Reference ByP refix
     * @param string $prefix
     * @param string $column
     * @param int $length
     * @param bool $withTrashed
     * @return mixed
     */
    public function getReferenceByPrefix($prefix, $column, $length, $withTrashed = false);

    /**
     * last Record
     * @param $custom
     * @param $column
     * @param bool $withTrashed
     * @return mixed
     */
    public function lastRecord($custom, $column, $withTrashed);

    /**
     * insert DBs
     * @param array $inputs
     * @return mixed
     */
    public function insertDBs(array $inputs);

    /**
     * dict By Ids
     * @param array $ids
     * @param string $orderBy
     * @param string $sort
     * @param bool $withTrashed
     * @return mixed
     */
    public function dictByIds(array $ids, $orderBy = 'id', $sort = 'asc', $withTrashed = false, array $columns = ['*'], array $with = []);

    /**
     * dict By Id And Conds
     * @param array $ids
     * @param array $conds
     * @param string $orderBy
     * @param string $sort
     * @param bool $withTrashed
     * @return mixed
     */
    public function dictByIdAndConds(array $ids, array $conds = [], $orderBy = 'id', $sort = 'asc', $withTrashed = false, array $columns = ['*'], array $with = []);

    /**
     * dict By Id And Conds
     * @param string $objectKey
     * @param array objectId
     * @param array $conds
     * @param string $orderBy
     * @param string $sort
     * @param bool $withTrashed
     * @return mixed
     */
    public function dictByObjectIdAndConds($objectKey, array $objectIds, array $conds = [], $orderBy = 'id', $sort = 'asc', $withTrashed = false, array $columns = ['*'], array $with = []);


    /**
     * dict By Where
     * @param array $conds
     * @param string $columnKey
     * @param string $orderBy
     * @param string $sort
     * @param bool $withTrashed
     * @return mixed
     */
    public function dictByWhere(array $conds, $columnKey = 'id', $orderBy = 'id', $sort = 'asc', $withTrashed = false, array $columns = ['*'], array $with = []);

    /**
     * Find by raw query
     * @param array $conds
     * @param array $select
     * @param bool $withTrashed
     * @return mixed
     */
    public function findByRaw($conds, $select = ['*'], $isTrashed = false);
}
