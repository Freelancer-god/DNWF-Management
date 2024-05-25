<?php


namespace App\Repositories\Interfaces;

interface DeviceRepositoryInterface extends BaseRepositoryInterface
{
    public function loginBy($token, $platform, $id, $type = 'passengers');
    public function removeTokenExist($token, $type = 'passengers');
    public function logoutBy($token, $id, $type = 'passengers');
    public function findTokenByAbleIds($user_ids, $type = 'passengers');
}
