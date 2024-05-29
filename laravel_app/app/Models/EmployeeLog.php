<?php

namespace App\Models;

use App\Repositories\EmployeeLogRepository;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Nicolaslopezj\Searchable\SearchableTrait;

class EmployeeLog extends Model
{
    use SearchableTrait;

    public $table = 'employee_logs';

    // action
    const LOGIN     = 0;
    const SAVE      = 1;
    const UPDATE    = 2;
    const DELETE    = 3;
    const CONFIRM   = 4;
    const ANSWER    = 5;

    // action type
    const SYSTEM_LOG                = 0;
    const EMPLOYEE_LOG              = 1;
    const ROLE_LOG                  = 2;
    const CLUB_LOG                  = 3;
    const SPONSOR_LOG               = 4;

    protected $fillable = [
        'id',
        'reference',
        'employee_id',
        'employee_name',
        'employee_phone',
        'employee_reference',
        'action',
        'action_type',
        'content',
        'request_data',
        'response_data',
        'log_id',
        'log_type'
    ];

    protected $casts = [
        'id'                    => 'integer',
        'employee_id'           => 'integer',
        'reference'             => 'string',
        'employee_name'         => 'string',
        'employee_phone'        => 'string',
        'employee_reference'    => 'string',
        'action'                => 'string',
        'action_type'           => 'integer',
        'content'               => 'string',
        'request_data'          => 'string',
        'response_data'         => 'string',
        'log_id'                => 'integer',
        'log_type'              => 'string',
        'created_at'            => 'string',
        'updated_at'            => 'string'
    ];

    protected $searchable = [
        'columns' => [
            'employee_logs.reference' => 10,
            'employee_logs.action' => 10,
            'employee_logs.action_type' => 10,
            'employee_logs.employee_id' => 10,
            'employee_logs.employee_reference' => 10,
        ]
    ];

    public function searchText(string $term)
    {
        return self::search($term);
    }

    public function employee() {
        return $this->belongsTo('App\Models\Employee', 'employee_id');
    }

    public static function createLogWithContent($content, $action_type, $action) {
        $repo_employee_log = new EmployeeLogRepository();
        // web
        $user = auth()->user();
        // api and action type
//            if($user->id != 1) {
        if(isset($user)) {
            EmployeeLog::create([
                'employee_id' => $user->id,
                'reference' => $repo_employee_log->getReferenceByPrefix('LOG', 'reference', 12),
                'employee_name' => isset($user) ? $user->name : null,
                'employee_phone' => isset($user) ? $user->phone : null,
                'employee_reference' => isset($user) ? $user->reference : null,
                'action' => config('employee_logs.action')[$action],
                'action_type' => $action_type,
                'content' => $content,
                'log_id' => isset($data['id']) ? $data['id'] : null,
                'log_type' => config('employee_logs.log_type')[$action_type],
    //            'request_data' => json_encode($param),
    //            'response_data' => json_encode($data)
            ]);
        }
    }

    public static function createDeleteLog($data, $action_type, $action, $param) {
        $repo_employee_log = new EmployeeLogRepository();
        $user = auth()->user();
        // api and action type
//        if($user->id != 1) {
        if(isset($user)){
            EmployeeLog::create([
                'employee_id' => $user->id,
                'reference' => $repo_employee_log->getReferenceByPrefix('LOG', 'reference', 12),
                'employee_name' => isset($user) ? $user->name : null,
                'employee_phone' => isset($user) ? $user->phone : null,
                'employee_reference' => isset($user) ? $user->reference : null,
                'action' => config('employee_logs.action')[$action],
                'action_type' => $action_type,
                'content' => static::createContentActionType($action, $action_type) . config('employee_logs.action_type')[$action_type] .  ' thành công',
                'log_id' => isset($data['id']) ? $data['id'] : null,
                'log_type' => config('employee_logs.log_type')[$action_type],
                'request_data' => json_encode($param, JSON_UNESCAPED_UNICODE),
                'response_data' => json_encode($data, JSON_UNESCAPED_UNICODE)
            ]);
        }
    }

    public static function createLog($data, $action_type, $action, $param) {
        $repo_employee_log = new EmployeeLogRepository();
        $user = auth()->user();
        // api and action type
        if(isset($user)) { // && $user->id != 1
            EmployeeLog::create([
                'employee_id' => $user->id,
                'reference' => $repo_employee_log->getReferenceByPrefix('LOG', 'reference', 12),
                'employee_name' => isset($user) ? $user->name : null,
                'employee_phone' => isset($user) ? $user->phone : null,
                'employee_reference' => isset($user) ? $user->reference : null,
                'action' => config('employee_logs.action')[$action],
                'action_type' => $action_type,
                'content' => static::createContent($data, $action_type, $action),
                'log_id' => isset($data['id']) ? $data['id'] : null,
                'log_type' => config('employee_logs.log_type')[$action_type],
                'request_data' => json_encode($param, JSON_UNESCAPED_UNICODE),
                'response_data' => json_encode($data, JSON_UNESCAPED_UNICODE)
            ]);
        }
    }

    private static function createContent($data, $type, $action){
        switch ($type){
            case self::SYSTEM_LOG:
                return config('employee_logs.content')[$type];
            case self::EMPLOYEE_LOG:
                return sprintf(config('employee_logs.content')[$type], static::createContentActionType($action, $type), isset($data['reference']) ? $data['reference'] : '', isset($data['name']) ? $data['name'] : '', isset($data['phone']) ? $data['phone'] : '');
            case self::ROLE_LOG:
                return sprintf(config('employee_logs.content')[$type], static::createContentActionType($action, $type), isset($data['name']) ? $data['name'] : '');
            case self::CLUB_LOG:
                return sprintf(config('employee_logs.content')[$type], static::createContentActionType($action, $type), isset($data['name']) ? $data['name'] : '', isset($data['phone']) ? $data['phone'] : '');
           }
    }

    private static function createContentActionType($action, $type) {
        return config('employee_logs.action')[$action];
    }
}
