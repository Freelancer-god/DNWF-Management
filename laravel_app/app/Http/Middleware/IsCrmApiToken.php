<?php

namespace App\Http\Middleware;

use Closure;

class IsCrmApiToken
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
        $isAuthorize = true;

        if($request->hasHeader('Authorization') || isset($request->token)){
            if($request->header('Authorization') != null && $request->header('Authorization') != config('constants.api_token')){
                $isAuthorize = false;
            } else if($request->token != null && $request->token != config('crm_server.api_token')){
                $isAuthorize = false;
            }
        } else if(!$request->hasHeader('Authorization') || !isset($request->token)){
            $isAuthorize = false;
        }

        if(!$isAuthorize){
            return response([
                'success' => false,
                'message' => 'Do not authorize'
            ], 404);
        }
        $allowedOrigins = [config('constants.host_server')];
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
