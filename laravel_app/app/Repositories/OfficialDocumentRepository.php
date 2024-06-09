<?php


namespace App\Repositories;


use App\Models\OfficialDocument;
use App\Repositories\Interfaces\OfficialDocumentRepositoryInterface;

class OfficialDocumentRepository extends BaseRepository implements OfficialDocumentRepositoryInterface
{

    public function getModel()
    {
        return OfficialDocument::class;
    }
}
