<?php

namespace App\Exceptions;

use Illuminate\Auth\AuthenticationException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException;
use Symfony\Component\Routing\Exception\RouteNotFoundException;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * The list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {
        $this->reportable(function (Throwable $e) {
            //
        });

        $this->reportable(function (MethodNotAllowedHttpException $e) {
//            return response()->json([
//                'success' => false,
//                'error' => sprintf(config('error_code')['405'], ''),
//                'code' => '405'
//            ], 405);
        });

        $this->renderable(function (RouteNotFoundException $e, Request $request) {
//            return response()->json([
//                'success' => false,
//                'error' => sprintf(config('error_code')['404'],''),
//                'code' => '404'
//            ], 404);
        });

        //aaa
        $this->renderable(function (\Exception $e, Request $request) {
//            return response()->json([
//                'success' => false,
//                'error' => sprintf(config('error_code')['500']) . ' - ' . $e->getMessage(),
//                'code' => '500'
//            ], 500);
        });
    }

    protected function unauthenticated($request, AuthenticationException $exception)
    {
        if ($request->hasHeader('Authorization')) {
            return response()->json([
                'success' => false,
                'error' => sprintf(config('error_code')[401], ''),
                'code' => 401
            ], 401);
        }

        return redirect()->guest(route('login'));
    }
}
