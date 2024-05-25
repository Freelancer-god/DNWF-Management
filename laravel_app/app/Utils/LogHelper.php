<?php
/**
 * Created by PhpStorm.
 * User: Tuan
 * Date: 5/9/2019
 * Time: 11:19 AM
 */

namespace App\Utils;


use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

class LogHelper
{
    /**
     * @param $message
     * @param $type
     */
    public static function writeLog($message, $type) {
        switch ($type){
            case 2:
                if(config('constants.logs.debug') === 1) {
                    Log::debug($message);
                }
                break;
            case 1:
                if(config('constants.logs.info') === 1) {
                    Log::info($message);
                }
                break;
            case 0:
                if(config('constants.logs.error') === 1) {
                    $tracking_id = time();
                    $error_message = 'Tracking id ' . $tracking_id . ' - ' .$message;
                    Log::error($error_message);
                    return $tracking_id;
                }
                break;
        }
    }
}
