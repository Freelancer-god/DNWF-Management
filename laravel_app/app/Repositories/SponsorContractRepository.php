<?php


namespace App\Repositories;


use App\Models\SponsorContract;
use App\Repositories\Interfaces\SponsorContractRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;

class SponsorContractRepository extends BaseRepository implements SponsorContractRepositoryInterface
{

    public function getModel()
    {
        return SponsorContract::class;
    }
}
