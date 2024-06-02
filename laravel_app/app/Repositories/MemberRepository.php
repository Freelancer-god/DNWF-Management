<?php


namespace App\Repositories;


use App\Models\Member;
use App\Repositories\Interfaces\MemberRepositoryInterface;

class MemberRepository extends BaseRepository implements MemberRepositoryInterface
{

    public function getModel()
    {
        return Member::class;
    }
}
