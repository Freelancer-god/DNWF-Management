<?php


namespace App\Repositories;


use App\Models\ActivityRecord;
use App\Repositories\Interfaces\ActivityRecordRepositoryInterface;

class ActivityRecordRepository extends BaseRepository implements ActivityRecordRepositoryInterface
{

    public function getModel()
    {
        return ActivityRecord::class;
    }
}
