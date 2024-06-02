<?php

namespace App\Exceptions;

use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Http\Request;
use Illuminate\Validation\UnauthorizedException;
use Symfony\Component\HttpKernel\Exception\HttpException;
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

        $this->renderable(function (\Exception $e, Request $request) {
            if($e->getMessage() === 'Unauthenticated.'){
                return response()->json([
                    'success' => false,
                    'error' => config('error_code')['401'],
                    'code' => '401'
                ], 401);
            }
            return response()->json([
                'success' => false,
                'error' => config('error_code')['500'] . ' - ' . $e->getMessage(),
                'code' => '500'
            ], 500);
        });
    }

    public function render($request, Throwable $exception)
    {
        if ($exception instanceof AuthorizationException) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        if ($exception instanceof ModelNotFoundException) {
            return response()->json(['error' => 'Resource not found'], 404);
        }

        if ($exception instanceof HttpException) {
            $statusCode = $exception->getStatusCode();
            if ($statusCode == 500) {
                return response()->json(['error' => 'Internal Server Error'], 500);
            }
        }

        return parent::render($request, $exception);
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
