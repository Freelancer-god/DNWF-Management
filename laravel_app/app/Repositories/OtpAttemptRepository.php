<?php


namespace App\Repositories;


use App\Models\OtpAttempt;
use App\Repositories\Interfaces\OtpAttemptRepositoryInterface;

class OtpAttemptRepository extends BaseRepository implements OtpAttemptRepositoryInterface
{
    public function getModel()
    {
        return OtpAttempt::class;
    }
}
