<?php


namespace App\Repositories;


use App\Models\EmployeeLog;
use App\Repositories\Interfaces\EmployeeLogRepositoryInterface;

class EmployeeLogRepository extends BaseRepository implements EmployeeLogRepositoryInterface
{
    public function getModel()
    {
        return EmployeeLog::class;
    }
}
