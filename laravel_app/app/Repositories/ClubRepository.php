<?php


namespace App\Repositories;


use App\Models\Club;
use App\Repositories\Interfaces\ClubRepositoryInterface;

class ClubRepository extends BaseRepository implements ClubRepositoryInterface
{

    public function getModel()
    {
        return Club::class;
    }
}
