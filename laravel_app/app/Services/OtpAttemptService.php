<?php


namespace App\Services;

use App\Models\OtpAttempt;
use App\Repositories\Interfaces\OtpAttemptRepositoryInterface;
use App\Services\Base\BaseService;

class OtpAttemptService extends BaseService
{

    protected $repo_base;

    public function __construct(
        OtpAttemptRepositoryInterface $repo_base
    ) {
        $this->repo_base                = $repo_base;
    }

    public function getModelName()
    {
        return 'otp attemp';
    }

    public function getTableName()
    {
        return (new OtpAttempt())->getTable();
    }
}
