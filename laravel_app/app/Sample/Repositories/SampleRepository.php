<?php


namespace App\Sample\Repositories;


use App\Repositories\BaseRepository;
use App\Sample\Repositories\Interfaces\SampleRepositoryInterface;
use Illuminate\Database\Eloquent\Model;

class SampleRepository extends BaseRepository implements SampleRepositoryInterface
{

    public function getModel()
    {
        return Model::class;
    }
}
