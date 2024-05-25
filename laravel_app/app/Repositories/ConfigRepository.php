<?php


namespace App\Repositories;


use App\Models\Config;
use App\Repositories\Interfaces\ConfigRepositoryInterface;

class ConfigRepository extends BaseRepository implements ConfigRepositoryInterface
{
    public function getModel()
    {
        return Config::class;
    }

    public function getDictByTypes($types)
    {
        $dicts = [];
        $query = $this->model->whereIn('type', $types);
        $datas = $query->get();
        foreach($datas as $data) {
            if(!isset($dicts[$data->type])){
                $dicts[$data->type] = $data;
            }
        }
        return $dicts;
    }
}
