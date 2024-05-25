<?php


namespace App\Repositories\Interfaces;

interface ConfigRepositoryInterface extends BaseRepositoryInterface
{
    public function getDictByTypes($types);
}
