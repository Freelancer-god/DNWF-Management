<?php
/**
 * Created by PhpStorm.
 * User: Tuan
 * Date: 12/21/2018
 * Time: 2:18 PM
 */

namespace App\Utils;

class AppBaseResponse
{
    public static function makeErrorResponse($message, $code)
    {
        $res = [
            'success' => false,
            'error' =>  sprintf(config('error_code')[$code], $message),
            'code' => $code
        ];

        return $res;
    }

    public static function makeErrorDataResponse($message, $data, $code)
    {
        $res = [
            'success' => false,
            'error' =>  sprintf(config('error_code')[$code], $message),
            'code' => $code
        ];

        if (!empty($data)) {
            $res['data'] = $data;
        }

        return $res;
    }

    public static function makeResponseHeader($message, $data)
    {
        return response()->json([
            'success' => true,
            'data'    => $data,
            'message' => $message,
        ])->header('Access-Control-Allow-Origin', '*');
    }

    /**
     * @param string $message
     * @param mixed  $data
     *
     * @return array
     */
    public static function makeResponse($message, $data)
    {
        return [
            'success' => true,
            'data'    => $data,
            'message' => $message,
        ];
    }

    /**
     * @param string $message
     * @param array  $data
     *
     * @return array
     */
    public static function makeError($message, array $data = [])
    {
        $res = [
            'success' => false,
            'message' => $message,
        ];

        if (!empty($data)) {
            $res['data'] = $data;
        }

        return $res;
    }
}
