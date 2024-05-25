<?php


namespace App\Sample\Services;


use App\Sample\Repositories\Interfaces\SampleRepositoryInterface;
use App\Services\Base\BaseService;
use Illuminate\Database\Eloquent\Model;

class SampleService extends BaseService
{

    protected $repo_base;

    public function __construct(
        SampleRepositoryInterface $repo_base
    ) {
        $this->repo_base                = $repo_base;
    }

    public function getModelName()
    {
        return Model::class;
    }

    public function getTableName()
    {
        return (Model::class)->getTable();
    }
}
