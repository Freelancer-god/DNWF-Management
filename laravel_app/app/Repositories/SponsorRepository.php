<?php


namespace App\Repositories;


use App\Models\Sponsor;
use App\Repositories\Interfaces\SponsorRepositoryInterface;

class SponsorRepository extends BaseRepository implements SponsorRepositoryInterface
{

    public function getModel()
    {
        return Sponsor::class;
    }
}
