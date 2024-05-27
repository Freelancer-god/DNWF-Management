<?php


namespace App\Services;

use App\Models\Employee;
use App\Models\EmployeeLog;
use App\Repositories\Interfaces\EmployeeRepositoryInterface;
use App\Repositories\Interfaces\RoleRepositoryInterface;
use App\Services\Base\BaseService;
use App\Utils\StringHelpers;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class EmployeeService extends BaseService
{
    protected $repo_base;
    protected $repo_role;
    protected $with;
    protected $is_app;

    public function __construct(
        EmployeeRepositoryInterface $repo_base,
        RoleRepositoryInterface $repo_role,
    ) {
        $this->repo_base                    = $repo_base;
        $this->repo_role                    = $repo_role;
        $this->is_app                       = false;
        $this->with                         = ['roles'];
    }

    public function getModelName()
    {
        return 'Nhân viên';
    }

    public function getTableName()
    {
        return (new Employee())->getTable();
    }

    public function login($inputs) {
        $employ = $this->repo_base->findOneBy(['username' => $inputs['username']]);
        if(!isset($employ)) {
            $employ = $this->repo_base->findOneBy(['email' => $inputs['username']]);
        }
        if(isset($employ)) {
            if($employ->status === Employee::STATUS_UNACTIVE){
                return [
                    'code' => '017',
                    'message' => config('error_code')['017']
                ];
            }
            else if(Hash::check($inputs['password'], $employ->password)){
                Auth::logout();
                Auth::login($employ);
                $token = $employ->createToken(config('constants.default_app'))->accessToken;
                EmployeeLog::createLog(null, EmployeeLog::SYSTEM_LOG, EmployeeLog::LOGIN, base64_encode(json_encode($inputs)));
                session()->put('myToken', $token);
                session()->put('myUser', json_encode($employ));
                if(count($employ->roles) > 0) {
                    session()->put('myPermission', $employ->roles[0]->permissions);
                }else{
                    session()->put('myPermission', "");
                }

                return [
                    'code' => '200',
                    'data' => [
                        'employee' => $employ,
                        'token' => $token
                    ]
                ];
            }
        }
        return [
            'code' => '002',
            'message' => config('error_code')['002']
        ];
    }

    public function loginWithPassword($inputs){
        if(!isset($inputs['username'])) {
            return [ 'code' => '003' , 'message' => 'Tên đăng nhập'];
        }
        if(!isset($inputs['password'])) {
            return [ 'code' => '003' , 'message' => 'mật khẩu'];
        }
        $input_users = ['last_login_at' => Carbon::now()->toDateTimeString()];

        $employee = $this->repo_base->findOneBy(['username' => $inputs['username']]);
        if(!isset($employee)) {
            $employee = $this->repo_base->findOneBy(['email' => $inputs['username']]);
        }
        if(!isset($employee)) {
            return [ 'code' => '004', 'message' => 'Tài khoản' ];
        }

        if(!Hash::check($inputs['password'], $employee->password)){
            return ['code' => '016', 'message' => ''];
        }

        if(isset($inputs['name']) && !empty($inputs['name'])) {
            $input_users['name'] = $inputs['name'];
        }
        $employee->update($input_users);
        $employee = $this->repo_base->findById($employee->id, $this->with);

        $token = $employee->createToken(config('constants.default_app'))->accessToken;


        return [
            'code' => '200',
            'data' => [
                'data' => $this->formatData($employee),
                'token' => $token,
            ]
        ];
    }

    public function getPermission() {
        $employ = auth()->user();
        return [
            'code' => '200',
            'data' => count($employ->roles) > 0 ? $employ->roles[0]->permissions : null
        ];
    }

    public function logout($inputs){
        $employee = Auth::user();
        // TODO: send to notification services
        $employee->token()->revoke();

        $messages = 'Đăng xuất thành công';
        return [
            'code' => '200',
            'message' => $messages
        ];
    }

    public function changePassword($inputs) {
        $employee = Auth::user();
        if(isset($inputs['old_password'])) {
            if(!Hash::check($inputs['old_password'], $employee->password)) {
                return [ 'code' => '016', 'message' => '' ];
            }
        }
        if(isset($inputs['password'])) {
            $inputs['password'] = Hash::make($inputs['password']);
        }
        $this->repo_base->update($employee->id, [
             'password' => $inputs['password']
        ]);

        return [
            'code' => '200',
            'data' => $this->formatData($employee)
        ];
    }

    public function register($inputs){

        return [
            'code' => '200',
            'data' => null
        ];
    }

    public function forgetPassword($inputs){

        return [
            'code' => '200',
            'data' => null
        ];
    }

    public function loginWithToken() {
        $employee = Auth::user();
        return [
            'code' => '200',
            'data' => [
                'data' => $this->formatData($employee)
            ]
        ];
    }

    public function checkVersion($inputs) {
        $is_failed = false;
        if(!isset($inputs['version'])) {
            return [ 'code' => '003', 'message' => 'version' ];
        }
        if(isset($inputs['version'])) {
            $compareVersion = explode('.', $inputs['version']);
            $currentVersion = explode('.', config('constants.version.current'));
            // compare 1
            $is_compare = 1;
            foreach($compareVersion as $key=>$val) {
                if($is_compare == 1 && isset($currentVersion[$key])) {
                    $is_compare = $this->compareVersion($val, $currentVersion[$key]);
                } else {
                    break;
                }
            }

            // only set to true when is_compare == 0;
            if($is_compare == 0) { $is_failed = true; }
        }


        if($is_failed){
            $plat = isset($inputs['platform']) ? $inputs['platform'] : 'android';
            $link = config('constants.version.google_url');
            if(strtolower($plat) == 'ios') {
                $link = config('constants.version.apple_url');
            }

            return [
                'code' => '014',
                'message' => config('error_code.014'),
                'is_failed' => $is_failed,
                'data' => [
                    'link' => $link
                ]];
        }

        return [
            'code' => '200',
            'message' => 'Version hợp lệ'
        ];
    }

    private function compareVersion($compare, $current){
        if($compare > $current){
            return 2;
        } else if($compare == $current){
            return 1;
        }
        return 0;
    }

    public function checkInputs($inputs, $id)
    {
        // default password
        if(isset($inputs['password'])) {
            $inputs['password'] = Hash::make($inputs['password']);
        }
        // auto set data
        if(!isset($inputs['last_login_at'])) {
            $inputs['last_login_at'] = Carbon::now()->toDateTimeString();
        }

        if(isset($inputs['birth_date'])) {
            $inputs['birth_date'] = Carbon::createFromFormat(StringHelpers::getFormatDate($inputs['birth_date']), $inputs['birth_date'])->toDateString();
        }

        if(isset($inputs['username']) && $this->repo_base->existByWhere(['username' => $inputs['username']], $id)) {
            return [ 'is_failed' => true, 'code' => '005', 'message' => 'Tên đăng nhập' ];
        }

        if(isset($inputs['reference']) && $this->repo_base->existByWhere(['reference' => $inputs['reference']], $id)) {
            return [ 'is_failed' => true, 'code' => '005', 'message' => 'Mã khách hàng' ];
        }

        if(isset($inputs['email']) && $this->repo_base->existByWhere(['email' => $inputs['email']], $id)) {
            return [ 'is_failed' => true, 'code' => '005', 'message' => 'Email' ];
        }

        if(isset($inputs['medias']) && !empty($inputs['medias'])) {
            $inputs['medias'] = json_encode($inputs['medias'], JSON_UNESCAPED_UNICODE);
        }
        $reference = isset($inputs['reference']) && !empty($inputs['reference']) ? $inputs['reference'] : null;
        if(!isset($id)) {
            $inputs['reference'] = $this->generateReferenceEmployee($reference);
        }
        // generate reference
        return [
            'is_failed' => false,
            'inputs' => $inputs
        ];
    }

    public function generateReferenceEmployee($reference) {
        if(!isset($reference)) {
            return $this->repo_base->getReference();
        }
        return $reference;
    }

    public function formatData($data)
    {
        $res = parent::formatData($data); // TODO: Change the autogenerated stub
        $res['role'] = null;
        if(isset($data->roles) && count($data->roles) > 0){
            $role = $data->roles[0];
            $res['role'] = [
                'id' => $role->id,
                'name' => $role->display_name
            ];
        }
        if(isset($data->status)){
            $res['status_name'] = config('enums.employee.status')[$data->status];
        }
        unset($res['roles']);
        return $res;
    }

    public function store($inputs){
        $this->is_app = false;
        $validate = $this->checkInputs($inputs, null);
        if(!isset($inputs['password'])){
            return [ 'is_failed' => true, 'code' => '003', 'message' => 'mật khẩu' ];
        }
        if($validate['is_failed']) {
            return $validate;
        }
        $input_dat = $validate['inputs'];
        $data = $this->repo_base->create($input_dat);
        $this->saveRole($inputs, $data);
        $data = $this->repo_base->findById($data->id, []);
        return [
            'code' => '200',
            'data' => $this->formatData($data)
        ];
    }

    public function update($id, $inputs){
        $this->is_app = isset($inputs['is_app']) ? $inputs['is_app'] : false;
        /** @var Model $model */
        $data = $this->repo_base->findById($id);
        if (!isset($data)) {
            return ['code' => '004', 'message' => $this->getModelName()];
        }
        $validate = $this->checkInputs($inputs, $id);
        if($validate['is_failed']) {
            return $validate;
        }

        $input_dat = $validate['inputs'];
        if(!isset($input_dat['password'])){
            unset($input_dat['password']);
        }

        $data = $this->repo_base->update($id, $input_dat);
        // update roles
        $this->saveRole($inputs, $data);
        $data = $this->repo_base->findById($data->id);
        return [
            'code' => '200',
            'data' => $this->formatData($data)
        ];
    }

    public function destroy($id){
        $this->is_app = false;
        $data = $this->repo_base->findById($id);

        if (!isset($data)) {
            return ['code' => '004', 'message' => $this->getModelName()];
        }
        // remove role first
        $data->roles()->detach();
        $data->delete();

        return [
            'code' => '200',
            'message' => 'Deleted successfully'
        ];
    }

    private function saveRole($inputs, $data) {
        if(isset($inputs['role_id'])){
            $role = $this->repo_role->findById($inputs['role_id']);
            if(isset($role)){
                $data->roles()->detach();
                $data->roles()->save($role);
            }
        }
    }

    public function getJoinTable()
    {
        return [
            [
                'join' => 'leftJoin',
                'join_table' => 'role_user',
                'join_column' => 'role_user.user_id',
                'join_cond' => '=',
                'main_column' => $this->getTableName() . '.id',
                'where' => [
//                    "role_user.user_type = 'App\\\\Models\\\\Employee'"
                ],
            ]
        ];
    }

    public function getQueryDateField() {
        return [
            $this->getTableName() .'.created_at',
            $this->getTableName() .'.updated_at',
            $this->getTableName() .'.last_login_at',
            $this->getTableName() .'.birth_date'
        ];
    }

    public function getQueryField() {
        return [
            $this->getTableName() .'.reference',
            $this->getTableName() .'.username',
            $this->getTableName() .'.name',
            $this->getTableName() .'.phone',
            $this->getTableName() .'.sex',
            $this->getTableName() .'.status',
            $this->getTableName() .'.email',
            $this->getTableName() .'.type',
            'role_user.role_id'
        ];
    }

    public function generateColumn($inputs, $columns) {
        // always add
//        array_push($columns, $this->getTableName() . '.id not in ('. implode(',', config('constants.employee_admin')) .')');
        array_push($columns, "{$this->getTableName()}.type = 1");

        if(isset($inputs['except_ids']) && count($inputs['except_ids']) > 0) {
            array_push($columns, $this->getTableName() . '.id not in ('. implode(',', $inputs['except_ids']) .')');
        }

        if(isset($inputs['status']) && count($inputs['status']) > 0) {
            array_push($columns, $this->getTableName() . '.status = \'' . $inputs['status'] . '\'');
        }

        return $columns;
    }
}
