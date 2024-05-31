<?php


namespace App\Repositories;


use App\Models\SponsorCare;
use App\Repositories\Interfaces\SponsorCareRepositoryInterface;

class SponsorCareRepository extends BaseRepository implements SponsorCareRepositoryInterface
{

    public function getModel()
    {
        return SponsorCare::class;
    }
}
