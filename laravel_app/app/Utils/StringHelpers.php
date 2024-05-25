<?php
/**
 * Created by PhpStorm.
 * User: Tuan
 * Date: 3/28/2018
 * Time: 11:39 AM
 */

namespace App\Utils;

class StringHelpers
{
    public function getReturnValue($value){
        if(isset($value) && !empty($value)){
            return $value;
        }
        return "(không có dữ liệu)";
    }

    public static function getValue($value){
        if(isset($value) && !empty($value)){
            return $value;
        }
        return "(không có dữ liệu)";
    }

    public static function getSearch($search){
        if (strpos($search, '"') !== false) {
            $data = str_replace('"', '', $search);
            return [$data];
        }
        $data = preg_split("/(:|;|,)/", $search);
        return $data;
    }

    public function getTelegramMessage($message){
        if (strpos($message, '_') !== false) {
            $message = str_replace("_","-",$message);
        } else if (strpos($message, '*') !== false) {
            $message = str_replace("*","-",$message);
        }
        return $message;
    }

    public static function generateRandomString($length = 6) {
        $characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        if ($length > $charactersLength) {
            return "Length too long for unique string.";
        }

        $randomString = str_shuffle($characters);
        $result = substr($randomString, 0, $length);

        return $result;
    }

    // random relate
    public static function generateRandomNumber($length = 6) {
        $characters = '0123456789';
        $charactersLength = strlen($characters);
        if ($length > $charactersLength) {
            return "Length too long for unique string.";
        }

        $randomString = str_shuffle($characters);
        $result = substr($randomString, 0, $length);

        return $result;
    }

    public static function generateRandomNumberOld($length = 6) {
        $characters = '0123456789';
        $charactersLength = strlen($characters);
        if ($length > $charactersLength) {
            return "Length too long for unique string.";
        }

        $randomString = str_shuffle($characters);
        $result = substr($randomString, 0, $length);

        return $result;
    }

    public static function generateRandomStringOld($length = 6) {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $randomString = '';
        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[rand(0, $charactersLength - 1)];
        }
        return $randomString;
    }

    public static function setEmptyString($res, array $keys = []) {
        if(sizeof($keys) > 0){
            foreach($keys as $key){
                $res[$key] = isset($res[$key]) ? $res[$key] : '';
            }
        }
        return $res;
    }

    public static function getFormatDate($date) {
        $split = explode(':', $date);
        if(sizeof($split) > 2){
            return 'd/m/Y H:i:s';
        } else if(sizeof($split) > 1) {
            return 'd/m/Y H:i';
        } else {
            return 'd/m/Y';
        }
    }

    public static function getFormatTime($date) {
        $split = explode(':', $date);
        if(sizeof($split) > 2){
            return 'H:i:s';
        }  else {
            return 'H:i';
        }
    }

    public static function convertToHttps($path) {
        return str_replace('http:', 'https:', $path);
    }

    public static function setStringFromArray($datas) {
        $str = '';
        foreach($datas as $dat) {
            $str .= '\''. $dat .'\',';
        }
        $str = substr($str, 0, -1);
        return $str;
    }
}
