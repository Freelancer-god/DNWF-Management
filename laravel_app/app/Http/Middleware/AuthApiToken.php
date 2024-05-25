<?php

namespace App\Http\Middleware;

use Closure;

class AuthApiToken
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $isAuthorize = false;
        $token = $request->bearerToken();
        if(!isset($token)) { $token = $request->token; }

        // read server token
        $server_token = null;
        $filePath = "/run/secrets/inter_token.key";
        if (file_exists($filePath)) {
            $fileContent = file_get_contents($filePath);
            $server_token = $fileContent;
        }

        if(isset($token) && $token == $server_token) {
            $isAuthorize =  true;
        } else {
            $isAuthorize =  false;
        }

        if(!$isAuthorize){
            return response([
                'success' => false,
                'code' => '401',
                'message' => sprintf(config('error_code.401'), 'Vui lòng liên hệ admin')
            ], 401);
        }
        $allowedOrigins = config('constants.allwored_origins');
        $origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : null;

        if (in_array($origin, $allowedOrigins)) {
            return $next($request)
                ->header('Access-Control-Allow-Origin', $origin)
                ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
                ->header('Access-Control-Allow-Headers', 'Content-Type');
        }

        return $next($request);
    }
}
