<?php


namespace App\Repositories;


use App\Models\Device;
use App\Repositories\Interfaces\DeviceRepositoryInterface;

class DeviceRepository extends BaseRepository implements DeviceRepositoryInterface
{
    public function getModel()
    {
        return Device::class;
    }

    public function loginBy($token, $platform, $id, $type = 'passengers')
    {
        $this->removeTokenExist($token, $type);

        $datas = [
            'push_token' => $token,
            'platform' => $platform,
            'deviceable_id' => $id,
            'deviceable_type' => $type
        ];

        $this->create($datas);
    }

    public function removeTokenExist($token, $type = 'passengers')
    {
        $this->model
            ->where('push_token', $token)
            ->where('deviceable_type', $type)
            ->delete();
    }

    public function logoutBy($token, $id, $type = 'passengers')
    {
        $device = $this->model->where([
            'push_token' => $token,
            'deviceable_id' => $id,
            'deviceable_type' => $type
        ])->delete();
        if(isset($device)){
            $device->delete();
            return true;
        }
        return false;
    }

    public function findTokenByAbleIds($able_ids, $type = 'passengers')
    {
        $datas = Device::whereNotNull('push_token')
            ->whereIn('deviceable_id', $able_ids)
            ->whereRaw('CHAR_LENGTH(push_token) = 36')
            ->get(['push_token']);
        $tokens = [];
        if(count($datas) > 0){
            foreach($datas as $data){
                array_push($tokens, $data->push_token);
            }
        }
        return $tokens;
    }
}
