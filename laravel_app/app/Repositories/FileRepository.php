<?php


namespace App\Repositories;


use App\Models\File;
use App\Repositories\Interfaces\FileRepositoryInterface;

class FileRepository extends BaseRepository implements FileRepositoryInterface
{

    public function getModel()
    {
       return File::class;
    }
}
