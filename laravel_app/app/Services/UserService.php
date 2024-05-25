<?php


namespace App\Services;


use App\Models\User;
use App\Repositories\Interfaces\DeviceRepositoryInterface;
use App\Repositories\Interfaces\UserRepositoryInterface;
use App\Services\Base\BaseService;

class UserService extends BaseService
{
    protected $repo_base;

    public function __construct(
        UserRepositoryInterface $repo_base,
        DeviceRepositoryInterface $repo_device
    ) {
        $this->repo_base                = $repo_base;
        $this->repo_device              = $repo_device;
    }

    public function getModelName()
    {
        return 'users';
    }

    public function getTableName()
    {
        return (new User())->getTable();
    }

    public function checkInputs($inputs, $id){
        if(!isset($inputs['name'])) {
            return [ 'is_failed' => true, 'code' => '003', 'message' => 'Name'];
        }
        if(!isset($inputs['email'])) {
            return [ 'is_failed' => true, 'code' => '003', 'message' => 'Email'];
        }
        if($this->repo_base->existByWhere(['name' => $inputs['name']], $id)){
            return [ 'is_failed' => true, 'code' => '005', 'message' => 'Name' ];
        }
        if($this->repo_base->existByWhere(['email' => $inputs['email']], $id)){
            return [ 'is_failed' => true, 'code' => '005', 'message' => 'Email' ];
        }

        return [
            'is_failed' => false,
            'inputs' => $inputs
        ];
    }
}
